import nodemailer, { TransportOptions } from "nodemailer";

interface EmailOptions {
  email: string;
  subject: string;
  message: string;
}

export default async ({ email, subject, message }: EmailOptions) => {
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  } as TransportOptions);

  const mail = {
    from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
    to: email,
    subject: subject,
    html: message,
  };

  await transport.sendMail(mail);
};
