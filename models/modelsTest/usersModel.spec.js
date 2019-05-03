const db = require('../../data/dbConfig.js');
const Users = require('../usersModel.js');

beforeEach(() => {
  return db('users', 'trips').truncate();
});


describe('The Users Model', () => {
  describe('find function', () =>{
    it ("should return an empty array if there's no users", async () => {
      const users = await Users.find();
      expect(users.length).toBe(0);
    })

    it ('should return an object', async () => {
      await Users.add({username: 'Martyn', password: "Password"})

      const users = await Users.find();
      expect(users.length).toBe(1);
      expect(users[0].username).toBe('Martyn')

    })
  })

  describe('findBy(filter) function', () => {
    it ("should return a user object with regardless of the query", async () => {
      await Users.add({username: 'Cheryl', first_name: "Cheryl", last_name: 'Chen', password: "Password"})
      const users = await Users.findBy({username: 'Cheryl'})
      expect(users.length).toBe(1)
      expect(users[0].first_name).toBe('Cheryl')
    })

    it ('should return multiple objects if query has multiple matches', async () => {

      await Users.add({username: 'Cheryl', first_name: "Cheryl", last_name: 'Chen', password: "Password"})
      await Users.add({username: 'Cchen', first_name: "Cheryl", last_name: 'Chen-Hwang', password: "Password"})

      const users = await Users.findBy({first_name: "Cheryl"})

      expect(users.length).toBe(2)
      expect(users[1].last_name).toBe('Chen-Hwang')
    })
  })

  describe('The add function', () => {
    it ('should return an empty array for an empty database', async() => {
      const users = await db('users')
      expect(users.length).toBe(0)
      expect(users).toEqual([])
    })

    it('should return an object if there is users in the database', async () =>{
      await Users.add({username: 'Cchen', first_name: "Cheryl", last_name: 'Chen-Hwang', password: "Password"})
      await Users.add({username: 'ChenMaster', first_name: "Cheryl", last_name: 'Chen-Hwang', password: "Password"})

      const users = await db('users')
      expect(users.length).toBe(2)
      expect(users[0].first_name).toBe("Cheryl")
      expect(users[1]).toEqual({ id: 2,
        username: 'ChenMaster',
        first_name: 'Cheryl',
        last_name: 'Chen-Hwang',
        gender: null,
        avatar: null,
        password: 'Password' })
    })
  })

  describe('the findById Fn', () => {
    it("should return undefined if there is no data from the id", async() => {
      await Users.add({username: 'Cchen', first_name: "Cheryl", last_name: 'Chen-Hwang', password: "Password"})
      await Users.add({username: 'ChenMaster', first_name: "Cheryl", last_name: 'Chen-Hwang', password: "Password"})

      const user = await Users.findById(3);
      expect(user).toBe(undefined)
    })

    it('should return an object if there is data', async() => {
      await Users.add({username: 'Cchen', first_name: "Cheryl", last_name: 'Chen-Hwang', password: "Password"})
      await Users.add({username: 'ChenMaster', first_name: "Cheryl", last_name: 'Chen-Hwang', password: "Password"})

      const user = await Users.findById(1)
      expect(user).toEqual({ id: 1,
      username: 'Cchen',
      first_name: 'Cheryl',
      last_name: 'Chen-Hwang',
      gender: null,
      avatar: null,
      password: 'Password' })
    })
  })

  describe('the findByIdWithTrips Fn', () => {
    it('should return an object with the trips included', async() => {

      await Users.add({username: 'Cchen', first_name: "Cheryl", last_name: 'Chen-Hwang', password: "Password"})
      await Users.add({username: 'ChenMaster', first_name: "Cheryl", last_name: 'Chen-Hwang', password: "Password"})
      const trip = await db('trips').insert({"trip_name": "Disney", "user_id": 1, "close_trip": true})
      const userWithID = await Users.findByIdWithTrips(1);
      expect(userWithID[0]).toEqual({ id: 1,
        username: 'Cchen',
        first_name: 'Cheryl',
        last_name: 'Chen-Hwang',
        gender: null,
        avatar: null,
        password: 'Password',
        close_trip: 1,
        trip_name: 'Disney',
        user_id: 1,
        start_date: null,
        end_date: null })
    })
  })

  describe('edit fn', () => {
    it ('should change an object', async() => {
      await Users.add({username: 'Cchen', first_name: "Cheryl", last_name: 'Chen-Hwang', password: "Password"})
      const user = await db('users')
      expect(user[0]).toEqual({ id: 1,
        username: 'Cchen',
        first_name: 'Cheryl',
        last_name: 'Chen-Hwang',
        gender: null,
        avatar: null,
        password: 'Password' })

      await Users.edit(1, {username: 'PandaLover', first_name: "Cheryl", last_name: 'Chen', password: "Password"})
      const userChanged = await db('users')
      expect(userChanged[0]).toEqual({ id: 1,
        username: 'PandaLover',
        first_name: 'Cheryl',
        last_name: 'Chen',
        gender: null,
        avatar: null,
        password: 'Password' })

    })
  })
})
