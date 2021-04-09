// Import dependancies
const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')

// Create an express app
const app = express()


// Create a schema
const schema = buildSchema(`
type About {
  message: String!
}
type Meal {
    description: String!
}
type Pet {
    name: String!
    species: String!
}

enum IsAnalog {
    analog
    digital
    hybrid
}

type Synths {
    name: String!
    price: Int!
    isAnalog: IsAnalog
    worthIt: Boolean

}
type Time {
    hour: Int!
    minute: Int!
    second: Int!
}

type DiceRoll {
    numberOfDice: Int!
    numberOfSides: Int!
}

type Query {
    getAbout: About
    getmeal(time: String!): Meal

    getRandom(rando: Int!): Int

    getRoll(sides: Int!, rolls: Int!): Int

    getPet(id: Int!): Pet
    allPets: [Pet!]!

    getSynths(id: Int!): Synths
    allSynths: [Synths!]!

    getTime: Time!

    firstSynth(id: Int!): Synths

    petsInRange(start: Int, count: Int): [String]
}`)

// # Mock datatbase in this case:
const petList = [
    { name: 'Fluffy', species: 'Dog' },
    { name: 'Sassy', species: 'Cat' },
    { name: 'Goldberg', species: 'Frog' }
]

const synthList = [
    { name: 'Moog', price: 1500, worthIt: true },
    { name: 'Korg', price: 500, worthIt: true },
    { name: 'Beringer', price: 200, worthIt: false }
]


// Define a resolver
const root = {
  getAbout: () => {
    return { message: 'Hello World' }
},
  getmeal: ({time}) => {
      const allMeals = { breakfast: 'toast', lunch: 'noodles', dinner: 'pizza' }
      const meal = allMeals[time]
      return { description: meal}
  },

  getPet: ({ id }) => {
      return petList[id]
  },
  allPets: () => {
      return petList
  },
  getSynths: ({ id }) => {
      return synthList[id]
  },
  allSynths: () => {
      return synthList
  },
  firstSynth: () => {
      return synthList[id]
  },
  getTime: () => {
      const now = new Date()
      const hour = now.getHours()
      const minute = now.getMinutes()
      const second = now.getSeconds()
      return { hour, minute, second}
  },

  getRandom: ({ rando }) => {
      const randomNumberGen = Math.floor(Math.random() * rando) + 1
      return randomNumberGen
  },

  getRoll: ({ sides, rolls}) => {
      const total = rolls * sides
      const rollCount = 8
      return {total, sides, rolls}
  },

  getAll: () => {
      return
  },

  getPetsRange: ({start, count}) => {
      return name
  },

  getPetBySpecies: ({species}) => {
      return name
  },

  allSpecies: () => {
      return name
  }
}

// Define a route for GraphQL
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true
}))

// Start this app
const port = 4000
app.listen(port, () => {
  console.log(`Running on port: ${port}`)
})
