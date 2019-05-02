const db = require('../../data/dbConfig.js');
const Users = require('../usersModel.js');

beforeEach(() => {
  return db('users').truncate();
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
})
