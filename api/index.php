<?php
require __DIR__ . '/../vendor/autoload.php';

$storage = '/tmp/storage';
if (!is_dir($storage)) {
    mkdir($storage, 0777, true);
    mkdir($storage . '/framework/cache/data', 0777, true);
    mkdir($storage . '/framework/views', 0777, true);
    mkdir($storage . '/framework/sessions', 0777, true);
    mkdir($storage . '/logs', 0777, true);
}

$app = require_once __DIR__.'/../bootstrap/app.php';
$app->useStoragePath($storage);
$app->handleRequest(Illuminate\Http\Request::capture());
