import { Schema, model } from 'mongoose';
import validator from 'validator';
import CryptoJS from 'crypto-js';

// JUST IN CASE
interface UserSchemaInterface extends Schema {
	name: string;
	surname: string;
	role: any;
	email: string;
	password: string | undefined;
	passwordConfirm: string;
	status: boolean;
	createdAt: any;
	updatedAt: any;
	decryptPassword: (hashedPassword: string) => string;
}

export enum UserRoles {
	AccessControl = 'Control de Acceso',
	RSE = 'Responsabilidad Social Empresarial',
	SSFF = 'Seguridad Física',
	SISO = 'Seguridad y Salud en el Trabajo',
	Auditing = 'Interventoría',
	SMIN = 'Gerencia Servicios Mineros',
	Admin = 'Administrador',
}

const UserSchema: Schema<UserSchemaInterface> = new Schema({
	name: {
		type: String,
		required: true,
		minlength: 1,
	},
	surname: {
		type: String,
		minlength: 1,
	},
	role: {
		type: String,
		required: true,
		enum: {
			values: Object.values(UserRoles),
			message:
				'El rol debe ser alguno de los predeterminados por Servicios Mineros',
		},
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
	password: {
		type: String,
		select: false,
	},
	passwordConfirm: {
		type: String,
		required: [true, 'Por favor, confirma tu contraseña'],
		// ONLY WORKS ON .create() and .save();
		validate: {
			validator: function (this: UserSchemaInterface, value) {
				return value === this.password;
			},
			message: 'Las contraseñas no coinciden',
		},
	},
	status: {
		type: Boolean,
		default: true,
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
	updatedAt: {
		type: Date,
	},
});

// ============================================= DOCUMENT MIDDLEWARE STARTS HERE==============================================
// To hash the password everytime it changes
UserSchema.pre('save', async function (next) {
	// Only run this function if password was actually modified
	if (!this.isModified('password')) return next();

	// Hash the password with cost of 12
	this.password = await CryptoJS.AES.encrypt(
		this.password,
		process.env.PASSWORD_PHARAPRHASE!
	).toString();

	// Delete passwordConfirm field
	this.passwordConfirm = undefined;
	next();
});

// ================================================== STATICS METHODS STARTS HERE ==========================================
/**
 *
 * @param hashedPassword
 * @returns Decrypt hashed password
 */
UserSchema.methods.decryptPassword = async function (hashedPassword) {
	const passwordDecrypted = await CryptoJS.AES.decrypt(
		hashedPassword,
		process.env.PASSWORD_PHARAPRHASE!
	).toString(CryptoJS.enc.Utf8);

	return passwordDecrypted;
};

export default model<UserSchemaInterface>('user', UserSchema);
