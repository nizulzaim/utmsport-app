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
        name: String,
        location: String,
        assemblyLocation: String,
        contactNumber: String,
        imageId: String,
        userId: String,
        status: {
            type: Number,
            default: 0,
        },
        loves: {
            type: [String],
            default: [],
            optional: true,
        },
        enrollId: {type: [String], optional: true, default: []},
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
            let image = Images.findOne(this.imageId);
            if (image) {
                return image.link()
            }

            return "";
        },
        isEnroll() {
            if (this.enrollId.indexOf(Meteor.userId()) > -1) {
                return true;
            }

            return false;
        },
        isLove() {
            if (this.loves.indexOf(Meteor.userId()) > -1){
                return true;
            }

            return false;
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
                this.userId = Meteor.userId();

                if (Meteor.user().profile.userType !== 0) {
                    this.status = 0;
                } else {
                    this.status = 1;
                }

                this.dateStart = new Date(obj.dateStart.year,obj.dateStart.month, obj.dateStart.day,parseInt(obj.dateStart.hourMinute) );
                return this.save();
            },
            enroll() {
                this.enrollId.push(Meteor.userId());
                return this.save();
            },
            accept() {
                this.status = 1;
                return this.save();
            },
            loves() {
                var index = this.loves.indexOf(Meteor.userId());
                if (index >= 0) {
                    this.loves.splice(index, 1);
                } else {
                    this.loves.push(Meteor.userId());
                }
                return this.save();
            }
        },
        
    });

    Meteor.publishComposite('activeEvents', function() {
        return {
            find: function() {
                var d = new Date();
                d.setHours(0,0,0,0);
                return Event.find({status: 1,dateStart: {$gt: d}}, {sort: {dateStart: -1}});
            },
            children: [
                {
                    find: function(event) {
                        return Images.find(event.imageId).cursor;
                    },
                }
            ]
        };
    });

    Meteor.publishComposite('postedEvents', function() {
        return {
            find: function() {
                var d = new Date();
                d.setHours(0,0,0,0);
                return Event.find({userId: this.userId});
            },
            children: [
                {
                    find: function(event) {
                        return Images.find(event.imageId).cursor;
                    },
                }
            ]
        };
    });

    Meteor.publishComposite('waitingEvents', function() {
        return {
            find: function() {
                var d = new Date();
                d.setHours(0,0,0,0);
                console.log(Event.findOne({status: 0}));
                return Event.find({status: 0});
            },
            children: [
                {
                    find: function(event) {
                        return Images.find(event.imageId).cursor;
                    },
                }
            ]
        };
    });
}