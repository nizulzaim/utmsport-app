<template>
    <div class="appbar-padding">
        <page-container>
            <cards v-for="ev in events">
                <cards-image :img="ev.getImageLink()" v-ripple></cards-image>
                <cards-content>
                    <div class="font-subhead no-margin">Event Date: {{ev.dateStart | moment("DD MMMM YYYY")}}</div>
                    <div class="font-subhead no-margin">Event Start Time: {{ev.dateStart | moment("HH:ss A")}}</div>
                    <div class="font-subhead no-margin">Location: {{ev.location }}</div>
                    <div class="font-subhead no-margin">Assembly Location: {{ev.assemblyLocation }}</div>
                    <div class="font-subhead no-margin">Contact Number: {{ev.contactNumber }}</div>
                </cards-content>
                <divider></divider>
                <cards-action>
                    <flat-button v-ripple class="primary" v-if="ev.isEnroll() === false" @click="register(ev)">Register</flat-button>
                    <flat-button v-ripple class="primary" v-else @click="viewParticipant(ev._id)">View Participant</flat-button>
        
                    <div class="pull-right">
                        <checkbox v-model="checkboxData" class="pink" check-icon="heart" uncheck-icon="heart-outline"></checkbox>
                    </div>
                </cards-action>
            </cards>
            <cards v-if="events && events.length === 0">
                <cards-content>
                    <div class="font-title font-light no-margin font-center">No Events Available</div>
                </cards-content>
            </cards>

            <reveal v-model="showReveal">
                <div class="col-md-fluid-10">
                    <cards>
                        <div class="font-title utm-background color-white font-center font-light" style="padding: 8px">Participant</div>
                        <cards-content-scrollbar>
                            <list class="hover" :dense="true" v-if="selectedEvent" style="margin: 0 -12px">
                                <list-item v-for="(opt, index) in enrollUsers">
                                    <span slot="left">
                                        <icon name="account-circle"></icon>
                                        <!--<checkbox v-model="options[index].option"></checkbox>-->
                                    </span>
                                    <div class="font-body2 no-margin">{{opt.profile.name}}</div>
                                    <div class="color-grey-700">{{opt.username}}</div>
                                </list-item>
                            </list>
                        </cards-content-scrollbar>
                        <divider></divider>
                        <cards-action class="cards-content">
                            <div class="pull-right">
                                <color-button class="utm-background" @click="showReveal = false" v-ripple>OK</color-button>
                            </div>
                        </cards-action>
                    </cards>
                </div>
            </reveal>
        </page-container>
    </div>
</template>

<script>
    import {Event} from "/imports/model/Event";
    import {User} from "/imports/model/User";
    export default {
        data() {
            return {
                checkboxData: "",
                showReveal: false,
                selectedId: "",
                selectedEnrollList: [],
            }
        },
        methods: {
            register(obj) {
                this.$confirmation.run("Are you sure to enroll to this event: " + obj.name, ()=> {
                    obj.callMethod("enroll", (err, res)=> {
                        if (err) {
                            return this.$snackbar.run("Error when trying to enroll to this event");
                        }

                        return this.$snackbar.run("Successfully enroll to this event");
                    })
                });
                
                // console.log(obj.getImageLink());
            },
            viewParticipant(id) {
                this.selectedId = id;
                this.showReveal = true;
                
            },
            userFromId(id) {
                return User.findOne(id);
            }
        },
        computed: {
            selectedEvent() {
                return Event.findOne(this.selectedId);
            },
            
        },
        meteor : {
            subscribe: {
                activeEvents: [],
                enrollUsers() {
                    if (this.selectedEvent) {
                        this.selectedEnrollList = this.selectedEvent.enrollId;
                        return [this.selectedEvent.enrollId];
                    }
                    return [];
                },
            },
            enrollUsers() {
                let users = User.find();
                return users;
            },
            events() {
                return Event.find({},{sort:{dateStart: 1}});
            },
        },
        
    }
</script>