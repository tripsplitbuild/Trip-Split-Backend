const db = require('../data/dbConfig.js');

module.exports = {
 find,
 findBy,
 findById,
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

async function add(trip_Members){
  const [id] = await db('tripMembers').insert(trip_Members);

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
