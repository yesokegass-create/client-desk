<?php
require 'vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$alias = 'photogatta';
$settings = \App\Models\StudioSetting::where('custom_url', $alias)->orWhere('vendor_name', $alias)->first();
echo "user_id: " . ($settings ? $settings->user_id : 'null') . "\n";
$services = \App\Models\Service::where('user_id', $settings->user_id)->where('is_active', true)->where('tampilkan_publik', true)->get();
echo json_encode($services);
