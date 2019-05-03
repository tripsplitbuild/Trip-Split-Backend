const db = require('../../data/dbConfig.js');
const Trips = require('../tripsModel.js');

beforeEach(() => {
  return db('users','trips').truncate();
});

describe('the trips Model', () => {

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
})
