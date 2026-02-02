import { getFooter } from ".";

export const getWelcomeEmailTemplate = (name: string, email: string, uuid: string) => {
    return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to The Cryptosentry Safe</title>
      <style>
          body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              line-height: 1.6;
              color: #fafafa;
              background-color: #1a1a1a;
              margin: 0;
              padding: 0;
          }
          .container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #333333;
              border: 1px solid #444444;
              border-radius: 8px;
              overflow: hidden;
          }
          .header {
              background: linear-gradient(135deg, #06B6D4 0%, #0891B2 100%);
              padding: 32px 24px;
              text-align: center;
          }
          .header h1 {
              margin: 0;
              color: #ffffff;
              font-size: 28px;
              font-weight: 700;
          }
          .logo {
              font-size: 28px;
              margin-bottom: 12px;
          }
          .content {
              padding: 32px 24px;
          }
          .greeting {
              font-size: 16px;
              margin-bottom: 16px;
              color: #fafafa;
          }
          .message {
              font-size: 14px;
              line-height: 1.8;
              margin-bottom: 20px;
              color: #d4d4d8;
          }
          .info-box {
              background-color: #1E3A8A;
              border-left: 4px solid #06B6D4;
              padding: 14px 16px;
              margin: 24px 0;
              border-radius: 4px;
              font-size: 13px;
              color: #A5F3FC;
          }
          .divider {
              height: 1px;
              background-color: #444444;
              margin: 24px 0;
          }
          ul {
              color: #d4d4d8;
              font-size: 14px;
              margin: 12px 0;
              padding-left: 18px;
          }
          .highlight {
              color: #06B6D4;
              font-weight: 600;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <!-- Header -->
          <div class="header">
              <div class="logo">🚀</div>
              <h1>Welcome to The Cryptosentry Safe</h1>
          </div>

          <!-- Content -->
          <div class="content">
              <p class="greeting">Hi ${name},</p>

              <p class="message">
                  We’re excited to have you on board! Your account has been successfully created, and you’re now part of the <span class="highlight">The Cryptosentry Safe</span> ecosystem.
              </p>

              <p class="message">
                  UUID: <span class="highlight">${uuid}</span>
                  Email: <span class="highlight">${email}</span>
              </p>

              <div class="info-box">
                  <strong>🔐 Your account is ready</strong><br>
                  You can now securely manage your crypto assets, track transactions, and explore decentralized financial tools.
              </div>

              <p class="message">
                  Here’s what you can do next:
              </p>

              <ul>
                  <li>Manage and monitor your crypto assets in real time</li>
                  <li>View transaction history with full transparency</li>
                  <li>Receive important security and activity notifications</li>
                  <li>Access upcoming Web3 features and integrations</li>
              </ul>

              <div class="divider"></div>

              <p class="message" style="font-size: 13px;">
                  If you ever need help, our support team is always ready to assist you.  
                  We’re committed to keeping your assets secure and your experience seamless.
              </p>

              <p class="message">
                  Welcome aboard,<br>
                  <strong>The The Cryptosentry Safe Team</strong>
              </p>
          </div>

          <!-- Footer -->
          ${getFooter()}
      </div>
  </body>
  </html>
  `;
};