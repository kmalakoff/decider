import {Mongo} from 'meteor/mongo';
export default new Mongo.Collection('voters', {idGeneration: 'MONGO'});
