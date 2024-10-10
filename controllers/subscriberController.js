import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url'; 
import nodemailer from 'nodemailer';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const subscribeUser = async (req, res) => {
  const { email } = req.body;

  try {
    
    const templatePath = path.join(__dirname, '../templates/subscribeTemplate.html');
    const emailTemplate = fs.readFileSync(templatePath, 'utf-8');

    
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank you for subscribing!',
      html: emailTemplate, 
    };

    
    await transporter.sendMail(mailOptions);

    
    res.status(200).json({ message: 'Subscription successful, email sent!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email.' });
  }
};
