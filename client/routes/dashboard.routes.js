import {IndexNavigation, Toolbar} from "/imports/client/template";
import Dashboard from '/imports/client/views/public/dashboard/Dashboard.vue';
import BookBadminton from '/imports/client/views/public/dashboard/users/BookBadminton.vue';
import TodayBookingBadminton from '/imports/client/views/public/dashboard/staffs/TodayBookingBadminton.vue';
import CreateEvent from '/imports/client/views/public/dashboard/staffs/CreateEvent.vue';

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
}, {
    path: `${routesParent}/today-booking/badminton`,
    name: "TodayBookingBadminton",
    meta: { fixToolbar: true, depth: 1, pageTitle: "Today Booking Badminton" },
    components: {
        default: TodayBookingBadminton,
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
}, ];
