const { Model } = require('objection'); 
const Person = require('./Person');

class Request extends Model {
    static get tableName() {
        return 'requests';
    }
    static get relationMappings() {
        return {
            person: {
                relation: Model.BelongsToOneRelation,
                modelClass: Person,
                join: {
                    from: 'requests.userID',
                    to: 'persons.id'
                }
            }
        };
    }
} 

module.exports = Request;