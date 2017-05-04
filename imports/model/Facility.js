import {Class} from 'meteor/jagi:astronomy';
import {Meteor} from "meteor/meteor";

export const Facility = Class.create({
    name: "Facility",
    collection: new Mongo.Collection("facilities"),
    fields: {
        name: String,
    },
    behaviors: {
        timestamp: {
            hasCreatedField: true,
            createdFieldName: 'createdAt',
            hasUpdatedField: true,
            updatedFieldName: 'updatedAt'
        },
        softremove: {
            removedFieldName: 'removed',
            hasRemovedAtField: true,
            removedAtFieldName: 'removedAt'
        }
    },
});

if (Meteor.isServer) {
    Facility.extend({
        meteorMethods: {
            create(name) {
                this.name = name;
                this.save();
            },
        }
    });

    Meteor.publishComposite('facilities', function(refresh = 0) {
        return {
            find: function() {
                return Facility.find();
            },
        };
    });

    if (!Facility.findOne()) {
        let facility = new Facility();
        facility.create("badminton");

        facility = new Facility();
        facility.create("swimming");
    }
}