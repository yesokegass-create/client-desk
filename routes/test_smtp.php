<?php
$host = 'smtp-relay.brevo.com';
$port = 587;
$timeout = 10;

echo "Connecting to $host:$port...\n";
$fp = @fsockopen($host, $port, $errno, $errstr, $timeout);

if (!$fp) {
    echo "ERROR: $errno - $errstr\n";
} else {
    echo "Connected successfully!\n";
    echo "Reading banner...\n";
    stream_set_timeout($fp, 5);
    $res = fread($fp, 1024);
    echo "Banner: $res\n";
    fclose($fp);
}
