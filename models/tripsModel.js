const db = require('../data/dbConfig.js');

module.exports = {
 find,
 findBy,
 findById,
 findMembers,
 findExpenses,
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
    .select("trips.id as trip_id", "trips.trip_name as trip_name", "trips.user_id as tripOwner_id", "trips.close_trip as close_trip", "tripMembers.trip_username as trip_username", "tripMembers.id as tripMembers_id")
}

function findExpenses(id){
  return db('trips')
  .leftJoin('expense', 'expense.trip_id', 'trips.id')
  .where('trips.id', id)
}

async function add(trips){
  const [id] = await db('trips').insert(trips, "id");

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
