const nodemailer = require('nodemailer');
const { MailtrapClient } = require('mailtrap');
const pug = require('pug');
const htmlToText = require('html-to-text');

// for testing check in https://mailtrap.io/inboxes

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `support@${process.env.EMAIL_HOST}`;
  }

  createTransport() {
    if (process.env.NODE_ENV.trim() === 'production') {
      // To be implemented production mail sender
      return nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
      });
      // Above transport is for development environment replace with production host and port
    }
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async send(template, subject) {
    const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
      firstName: this.firstName,
      url: this.url,
      subject,
    });
    // Send the actual email
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.convert(html),
    };

    await this.createTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send('welcome', 'Welcome to the Natours Family!');
  }

  async sendPasswordReset() {
    await this.send(
      'password_reset',
      'Your password reset token (valid for only 10 minutes)',
    );
  }

  async sendWelcomeActual() {
    const TOKEN = process.env.EMAIL_MAILTRAP_TOKEN;
    const ENDPOINT = process.env.EMAIL_MAILTRAP_ENDPOINT;

    const client = new MailtrapClient({ endpoint: ENDPOINT, token: TOKEN });

    const sender = {
      email: 'mailtrap@demomailtrap.com',
      name: 'Mailtrap Test',
    };
    const recipients = [
      {
        email: process.env.EMAIL_MAILTRAP_ADMIN,
      },
    ];

    client
      .send({
        from: sender,
        to: recipients,
        template_uuid: process.env.MAILTRAP_TEMPLATE_ID,
        template_variables: {
          user_name: this.firstName,
          next_step_link: this.url,
          get_started_link: 'Test_Get_started_link',
          onboarding_video_link: 'Test_Onboarding_video_link',
        },
      })
      .then(console.log, console.error);
  }

  async sendPasswordResetActual() {
    const TOKEN = process.env.EMAIL_MAILTRAP_TOKEN;
    const ENDPOINT = process.env.EMAIL_MAILTRAP_ENDPOINT;

    const client = new MailtrapClient({ endpoint: ENDPOINT, token: TOKEN });

    const sender = {
      email: 'mailtrap@demomailtrap.com',
      name: 'Mailtrap Test',
    };
    const recipients = [
      {
        email: process.env.EMAIL_MAILTRAP_ADMIN,
      },
    ];

    client
      .send({
        from: sender,
        to: recipients,
        template_uuid: 'a062167c-0c73-417e-9cc1-1b9c76ec52df',
        template_variables: {
          user_email: this.to,
          pass_reset_link: this.url,
        },
      })
      .then(console.log, console.error);
  }
};
// const sendEmail = async (options) => {
//   // create a transporter
//   const transporter = nodemailer.createTransport({
//     host: process.env.EMAIL_HOST,
//     port: process.env.EMAIL_PORT,
//     auth: {
//       user: process.env.EMAIL_USERNAME,
//       pass: process.env.EMAIL_PASSWORD,
//     },
//   });
//   const mailOptions = {
//     from: 'support@natours.com',
//     to: options.email,
//     subject: options.subject,
//     text: options.message,
//   };

//   await transporter.sendMail(mailOptions);
// };

// module.exports = sendEmail;
