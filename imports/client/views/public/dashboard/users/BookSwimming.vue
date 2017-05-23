<template>
    <div class="appbar-padding">
        <page-container>
            <cards class="background-theme">
                <cards-content class="color-white">
                    Only today court/facilities can be book. The new booking will be open every 12.00 am for that day.
                </cards-content>
            </cards>
            <cards>
                <cards-content>
                    <div class="font-subhead no-margin">Please Select time to continue</div>
                    <div class="font-subhead no-margin" v-if="time">Total Available : <span class="font-light">{{40 - count}}</span></div>
                </cards-content>
                <divider></divider>
                <cards-content>
                    <dropdown-select v-model="time" label="Time">
                        <menu-option v-for="a in availableTime" :key="a.value" :value="a.value">{{a.name}}</menu-option>
                    </dropdown-select>
                </cards-content>
                <divider></divider>
                <div v-if="time">
                    <list class="hover">
                        <list-item>
                            <span slot="left">
                                <icon name="solid" class="color-green"></icon>
                            </span> Available
                        </list-item>
                        <list-item>
                            <span slot="left">
                                <icon name="solid" class="color-grey"></icon>
                            </span> Full
                        </list-item>
                    </list>
                </div>
            </cards>

            <div class="row has-small-gutter" v-if="time && globalAvailable">
                <div class="col-xs-fluid-24" v-for="court in courts" v-ripple>
                    <cards :class="{'background-green': court.available, 'background-grey': !court.available}">
                        <cards-content>
                            <div v-if="court.available" @click="bookCourt(court.id)" class="font-center font-display1 no-margin color-white">{{court.id}}</div>
                            <div v-else class="font-center font-display1 no-margin color-white">{{court.id}}</div>
                        </cards-content>
                    </cards>
                </div>
            </div>
            <div class="row has-small-gutter" v-if="time && !globalAvailable">
                <div class="col-xs-fluid-24">
                    <cards class="background-theme color-white">
                        <cards-content>
                            You already book for today. Only 1 court can be book by student everyday. Thank you
                        </cards-content>
                    </cards>

                    <cards class="" v-if="selectedBooks && selectedBooks.count()">
                        <div class="font-title utm-background color-white font-center font-light" style="padding: 8px">Participant</div>
                        <cards-content >
                            <list class="hover" :dense="true" style="margin: 0 -12px">
                                <div v-for="(opt, index) in selectedBooks">
                                    <list-item v-if="opt.user()">
                                        <span slot="left">
                                            <icon name="account-circle"></icon>
                                            <!--<checkbox v-model="options[index].option"></checkbox>-->
                                        </span>
                                        <div class="font-body2 no-margin">{{opt.user().profile.name}}</div>
                                        <div class="color-grey-700">{{opt.user().username}}</div>
                                    </list-item>
                                </div>
                            </list>
                        </cards-content>
                    </cards>
                </div>
            </div>
        </page-container>
        
    </div>
</template>

<script>
    import {Booking} from "/imports/model/Booking";
    import moment from "moment";
    export default {
        data() {
            return {
                availableTime: [],
                time: "",
                courts: [],
                globalAvailable: true,
                count: 0,
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
        },
        methods: {
            bookCourt(court) {
                let time = this.availableTime.find(x => x.value === this.time);
                let todayDate=  moment().format("DD MMMM YYYY");
                this.$confirmation.run(`Are you sure to book Court ${court} at ${time.name}, ${todayDate}?`, ()=> {
                    let book = new Booking();
                    book.callMethod("create", "Swimming", time.value, court, (err, result) => {
                        if(err) {
                            return this.$snackbar.run(err.reason, ()=> {}, "OK", "error");
                            // return this.$snackbar.run(`Failed when trying to book Court ${court} at ${time.name}, ${todayDate}`, ()=> {}, "OK", "error");
                        }
                        this.$snackbar.run("Successfully book court");
                    })
                }, ()=> {
                    return this.$snackbar.run("Booking cancel");
                })
            }
        },
        computed: {
            selectedBooks() {
                let test = Booking.findOne({time: this.time, userId: Meteor.userId()});

                if (!test) {
                    return null;
                }

                if (!this.time) {
                    return null;
                }
                return Booking.find({time: this.time}).fetch();
            }
        },
        meteor: {
            subscribe:{
                "bookingByDateTime"() {
                    return ["Swimming", this.time];
                }
            },
            books() {
                this.courts = [];
                let books = Booking.find();
                if (books) {
                    let b = Booking.findOne({userId: Meteor.userId()});

                    if (b) {
                        this.globalAvailable = false;
                    }
                }

                for (let i = 1; i <= 1; i++) {
                    let book = Booking.find({time: this.time});
                    let available = true;
                    if (book) {
                        this.count = book.count(); 
                    }
                    if (book && book.count() >= 40) {
                        available = false ;
                    }

                    this.courts.push({
                        id: i,
                        available,
                    })
                }
                return books;
            },
            
        },
    }
</script>