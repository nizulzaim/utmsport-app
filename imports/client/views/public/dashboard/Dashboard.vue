<template>
    <div class="appbar-padding" v-wheight>
        <dashboard-user v-if="loginUser && loginUser.isUser()"></dashboard-user>
        <dashboard-staff v-if="loginUser && (loginUser.isStaff() || loginUser.isAdmin())"></dashboard-staff>
    </div>
</template>


<script>
    import {User} from "/imports/model/User";
    import DashboardUser from "./users/DashboardUser.vue";
    import DashboardStaff from "./staffs/DashboardStaff.vue";
    export default {
        components: {
            DashboardUser,
            DashboardStaff,
        },
        meteor: {
            subscribe: {
                loginUser: [],
            },
            loginUser() {
                return User.findOne(Meteor.userId());
            }
        }
    }
</script>
