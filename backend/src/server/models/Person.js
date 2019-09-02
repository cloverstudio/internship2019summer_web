const { Model } = require('objection'); 
const UserRole = require('./UserRole');
const Request = require('./Request');

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
                    to: 'userRoles.userRolesId'
                }
            },
            request: {
                relation: Model.HasManyRelation,
                modelClass: Request,
                join: {
                    from: 'persons.id',
                    to: 'requests.userID'
                }
            }

        };
    }
} 

module.exports = Person;