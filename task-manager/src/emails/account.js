const sgMail = require('@sendgrid/mail')

const APIKey = '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'
const myEmail = 'musta7188@hotmail.it'

sgMail.setApiKey(process.env.SENDGRID_API_KEY)



const sendWelcomeEmail = (email, name) =>{
  sgMail.send({
    to: email,
    from: myEmail,
    subject: `Welcome ${name}`,
    text: ` Thank you for sign up in our task app ${name} let me know how did you find the app`

  })

}

const sendCancelAccount = (email, name) =>{

  sgMail.send({
    to: email,
    from: myEmail,
    subject: `Sorry you are leaving us`,
    text: `Hi ${name}, we are sorry you cancelled your email, please let us know your feedback to improve our platform`
  })
}



module.exports = {
  sendWelcomeEmail,
  sendCancelAccount
}