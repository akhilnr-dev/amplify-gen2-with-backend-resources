// amplify/data/resource.ts

import { a, defineData, type ClientSchema } from '@aws-amplify/backend';

const schema = a.schema({
  User: a
    .model({
      name: a.string().required(),
      email: a.string().required(),
      tasks: a.hasMany('Task', 'userId'),
    })
    .authorization((allow) => [
      allow.publicApiKey(),
      allow.owner(),
    ]),
  Task: a
    .model({
      title: a.string().required(),
      description: a.string(),
      isCompleted: a.boolean().required(),
      userId: a.id().required(),
      user: a.belongsTo('User', 'userId'),
    })
    .authorization((allow) => [
      allow.publicApiKey(),
      allow.owner(),
      allow.guest().to(['read']),
    ]),
  AllTypes: a
    .model({
      string: a.string(),
      int: a.integer(),
      float: a.float(),
      boolean: a.boolean(),
      date: a.date(),
      time: a.time(),
      datetime: a.datetime(),
      timestamp: a.timestamp(),
      email: a.email(),
      json: a.json(),
      phone: a.phone(),
      url: a.url(),
      ipAddress: a.ipAddress(),
      nonModel: a.customType({
        string: a.string(),
        int: a.integer(),
        float: a.float(),
        boolean: a.boolean(),
        date: a.date(),
        time: a.time(),
        datetime: a.datetime(),
        timestamp: a.timestamp(),
        email: a.email(),
        json: a.json(),
        phone: a.phone(),
        url: a.url(),
        ipAddress: a.ipAddress(),
      }),
      enum: a.enum(['some', 'enum', 'value']),
    })
    .authorization((allow) => [
      allow.publicApiKey(),
      allow.owner(),
      allow.guest().to(['read']),
    ]),
});

// Used for code completion / highlighting when making requests from frontend
export type Schema = ClientSchema<typeof schema>;

// defines the data resource to be deployed
export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'apiKey',
    apiKeyAuthorizationMode: { expiresInDays: 30 },
  },
});
