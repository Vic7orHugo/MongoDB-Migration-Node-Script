/*
	migrate-data.js - Reads two JSON files, merge its data, and creates a database using Mongo.
	29/03/2018 17:29 GMT(-3:00)
 */

// Importing modules
const mongodb = require('mongodb');
const async = require('async');

// JSON files path
const custIncompletePath = './JSON_data/m3-customer-data.json';
const custAddressPath = './JSON_data/m3-customer-address-data.json';

// Getting the JSON files
const customerIncomplete = require(custIncompletePath);
const customerAddress = require(custAddressPath);

// Merging the two datasets
let customers = [];
for (let obj = 0; obj < customerAddress.length; obj++) {
	customers.push(Object.assign(customerIncomplete[obj], customerAddress[obj]));
}

// Getting the argument that defines how many queries will be done
const input = parseInt(process.argv[2]);
const queries = Math.floor(customers.length / input);

//Use connect method to connect to the Server
//Connection URL
const url = 'mongodb://localhost:27017/edx-course-db';
mongodb.MongoClient.connect(url, (error, db) => {
	if (error) return process.exit(1);
	console.log('Connected to database');
	// Implementing the array of tasks
	let tasks = [];
	for (let query = 0; query < queries; query++) {
		tasks.push(() => { // Pushes to the array of tasks anonymous functions that will insert the customers data 
			insertCustomers(db, (query + 1), customers.slice(query * input, (query + 1) * input), () => { db.close(); });
		});
	}
	// Executing the queries at the same time
	console.log("Saving complete data to the DB.")
	async.parallel(tasks, (error, result) => {
  		if (error) console.error(error);
  		db.close();
	});

});

// Function to insert the customer on the database
const insertCustomers = (db, query, data, callback) => {
	// Get reference to edx-course-docs collection
	const dbName = 'customers';
	const collection = db.collection(dbName);
	// Insert documents
	collection.insert(data, (error, result) => {
		if (error) return process.exit(1);
		console.log(`Query ${query}: Inserted ${data.length} documents into the ${dbName} collection`);
		callback();
	});
};
