<template>
    <div class="appbar-padding" v-wheight>
        <dashboard-user v-if="loginUser && loginUser.isUser()"></dashboard-user>
    </div>
</template>


<script>
    import {User} from "/imports/model/User";
    import DashboardUser from "./users/DashboardUser.vue";
    export default {
        components: {
            DashboardUser,
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
