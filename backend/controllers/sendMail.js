import { google } from "googleapis";
import nodemailer from "nodemailer";
const { OAuth2 } = google.auth;
const OAUTH_PLAYGROUND = "https://developers.google.com/oauthplayground";

const MAILING_SERVICE_CLIENT_ID =
  "641235059011-l61f2ck1sooj751ec759lpfl2tc6t2kg.apps.googleusercontent.com";

const MAILING_SERVICE_CLIENT_SECRET = "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";

const MAILING_SERVICE_REFRESH_TOKEN =
  "1//04PfDGi_9HNqLCgYIARAAGAQSNwF-L9Irz9LyEAGxBdQDIHHDxk5evycxcQGIMoAjnTS1Di0PUrOksvKfpq1QnmMj-Zrq5d-O9OA";

const oauth2Client = new OAuth2(
  MAILING_SERVICE_CLIENT_ID,
  MAILING_SERVICE_CLIENT_SECRET,
  MAILING_SERVICE_REFRESH_TOKEN,
  OAUTH_PLAYGROUND
);

// send mail
const sendEmail = (to, url, txt) => {
  oauth2Client.setCredentials({
    refresh_token: MAILING_SERVICE_REFRESH_TOKEN,
  });

  const accessToken = oauth2Client.getAccessToken();
  const smtpTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.SENDER_EMAIL_ADDRESS,
      clientId: MAILING_SERVICE_CLIENT_ID,
      clientSecret: MAILING_SERVICE_CLIENT_SECRET,
      refreshToken: MAILING_SERVICE_REFRESH_TOKEN,
      accessToken,
    },
  });

  const mailOptions = {
    from: process.env.SENDER_EMAIL_ADDRESS,
    to: to,
    subject: "Authentication",
    html: `
            <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
            <h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome to the Authentication System.</h2>
            <p>Congratulations! You're almost set to start using your new account.
                Just click the button below to validate your email address.
            </p>
            
            <a href=${url} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">${txt}</a>
        
            <p>If the button doesn't work for any reason, you can also click on the link below:</p>
        
            <div>${url}</div>
            </div>
        `,
  };

  smtpTransport.sendMail(mailOptions, (err, infor) => {
    if (err) return err;
    return infor;
  });
};

export default sendEmail;
