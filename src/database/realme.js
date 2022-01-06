import Realm from 'realm';

// Declare Schema
class BookSchema extends Realm.Object {}
BookSchema.schema = {
  name: 'Book',
  properties: {
    title: 'string',
    pages: 'int',
    edition: 'int?',
  },
};

class ProjectListSchema extends Realm.Object {}
ProjectListSchema.schema = {
  name: 'ProjectList',
  properties: {
    id: 'int',
    project: 'string',
    description: 'string',
    image: 'string',
  },
};

// class SaveUserDataSchema extends Realm.Object {}
// SaveUserDataSchema.schema = {
//   name: 'SaveData',
//   properties: {
//     image: '',
//     project: 'string',
//   },
// };

// Create realm
let realm = new Realm({
  schema: [BookSchema, ProjectListSchema],
  schemaVersion: 1,
});

// Export the realm
export default realm;
