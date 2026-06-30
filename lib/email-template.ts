export const generateEmailTemplate = (name: string, email: string, message: string) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New Contact Form Message</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; line-height: 1.6; background-color: #f4f4f4;">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <tr>
          <td style="background-color: #ffffff; padding: 40px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td>
                  <h1 style="color: #333333; font-size: 24px; margin: 0 0 20px 0; text-align: center; border-bottom: 2px solid #7c3aed; padding-bottom: 10px;">
                    New Contact Form Message
                  </h1>
                </td>
              </tr>
              <tr>
                <td style="padding: 20px 0;">
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="padding: 10px 0;">
                        <strong style="color: #7c3aed;">From:</strong>
                        <p style="margin: 5px 0; color: #333333;">${name}</p>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 10px 0;">
                        <strong style="color: #7c3aed;">Email:</strong>
                        <p style="margin: 5px 0; color: #333333;">${email}</p>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 10px 0;">
                        <strong style="color: #7c3aed;">Message:</strong>
                        <p style="margin: 5px 0; color: #333333; white-space: pre-wrap;">${message}</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td style="padding-top: 30px; text-align: center; color: #666666; font-size: 14px; border-top: 1px solid #eeeeee;">
                  <p style="margin: 0;">This message was sent from your portfolio website's contact form.</p>
                  <p style="margin: 10px 0 0 0;">© ${new Date().getFullYear()} Sai Kumar. All rights reserved.</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}; 