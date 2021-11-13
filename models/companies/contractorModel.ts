import { Schema, model } from 'mongoose';
import validator from 'validator';

import CryptoJS from 'crypto-js';
import crypto from 'crypto';

import { StatusCompany } from './companyModel';
import { CompanyInterface } from './companyModel';

export interface ContractorInterface extends Schema, CompanyInterface {
	company: Schema.Types.ObjectId;
}

// Definying the schema
const ContractorSchema: Schema<ContractorInterface> = new Schema({
	businessName: {
		type: String,
		required: true,
		trim: true,
		minlength: 3,
	},
	nit: {
		type: Number,
		unique: true,
		required: true,
		min: 7,
	},
	email: {
		type: String,
		validate: {
			validator: (value: string) => validator.isEmail(value),
			message: 'El email ingresado no es válidad',
		},
		lowercase: true,
		required: true,
		unique: true,
	},
	address: {
		type: String,
		required: true,
	},
	phone: {
		type: Number,
		required: true,
		unique: true,
	},
	legalRepresentative: {
		type: String,
		required: true,
		minlength: 8,
		trim: true,
	},
	docComCam: {
		required: true,
		type: String,
	},
	docRUT: {
		type: String,
		required: true,
	},
	docLegalRepresentativeID: {
		type: String,
		required: true,
	},
	radicado: {
		type: String,
		unique: true,
	},
	password: {
		type: String,
	},
	status: {
		type: String,
		enum: [StatusCompany],
		default: StatusCompany.Pending,
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
	updatedAt: {
		type: Date,
	},
	finishDates: [Date],
	observations: [
		{
			type: String,
			trim: true,
			minlength: [5, 'Las observaciones deben tener al menos 5 letras'],
		},
	],
	company: {
		type: Schema.Types.ObjectId,
		ref: 'company',
		required: true,
	},
});

// UserSchema.methods.toJSON = function() {
// var obj = this.toObject()
// delete obj.passwordHash
// return obj
// }

// ================================================== STATIC METHODS STARTS HERE ==================================================
/**
 *
 * @param genPassword
 * @returns An automatic generated passwords
 */

ContractorSchema.methods.hashPassword = async function (genPassword: string) {
	return CryptoJS.AES.encrypt(
		genPassword,
		process.env.PASSWORD_PHARAPRHASE!
	).toString();
};

ContractorSchema.methods.generatePassword = async function (
	length = 10,
	wishlist = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@-#$'
) {
	return Array.from(crypto.randomFillSync(new Uint32Array(length)))
		.map((x) => wishlist[x % wishlist.length])
		.join('');
};

ContractorSchema.methods.decryptPassword = async function (hashedPassword) {
	return CryptoJS.AES.decrypt(
		hashedPassword,
		process.env.PASSWORD_PHARAPRHASE!
	).toString(CryptoJS.enc.Utf8);
};

export default model<ContractorInterface>('contractor', ContractorSchema);
