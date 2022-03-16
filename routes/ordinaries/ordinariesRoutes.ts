import express from 'express';
import {
	activeOrdsByContractor,
	inactiveOrdsByContractor,
} from '../../controllers/contractor/contractorController';

import * as ordinaryFactory from '../../controllers/ordinaryFactory';
import nodemailer from 'nodemailer';
import ejs from 'ejs';
import { htmlToText } from 'html-to-text';

const router = express.Router({ mergeParams: true });

// Aliases routes
router
	.route('/ordinaries-by-company')
	.get(ordinaryFactory.checkCompanyID, ordinaryFactory.getAllOrds);
router
	.route('/ordinaries-by-contractor/:idContractor')
	.get(ordinaryFactory.checkContractorID, ordinaryFactory.getAllOrds);

router.route('/inactivate-all').put(ordinaryFactory.inactiveOrdsByCompany);
router.route('/activate-all').put(ordinaryFactory.activeOrdsByCompany);

router.route('/inactivate-all-contractors').put(inactiveOrdsByContractor);
router.route('/activate-all-contractors').put(activeOrdsByContractor);

router.route('/generate-report-persons').get(ordinaryFactory.exportExcelPerson);
router
	.route('/generate-report-vehicles')
	.get(ordinaryFactory.exportExcelVehicle);

router.route('/').get(ordinaryFactory.getAllOrds);

router.route('/:id').get(ordinaryFactory.getOrdById);

router.post('/auth-extension', async (req, res) => {
	const { cc, name, businessName, date } = req.body;
	const {
		EMAIL_HOST,
		EMAIL_PORT,
		EMAIL_USERNAME,
		EMAIL_PASSWORD
	} = process.env;
	const transporter = nodemailer.createTransport({
		host: EMAIL_HOST,
		port: parseInt(EMAIL_PORT!),
		auth: {
			user: EMAIL_USERNAME,
			pass: EMAIL_PASSWORD,
		},
	});
	const parsedt = new Date(date).toLocaleString('es-CO', {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
	const capDate = parsedt.charAt(0).toUpperCase() + parsedt.slice(1);
	const html = await ejs.renderFile(
		`${__dirname}/../../views/email/auth-extension.ejs`,
		{ cc, name, businessName, date: capDate }
	);
	const info = await transporter.sendMail({
		from: EMAIL_USERNAME,
    to: 'lopezarizagianlucas@gmail.com',
    subject: `${businessName} - SOLICITUD DE EXTENSIÓN DE AUTORIZACIÓN `,
		html,
    text: htmlToText(html),
		attachments: [
			{
				filename: 'image-2.png',
				path: `${__dirname}/../../views/images/image-2.jfif`,
				cid: 'unique@gecelca-logo',
			},
		],
  });
	if (info?.accepted) {
		return res.status(200).json({ message: 'Email enviado correctamente.' });
	}
	res.status(500).json({ message: 'Ha ocurrido un error.' });
});

export default router;
