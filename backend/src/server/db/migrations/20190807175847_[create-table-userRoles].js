
exports.up = function(knex) {
    return knex.schema.createTable('userRoles', table => {
        table.increments('id').primary();
        table.string('roleName');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('persons');
};
