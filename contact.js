#!/usr/bin/env node

const program = require('commander');
const { prompt } = require('inquirer'); // require inquirerjs library
// Require logic.js file and extract controller functions using JS destructuring assignment
const {
  addContact,
  getContact,
  getContactList,
  updateContact,
  deleteContact
} = require('./logic');

const questions = [
  {
    type : 'input',
    name : 'firstname',
    message : 'Enter your firstname ...'
  },
  {
    type : 'input',
    name : 'lastname',
    message : 'Enter your lastname ...'
  },
  {
    type : 'input',
    name : 'email',
    message : 'Enter your email address ...'
  },
  {
    type : 'input',
    name : 'phonenumber1',
    message : 'Enter your first phone number ...'
  },
  {
    type : 'input',
    name : 'phonenumber2',
    message : 'Enter your second phone number ...'
  },
  {
    type : 'input',
    name : 'comment',
    message : 'Enter your comment ...'
  },

];
db.createCollection("contacts", {
   validator: {
      $jsonSchema: {
         bsonType: "object",
         required: [ "firstname", "lastname", "email", "phonenumber1", "phonenumber2", "comment" ],
         properties: {
            firstname: {
               bsonType: "string",
               description: "must be a string and is required"
            },
            // gender: {
            //    bsonType: "string",
            //    description: "must be a string and is not required"
            // },
            // year: {
            //    bsonType: "int",
            //    minimum: 2017,
            //    maximum: 3017,
            //    exclusiveMaximum: false,
            //    description: "must be an integer in [ 2017, 3017 ] and is required"
            // },
            // major: {
            //    enum: [ "Math", "English", "Computer Science", "History", null ],
            //    description: "can only be one of the enum values and is required"
            // },
            // gpa: {
            //    bsonType: [ "double" ],
            //    minimum: 0,
            //    description: "must be a double and is required"
            // }
         }
      }
   }
});

program
  .version('0.0.1')
  .description('Contact management system');

  program
    .command('addContact')
    .alias('a')
    .description('Add a contact')
    .action(() => {
      prompt(questions).then((answers) =>
        addContact(answers));
    });

  program
    .command('getContact <name>')
    .alias('g')
    .description('Get contact')
    .action(name => getContact(name));

  program
    .command('updateContact <_id>')
    .alias('u')
    .description('Update contact')
    .action(_id => {
      prompt(questions).then((answers) =>
        updateContact(_id, answers));
    });

  program
    .command('deleteContact <_id>')
    .alias('d')
    .description('Delete contact')
    .action(_id => deleteContact(_id));

  program
    .command('getContactList')
    .alias('l')
    .description('List contacts')
    .action(() => getContactList());

  // Assert that a VALID command is provided
  if (!process.argv.slice(2).length || !/[arudl]/.test(process.argv.slice(2))) {
    program.outputHelp();
    process.exit();
  }
  program.parse(process.argv)
