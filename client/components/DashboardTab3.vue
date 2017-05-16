<template>
    <div style="padding: 16px;">
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

         <reveal v-model="showReveal">
            <div class="col-md-fluid-10">
                <cards>
                    <div class="font-title utm-background color-white font-center font-light" style="padding: 8px">Participant</div>
                    <cards-content-scrollbar>
                        <list class="hover" :dense="true" v-if="selectedEvent" style="margin: 0 -12px">
                            <list-item v-for="(opt, index) in selectedEvent.enrollId">
                                <span slot="left">
                                    <icon name="account-circle"></icon>
                                    <!--<checkbox v-model="options[index].option"></checkbox>-->
                                </span>
                                <div class="font-body2 no-margin">{{userFromId(opt).profile.name}}</div>
                                <div class="color-grey-700">{{userFromId(opt).username}}</div>
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
                this.showReveal = true;
                this.selectedId = id;
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
                        return [this.selectedEvent.enrollId];
                    }

                    return [];
                },
            },
            events() {
                return Event.find({},{sort:{dateStart: 1}});
            },
            
        },
        
    }
</script>