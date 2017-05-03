import {
    Class
} from 'meteor/jagi:astronomy';
import {
    Meteor
} from "meteor/meteor";

import {Facility} from "./Facility";
import {User} from "./User";


export const Booking = Class.create({
    name: "Booking",
    collection: new Mongo.Collection("bookings"),
    fields: {
        date: Date,
        time: Number,
        facility: String,
        number: Number,
        userId: String,
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
        readableTime() {
            let amOrPm = " am";
            if (this.time > 11) {
                amOrPm = " pm";
            }
            return this.time + ":00" + amOrPm;
        },
        user() {
            return User.findOne(this.userId);
        }
    }
});

if (Meteor.isServer) {
    Booking.extend({
        meteorMethods: {
            create(facility, time, number) {
                var d = new Date();
                d.setHours(0,0,0,0);
                let fac = Facility.findOne({name: facility});
                this.facility = fac._id;
                this.time = time;
                this.number = number;
                this.date = new Date();
                this.userId = Meteor.userId();

                if (Booking.findOne({Facility: fac._id, time, number,date: {$gt: d}})) {
                    throw new Error("Booking already exists");
                }
                return this.save();
            },
        }
    });

    Meteor.publishComposite('bookingByDateTime', function(facility, time) {
        return {
            find: function() {
                let fac = Facility.findOne({name: facility});
                let facId = fac._id;
                var d = new Date();
                d.setHours(0,0,0,0);
                return Booking.find({facility: facId, time, date: {$gt: d}});
            },
            children: [
                {
                    find: function(book) {
                        return User.find(book.userId);
                    }
                }
            ]
        };
    });
}