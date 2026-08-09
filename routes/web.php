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

require __DIR__ . '/debug.php';

Route::get('/test-smtp-brevo', function() {
    ob_start();
    require __DIR__ . '/test_smtp.php';
    return '<pre>' . ob_get_clean() . '</pre>';
});

Route::get('/{any}', function () {
    return view('welcome');
})->where('any', '.*');
