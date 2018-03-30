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
let customer = [];
for (let obj = 0; obj < customerAddress.length; obj++) {
	customer.push(Object.assign(customerIncomplete[obj], customerAddress[obj]));
}

const insertCustomers = (db, callback, data) => {
	// Get reference to edx-course-docs collection
	const collection = db.collection('customers');
	// Insert documents
	collection.insert(data, (error, result) => {
		if (error) return process.exit(1);
		console.log(result.result.n); 	
		console.log(result.ops.length);	
		console.log(`Inserted ${data.length} documents into the customers collection`);
		callback(result);
	});
};

const findCostumers = (db, callback) => {
	// Get the documents collection
	const collection = db.collection('customers');
	// Find some documents
	collection.find({}).toArray((error, docs) => {
		if (error) return process.exit(1);
		console.log(`Found the following documents:`);
		console.dir(docs);
		callback(docs);		
	});
};

//Use connect method to connect to the Server
const connectDB = (mongodb, data) => {	
	//Connection URL
	const url = 'mongodb://localhost:27017/edx-course-db'
	mongodb.MongoClient.connect(url, (error, db) => {
		if (error) return process.exit(1);
		console.log('Connection is okay');
		insertDocuments(db, () => {
			findDocuments(db, (docs) => {
				console.log(docs);
				db.close();
			});
		});
	});
};