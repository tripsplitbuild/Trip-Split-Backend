const request = require('supertest');
const server = require('./server.js');
const db = require('../data/dbConfig.js');

describe('the server', () => {
  it('should set testing environment', () => {
    const env = process.env.DB_ENV;

    expect(env).toBe('testing');
  });

  describe('Get / route', () => {
    it ('should return status 200', async() => {
      const res = await request(server).get('/');
      expect(200);
      expect(res.text).toEqual('{"message":"Welcome"}')

    })
  })
})
