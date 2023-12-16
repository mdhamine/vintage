/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    DB_URL:
      // "mongodb+srv://<rabil>:<rabil>@cluster0.wk291zy.mongodb.net/?retryWrites=true&w=majority",
      "mongodb+srv://<rabil>:<rabil>@cluster0.wk291zy.mongodb.net/?retryWrites=true&w=majority",
    SENDER_PASSWORD: "wuip jfxb bmgh twcv",
    SENDER_EMAIL: "cyn.webservices@gmail.com",
    RECEIVER_EMAIL: "shopcandy2002@gmail.com",
    SMTP_HOST: "smtp.gmail.com", // "smtp.ethereal.email", //
  },
};

module.exports = nextConfig;
