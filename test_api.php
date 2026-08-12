<?php
$data = json_encode([
    "name" => "Test",
    "email" => "test3@example.com",
    "password" => "password123",
    "cf_token" => "10000000-aaaa-bbbb-cccc-000000000001"
]);
$opts = [
    "http" => [
        "method" => "POST",
        "header" => "Content-Type: application/json\r\nAccept: application/json\r\n",
        "content" => $data,
        "ignore_errors" => true
    ]
];
$context = stream_context_create($opts);
$result = file_get_contents("https://client-desk-production-16d5.up.railway.app/api/register", false, $context);
echo $result;
