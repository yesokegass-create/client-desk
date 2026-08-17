<?php

namespace App\Http\Controllers;

use App\Models\StudioSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class StudioSettingController extends Controller
{
    public function getSettings()
    {
        // For local development without auth setup yet, we can mock user ID 1
        // In a real app, use: $user = Auth::user();
        $user = Auth::user() ?? \App\Models\User::firstOrCreate(
            ['email' => 'test@example.com'],
            ['name' => 'Test User', 'password' => bcrypt('password')]
        );

        $settings = $user->studioSetting;
        return response()->json($settings);
    }

    public function saveSettings(Request $request)
    {
        $user = Auth::user() ?? \App\Models\User::firstOrCreate(
            ['email' => 'test@example.com'],
            ['name' => 'Test User', 'password' => bcrypt('password')]
        );

        $data = $request->validate([
            'vendor_name' => 'nullable|string',
            'custom_url' => 'nullable|string|max:255',
            'phone_country_code' => 'nullable|string|max:10',
            'phone_number' => 'nullable|string|max:20',
            'disable_slug' => 'boolean',
            'logo_url' => 'nullable|string',
            'address' => 'nullable|string',
            'working_hours_enabled' => 'boolean',
            'close_booking_outside_hours' => 'boolean',
            'working_days' => 'nullable|array',
            'form_booking_settings' => 'nullable|array',
        ]);

        if (!empty($data['logo_url']) && str_starts_with($data['logo_url'], 'data:image')) {
            $image_parts = explode(";base64,", $data['logo_url']);
            if (count($image_parts) == 2) {
                $image_type_aux = explode("image/", $image_parts[0]);
                $image_type = $image_type_aux[1] ?? 'png';
                $image_base64 = base64_decode($image_parts[1]);
                
                $fileName = 'logo_' . $user->id . '_' . time() . '.' . $image_type;
                \Illuminate\Support\Facades\Storage::disk('public')->put('logos/' . $fileName, $image_base64);
                
                $data['logo_url'] = '/storage/logos/' . $fileName;
            }
        }

        $settings = $user->studioSetting()->updateOrCreate(
            ['user_id' => $user->id],
            $data
        );

        return response()->json(['message' => 'Settings saved successfully', 'settings' => $settings]);
    }

    public function getSetupStatus()
    {
        $user = Auth::user() ?? \App\Models\User::firstOrCreate(
            ['email' => 'test@example.com'],
            ['name' => 'Test User', 'password' => bcrypt('password')]
        );

        $status = \App\Models\User::select('users.name', 'studio_settings.vendor_name')
            ->leftJoin('studio_settings', 'users.id', '=', 'studio_settings.user_id')
            ->withExists(['services', 'teamMembers'])
            ->where('users.id', $user->id)
            ->first();

        $isNameSet = !empty($status->vendor_name);
        $hasServices = (bool) $status->services_exists;
        $hasTeamMembers = (bool) $status->team_members_exists;
        $hasProfileName = !empty($status->name) && $status->name !== 'Test User';

        return response()->json([
            'step1_completed' => $hasProfileName,
            'step2_completed' => $isNameSet,
            'step3_completed' => $hasServices,
            'step4_completed' => $hasTeamMembers,
            'step5_completed' => $isNameSet,
        ]);
    }

    public function getPublicSettings($alias)
    {
        // Try finding by custom_url first, then by vendor_name
        $settings = StudioSetting::where('custom_url', $alias)
            ->orWhere('vendor_name', $alias)
            ->first();

        if (!$settings) {
            return response()->json(['error' => 'Vendor not found'], 404);
        }

        return response()->json([
            'vendor_name' => $settings->vendor_name,
            'custom_url' => $settings->custom_url,
            'form_booking_settings' => $settings->form_booking_settings,
            'logo_url' => $settings->logo_url,
        ]);
    }

    public function getPublicServices($alias)
    {
        $settings = StudioSetting::where('custom_url', $alias)
            ->orWhere('vendor_name', $alias)
            ->first();

        if (!$settings) {
            return response()->json(['error' => 'Vendor not found'], 404);
        }

        $services = \App\Models\Service::where('user_id', $settings->user_id)
            ->where('is_active', true)
            ->where('tampilkan_publik', true)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($services);
    }
}
