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
                                    <th class="unsortable">ID</th>
                                    <th class="">Time</th>
                                    <th>ACID Id</th>
                                    <th>Court Number</th>
                                    <th>Created At</th>
                                    <!--<th class="th-action unsortable"></th>-->
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="b in books">
                                    <td></td>
                                    <td>{{b.readableTime()}}</td>
                                    <td v-if="b.user()">{{b.user().acidId()}}</td>
                                    <td>Court {{b.number}}</td>
                                    <td>{{b.createdAt | moment("DD MMMM YYYY HH:ss A")}}</td>
                                    <!--<td class="td-action">
                                        <tooltip text="View Trip">
                                            <icon-button @click="showArrivalPlacesModal(trip._id)" name="bus" v-ripple trigger-tooltip class="color-green-900"></icon-button>
                                        </tooltip>
                                        <tooltip text="View Tickets">
                                            <icon-button  name="ticket-confirmation" v-ripple trigger-tooltip class="color-primary-900"></icon-button>
                                        </tooltip>
                                    </td>-->
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
            for (let i = 9; i < 23; i++) {
                let amOrPm = " am";
                if (i > 11) {
                    amOrPm = " pm";
                }
                this.availableTime.push({
                    value: i,
                    name: i + ":00" + amOrPm,
                })
            }
            this.$nextTick(()=> {
                this.time = 9;
            })
        },
        meteor: {
            subscribe: {
                "bookingByDateTime"() {
                    return ["badminton", this.time];
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