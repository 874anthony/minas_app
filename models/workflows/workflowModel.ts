import { Schema, model } from 'mongoose';
import {
	ModelsOrdinary,
	StatusOrdinary,
} from '../../interfaces/ordinaries/ordinariesEnum';

export enum StatusWorkflow {
	Blocked = 'BLOQUEADO',
	Sanitation = 'SUBSANACION',
	Pending = 'PENDIENTE',
	InProcess = 'EN PROCESO',
}

const WorkflowSchema: Schema = new Schema({
	radicado: {
		type: Schema.Types.ObjectId,
		required: [true, 'Especifique el documento al que va a estar asociado'],
		unique: true,
	},
	roles: {
		type: [Schema.Types.ObjectId],
		required: [
			true,
			'Especifique los usuarios que van a tener acceso a el documento',
		],
	},
	checkAccessControl: {
		type: Boolean,
	},
	checkRSE: {
		type: Boolean,
	},
	checkSSFF: {
		type: Boolean,
	},
	checkSISO: {
		type: Boolean,
	},
	checkAuditing: {
		type: Boolean,
	},
	checkSMIN: {
		type: Boolean,
	},
	correctAccessControl: {
		type: Boolean,
	},
	correctRSE: {
		type: Boolean,
	},
	correctSISO: {
		type: Boolean,
	},
	correctSMIN: {
		type: Boolean,
	},
	isFirstTime: {
		type: Boolean,
		default: true,
	},
	status: {
		type: String,
		enum: [StatusWorkflow],
		default: StatusWorkflow.Pending,
	},
	ordinaryType: {
		type: String,
		required: true,
	},
	healingTimes: {
		type: Number,
		default: 0,
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
	updatedAt: {
		type: Date,
	},
});

// Helpers;
const getModel = (ordinaryType: string) => {
	return ModelsOrdinary[ordinaryType];
};

const getArray = (Document: any, field: string): Array<string> => {
	const fieldsArray: any = [];

	Object.keys(Document).forEach((el) => {
		if (el.startsWith(field)) {
			fieldsArray.push(el);
		}
	});

	return fieldsArray;
};

//================================================== DOCUMENT MIDDLEWARES =======================================
// PRE SAVE
WorkflowSchema.pre('save', async function (next) {
	// HERE IS TO CHECK IF AT LEAST ONE CORRECT FIELD IS TRUE

	const correctArray = getArray(this['_doc'], 'correct');
	const oneTrue = correctArray.some((val) => this[val] === true);

	if (oneTrue) {
		const Model = getModel(this.ordinaryType);

		const docMatched = await Model.findById(this.radicado);

		docMatched.status = StatusOrdinary.Sanitation;
		await docMatched.save({ validateBeforeSave: false });

		this.status = StatusWorkflow.Sanitation;
		this.isFirstTime = false;
	} else {
		this.status = StatusWorkflow.Pending;
	}

	next();
});

// POST SAVE
WorkflowSchema.post('save', async function (doc, next) {
	if (!this.isModified('checkSSFF') || this.isNew) return next();

	if (this.checkSSFF === false) {
		const Model = getModel(this.ordinaryType);

		const docMatched = await Model.findById(this.radicado);

		docMatched.status = StatusOrdinary.Forbidden;
		await docMatched.save({ validateBeforeSave: false });

		await this.remove();
	}

	next();
});

WorkflowSchema.post('save', async function (doc, next) {
	// HERE IS TO CHECK IF AT LEAST ONE CORRECT FIELD IS TRUE

	const checkArray = getArray(this['_doc'], 'check');
	const allTrues = checkArray.every((value) => this[value] === true);

	if (allTrues) {
		const Model = getModel(this.ordinaryType);

		const docMatched = await Model.findById(this.radicado);

		docMatched.status = StatusOrdinary.Visa;
		await docMatched.save({ validateBeforeSave: false });

		await this.remove();
	}
	next();
});
//================================================== DOCUMENT MIDDLEWARES =======================================

export default model('workflow_events', WorkflowSchema);
