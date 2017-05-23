<template>
    <div class="appbar-padding">
        <page-container>
            <div class="row center-xs" style="padding-top: 12px;">
                <div class="col-md-fluid-24">
                    <!--<div class="pull-right">
                        <router-link to="/dashboard/add-trip" class="pull-right" v-if="loginUser && loginUser.isAdmin()">
                            <raised-button class="primary"><icon name="plus"></icon> Add Schedule</raised-button>
                        </router-link>
                    </div>-->
                    <cards>
                        <cards-content>
                            <dropdown-select v-model="time" label="Time">
                                <menu-option v-for="a in availableTime" :key="a.value" :value="a.value">{{a.name}}</menu-option>
                            </dropdown-select>
                        </cards-content>
                    </cards>
                    <data-table class="sortable" v-if="$subReady && books.count()">
                        <table>
                            <thead>
                                <tr>
                                    <th class="">Time</th>
                                    <th>ACID Id</th>
                                    <th>Created At</th>
                                    <!--<th class="th-action unsortable"></th>-->
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="b in books">
                                    <td>{{b.readableTimeSwimming()}}</td>
                                    <td v-if="b.user()">{{b.user().acidId()}}</td>
                                    <td>{{b.createdAt | moment("DD MMMM YYYY HH:ss A")}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </data-table>
                    <cards v-else style="margin-top: 20px;">
                        <cards-content>
                            <div class="font-center color-grey-700 font-subhead no-margin">No Data to display</div>
                        </cards-content>
                    </cards>
                </div>
            </div>
        </page-container>
    </div>
</template>

<script>
    import {Booking} from "/imports/model/Booking";
    export default {
        data() {
            return {
                availableTime: [],
                time: "",
            }
        },
        mounted() {
            this.availableTime.push({
                value: 8,
                name: "8:30 - 10:30",
            })

            this.availableTime.push({
                value: 11,
                name: "11:00 - 13:00",
            })

            this.availableTime.push({
                value: 14,
                name: "14:00 - 16:00",
            })

            this.availableTime.push({
                value: 16,
                name: "16:30 - 18:30",
            })
            this.$nextTick(()=> {
                this.time = 8;
            })
        },
        meteor: {
            subscribe: {
                "bookingByDateTime"() {
                    return ["Swimming", this.time];
                }
            },
            books() {
                return Booking.find({}, {sort: {number: 1}});
            },
        },
        methods: {
        }
    }
</script>