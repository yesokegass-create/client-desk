<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::put('/user', [AuthController::class, 'updateProfile'])->middleware('auth:sanctum');

Route::post('/login', [AuthController::class, 'login']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/verify-email', [AuthController::class, 'verifyEmail']);
Route::post('/check-email', [AuthController::class, 'checkEmail']);
Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
Route::post('/validate-reset-token', [AuthController::class, 'validateResetToken']);
Route::post('/reset-password', [AuthController::class, 'resetPassword']);

// Google Login URL
Route::get('/auth/google/login/url', [AuthController::class, 'getGoogleAuthUrl']);

// Combined Callback for Google Login and Google Drive
Route::get('/auth/google/callback', function (Request $request) {
    if ($request->query('state') === 'login') {
        return app(AuthController::class)->handleGoogleCallback($request);
    }
    return app(\App\Http\Controllers\GoogleDriveController::class)->handleCallback($request);
});

use App\Http\Controllers\StudioSettingController;

Route::get('/public/vendor/{alias}/settings', [StudioSettingController::class, 'getPublicSettings']);
Route::get('/public/vendor/{alias}/services', [StudioSettingController::class, 'getPublicServices']);
Route::post('/public/vendor/{alias}/bookings', [\App\Http\Controllers\BookingController::class, 'submitPublicBooking']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/settings', [StudioSettingController::class, 'getSettings']);
    Route::post('/settings', [StudioSettingController::class, 'saveSettings']);
    Route::get('/setup-status', [StudioSettingController::class, 'getSetupStatus']);

    // Google Drive
    Route::get('/auth/google/url', [\App\Http\Controllers\GoogleDriveController::class, 'getAuthUrl']);
    Route::post('/upload/qris', [\App\Http\Controllers\GoogleDriveController::class, 'uploadQris']);
    
    // Bookings
    Route::get('/bookings', [\App\Http\Controllers\BookingController::class, 'index']);
    Route::put('/bookings/{id}/status', [\App\Http\Controllers\BookingController::class, 'updateStatus']);
    Route::delete('/bookings/{id}', [\App\Http\Controllers\BookingController::class, 'destroy']);
    Route::post('/bookings/{id}/freelancers', [\App\Http\Controllers\BookingController::class, 'syncFreelancers']);
    
    // Services
    Route::get('/services', [App\Http\Controllers\ServiceController::class, 'index']);
    Route::post('/services', [App\Http\Controllers\ServiceController::class, 'store']);
    Route::put('/services/{id}', [App\Http\Controllers\ServiceController::class, 'update']);
    Route::delete('/services/{id}', [App\Http\Controllers\ServiceController::class, 'destroy']);
    Route::post('/services/{id}/duplicate', [App\Http\Controllers\ServiceController::class, 'duplicate']);

    // Team Members
    Route::get('/team-members', [App\Http\Controllers\TeamMemberController::class, 'index']);
    Route::post('/team-members', [App\Http\Controllers\TeamMemberController::class, 'store']);
    Route::put('/team-members/{id}', [App\Http\Controllers\TeamMemberController::class, 'update']);
    Route::delete('/team-members/{id}', [App\Http\Controllers\TeamMemberController::class, 'destroy']);
});
