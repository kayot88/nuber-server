import Mailgun from "mailgun-js";

const mailGunClient = new Mailgun({
  apiKey: process.env.MAILGUN_PRIVAT_API_KEY || "",
  domain: process.env.MAILGUN_DOMEN || ""
});

const SendEmail = (subject: string, html: string) => {
  const emailData = {
    from: "kayot88@gmail.com",
    to: "kayot88@gmail.com",
    subject,
    html
  };
  return mailGunClient.messages().send(emailData);
};

export const sendVerificationEmail = (fullName: string, key:string) => {
  const emailSubject = `Hello ${fullName}. please verify your email`
  const htmlBody = `
  Verify your email by clicking <a href="http://nuber.com/verification/${key}">here</a>
  `
  return SendEmail(emailSubject, htmlBody)
}  
