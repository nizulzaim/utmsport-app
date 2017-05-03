import {
    Class
} from 'meteor/jagi:astronomy';
import {
    Meteor
} from "meteor/meteor";

import {Images} from "./Images";

export const Event = Class.create({
    name: "Event",
    collection: new Mongo.Collection("events"),
    fields: {
        dateStart: Date,
        dateEnd: {
            type: Date,
            optional: true,
        },
        location: String,
        assemblyLocation: String,
        contactNumber: String,
        imageId: String,
        enrollId: [String],
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
    helpers: {
        getImageLink() {
            let image = Image.findOne(this.imageId);
            return image._downloadRoute + "/images/" + image._id + "/original/" + image._id + "." + image.extension;
        }
    }
});

if (Meteor.isServer) {
    Event.extend({
        meteorMethods: {
            create(obj) {
                this.name= obj.name;
                this.location = obj.location;
                this.assemblyLocation = obj.assemblyLocation;
                this.contactNumber = obj.contactNumber;
                this.imageId = obj.imageId;

                this.dateStart = new Date(obj.dateStart.year,obj.dateStart.month, obj.dateStart.day,parseInt(obj.dateStart.hourMinute) );
                return this.save();
            },
        }
    });

    Meteor.publishComposite('activeEvents', function() {
        return {
            find: function() {
                var d = new Date();
                d.setHours(0,0,0,0);
                return Booking.find({date: {$gt: d}}, {sort: {dateStart: -1}});
            },
            children: [
                {
                    find: function(event) {
                        return Images.find(event._id).cursor;
                    },
                }
            ]
        };
    });
}