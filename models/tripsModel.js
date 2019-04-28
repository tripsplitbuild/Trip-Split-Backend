const db = require('../data/dbConfig.js');

module.exports = {
 find,
 findBy,
 findById,
 findMembers,
 add,
 edit,
 remove
}

function find() {
  return db('trips')
}

function findBy(filter){
  return db('trips').where(filter);
};

function findById(id){
  return db('trips')
    .where({ id })
    .first()
}

function findMembers(id){
  return db('trips')
    .leftJoin('tripMembers', 'tripMembers.trip_id', 'trips.id')
    .where('trips.id', id)
}

async function add(trips){
  const [id] = await db('trips').insert(trips);

  return findById(id);
}

async function edit(id, changes){
  await db('trips')
  .where('id', id)
  .update(changes)

  return findById(id);
}

function remove(id){
  return db('trips')
  .where('id', id)
  .del();
}
