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
                <flat-button v-ripple class="primary" @click="register(ev)">Register</flat-button>
    
                <div class="pull-right">
                    <checkbox v-model="checkboxData" class="pink" check-icon="heart" uncheck-icon="heart-outline"></checkbox>
                </div>
            </cards-action>
        </cards>
    </div>
</template>

<script>
    import {Event} from "/imports/model/Event";
    export default {
        data() {
            return {
                checkboxData: "",
            }
        },
        methods: {
            register(obj) {
                console.log(obj.getImageLink());
            }
        },
        meteor : {
            subscribe: {
                activeEvents: [],
            },
            events() {
                return Event.find({},{sort:{dateStart: 1}});
            }
        },
        
    }
</script>