module.exports = async function personTable() {
    if (await knex.schema.hasTable('persons')) {
        return;
    }
  
    await knex.schema.createTable('persons', table => {
        table.increments('id').primary();
        table.integer('personsRoleId').references('userRoles.id').unsigned();
        table.string('firstName');
        table.string('lastName');
        table.string('oib').unique();
        table.string('email').unique();
        table.string('password');

    })
}
