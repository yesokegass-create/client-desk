<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Confirm Your Signup to Vender.id</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            color: #1a1a1a;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            background-color: #f9f9f9;
        }
        .container {
            max-width: 600px;
            margin: 40px auto;
            background: #ffffff;
            padding: 40px;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.05);
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
        }
        .header h1 {
            font-size: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            margin: 0;
        }
        .title {
            text-align: center;
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 20px;
        }
        .btn-wrapper {
            text-align: center;
            margin: 30px 0 10px;
        }
        .btn {
            display: inline-block;
            background-color: #1a1a1a;
            color: #ffffff;
            text-decoration: none;
            padding: 12px 24px;
            border-radius: 6px;
            font-weight: 600;
            font-size: 16px;
        }
        .validity {
            text-align: center;
            font-size: 12px;
            color: #666;
            margin-bottom: 30px;
        }
        .divider {
            border-top: 1px solid #eaeaea;
            margin: 30px 0;
        }
        .features {
            background-color: #fafafa;
            padding: 20px;
            border-radius: 6px;
            margin-bottom: 30px;
        }
        .features h3 {
            margin-top: 0;
            font-size: 16px;
        }
        .features ul {
            padding-left: 20px;
            margin-bottom: 0;
        }
        .features li {
            margin-bottom: 8px;
            color: #444;
        }
        .footer {
            font-size: 14px;
            color: #666;
        }
        .footer a {
            color: #1a1a1a;
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>⚙️ Vender.id</h1>
        </div>
        
        <div class="title">🎉 Selamat Datang di Vender.id!</div>
        
        <p>Halo {{ $name ?? '' }}!</p>
        <p>Terima kasih telah mendaftar di <strong>Vender.id</strong>. Klik tombol di bawah untuk mengaktifkan akun Anda.</p>
        
        <div class="btn-wrapper">
            <a href="{{ $url }}" class="btn">✅ Aktifkan Akun Saya</a>
        </div>
        <div class="validity">Link ini berlaku selama 24 jam.</div>
        
        <div class="divider"></div>
        
        <div class="features">
            <h3>🚀 Fitur Vender.id:</h3>
            <ul>
                <li>Manajemen booking klien fotografer</li>
                <li>Status booking real-time untuk klien</li>
                <li>Kalender & penjadwalan otomatis</li>
                <li>Laporan keuangan & invoice</li>
            </ul>
        </div>
        
        <p class="footer">
            ❓ Butuh bantuan? Hubungi <a href="#">@ryanekoapps</a>
            <br><br>
            Salam hangat,<br>
            <strong>Ryan Eko App ⚡</strong>
        </p>
    </div>
</body>
</html>
