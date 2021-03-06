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

// function to find, edit, update and save updated model.
const findEditThenSave = async (personId, done) => {
  // var to update
  const foodToAdd = "hamburger";
  // find Model by id. Id passed to main func
  await Person.findById(personId, (err, data) => {
    if (err) return console.error(err)
    // data = returned query. update document field with created var
    data.favoriteFoods.push(foodToAdd)
    // save the updated Model document and call done function
    data.save((err, update) => {
      if (err) return console.error(err)
      done(null, update)
    })
  })
}

// function to update one document by name and setting age to 20
const findAndUpdate = async (personName, done) => {
  const ageToSet = 20
  // find one by name and update age to 20. new: true to return the updated doc. new: fale will return original doc.
  await Person.findOneAndUpdate({ name: personName }, { age: ageToSet }, { new: true }, (err, data) => {
    if (err) return console.error(err)
    done(null, data)
  })
}

// function to find a doc by ID and ramove it
const removeById = async (personId, done) => {
  // find by id and remove
  await Person.findByIdAndRemove(personId, (err, removedDoc) => {
    if (err) return console.error(err)
    done(null, removedDoc)
  })
}

// function to find all the Person documents that match "Mary" as name and remove them
const removeManyPeople = async (done) => {
  const nameToRemove = "Mary";
  await Person.remove({ name: nameToRemove }, (err, response) => {
    if (err) return console.error(err)
    done(null, response)
  })
}

// function to chain queries
const queryChain = async (done) => {
  const foodToSearch = "burrito";
  // query docs by food, sort ascending by name, limit to 2 docs, hide age then execute
  await Person.find({ favoriteFoods: foodToSearch }).sort({ name: 1 }).limit(2).select({ age: 0 }).exec((err, result) => {
    if (err) return console.error(err)
    done(null, result)
  })
}

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
