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
                            </span> Book
                        </list-item>
                    </list>
                </div>
            </cards>

            <div class="row has-small-gutter" v-if="time">
                <div class="col-xs-fluid-24">
                    <div class="font-headline">Court Lists</div>
                </div>
                <div class="col-xs-fluid-12" v-for="court in courts" v-ripple>
                    <cards :class="{'background-green': court.available, 'background-grey': !court.available}">
                        <cards-content>
                            <div v-if="court.available" @click="bookCourt(court.id)" class="font-center font-display1 no-margin color-white">{{court.id}}</div>
                            <div v-else class="font-center font-display1 no-margin color-white">{{court.id}}</div>
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
                courts: []
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
        },
        methods: {
            bookCourt(court) {
                let time = this.availableTime.find(x => x.value === this.time);
                let todayDate=  moment().format("DD MMMM YYYY");
                this.$confirmation.run(`Are you sure to book Court ${court} at ${time.name}, ${todayDate}?`, ()=> {
                    let book = new Booking();
                    book.callMethod("create", "Basketball", time.value, court, (err, result) => {
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
        meteor: {
            subscribe:{
                "bookingByDateTime"() {
                    return ["Basketball", this.time];
                }
            },
            books() {
                this.courts = [];
                
                for (let i = 1; i <= 4; i++) {
                    let book = Booking.findOne({time: this.time, number: i});
                    let available = true;

                    if (book) {
                        available = false;
                    }
                    this.courts.push({
                        id: i,
                        available,
                    })
                }
                return Booking.find();
            }
        },
    }
</script>