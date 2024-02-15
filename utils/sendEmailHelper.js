const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = (url, email) => {
  // const msg = {
  //   to: email,
  //   from: 'adiczq@gmail.com',
  //   subject: 'Email verification',
  //   text: `Verify your email by clicking on the link - ${url}`,
  // };
  const msg = {
    to: email,
    from: 'adiczq@gmail.com',
    dynamicTemplateData: {
      url: url,
    },
    templateId: 'd-e4c7c066815c437388885b7c964d5cfc',
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent');
    })
    .catch(error => {
      console.error(error);
    });
};

module.exports = {
  sendEmail,
};
