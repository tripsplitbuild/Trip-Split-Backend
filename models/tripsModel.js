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
  return db('trips').select('id', 'trip_name');
}

function findBy(filter){
  return db('trips').where(filter);
};

function findById(id){
  return db('trips')
    .where({ id })
    .first()
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
