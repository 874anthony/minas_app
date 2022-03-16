import ejs from 'ejs';
import nodemailer from 'nodemailer';
import { MailOptions } from 'nodemailer/lib/ses-transport';
import { htmlToText } from 'html-to-text';

export default class Email {
	private to: string;
	private from: string;
	private url?: string;

	constructor(user, url?: string) {
		this.to = user.email;
		this.url = url;
		this.from = `Mina Las Palmeras - Gecelca <${process.env.EMAIL_USERNAME}>`;
	}

	newTransport() {
		return nodemailer.createTransport({
			host: process.env.EMAIL_HOST,
			port: parseInt(process.env.EMAIL_PORT!),
			auth: {
				user: process.env.EMAIL_USERNAME,
				pass: process.env.EMAIL_PASSWORD,
			},
		});
	}

	async send(template, subject: string, data?: Object) {
		// 1) Render HTML based on a pug template
		const html = await ejs.renderFile(
			`${__dirname}/../views/email/${template}.ejs`,
			{ url: this.url, ...data }
		);

		// 2) Define the email options
		const mailOptions: MailOptions = {
			from: this.from,
			to: this.to,
			subject,
			html,
			text: htmlToText(html),
			// TODO: make this dynamic
			attachments: [
				{
					filename: 'image-2.png',
					path: `${__dirname}/../views/images/image-2.jfif`,
					cid: 'unique@gecelca-logo',
				},
			],
		};

		// 3) Create the transport to send the email
		await this.newTransport().sendMail(mailOptions);
	}

	async sendWelcomeCompany(companyCredentials: Object) {
		await this.send(
			'welcomeCompany',
			'¡BIENVENIDO A LA MINA LAS PALMERAS!',
			companyCredentials
		);
	}

	async sendRejectCompany(emailMessage: String) {
		await this.send(
			'rejectedCompany',
			'HA SIDO RECHAZADO PARA ACCEDER A LA MINA LAS PALMERAS',
			{ emailMessage }
		);
	}

	async sendOrdNotification(options: Object) {
		await this.send(
			'ordNotification',
			'NUEVO TIPO DE INGRESO REGISTRADO',
			options
		);
	}
}
