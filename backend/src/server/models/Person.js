const { Model } = require('objection'); 
const UserRole = require('./UserRole');

class Person extends Model {
    static get tableName() {
        return 'persons';
    }
    static get relationMappings() {
        return {
            userRole: {
                relation: Model.BelongsToOneRelation,
                modelClass: UserRole,
                join: {
                    from: 'persons.id',
                    to: 'userRoles.id'
                }
            }
        };
    }
} 

module.exports = Person;