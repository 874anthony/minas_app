export default class APIFeatures {
	public query;
	public queryParams;

	constructor(query, queryParams) {
		// BUILD THE QUERY
		this.query = query;
		this.queryParams = queryParams;
	}

	filter() {
		//1.1) Cleaning Filtering
		/*
		I make a hard copy of the req.query so I don't mutate req.query
		Then, I loop over the array of excluding fields, and delete them from the queryObject.
		*/
		const queryObject = { ...this.queryParams };
		const excludedFields = ['page', 'sort', 'limit', 'fields'];
		excludedFields.forEach((field) => delete queryObject[field]);

		//1.2) Advanced filtering
		// I parse to string the query object, so I can use the replace method, so I can replace with dollar sign
		// And then again, parse to an object so I can pass it to the Model.find
		let queryString = JSON.stringify(queryObject);
		queryString = queryString.replace(
			/\b(gte|gt|lte|lt)\b/g,
			(matchedOperator) => `$${matchedOperator}`
		);

		this.query = this.query.find(JSON.parse(queryString));

		return this;
	}

	sort() {
		// 2) Sorting
		if (this.queryParams.sort) {
			// Cast to string to bypass TypeScript problem
			const sortBy = (<string>this.queryParams.sort).split(',').join(' ');
			this.query = this.query.sort(sortBy);
		} else {
			this.query = this.query.sort('-createdAt');
		}

		return this;
	}

	limitFields() {
		// 3) Field limiting
		if (this.queryParams.fields) {
			// Cast to string to bypass TypeScript problem
			const fieldBy = (<string>this.queryParams.fields).split(',').join(' ');
			this.query = this.query.select(fieldBy);
		} else {
			this.query = this.query.select('-__v');
		}

		return this;
	}

	paginate() {
		// 4) Pagination
		// Parse string to number
		const page = parseInt(this.queryParams.page as string) * 1 || 1;
		const limit = parseInt(this.queryParams.limit as string) * 1 || 100;

		// Calculating the skip value for skipping the first results
		const calculatedSkipValue = (page - 1) * limit;

		this.query = this.query.skip(calculatedSkipValue).limit(limit);

		return this;
	}
}
