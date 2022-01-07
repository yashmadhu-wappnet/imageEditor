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
  },
};

class ImageListSchema extends Realm.Object {}
ImageListSchema.schema = {
  name: 'ImageList',
  properties: {
    imageId: 'int',
    projectId: 'int',
    description: 'string',
    image: 'string',
  },
};

class SaveTagListSchema extends Realm.Object {}
SaveTagListSchema.schema = {
  name: 'TagList',
  properties: {
    tagId: 'int',
    imageId: 'int',
    locationX: 'float',
    locationY: 'float',
    addMessage: 'string',
  },
};

// Create realm
let realm = new Realm({
  schema: [BookSchema, ProjectListSchema, ImageListSchema, SaveTagListSchema],
  schemaVersion: 1,
});

// Export the realm
export default realm;
