const nodemailer = require('nodemailer')

async function sendEmail(recipient, subject, text, html) {
  try {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com', // Correct SMTP server address
      port: 587, // For SSL
      secure: false, // Use SSL
      auth: {
        user: process.env.EMAIL_USER || 'ion.oleinic21@gmail.com', // Replace with your email address
        pass: process.env.EMAIL_PASSWORD || 'eigt kcif xxia jyoc', // Replace with your email password or app password
      },
    })

    // Set up email data
    let mailOptions = {
      from: 'ion.oleinic21@gmail.com', // Sender address
      to: recipient, // List of recipients
      subject: subject, // Subject line
      text: text, // Plaintext body
      html: html || text, // HTML body (optional, fallback to plaintext)
    }

    // Send the email
    let info = await transporter.sendMail(mailOptions)
    console.log('Message sent: %s', info.messageId)
  } catch (error) {
    console.error('Error sending email: %s', error.message)
  }
}

// Export the sendEmail function for use in other modules
module.exports = {
  sendEmail,
}
