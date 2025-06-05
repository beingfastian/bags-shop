import { Request, Response } from 'express';
import { sendMail } from '../utils/mail.js';
import { config } from '../config/index.js';

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { email, subject, message } = req.body;
    await sendMail({
      to: config.mail.SMTP_USER,
      subject: `mail from ${email} : ${subject}`,
      text: message,
    });

    res.json({
      message: 'send succesfully',
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
