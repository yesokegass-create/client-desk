<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Mail;
use App\Mail\VerifyEmailMailable;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:8',
                'cf_token' => 'required|string',
            ]);

        // Verify Turnstile token with Cloudflare
        $turnstileResponse = \Illuminate\Support\Facades\Http::asForm()->post('https://challenges.cloudflare.com/turnstile/v0/siteverify', [
            'secret' => env('TURNSTILE_SECRET_KEY', '1x0000000000000000000000000000000AA'),
            'response' => $request->cf_token,
            'remoteip' => $request->ip()
        ]);

        if (!$turnstileResponse->json('success')) {
            return response()->json(['message' => 'Verifikasi keamanan Cloudflare gagal.'], 400);
        }

        $token = Str::random(60);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'verification_token' => $token,
        ]);

        // Generate the frontend URL
        $frontendUrl = url('/auth/callback?type=signup&access_token=' . $token);

        // Send Email
        try {
            Mail::to($user->email)->send(new VerifyEmailMailable($frontendUrl, $user));
        } catch (\Throwable $e) {
            // Fallback: If SMTP fails, auto-verify the user so they can still login and test the app
            $user->email_verified_at = now();
            $user->save();
            return response()->json(['message' => 'Akun berhasil dibuat. (Catatan: Pengiriman email gagal karena: ' . $e->getMessage() . ')']);
        }

        return response()->json(['message' => 'User registered successfully. Please check your email.']);
        } catch (\Throwable $e) {
            return response()->json(['message' => 'Exception in register: ' . $e->getMessage() . ' at line ' . $e->getLine()], 500);
        }
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
            'cf_token' => 'required|string',
        ]);

        // Verify Turnstile token with Cloudflare
        $turnstileResponse = \Illuminate\Support\Facades\Http::asForm()->post('https://challenges.cloudflare.com/turnstile/v0/siteverify', [
            'secret' => env('TURNSTILE_SECRET_KEY', '1x0000000000000000000000000000000AA'),
            'response' => $request->cf_token,
            'remoteip' => $request->ip()
        ]);

        if (!$turnstileResponse->json('success')) {
            return response()->json(['message' => 'Verifikasi keamanan Cloudflare gagal.'], 400);
        }

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Email atau kata sandi salah.'], 401);
        }

        if (!$user->email_verified_at) {
            return response()->json(['message' => 'Silakan verifikasi email Anda terlebih dahulu.'], 403);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Login berhasil.',
            'access_token' => $token,
            'token_type' => 'Bearer',
        ]);
    }

    public function verifyEmail(Request $request)
    {
        $request->validate([
            'token' => 'required|string',
        ]);

        $user = User::where('verification_token', $request->token)->first();

        if (!$user) {
            return response()->json(['message' => 'Invalid token.'], 400);
        }

        $user->email_verified_at = now();
        $user->verification_token = null; // Clear token after use
        $user->save();

        return response()->json(['message' => 'Email verified successfully.']);
    }
    public function checkEmail(Request $request)
    {
        $request->validate([
            'email' => 'required|email'
        ]);

        $exists = \App\Models\User::where('email', $request->email)->exists();

        return response()->json([
            'exists' => $exists
        ]);
    }

    public function forgotPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email'
        ]);

        $user = \App\Models\User::where('email', $request->email)->first();

        if (!$user) {
            usleep(100000); 
            return response()->json(['message' => 'Jika email Anda terdaftar, Anda akan menerima link reset password.']);
        }

        $token = \Illuminate\Support\Str::random(60);
        
        \Illuminate\Support\Facades\DB::table('password_reset_tokens')->updateOrInsert(
            ['email' => $user->email],
            [
                'email' => $user->email,
                'token' => $token,
                'created_at' => now()
            ]
        );

        $resetUrl = url('/auth/callback?type=reset&access_token=' . $token);

        try {
            \Illuminate\Support\Facades\Mail::to($user->email)->send(new \App\Mail\ResetPasswordMailable($resetUrl));
        } catch (\Exception $e) {
            return response()->json(['message' => 'Gagal mengirim email: ' . $e->getMessage()], 500);
        }

        return response()->json(['message' => 'Jika email Anda terdaftar, Anda akan menerima link reset password.']);
    }

    public function validateResetToken(Request $request)
    {
        $request->validate([
            'token' => 'required|string'
        ]);

        $resetRecord = \Illuminate\Support\Facades\DB::table('password_reset_tokens')
            ->where('token', $request->token)
            ->first();

        if (!$resetRecord) {
            return response()->json(['message' => 'Token reset tidak valid.'], 400);
        }

        // Check if token is older than 24 hours
        if (now()->diffInHours(\Carbon\Carbon::parse($resetRecord->created_at)) > 24) {
            return response()->json(['message' => 'Token reset sudah kedaluwarsa.'], 400);
        }

        return response()->json(['message' => 'Token valid.']);
    }

    public function resetPassword(Request $request)
    {
        $request->validate([
            'token' => 'required|string',
            'password' => 'required|string|min:8'
        ]);

        $resetRecord = \Illuminate\Support\Facades\DB::table('password_reset_tokens')
            ->where('token', $request->token)
            ->first();

        if (!$resetRecord) {
            return response()->json(['message' => 'Token reset tidak valid.'], 400);
        }

        if (now()->diffInHours(\Carbon\Carbon::parse($resetRecord->created_at)) > 24) {
            return response()->json(['message' => 'Token reset sudah kedaluwarsa.'], 400);
        }

        $user = \App\Models\User::where('email', $resetRecord->email)->first();

        if (!$user) {
            return response()->json(['message' => 'Pengguna tidak ditemukan.'], 404);
        }

        $user->password = \Illuminate\Support\Facades\Hash::make($request->password);
        $user->save();

        // Delete the token
        \Illuminate\Support\Facades\DB::table('password_reset_tokens')->where('email', $user->email)->delete();

        return response()->json(['message' => 'Kata sandi berhasil diperbarui.']);
    }

    public function getGoogleAuthUrl()
    {
        try {
            $clientId = config('services.google.client_id');
            $redirectUri = config('services.google.redirect'); // Use the exact same URI from Google config
            
            $query = http_build_query([
                'client_id' => $clientId,
                'redirect_uri' => $redirectUri,
                'response_type' => 'code',
                'scope' => 'openid email profile',
                'access_type' => 'offline',
                'prompt' => 'consent',
                'state' => 'login'
            ]);

            $authUrl = 'https://accounts.google.com/o/oauth2/v2/auth?' . $query;

            return response()->json([
                'status' => 'success',
                'url' => $authUrl
            ]);
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error('Google Auth URL Error: ' . $e->getMessage());
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to generate auth url: ' . $e->getMessage()
            ], 500);
        }
    }

    public function handleGoogleCallback(Request $request)
    {
        $code = $request->query('code');

        if (!$code) {
            return response()->json(['error' => 'No authorization code provided'], 400);
        }

        try {
            $redirectUri = config('services.google.redirect');
            $response = \Illuminate\Support\Facades\Http::post('https://oauth2.googleapis.com/token', [
                'client_id' => config('services.google.client_id'),
                'client_secret' => config('services.google.client_secret'),
                'redirect_uri' => $redirectUri,
                'grant_type' => 'authorization_code',
                'code' => $code,
            ]);

            $token = $response->json();

            if (isset($token['error'])) {
                throw new \Exception($token['error_description'] ?? 'Error fetching access token');
            }

            // Get user info
            $userInfoResponse = \Illuminate\Support\Facades\Http::withToken($token['access_token'])
                ->get('https://www.googleapis.com/oauth2/v2/userinfo');

            $googleUser = $userInfoResponse->json();

            if (!isset($googleUser['email'])) {
                throw new \Exception('Email not found from Google profile');
            }

            $user = User::where('email', $googleUser['email'])->first();

            if (!$user) {
                // Create user if not exists
                $user = User::create([
                    'name' => $googleUser['name'] ?? 'User',
                    'email' => $googleUser['email'],
                    'google_id' => $googleUser['id'] ?? null,
                    'avatar' => $googleUser['picture'] ?? null,
                    'password' => \Illuminate\Support\Facades\Hash::make(\Illuminate\Support\Str::random(24)),
                    'email_verified_at' => now(), // Automatically verify email
                ]);
            } else {
                // Update existing user
                if (!$user->google_id) {
                    $user->google_id = $googleUser['id'] ?? null;
                }
                if (!$user->avatar && isset($googleUser['picture'])) {
                    $user->avatar = $googleUser['picture'];
                }
                if (!$user->email_verified_at) {
                    $user->email_verified_at = now();
                }
                $user->save();
            }

            $sanctumToken = $user->createToken('auth_token')->plainTextToken;

            return response("
                <html>
                <body>
                    <script>
                        if (window.opener) {
                            window.opener.postMessage({ 
                                type: 'GOOGLE_LOGIN_SUCCESS', 
                                token: '" . $sanctumToken . "' 
                            }, '*');
                            window.close();
                        } else {
                            document.write('Login berhasil. Anda dapat menutup halaman ini.');
                        }
                    </script>
                </body>
                </html>
            ");

        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error('Google Login Callback Error: ' . $e->getMessage());
            return response("
                <html>
                <body>
                    <h2>Terjadi Kesalahan Login</h2>
                    <p>" . htmlspecialchars($e->getMessage()) . "</p>
                    <script>
                        if (window.opener) {
                            window.opener.postMessage({ type: 'GOOGLE_LOGIN_FAILED', error: '" . addslashes($e->getMessage()) . "' }, '*');
                        }
                    </script>
                </body>
                </html>
            ");
        }
    }
}
