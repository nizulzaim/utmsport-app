import {IndexNavigation, Toolbar} from "/imports/client/template";
import Dashboard from '/imports/client/views/public/dashboard/Dashboard.vue';
import BookBadminton from '/imports/client/views/public/dashboard/users/BookBadminton.vue';
import BookSwimming from '/imports/client/views/public/dashboard/users/BookSwimming.vue';
import BookFutsal from '/imports/client/views/public/dashboard/users/BookFutsal.vue';
import BookBasketball from '/imports/client/views/public/dashboard/users/BookBasketball.vue';
import BookNetball from '/imports/client/views/public/dashboard/users/BookNetball.vue';
import MyBooking from '/imports/client/views/public/dashboard/users/MyBooking.vue';
import TodayBookingBadminton from '/imports/client/views/public/dashboard/staffs/TodayBookingBadminton.vue';
import TodayBookingBasketball from '/imports/client/views/public/dashboard/staffs/TodayBookingBasketball.vue';
import TodayBookingFutsal from '/imports/client/views/public/dashboard/staffs/TodayBookingFutsal.vue';
import TodayBookingNetball from '/imports/client/views/public/dashboard/staffs/TodayBookingNetball.vue';
import TodayBookingSwimming from '/imports/client/views/public/dashboard/staffs/TodayBookingSwimming.vue';
import CreateEvent from '/imports/client/views/public/dashboard/staffs/CreateEvent.vue';
import PostedEvents from '/imports/client/views/public/dashboard/users/PostedEvents.vue';
import AcceptEvent from '/imports/client/views/public/dashboard/staffs/AcceptEvent.vue';
import EventLists from '/imports/client/views/public/dashboard/staffs/EventLists.vue';

let routesParent = "/dashboard";
export default [{
    path: `${routesParent}/`,
    name: "Dashboard",
    meta: { fixToolbar: true, pageTitle: "Dashboard" },
    components: {
        default: Dashboard,
        toolbar: Toolbar,
        navigation: IndexNavigation,
    }
}, {
    path: `${routesParent}/booking/badminton`,
    name: "BookBadminton",
    meta: { fixToolbar: true, depth: 1, pageTitle: "Booking: Badminton" },
    components: {
        default: BookBadminton,
        toolbar: Toolbar,
        navigation: IndexNavigation,
    }
},{
    path: `${routesParent}/booking/swimming`,
    name: "BookSwimming",
    meta: { fixToolbar: true, depth: 1, pageTitle: "Booking: Swimming" },
    components: {
        default: BookSwimming,
        toolbar: Toolbar,
        navigation: IndexNavigation,
    }
}, {
    path: `${routesParent}/booking/futsal`,
    name: "BookFutsal",
    meta: { fixToolbar: true, depth: 1, pageTitle: "Booking: Futsal" },
    components: {
        default: BookFutsal,
        toolbar: Toolbar,
        navigation: IndexNavigation,
    }
},{
    path: `${routesParent}/booking/netball`,
    name: "BookNetball",
    meta: { fixToolbar: true, depth: 1, pageTitle: "Booking: Netball" },
    components: {
        default: BookNetball,
        toolbar: Toolbar,
        navigation: IndexNavigation,
    }
},{
    path: `${routesParent}/booking/basketball`,
    name: "BookBasketball",
    meta: { fixToolbar: true, depth: 1, pageTitle: "Booking: Basketball" },
    components: {
        default: BookBasketball,
        toolbar: Toolbar,
        navigation: IndexNavigation,
    }
},{
    path: `${routesParent}/today-booking/badminton`,
    name: "TodayBookingBadminton",
    meta: { fixToolbar: true, depth: 1, pageTitle: "Today Booking Badminton" },
    components: {
        default: TodayBookingBadminton,
        toolbar: Toolbar,
        navigation: IndexNavigation,
    }
}, {
    path: `${routesParent}/today-booking/futsal`,
    name: "TodayBookingFutsal",
    meta: { fixToolbar: true, depth: 1, pageTitle: "Today Booking Futsal" },
    components: {
        default: TodayBookingFutsal,
        toolbar: Toolbar,
        navigation: IndexNavigation,
    }
}, {
    path: `${routesParent}/today-booking/netball`,
    name: "TodayBookingNetball",
    meta: { fixToolbar: true, depth: 1, pageTitle: "Today Booking Netball" },
    components: {
        default: TodayBookingNetball,
        toolbar: Toolbar,
        navigation: IndexNavigation,
    }
}, {
    path: `${routesParent}/today-booking/Basketball`,
    name: "TodayBookingBasketball",
    meta: { fixToolbar: true, depth: 1, pageTitle: "Today Booking Basketball" },
    components: {
        default: TodayBookingBasketball,
        toolbar: Toolbar,
        navigation: IndexNavigation,
    }
}, {
    path: `${routesParent}/today-booking/swimming`,
    name: "TodayBookingSwimming",
    meta: { fixToolbar: true, depth: 1, pageTitle: "Today Booking Swimming" },
    components: {
        default: TodayBookingSwimming,
        toolbar: Toolbar,
        navigation: IndexNavigation,
    }
},
{
    path: `${routesParent}/event-lists`,
    name: "EventLists",
    meta: { fixToolbar: true, depth: 1, pageTitle: "Events" },
    components: {
        default: EventLists,
        toolbar: Toolbar,
        navigation: IndexNavigation,
    }
}, {
    path: `${routesParent}/create-event`,
    name: "CreateEvent",
    meta: { fixToolbar: true, depth: 1, pageTitle: "Create Event" },
    components: {
        default: CreateEvent,
        toolbar: Toolbar,
        navigation: IndexNavigation,
    }
}, {
    path: `${routesParent}/my-booking`,
    name: "MyBooking",
    meta: { fixToolbar: true, depth: 1, pageTitle: "My Booking" },
    components: {
        default: MyBooking,
        toolbar: Toolbar,
        navigation: IndexNavigation,
    }
},{
    path: `${routesParent}/posted-events`,
    name: "Posted Events",
    meta: { fixToolbar: true, depth: 1, pageTitle: "Posted Events" },
    components: {
        default: PostedEvents,
        toolbar: Toolbar,
        navigation: IndexNavigation,
    }
},  {
    path: `${routesParent}/events-waiting`,
    name: "AcceptEvent",
    meta: { fixToolbar: true, depth: 1, pageTitle: "Accept Events" },
    components: {
        default: AcceptEvent,
        toolbar: Toolbar,
        navigation: IndexNavigation,
    }
},  ];
