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
            'custom_url' => 'nullable|string',
            'phone_country_code' => 'nullable|string',
            'phone_number' => 'nullable|string',
            'disable_slug' => 'boolean',
            'logo_url' => 'nullable|string',
            'address' => 'nullable|string',
            'working_hours_enabled' => 'boolean',
            'close_booking_outside_hours' => 'boolean',
            'working_days' => 'nullable|array',
            'form_booking_settings' => 'nullable|array',
        ]);

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

        $settings = $user->studioSetting;
        $isNameSet = $settings && !empty($settings->vendor_name);
        $hasServices = \App\Models\Service::where('user_id', $user->id)->exists();
        $hasTeamMembers = \App\Models\TeamMember::where('user_id', $user->id)->exists();
        $hasProfileName = !empty($user->name) && $user->name !== 'Test User';

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
