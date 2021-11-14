"use strict";
// import { Schema, model } from 'mongoose';
// import validator from 'validator';
// // Definying the schema
// const CompanyDetailsSchema = new Schema({
// 	businessName: {
// 		type: String,
// 		required: true,
// 		trim: true,
// 		minlength: 3,
// 	},
// 	nit: {
// 		type: Number,
// 		unique: true,
// 		required: true,
// 		min: 7,
// 	},
// 	email: {
// 		type: String,
// 		validate: {
// 			validator: (value: string) => validator.isEmail(value),
// 			message: 'El email ingresado no es válidad',
// 		},
// 		lowercase: true,
// 		required: true,
// 		unique: true,
// 	},
// 	address: {
// 		type: String,
// 		required: true,
// 	},
// 	phone: {
// 		type: Number,
// 		required: true,
// 		unique: true,
// 	},
// 	legalRepresentative: {
// 		type: String,
// 		required: true,
// 		minlength: 8,
// 		trim: true,
// 	},
// 	docComCam: {
// 		required: true,
// 		type: String,
// 	},
// 	docRUT: {
// 		type: String,
// 		required: true,
// 	},
// 	docLegalRepresentativeID: {
// 		type: String,
// 		required: true,
// 	},
// 	radicado: {
// 		type: String,
// 		unique: true,
// 	},
// 	pending: {
// 		type: Boolean,
// 		default: true,
// 	},
// 	createdAt: {
// 		type: Date,
// 		default: Date.now(),
// 	},
// 	updatedAt: {
// 		type: Date,
// 	},
// });
// // UserSchema.methods.toJSON = function() {
// // var obj = this.toObject()
// // delete obj.passwordHash
// // return obj
// // }
// export default model('company_details', CompanyDetailsSchema);
