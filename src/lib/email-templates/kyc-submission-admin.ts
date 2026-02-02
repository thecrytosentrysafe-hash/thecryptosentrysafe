import { getFooter } from ".";

export const getKycSubmissionAdminTemplate = (
    front_id: string,
    back_id: string,
    proof_of_residence: string,
    userName: string,
    userEmail: string
) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New KYC Submission - The Cryptosentry Safe</title>
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
                font-size: 32px;
                margin-bottom: 12px;
            }
            .content {
                padding: 32px 24px;
            }
            .section-title {
                font-size: 18px;
                font-weight: 600;
                color: #06B6D4;
                margin-top: 24px;
                margin-bottom: 12px;
                border-bottom: 1px solid #444444;
                padding-bottom: 8px;
            }
            .data-row {
                display: flex;
                margin-bottom: 12px;
                border-bottom: 1px solid #404040;
                padding-bottom: 8px;
            }
            .data-label {
                font-weight: 600;
                width: 160px;
                color: #a1a1aa;
                flex-shrink: 0;
            }
            .data-value {
                color: #fafafa;
                flex-grow: 1;
                word-break: break-all;
            }
            .verification-image {
                margin-top: 24px;
                border-radius: 8px;
                border: 1px solid #444444;
                max-width: 100%;
                height: auto;
            }
            .cta-button {
                display: inline-block;
                background-color: #06B6D4;
                color: #1a1a1a;
                padding: 12px 32px;
                border-radius: 6px;
                text-decoration: none;
                font-weight: 600;
                margin: 24px 0;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="logo">🆔</div>
                <h1>New KYC Submission</h1>
            </div>

            <div class="content">
                <p>A new KYC document has been submitted for review.</p>

                <div class="section-title">User Information</div>
                <div class="data-row">
                    <span class="data-label">Name:</span>
                    <span class="data-value">${userName}</span>
                </div>
                <div class="data-row">
                    <span class="data-label">Email:</span>
                    <span class="data-value">${userEmail}</span>
                </div>

                <div class="section-title">Documents</div>

                <div class="data-row">
                    <span class="data-label">Front ID:</span>
                    <span class="data-value"><a href="${front_id}" style="color: #06B6D4;">View Document</a></span>
                </div>
                <div style="text-align: center;">
                    <img src="${front_id}" alt="Front ID" class="verification-image" />
                </div>

                <div class="data-row">
                    <span class="data-label">Back ID:</span>
                    <span class="data-value"><a href="${back_id}" style="color: #06B6D4;">View Document</a></span>
                </div>
                <div style="text-align: center;">
                    <img src="${back_id}" alt="Back ID" class="verification-image" />
                </div>

                <div class="data-row">
                    <span class="data-label">Proof of Residence:</span>
                    <span class="data-value"><a href="${proof_of_residence}" style="color: #06B6D4;">View Document</a></span>
                </div>
                <div style="text-align: center;">
                    <img src="${proof_of_residence}" alt="Proof of Residence" class="verification-image" />
                </div>

                <center>
                    <a href="${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/login" class="cta-button">Login to Review Now</a>
                </center>
            </div>

            ${getFooter()}
        </div>
    </body>
    </html>
  `;
};