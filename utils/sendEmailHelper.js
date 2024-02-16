const { SESClient, SendEmailCommand } = require('@aws-sdk/client-ses');

const SES_CONFIG = {
  credentials: {
    accessKeyId: process.env.MY_AWS_ACCESS_KEY,
    secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY,
  },
  region: process.env.MY_AWS_SES_REGION,
};

const sesClient = new SESClient(SES_CONFIG);

const sendEmail = async (url, email, name) => {
  let params = {
    Source: process.env.MY_AWS_SES_SENDER,
    Destination: {
      ToAddresses: [email],
    },
    ReplyToAddresses: [],
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: `Hello ${name}, please verify your email addres by clicking this address ${url}`,
        },
        Text: {
          Charset: 'UTF-8',
          Data: `hello ${name}, please verify your email addres clicking this ${url}`,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: `${name}'s Email Verification`,
      },
    },
  };
  try {
    const sendEmailCommand = new SendEmailCommand(params);
    const res = await sesClient.send(sendEmailCommand);
    console.log(`Email has been sent`, res);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  sendEmail,
};
