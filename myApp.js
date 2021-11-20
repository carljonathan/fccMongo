require('dotenv').config();
require('express')

const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URI)
const Schema = mongoose.Schema

// create mongoose schema for Person
const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
})

// create mongoose model for PersonSchema
const Person = mongoose.model('Person', personSchema)

// create new Person document function. async to accept await
const createAndSavePerson = async (done) => {
  // create new person Document from Person schema
  const person = new Person({ name: 'John', age: 32, favoriteFoods: ['fruit', 'veggies', 'eggs'] })

  // await document to be ready, then save as per node convention
  await person.save((err, data) => {
    // if error, log it. Else return done
    if (err) return console.error(err)
    done(null, data)
  })
}

// function to create multiple Person documents. async to handle await
const createManyPeople = async (arrayOfPeople, done) => {
  // use model.create shorthand that takes array of object as argument. Automatically calls model.save() so second arg is error handling 
  await Person.create(arrayOfPeople, (err, data) => {
    if (err) return console.error(err)
    done(null, data)
  })
}

// function to handle search by Model.find(). async to handle await
const findPeopleByName = async (personName, done) => {
  // use Model.find to find persons with name in personName. function takes filter object, some additional optional params and can handle callback for eg. err handling.
  await Person.find({ name: personName }, (err, data) => {
    if (err) return console.error(err)
    done(null, data)
  })
}

// function to handle Model.findOne, which works like Model.find but only returns one hit instead of array of hits. If multiple matches it returns the first.
const findOneByFood = async (food, done) => {
  await Person.findOne({ favoriteFoods: food }, (err, data) => {
    if (err) return console.error(err)
    done(null, data)
  })
}

const findPersonById = async (personId, done) => {
  await Person.findById(personId, (err, data) => {
    if (err) return console.error(err)
    done(null, data)
  })
}

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
