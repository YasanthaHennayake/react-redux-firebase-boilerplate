//Imported dependencies
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

//CONFIGURATIONS
//Base configurations
const baseConfig = {
  frontEndURL: 'https://react-redux-firebase-bp-2019.web.app'
}

//Email credentials
const emailCredentials = {
  password: 'fV[h[NmR)qYG',
  username: 'noreply@yasantha.live',
  outgoingServer: 'yasantha.live',
  SMTPPort: 465
}

//Intialize firebase admin
admin.initializeApp(functions.config().firebase);
var db = admin.firestore();

//FUNCTIONS
//Sending email with nodemailer
const sendEmail = (emailContent) => {
  const { outgoingServer, SMTPPort, username, password } = emailCredentials;

  let transporter = nodemailer.createTransport({
    host: outgoingServer,
    port: SMTPPort,
    secure: true,
    auth: {
      user: username,
      pass: password
    }
  });

  let mailOptions = {
    from: `"React-Redux-Firebase-Boilerplate" ${username}`,
    to: emailContent.to,
    subject: emailContent.subject,
    html: emailContent.html
  }

  return transporter.sendMail(mailOptions)
    .then(() => console.log('Email sent successfully'))
    .catch((err) => console.log('Error in sending email ', err));

}
//END OF FUNCTIONS

//FIREBASE FUNCTIONS
//Send sign-up email to when new system user is added
exports.inviteCreated = functions.firestore.document('invites/{inviteID}').onCreate((doc, context) => {
  console.log('inviteCreated cloud function triggered!');
  const { firstName, email } = doc.data();
  const inviteID = context.params.inviteID;
  const { frontEndURL } = baseConfig;
  const signUpURL = `${frontEndURL}/invitation/${inviteID}`;

  const html = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /><title>React-Redux-Firebase-Boilerplate Onboard System User</title> <style type="text/css">@import url(http://fonts.googleapis.com/css?family=Droid+Sans);img{max-width:600px;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic}a{text-decoration:none;border:0;outline:none;color:#bbb}a img{border:none}td,h1,h2,h3{font-family:Helvetica,Arial,sans-serif;font-weight:400}td{text-align:center}body{-webkit-font-smoothing:antialiased;-webkit-text-size-adjust:none;width:100%;height:100%;color:#37302d;background:#fff;font-size:16px}table{border-collapse:collapse !important}.headline{color:#fff;font-size:36px}.force-full-width{width:100% !important}.force-width-80{width:80% !important}</style><style type="text/css" media="screen">@media screen{td,h1,h2,h3{font-family:'Droid Sans','Helvetica Neue','Arial','sans-serif' !important}}</style><style type="text/css" media="only screen and (max-width: 480px)">@media only screen and (max-width: 480px){table[class="w320"]{width:320px !important}td[class="mobile-block"]{width:100% !important;display:block !important}}</style></head><body class="body" style="padding:0; margin:0; display:block; background:#b3b2b2; -webkit-text-size-adjust:none" bgcolor="#ffffff"><table align="center" cellpadding="0" cellspacing="0" class="force-full-width" height="100%"><tr><td align="center" valign="top" bgcolor="#ffffff" width="100%"><center><table style="margin: 0 auto;" cellpadding="0" cellspacing="0" width="600" class="w320"><tr><td align="center" valign="top"><table style="margin: 0 auto;" cellpadding="0" cellspacing="0" class="force-full-width" style="margin:0 auto;"><tr><td style="font-size: 30px; text-align:center;"> <br> Hi ${firstName}, <br> <br></td></tr></table><table style="margin: 0 auto;" cellpadding="0" cellspacing="0" class="force-full-width" bgcolor="#4dbfbf"><tr><td> <br> <img src="https://www.filepicker.io/api/file/carctJpuT0exMaN8WUYQ" width="224" height="240" alt="robot picture"></td></tr><tr><td class="headline"> Good News!</td></tr><tr><td><center><table style="margin: 0 auto;" cellpadding="0" cellspacing="0" width="60%"><tr><td style="color:#187272;"> <br> You have been invited to contribute to React-Redux-Firebase-Boilerplate  portal as an administrator. To sign in please click below button. <br> <br></td></tr></table></center></td></tr><tr><td><div> <!--[if mso]> <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="http://" style="height:50px;v-text-anchor:middle;width:200px;" arcsize="8%" stroke="f" fillcolor="#178f8f"> <w:anchorlock/><center> <![endif]--> <a href="${signUpURL}" style="background-color:#178f8f;border-radius:4px;color:#ffffff;display:inline-block;font-family:Helvetica, Arial, sans-serif;font-size:16px;font-weight:bold;line-height:50px;text-align:center;text-decoration:none;width:200px;-webkit-text-size-adjust:none;">Sign In</a> <!--[if mso]></center> </v:roundrect> <![endif]--></div> <br> <br></td></tr></table><table style="margin: 0 auto;" cellpadding="0" cellspacing="0" class="force-full-width" bgcolor="#414141" style="margin: 0 auto"><tr><td style="color:#bbbbbb; font-size:12px;"> <br> <br> © React-Redux-Firebase-Boilerplate by Yasantha Hennayake 2019. All Rights Reserved. <br> <br></td></tr></table> <br> <br></td></tr></table></center></td></tr></table></body></html>`;

  const emailContent = {
    to: email,
    subject: `Hi ${firstName}. You have recieved an invitation from React-Redux-Firebase-Boierplate`,
    html: html
  }
  return sendEmail(emailContent);
})


exports.userDeleted = functions.firestore.document('users/{UID}').onDelete((doc, context) => {
  admin.auth().deleteUser(context.params.UID)
  .then(function() {
    console.log('Successfully deleted user');
  })
  .catch(function(error) {
    console.log('Error deleting user:', error);
  });
  return null;
});

//END OF FUNCTIONS