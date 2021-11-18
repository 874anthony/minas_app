"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var APIFeatures = /** @class */ (function () {
    function APIFeatures(query, queryParams) {
        // BUILD THE QUERY
        this.query = query;
        this.queryParams = queryParams;
    }
    APIFeatures.prototype.filter = function () {
        //1.1) Cleaning Filtering
        /*
        I make a hard copy of the req.query so I don't mutate req.query
        Then, I loop over the array of excluding fields, and delete them from the queryObject.
        */
        var queryObject = __assign({}, this.queryParams);
        var excludedFields = ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach(function (field) { return delete queryObject[field]; });
        //1.2) Advanced filtering
        // I parse to string the query object, so I can use the replace method, so I can replace with dollar sign
        // And then again, parse to an object so I can pass it to the Model.find
        var queryString = JSON.stringify(queryObject);
        queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, function (matchedOperator) { return "$" + matchedOperator; });
        this.query = this.query.find(JSON.parse(queryString));
        return this;
    };
    APIFeatures.prototype.sort = function () {
        // 2) Sorting
        if (this.queryParams.sort) {
            // Cast to string to bypass TypeScript problem
            var sortBy = this.queryParams.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        }
        else {
            this.query = this.query.sort('-createdAt');
        }
        return this;
    };
    APIFeatures.prototype.limitFields = function () {
        // 3) Field limiting
        if (this.queryParams.fields) {
            // Cast to string to bypass TypeScript problem
            var fieldBy = this.queryParams.fields.split(',').join(' ');
            this.query = this.query.select(fieldBy);
        }
        else {
            this.query = this.query.select('-__v');
        }
        return this;
    };
    APIFeatures.prototype.paginate = function () {
        // 4) Pagination
        // Parse string to number
        var page = parseInt(this.queryParams.page) * 1 || 1;
        var limit = parseInt(this.queryParams.limit) * 1 || 100;
        // Calculating the skip value for skipping the first results
        var calculatedSkipValue = (page - 1) * limit;
        this.query = this.query.skip(calculatedSkipValue).limit(limit);
        return this;
    };
    return APIFeatures;
}());
exports.default = APIFeatures;
