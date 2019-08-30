
exports.up = function(knex) {
    return knex.schema.createTable('persons', table => {
        table.increments('id').primary();
        table.integer('personsRoleId').references('userRoles.id').unsigned();
        table.string('firstName');
        table.string('lastName');
        table.string('oib').unique();
        table.string('email').unique();
        table.string('password');

    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('persons');
};
