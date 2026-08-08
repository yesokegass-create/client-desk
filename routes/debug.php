<?php

use Illuminate\Support\Facades\Route;

Route::get('/debug-db', function () {
    try {
        \Illuminate\Support\Facades\DB::connection()->getPdo();
        return ['status' => 'success', 'db' => \Illuminate\Support\Facades\DB::connection()->getDatabaseName()];
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
