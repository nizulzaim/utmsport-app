<template>
    <page-container>
        <div class="font-headline">Active Booking</div>
        <div v-for="book in bookings" :key="book._id" >
            <cards v-if="book.status() === 'Available'">
                <cards-content>
                    <div class="font-title" v-if="book.facilityClass()">{{book.facilityClass().name}}</div>
                    <div class="font-subhead no-margin">Court No: <span class="font-light">{{book.number}}</span></div>
                    <div class="font-subhead no-margin">Date: <span class="font-light">{{book.date | moment("DD MMMM YYYY")}}</span></div>
                    <div class="font-subhead no-margin">Time: <span class="font-light">{{book.readableTime()}}</span></div>
                    <div class="font-subhead no-margin">Status: <span class="font-light">{{book.status()}}</span></div>
                </cards-content>
            </cards>
        </div>
        <cards v-if="bookings && bookings.length === 0">
            <cards-content>
                <div class="font-title font-light no-margin font-center">No Booking Available</div>
            </cards-content>
        </cards>
        
    </page-container>
</template>

<script>
    import {Booking} from '/imports/model/Booking.js';
    export default {
        meteor: {
            subscribe: {
                bookingsAvailable: [true],
            },
            bookings() {
                return Booking.find({}, {sort: {createdAt: -1}});
            }
        }
    }
</script>