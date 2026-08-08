<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Http;

class GoogleDriveController extends Controller
{
    /**
     * Get the Google OAuth URL.
     */
    public function getAuthUrl()
    {
        try {
            $clientId = config('services.google.client_id');
            $redirectUri = config('services.google.redirect');
            
            $query = http_build_query([
                'client_id' => $clientId,
                'redirect_uri' => $redirectUri,
                'response_type' => 'code',
                'scope' => 'https://www.googleapis.com/auth/drive.file',
                'access_type' => 'offline',
                'prompt' => 'consent'
            ]);

            $authUrl = 'https://accounts.google.com/o/oauth2/v2/auth?' . $query;

            return response()->json([
                'status' => 'success',
                'url' => $authUrl
            ]);
        } catch (\Exception $e) {
            Log::error('Google Drive Auth Error: ' . $e->getMessage());
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to generate auth url: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Handle the callback from Google.
     */
    public function handleCallback(Request $request)
    {
        $code = $request->query('code');

        if (!$code) {
            return response()->json(['error' => 'No authorization code provided'], 400);
        }

        try {
            $response = Http::post('https://oauth2.googleapis.com/token', [
                'client_id' => config('services.google.client_id'),
                'client_secret' => config('services.google.client_secret'),
                'redirect_uri' => config('services.google.redirect'),
                'grant_type' => 'authorization_code',
                'code' => $code,
            ]);

            $token = $response->json();

            if (isset($token['error'])) {
                throw new \Exception($token['error_description'] ?? 'Error fetching access token');
            }

            // In a real application, you should save this token to the database
            
            return response("
                <html>
                <body>
                    <script>
                        if (window.opener) {
                            window.opener.postMessage({ 
                                type: 'GOOGLE_AUTH_SUCCESS', 
                                token: '" . ($token['access_token'] ?? '') . "' 
                            }, '*');
                            window.close();
                        } else {
                            document.write('Autentikasi berhasil. Anda dapat menutup halaman ini.');
                        }
                    </script>
                </body>
                </html>
            ");

        } catch (\Exception $e) {
            Log::error('Google Callback Error: ' . $e->getMessage());
            return response("
                <html>
                <body>
                    <h2>Terjadi Kesalahan</h2>
                    <p>" . htmlspecialchars($e->getMessage()) . "</p>
                    <script>
                        if (window.opener) {
                            window.opener.postMessage({ type: 'GOOGLE_AUTH_FAILED', error: '" . addslashes($e->getMessage()) . "' }, '*');
                        }
                    </script>
                </body>
                </html>
            ");
        }
    }

    /**
     * Upload QRIS file to Google Drive.
     */
    public function uploadQris(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg|max:5120',
            'google_token' => 'required|string'
        ]);

        try {
            $file = $request->file('image');
            $token = $request->input('google_token');
            $fileName = 'qris-' . time() . '.' . $file->getClientOriginalExtension();

            // Prepare multipart body for Google Drive API
            $boundary = \Illuminate\Support\Str::random(24); // Random string for boundary
            $body = "--" . $boundary . "\r\n";
            $body .= "Content-Type: application/json; charset=UTF-8\r\n\r\n";
            $body .= json_encode(['name' => $fileName]) . "\r\n";
            $body .= "--" . $boundary . "\r\n";
            $body .= "Content-Type: " . $file->getMimeType() . "\r\n\r\n";
            $body .= file_get_contents($file->getPathname()) . "\r\n";
            $body .= "--" . $boundary . "--";

            $response = Http::withToken($token)
                ->withBody($body, 'multipart/related; boundary=' . $boundary)
                ->post('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart');

            if ($response->successful()) {
                return response()->json([
                    'status' => 'success',
                    'message' => 'Berhasil upload ke Google Drive',
                    'data' => $response->json()
                ]);
            }

            throw new \Exception($response->body());
        } catch (\Exception $e) {
            Log::error('Google Drive Upload Error: ' . $e->getMessage());
            return response()->json([
                'status' => 'error',
                'message' => 'Gagal mengunggah file: ' . $e->getMessage()
            ], 500);
        }
    }
}
