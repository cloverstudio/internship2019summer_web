const { Model } = require('objection');
const Person = require('./Person');

class UserRole extends Model {
    static get tableName() {
        return 'userRoles';
    }
    static get relationMappings() {
        return {
            person: {
                relation: Model.HasManyRelation,
                modelClass: Person,
                join: {
                    from: 'userRoles.id',
                    to: 'persons.id'
                }
            }
        };
    }
} 

module.exports = UserRole;