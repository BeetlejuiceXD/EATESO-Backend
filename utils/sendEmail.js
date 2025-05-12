import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();

console.log('API KEY:', process.env.SENDGRID_API_KEY);
console.log('FROM EMAIL:', process.env.FROM_EMAIL);

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendVerificationEmail = async (to, code) => {
  const msg = {
    to,
    from: process.env.FROM_EMAIL,
    subject: 'Verifica tu cuenta - EATESO',
    text: `Tu código de verificación es: ${code}`,
    html: `<p>Tu código de verificación es: <strong>${code}</strong></p>`,
  };

  try {
    await sgMail.send(msg);
    console.log('Correo de verificación enviado');
  } catch (error) {
    console.error('Error al enviar correo', error);
    throw new Error('Error al enviar correo');
  }
};

export default sendVerificationEmail;