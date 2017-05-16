<template>
    <scroll-bar class="flex-fill-height">
        <div v-if="loginUser">
            <router-link to="/dashboard" exact v-if="loginUser.isUser()">
                <nav-list class="nav-item">
                    <icon name="home"></icon> News & Activities
                </nav-list>
            </router-link>
            <nav-list class="nav-item" :sublist="true" v-if="loginUser.isAdmin() || loginUser.isStaff()">
                <icon name="box-shadow"></icon> Today Booking
                <span slot="sublist">
                    <router-link to="/dashboard/today-booking/badminton" v-if="loginUser.isStaff() || loginUser.isAdmin()" exact>
                        <nav-list class="nav-item">
                            <icon name="asterisk"></icon> Badminton
                        </nav-list>
                    </router-link>
                    <router-link to="/dashboard/today-booking/basketball" v-if="loginUser.isStaff() || loginUser.isAdmin()" exact>
                        <nav-list class="nav-item">
                            <icon name="asterisk"></icon> Basketball
                        </nav-list>
                    </router-link>
                    <router-link to="/dashboard/today-booking/futsal" v-if="loginUser.isStaff() || loginUser.isAdmin()" exact>
                        <nav-list class="nav-item">
                            <icon name="asterisk"></icon> Futsal
                        </nav-list>
                    </router-link>
                    <router-link to="/dashboard/today-booking/netball" v-if="loginUser.isStaff() || loginUser.isAdmin()" exact>
                        <nav-list class="nav-item">
                            <icon name="asterisk"></icon> Netball
                        </nav-list>
                    </router-link>
                </span>
            </nav-list>
            <router-link  v-if="loginUser.isAdmin() || loginUser.isUser()" to="/dashboard/create-event" exact>
                <nav-list class="nav-item">
                    <icon name="pencil"></icon> Create Event
                </nav-list>
            </router-link>
            <router-link  v-if="loginUser.isAdmin() || loginUser.isUser()" to="/dashboard/posted-events" exact>
                <nav-list class="nav-item">
                    <icon name="access-point"></icon> My Posted Events
                </nav-list>
            </router-link>
            <nav-list class="nav-item" :sublist="true" v-if="loginUser.isUser()">
                <icon name="box-shadow"></icon> Booking
                <span slot="sublist">
                    <router-link to="/dashboard/booking/badminton" exact>
                        <nav-list class="nav-item">
                            <icon name="asterisk"></icon> Badminton
                        </nav-list>
                    </router-link>
                    <router-link to="/dashboard/booking/futsal" exact>
                        <nav-list class="nav-item">
                            <icon name="asterisk"></icon> Futsal
                        </nav-list>
                    </router-link>
                    <router-link to="/dashboard/booking/netball" exact>
                        <nav-list class="nav-item">
                            <icon name="asterisk"></icon> Netball
                        </nav-list>
                    </router-link>
                    <router-link to="/dashboard/booking/basketball" exact>
                        <nav-list class="nav-item">
                            <icon name="asterisk"></icon> Basketball
                        </nav-list>
                    </router-link>
                </span>
            </nav-list>
            
            <router-link to="/dashboard/my-booking" v-if="loginUser.isUser()" exact>
                <nav-list class="nav-item">
                    <icon name="book-multiple"></icon> My Booking
                </nav-list>
            </router-link>
            <divider></divider>
            <nav-list class="nav-item" @click="logout">
                <icon name="key-remove"></icon> Logout
            </nav-list>
        </div>
    </scroll-bar>
</template>

<script>
    import {User} from "/imports/model/User";
    export default {
        methods: {
            logout() {
                Meteor.logout();
                this.$router.replace("/");
            }
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
