const db = require('../../data/dbConfig.js');
const Trips = require('../tripsModel.js');

beforeEach(() => {
  db('users').truncate()
  return db('trips').truncate();
});


describe('the trips Model', () => {
  beforeEach(() => {
    return db('users', 'trips').truncate();
  })

  describe('the find function', () => {
    it('should return an empty array', async() => {
      const trips = await Trips.find()
      expect(trips).toEqual([])
    })

    it ('should return an object', async() => {
      await db('users').insert({username: 'Robert', password: 'pass'})
      await db('trips').insert({trip_name: 'Disney', close_trip: false, user_id: 1})
      const trips = await Trips.find()
      expect(trips[0]).toEqual({ id: 1,
        close_trip: 0,
        trip_name: 'Disney',
        user_id: 1,
        start_date: null,
        end_date: null })
    })
  })

  describe('the findBy Fn', () => {
    beforeEach(() => {
      return db('users', 'trips').truncate();
    })

    it('it should return a user a user object based on the query', async() => {
      await db('users').insert({username: 'Robert', password: 'pass'})
      await db('trips').insert({trip_name: 'Disney', user_id: 1, close_trip: false})
      const trips = await Trips.findBy({"trip_name": "Disney"})
      expect(trips[0].id).toBe(1)

    })
  })
})
