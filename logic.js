const mongoose = require('mongoose'); // An Object-Document Mapper for Node.js
const assert = require('assert'); // N.B: Assert module comes bundled with Node.js.
mongoose.Promise = global.Promise; // Allows us to use Native promises without throwing error.
require("dotenv").config();

// Connecting to remote MongoDB server.
// We assign the connection instance to a constant to be used later in closing the connection


var url = process.env.DATABASEURL;
mongoose.connect(url);
const db = mongoose.connection;

// Converts value to lowercase
function toLower(v) {
  return v.toLowerCase();
}

// Define a contact Schema
const contactSchema = mongoose.Schema({
  firstname: { type: String, set: toLower },
  lastname: { type: String, set: toLower },
  email: { type: String, set: toLower },
  phonenumber1: { type: String, set: toLower },
  phonenumber2: { type: String, set: toLower },
  comment: { type: String, set: toLower },
});

// Define model as an interface with the database
const Contact = mongoose.model('Contact', contactSchema);

/**
 * @function  [addContact]
 * @returns {String} Status
 */
const addContact = (contact) => {
  Contact.create(contact, (err) => {
    assert.equal(null, err);
    console.info('New contact added');
    db.close();
  });
};

/**
 * @function  [getContact]
 * @returns {Json} contacts
 */
const getContact = (name) => {
  // Define search criteria
  const search = new RegExp(name, 'i');

  Contact.find({$or: [{firstname: search }, {lastname: search }]})
  .exec((err, contact) => {
    assert.equal(null, err);
    console.info(contact);
    console.info(`${contact.length} matches`);
    db.close();
  });
};

/**
 * @function  [getContactList]
 * @returns {Sting} status
 */
const updateContact = (_id, contact) => {
  Contact.update({ _id }, contact)
  .exec((err, status) => {
    assert.equal(null, err);
    console.info('Updated successfully');
    db.close();
  });
};

/**
 * @function  [deleteContact]
 * @returns {String} status
 */
const deleteContact = (_id) => {
  Contact.remove({ _id })
  .exec((err, status) => {
    assert.equal(null, err);
    console.info('Deleted successfully');
    db.close();
  })
}

/**
 * @function  [getContactList]
 * @returns [contactlist] contacts
 */
const getContactList = () => {
  Contact.find()
  .exec((err, contacts) => {
    assert.equal(null, err);
    console.info(contacts);
    console.info(`${contacts.length} matches`);
    db.close();
  })
}

// Export all methods
module.exports = {
  addContact,
  getContact,
  getContactList,
  updateContact,
  deleteContact
};
