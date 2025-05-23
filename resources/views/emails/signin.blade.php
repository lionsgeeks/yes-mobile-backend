<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Sign In Email</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }

        .email-container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        h1 {
            color: #333333;
            font-size: 22px;
        }

        p {
            color: #555555;
            font-size: 16px;
            line-height: 1.6;
        }

        .bold {
            font-weight: 700;
            color: #295da6;
        }

        .small {
            font-size: 13px;
            color: #999999;
        }

        .big {
            font-size: 18px;
            color: #222222;
        }

        .footer {
            margin-top: 30px;
            text-align: center;
            font-size: 13px;
            color: #aaaaaa;
        }
    </style>
</head>

<body>
    <div class="email-container">
        <h1>Account Created Successfully.</h1>
        <p>Hello <span class="bold">{{ $participant->name }}</span>,</p>
        <p class="big">Here's the password for your account.</p>
        <p>Your password is: <span class="bold">{{ $password }}</span></p>
        <p class="small">For your security, consider updating your password after logging in.</p>
        <div class="footer">
            &copy; {{ date('Y') }} Y.E.S Africa. All rights reserved.
        </div>
    </div>
</body>

</html>
