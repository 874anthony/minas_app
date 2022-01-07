// Importing dependencies
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app';

// Import enviroment variables and parsing into the single process.env
dotenv.config({ path: './config.env' });

// Creating the DB instance
const DB = process.env.DATABASE_URI!.replace(
	'<password>',
	process.env.MONGODB_PASSWORD!
);

// Connecting to the DB itself
// TODO: Handle errors
mongoose
	.connect(DB, { dbName: 'minas_gecelca' })
	.then(() => console.log('DB connected succesfully!'))
	.catch(console.log);

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`Server inizialited, app is running on ${port}`);
});
