const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com', // Correct SMTP server address
  port: 587, // For SSL
  secure: false, // Use SSL
  auth: {
    user: process.env.EMAIL_USER || 'ion.oleinic21@gmail.com', // Replace with your email address
    pass: process.env.EMAIL_PASSWORD || 'eigt kcif xxia jyoc', // Replace with your email password or app password
  },
})

async function sendEmail(recipient, subject, text, html) {
  try {
    // Set up email data
    let mailOptions = {
      from: process.env.EMAIL_USER || 'ion.oleinic21@gmail.com', // Sender address
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

async function sendReportEmail(recipient, subject, text, html, buffer) {
  try {
    const now = new Date()
    const formattedDate =
      now.getFullYear() +
      ('0' + (now.getMonth() + 1)).slice(-2) +
      ('0' + now.getDate()).slice(-2) +
      '_' +
      ('0' + now.getHours()).slice(-2) +
      ('0' + now.getMinutes()).slice(-2) +
      ('0' + now.getSeconds()).slice(-2)
    // Set up email data
    let mailOptions = {
      from: process.env.EMAIL_USER || 'ion.oleinic21@gmail.com', // Sender address
      to: recipient, // List of recipients
      subject: subject, // Subject line
      text: text, // Plaintext body
      html: html || text, // HTML body (optional, fallback to plaintext)
      attachments: [
        {
          filename: `raport_adeverinte_${formattedDate}.xlsx`,
          content: buffer,
          contentType:
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        },
      ],
    }

    // Send the email
    let info = await transporter.sendMail(mailOptions)
    console.log('Certificate report message sent: %s', info.messageId)
  } catch (error) {
    console.error('Error sending certificate report email: %s', error.message)
  }
}

// Export the sendEmail function for use in other modules
module.exports = {
  sendEmail,
  sendReportEmail,
}
