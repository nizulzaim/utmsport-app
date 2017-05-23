<template>
    <div class="appbar-padding">
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
                    <div class="pull-right">
                        <flat-button v-ripple class="primary" @click="accept(ev)">Accept</flat-button>
                    </div>
                </cards-action>
            </cards>
            <cards v-if="events && events.length === 0">
                <cards-content>
                    <div class="font-title font-light no-margin font-center">No Events Available</div>
                </cards-content>
            </cards>

        </div>
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
            accept(obj) {
                this.$confirmation.run("Are you sure to accept this event: " + obj.name, ()=> {
                    obj.callMethod("accept", (err, res)=> {
                        if (err) {
                            return this.$snackbar.run("Error when trying to accept this event");
                        }

                        return this.$snackbar.run("Successfully accept this event");
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
                waitingEvents: [],
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