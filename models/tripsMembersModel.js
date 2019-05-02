const db = require('../data/dbConfig.js');

module.exports = {
 find,
 findBy,
 findById,
 findMember,
 add,
 edit,
 remove
}

function find() {
  return db('tripMembers');
}

function findBy(filter){
  return db('tripMembers').where(filter);
};

function findById(id){
  return db('tripMembers')
    .where({ id })
    .first()
}

function findMember(username){
  return db('tripMembers')
  .leftJoin('trips', 'trips.id', 'tripMembers.trip_id')
  .where('tripMembers.trip_username', username)
}

async function add(trip_Members){
  const [id] = await db('tripMembers').insert(trip_Members, "id");

  return findById(id);
}

async function edit(id, changes){
  await db('tripMembers')
  .where('id', id)
  .update(changes)

  return findById(id);
}

function remove(id){
  return db('tripMembers')
  .where('id', id)
  .del();
}
