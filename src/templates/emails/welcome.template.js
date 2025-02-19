const getWelcomeEmailTemplate = (firstName = '') => `
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
            background-color: #673AB7;
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
        .features {
            margin: 20px 0;
            padding: 0;
            list-style: none;
        }
        .features li {
            margin: 10px 0;
            padding-left: 25px;
            position: relative;
        }
        .features li:before {
            content: "✓";
            color: #4CAF50;
            position: absolute;
            left: 0;
        }
        .cta-button {
            display: inline-block;
            padding: 12px 24px;
            background-color: #4CAF50;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            margin: 20px 0;
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
            <h1>Welcome to RentalKE!</h1>
        </div>
        <div class="content">
            <p>Hello ${firstName ? firstName : 'there'},</p>
            <p>Thank you for joining RentalKE! We're excited to have you on board.</p>
            
            <h3>What you can do with RentalKE:</h3>
            <ul class="features">
                <li>Search for rental properties across Kenya</li>
                <li>Book viewings with property managers</li>
                <li>Manage your favorite properties</li>
                <li>Receive updates on new listings</li>
            </ul>
            
            <center>
                <a href="https://rentalke.com/dashboard" class="cta-button">
                    Get Started
                </a>
            </center>
            
            <p>If you have any questions, our support team is always here to help!</p>
        </div>
        <div class="footer">
            <p>This is an automated message, please do not reply.</p>
            <p>&copy; ${new Date().getFullYear()} RentalKE. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`;

module.exports = getWelcomeEmailTemplate;
