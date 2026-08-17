<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();
try {
    \Illuminate\Support\Facades\Mail::to('notifsistem19@gmail.com')->send(new \App\Mail\ResetPasswordMailable('http://localhost/test'));
    echo "Success\n";
} catch (\Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
