import { getFooter } from ".";

export const getKycReceivedUserTemplate = (name: string) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>KYC Received - The Cryptosentry Safe</title>
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
              font-size: 26px;
              font-weight: 700;
          }
          .logo {
              font-size: 28px;
              margin-bottom: 10px;
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
      </style>
  </head>
  <body>
      <div class="container">
          <!-- Header -->
          <div class="header">
              <div class="logo">🛂</div>
              <h1>KYC Submission Received</h1>
          </div>

          <!-- Content -->
          <div class="content">
              <p class="greeting">Hi ${name},</p>

              <p class="message">
                  We’ve successfully received your KYC documents. Thank you for completing this important step to help keep the platform secure.
              </p>

              <div class="info-box">
                  <strong>⏳ Verification in progress</strong><br>
                  Our compliance team is currently reviewing your submission. This process usually takes 24-48 hours.
              </div>

              <p class="message">
                  What happens next:
              </p>

              <ul>
                  <li>Your documents will be securely reviewed</li>
                  <li>You’ll be notified once verification is complete</li>
                  <li>No further action is required from you at this time</li>
              </ul>

              <div class="divider"></div>

              <p class="message" style="font-size: 13px;">
                  If we need additional information, we’ll contact you via email.
                  If you did not submit these documents, please contact our support team immediately.
              </p>

              <p class="message">
                  Thank you for choosing<br>
                  <strong>The Cryptosentry Safe</strong>
              </p>
          </div>

          <!-- Footer -->
          ${getFooter()}
      </div>
  </body>
  </html>
  `;
};