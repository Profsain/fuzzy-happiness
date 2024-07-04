const emailMessageHtml = (name, title, email, firstText, messageText, ) => {
    const message = `
  <div style="font-family: Arial, sans-serif; color: #333;">
    <h1 style="color: #4CAF50;">${title || "Splinx Planet"}</h1>
    <h6 style="color: #666;"></h6>
    <p>Dear ${name},</p>
    <p>You requested to change your phone number.</p>
    <p>Your OTP is <span style="font-weight: bold; color: #000;">${otp}</span></p>
    <p>Use this code to verify your phone number. Thank you.</p>
    <p style="color: #666; font-size: 12px;">If you did not request this change, please contact our support team immediately.</p>
    <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
    <p style="font-size: 12px; color: #666;">Best regards,<br>Your Company Name</p>
  </div>
`;
    return message
}

export default emailMessageHtml;