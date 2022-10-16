require("dotenv").config();
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connection successful");
  })
  .catch(() => console.error("Database connection error"));

const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String],
});

const Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  const person = new Person({
    name: "Lucas",
    age: 29,
    favoriteFoods: ["Cerveja", "Churrasco"],
  });

  person.save((err, data) => {
    if (err) return console.error(err);
    console.log(data);
    done(null, data);
  });
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    if (err) return console.error(err);
    console.log(data);
    done(null, data);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName })
    .then((data) => done(null, data))
    .catch((err) => console.error(err));
};

const findOneByFood = (food, done) => {
  console.log(food);
  Person.findOne({ favoriteFoods: food })
    .then((data) => {
      console.log(data);
      done(null, data);
    })
    .catch((err) => console.error(err));
};

const findPersonById = (personId, done) => {
  Person.findById({ _id: personId })
    .then((data) => {
      console.log(data);
      done(null, data);
    })
    .catch((err) => console.error(err));
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById({ _id: personId }, (err, data) => {
    if (err) return console.error(err);

    data.favoriteFoods.push(foodToAdd);

    console.log(data);

    data.save((err, newData) => {
      if (err) return console.error(err);
      console.log(newData);
      done(null, newData);
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate(
    { name: personName },
    { age: ageToSet },
    { new: true }
  )
    .then((data) => done(null, data))
    .catch((err) => console.error(err));
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove({ _id: personId })
    .then((data) => done(null, data))
    .catch((err) => console.error(err));
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({ name: nameToRemove })
    .then((data) => done(null, data))
    .catch((err) => console.error(err));
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person.find({ favoriteFoods: foodToSearch })
    .sort({ name: 1 })
    .limit(2)
    .select({ name: true })
    .exec()
    .then((data) => done(null, data))
    .catch((err) => console.error(err));
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
