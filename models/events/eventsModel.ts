import { Schema, model } from 'mongoose';

export enum StatusWorkflow {
	Blocked = 'BLOQUEADO',
	Sanitation = 'SUBSANACION',
	Pending = 'PENDIENTE',
	Finished = 'FINALIZADO',
}

const EventsSchema: Schema = new Schema({
	radicado: {
		type: Schema.Types.ObjectId,
		required: [true, 'Specify the document to be associated with'],
	},
	action: {
		type: String,
		required: [true, 'Must provide an action'],
	},
	description: String,
	createdAt: {
		type: Date,
		default: Date.now(),
	},
});

//================================================== DOCUMENT MIDDLEWARES =======================================

export default model('events', EventsSchema);
