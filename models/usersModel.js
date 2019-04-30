const db = require('../data/dbConfig.js');

module.exports = {
 find,
 findBy,
 findById,
 findWhereMember,
 add,
 edit,
 findByIdWithTrips
};


function find() {
  return db('users').select('id', 'username', 'first_name', 'last_name', 'gender', 'password');
}

function findBy(filter){
  return db('users').where(filter);
};

async function add(user){
  const [id] = await db('users').insert(user);

  return findById(id);
}

function findById(id){
  return db('users')
    .where({ id })
    .first()
}

function findWhereMember(username){
  return db('users')
    .leftJoin('tripMembers', 'tripMembers.trip_username', 'users.username')
    .where('username', username)

}

function findByIdWithTrips(id){
  return db('users')
    .leftJoin('trips', 'trips.user_id', 'users.id')
    .where('users.id', id)
}

async function edit(id, changes){
  await db('users')
  .where('id', id)
  .update(changes)

  return findById(id);
}
