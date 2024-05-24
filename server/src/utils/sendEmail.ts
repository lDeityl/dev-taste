import * as nodemailer from 'nodemailer';
// async..await is not allowed in global scope, must use a wrapper
export const sendEmail = async (
  email: string,
  text: string,
  subject: string,
) => {
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: process.env.SMPT_HOST,
    port: process.env.SMPT_PORT,
    secure: process.env.SMPT_SECURE,
    auth: {
      user: process.env.SMPT_EMAIL, // generated ethereal user
      pass: process.env.SMPT_PASS, // generated ethereal password
    },
  });

  // send mail with defined transport object
  return await transporter
    .sendMail({
      from: process.env.SMPT_EMAIL, // sender address
      to: email, // list of receivers
      subject: subject, // Subject line
      text: 'Нажмите для восстановления пароля', // plain text body
      html: `${text}`, // html body
    })
    .then((res) => {
      console.log('Message sent: %s', res);
      return true;
    })
    .catch((err) => console.log(err));
};
