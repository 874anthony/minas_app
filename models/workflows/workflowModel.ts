import { Schema, model } from 'mongoose';

export enum StatusWorkflow {
	Active = 'ACTIVO',
	Rehabilitation = 'SUBSANACION',
	Pending = 'PENDIENTE',
	Rejected = 'RECHAZADO',
}

const WorkflowSchema: Schema = new Schema({
	radicado: {
		type: Schema.Types.ObjectId,
		required: [true, 'Especifique el documento al que va a estar asociado'],
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
	status: {
		type: String,
		enum: [StatusWorkflow],
		default: StatusWorkflow.Pending,
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
	updatedAt: {
		type: Date,
	},
});

export default model('workflow_events', WorkflowSchema);
