<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Your Password</title>
    <style>
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            background-color: #f9fafb;
            margin: 0;
            padding: 0;
            color: #1a1a1a;
        }
        .container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            padding: 40px;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
        }
        .header h1 {
            font-size: 24px;
            font-weight: 700;
            margin: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
        }
        .header-logo {
            font-size: 24px;
        }
        .title {
            text-align: center;
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 25px;
            color: #000;
        }
        .content {
            font-size: 15px;
            line-height: 1.6;
            color: #4a4a4a;
        }
        .content p {
            margin: 0 0 15px 0;
        }
        .btn-container {
            text-align: center;
            margin: 35px 0;
        }
        .btn {
            display: inline-block;
            background-color: #111111;
            color: #ffffff;
            text-decoration: none;
            padding: 12px 24px;
            border-radius: 6px;
            font-weight: 600;
            font-size: 15px;
            border: 1px solid #000;
        }
        .btn:hover {
            background-color: #000000;
        }
        .link-expiry {
            text-align: center;
            font-size: 13px;
            color: #888;
            margin-top: 15px;
        }
        .divider {
            height: 1px;
            background-color: #eaeaea;
            margin: 30px 0;
        }
        .warning {
            font-size: 13px;
            color: #888;
            margin-bottom: 15px;
        }
        .help {
            font-size: 14px;
            color: #4a4a4a;
            margin-bottom: 25px;
        }
        .help a {
            color: #4a4a4a;
            text-decoration: underline;
        }
        .footer {
            font-size: 14px;
            color: #4a4a4a;
            line-height: 1.5;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1><span class="header-logo">👤</span> Vender.id</h1>
        </div>
        
        <div class="title">
            🔑 Atur Password Anda
        </div>
        
        <div class="content">
            <p>Halo!</p>
            <p>Anda menerima email ini karena ada permintaan untuk mengatur password akun Vender.id Anda.</p>
        </div>
        
        <div class="btn-container">
            <a href="{{ $resetUrl }}" class="btn">🔐 Buat Password Baru</a>
            <div class="link-expiry">Link ini berlaku selama 24 jam.</div>
        </div>
        
        <div class="divider"></div>
        
        <div class="warning">
            ⚠️ Jika Anda tidak meminta reset password, abaikan email ini.
        </div>
        
        <div class="help">
            ❓ Butuh bantuan? Hubungi <a href="#">@ryanekoapps</a>
        </div>
        
        <div class="footer">
            Salam hangat,<br>
            <strong>Ryan Eko App ⚡️</strong>
        </div>
    </div>
</body>
</html>
