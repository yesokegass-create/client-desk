<?php

use Illuminate\Support\Facades\Route;

Route::get('/debug-db', function () {
    try {
        $tables = \Illuminate\Support\Facades\DB::select("SELECT table_name FROM information_schema.tables WHERE table_schema='public'");
        $usersCount = \Illuminate\Support\Facades\DB::table('users')->count();
        return ['status' => 'success', 'tables' => $tables, 'users_count' => $usersCount];
    } catch (\Exception $e) {
        return ['status' => 'error', 'message' => $e->getMessage()];
    }
});

Route::get('/debug-log', function () {
    $log = storage_path('logs/laravel.log');
    if (file_exists($log)) {
        // Return last 200 lines
        $lines = file($log);
        return implode("", array_slice($lines, -200));
    }
    return 'No log file';
});
