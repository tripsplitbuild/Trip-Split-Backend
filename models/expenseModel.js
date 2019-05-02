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
  return db('expense')
}

function findBy(filter){
  return db('expense').where(filter);
};

function findById(id){
  return db('expense')
    .where({ id })
    .first()
}

function findMembers(id){
  return db('expense')
    .leftJoin('expenseMembers', 'expenseMembers.expense_id', 'expense.id')
    .where('expense.id', id)
    .select('expense.id as expense_id', 'expense.expense_name as expense_name', 'expense.trip_id as trip_id', 'expense.expense_total as expense_total', 'expenseMembers.expense_username', 'expenseMembers.expense_amount_paid', 'expenseMembers.id as expenseMember_id')
}

async function add(expense){
  const [id] = await db('expense').insert(expense, "id");

  return findById(id);
}

async function edit(id, changes){
  await db('expense')
  .where('id', id)
  .update(changes)

  return findById(id);
}

function remove(id){
  return db('expense')
  .where('id', id)
  .del();
}
