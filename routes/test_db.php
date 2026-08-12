<?php
use Illuminate\Support\Facades\Route;

Route::get('/test-db', function () {
    try {
        \Illuminate\Support\Facades\DB::connection()->getPdo();
        return "Connected successfully to: " . \Illuminate\Support\Facades\DB::connection()->getDatabaseName();
    } catch (\Exception $e) {
        return "Could not connect to the database.  Please check your configuration. error:" . $e->getMessage();
    }
});
