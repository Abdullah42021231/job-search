import nodemailer from 'nodemailer'

export const sendEmail = async({to , subject , html})=>{
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: "bda163587@gmail.com",
          pass: "tfgo slql dfkd kbiz"
        }
      });
    await  transporter.sendMail({
        to,
        from : "'<jop-search>'bda163587@gmail.com",
        subject,
        html
      })
}