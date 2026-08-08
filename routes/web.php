<?php

use Illuminate\Support\Facades\Route;

Route::get('/setup-database-mig-temp', function () {
    try {
        \Illuminate\Support\Facades\Artisan::call('migrate:fresh', ['--seed' => true, '--force' => true]);
        return 'Migration successful! ' . \Illuminate\Support\Facades\Artisan::output();
    } catch (\Exception $e) {
        return 'Error: ' . $e->getMessage();
    }
});

Route::get('/{any}', function () {
    return view('welcome');
})->where('any', '.*');

require __DIR__ . '/debug.php';
