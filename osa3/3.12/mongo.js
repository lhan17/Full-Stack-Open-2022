const mongoose = require('mongoose')

if (process.argv.length < 3) {
    process.exit(1)
}

const password = process.argv[2]

const name = process.argv[3]
const number = process.argv[4]
const url =
    `mongodb+srv://lamthinh:${password}@lhan.rxnnajx.mongodb.net/?retryWrites=true&w=majority`
mongoose.set('strictQuery', false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', noteSchema)


if (number) {
    const person = new Person({
        name: name,
        number: number
    })
    person.save().then(result => {
        console.log(`added ${name} number ${number} to phonebook`)
        mongoose.connection.close()
    })
}
console.log('phonebook:')
Person.find({}).then(result => {
    result.forEach(person => {
        console.log(person.name, person.number)
    })
    mongoose.connection.close()
})



