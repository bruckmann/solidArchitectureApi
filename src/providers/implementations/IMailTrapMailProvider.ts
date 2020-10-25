import { IMailProvider, IMessage } from "../IMailProvider";
import nodemailer from 'nodemailer'

export class MailTrapMailProvider implements IMailProvider {
  private transporter;

  constructor(){
    this.transporter = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "ca21549ac2d33b",
        pass: "550906f6accca0"
      }
    })
  }

  async sendMail(message: IMessage): Promise<void> {
    await this.transporter.sendMail({
      to: {
        name: message.to.name,
        email: message.to.email
      },
      from: {
        name: message.from.name,
        email: message.from.email
      },
      subject: message.subject,
      body: message.body
    })
  }
}