const getVerificationEmailTemplate = (otp, firstName = '') => `
<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333333;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f9f9f9;
            border-radius: 10px;
        }
        .header {
            background-color: #4CAF50;
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 10px 10px 0 0;
        }
        .content {
            padding: 20px;
            background-color: white;
            border-radius: 0 0 10px 10px;
        }
        .otp-box {
            background-color: #f5f5f5;
            padding: 15px;
            margin: 20px 0;
            text-align: center;
            font-size: 24px;
            font-weight: bold;
            letter-spacing: 5px;
            border-radius: 5px;
        }
        .footer {
            text-align: center;
            margin-top: 20px;
            font-size: 12px;
            color: #666666;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Email Verification</h1>
        </div>
        <div class="content">
            <p>Hello ${firstName ? firstName : 'there'},</p>
            <p>Welcome to RentalKE! Please use the following OTP to verify your email address:</p>
            
            <div class="otp-box">
                ${otp}
            </div>
            
            <p>This OTP will expire in 3 minutes.</p>
            <p>If you didn't request this verification, please ignore this email.</p>
        </div>
        <div class="footer">
            <p>This is an automated message, please do not reply.</p>
            <p>&copy; ${new Date().getFullYear()} RentalKE. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`;

module.exports = getVerificationEmailTemplate;
