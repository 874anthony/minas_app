import nodemailer from 'nodemailer';
import { MailOptions } from 'nodemailer/lib/ses-transport';

// TODO: Build a complex mail handler

export interface EmailInterface {
	email: string;
	subject: string;
	message: string;
	html?: any;
}

export default async (emailOptions: EmailInterface) => {
	// 1) Create a transporter
	const transporter = nodemailer.createTransport({
		host: process.env.EMAIL_HOST,
		port: parseInt(process.env.EMAIL_PORT!),
		auth: {
			user: process.env.EMAIL_USERNAME,
			pass: process.env.EMAIL_PASSWORD,
		},
	});
	// 2) Define the email options
	const mailOptions: MailOptions = {
		from: `Control de Acceso - Gecelca <${process.env.EMAIL_FROM}>`,
		to: emailOptions.email,
		subject: emailOptions.subject,
		text: emailOptions.message,
	};

	// 3) Sending the email
	await transporter.sendMail(mailOptions);
};
