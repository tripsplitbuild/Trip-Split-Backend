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
  return db('expenseMembers')
}

function findBy(filter){
  return db('expenseMembers').where(filter);
};

function findById(id){
  return db('expenseMembers')
    .where({ id })
    .first()
}

async function add(expenseMember){
  const [id] = await db('expenseMembers').insert(expenseMember);

  return findById(id);
}

async function edit(id, changes){
  await db('expenseMembers')
  .where('id', id)
  .update(changes)

  return findById(id);
}

function remove(id){
  return db('expenseMembers')
  .where('id', id)
  .del();
}
