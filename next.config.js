/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    DB_URL:
      // "mongodb+srv://polok:d2zBoAn2O2VAFgvD@cluster0.qjrhokc.mongodb.net/ecom?retryWrites=true&w=majority",
      "mongodb+srv://test:rabilcandy@cluster0.wk291zy.mongodb.net/ecom?retryWrites=true&w=majority",
    SENDER_PASSWORD: "wuip jfxb bmgh twcv",
    SENDER_EMAIL: "cyn.webservices@gmail.com",
    RECEIVER_EMAIL: "cyn.webservices@gmail.com",
    SMTP_HOST: "smtp.gmail.com", // "smtp.ethereal.email", //
  },
};

module.exports = nextConfig;
