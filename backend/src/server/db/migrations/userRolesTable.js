module.exports = async function userRolesTable() {
    if (await knex.schema.hasTable('userRoles')) {
        return;
    }
  
    await knex.schema.createTable('userRoles', table => {
        table.increments('id').primary();
        table.string('roleName');


    })
}