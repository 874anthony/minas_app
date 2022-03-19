import { Schema, model } from 'mongoose';
import validator from 'validator';
import uniqueValidator from 'mongoose-unique-validator';
import CryptoJS from 'crypto-js';
import crypto from 'crypto';
import { ModelsOrdinary } from '../../interfaces/ordinaries/ordinariesEnum';

export enum StatusCompany {
	Active = 'ACTIVO',
	Revision = 'REVISION',
	Pending = 'PENDIENTE',
	Inactive = 'INACTIVO',
	Rejected = 'RECHAZADO',
}
export interface CompanyInterface extends Schema {
	businessName: string;
	nit: string;
	email: string;
	address: string;
	phone: number;
	legalRepresentative: string;
	docComCam: string;
	docRUT: string;
	docLegalRepresentativeID: string;
	docSocialSecurity: any;
	finishDates: Array<any>;
	radicado: string;
	password: string;
	status: any;
	observations: Array<string>;
	createdAt: any;
	updatedAt: any;
	docSocialSecurityAt: any;
	generatePassword: () => Promise<string>;
	hashPassword: (genPassword: string) => Promise<string>;
	decryptPassword: (hashedPassword: string) => Promise<string>;
}

// Definying the schema
const CompanySchema: Schema<CompanyInterface> = new Schema(
	{
		businessName: {
			type: String,
			required: true,
			trim: true,
			minlength: 3,
		},
		nit: {
			type: String,
			unique: true,
			required: true,
			min: 7,
		},
		email: {
			type: String,
			validate: {
				validator: (value: string) => validator.isEmail(value),
				message: 'El email ingresado no es válido',
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
			type: String,
		},
		docRUT: {
			type: String,
		},
		docLegalRepresentativeID: {
			type: String,
		},
		radicado: {
			type: String,
			default: 'Sin radicado',
		},
		password: {
			type: String,
			select: false,
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
		docSocialSecurity: {
			type: [Map],
			of: String,
		},
		docSocialSecurityAt: Date,
		finishDates: Date,
		observations: [
			{
				type: String,
				trim: true,
				minlength: [5, 'Las observaciones deben tener al menos 5 letras'],
			},
		],
	},
	{
		toObject: { virtuals: true },
		toJSON: { virtuals: true },
	}
);

CompanySchema.plugin(uniqueValidator, {
	message: 'El {PATH} proveído ya se encuentra registrado.',
});

// ================================================== VIRTUAL PROPERTIES STARTS HERE ==================================================
// Virtual populate
// TODO: Fix VIRTUAL POPULATE
CompanySchema.virtual('contratistas', {
	ref: 'contractor',
	foreignField: 'company',
	localField: '_id',
});

// ================================================== STATIC METHODS STARTS HERE ==================================================
/**
 *
 * @param genPassword
 * @returns An automatic generated passwords
 */
CompanySchema.methods.hashPassword = async function (genPassword: string) {
	return CryptoJS.AES.encrypt(
		genPassword,
		process.env.PASSWORD_PHARAPRHASE!
	).toString();
};

CompanySchema.methods.generatePassword = async function (
	length = 10,
	wishlist = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@-#$'
) {
	return Array.from(crypto.randomFillSync(new Uint32Array(length)))
		.map((x) => wishlist[x % wishlist.length])
		.join('');
};

CompanySchema.methods.decryptPassword = async function (hashedPassword) {
	return CryptoJS.AES.decrypt(
		hashedPassword,
		process.env.PASSWORD_PHARAPRHASE!
	).toString(CryptoJS.enc.Utf8);
};

CompanySchema.pre('save', async function (next) {
	if (this.isModified('status') && this.status === 'REVISION') {
		const idCompany = this._id;

		Object.values(ModelsOrdinary).forEach(async (Model) => {
			await Model.updateMany(
				{
					$match: { $and: [{ companyID: idCompany }, { status: 'ACTIVO' }] },
				},
				{
					$set: { status: 'INACTIVO' },
				}
			);
		});
	}

	next();
});

export default model<CompanyInterface>('company', CompanySchema);
