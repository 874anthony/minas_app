import { Schema, model } from 'mongoose';

export enum StatusWorkflow {
	Blocked = 'BLOQUEADO',
	Sanitation = 'SUBSANACION',
	Pending = 'PENDIENTE',
	Rejected = 'RECHAZADO',
	Approved = 'APROBADO',
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
	numberTimes: {
		type: Number,
		default: 1,
	},
	status: {
		type: String,
		enum: [StatusWorkflow],
		default: StatusWorkflow.Pending,
	},
	observations: [String],
	createdAt: {
		type: Date,
		default: Date.now(),
	},
	updatedAt: {
		type: Date,
	},
});

// Document middlewares
WorkflowSchema.post('save', function (doc, next) {
	const newObject = { ...doc };
	const checkArray: any = [];

	Object.keys(newObject._doc).forEach((el) => {
		if (el.startsWith('check')) {
			checkArray.push(el);
		}
	});

	const allTrues = checkArray.every(function (value) {
		return newObject._doc[value] === true;
	});

	if (allTrues) {
		console.log('Todos son true');
	} else {
		console.log('NO Todos son true');
	}

	next();
});

export default model('workflow_events', WorkflowSchema);
