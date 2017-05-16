<template>
    <div class="appbar-padding">
        <page-container>
            <div class="row">
                <div class="col-xs-fluid-24">
                    <cards>
                        <cards-image :img="image">
                            <div class="row center-xs middle-xs" style="z-index: 100; height: 100%; width: 100%; position: absolute; top: 0; left: 0;">
                                <div class="col-xs-fluid-24">
                                    <div class="button-center-container">
                                        <raised-button @click="addFile" v-ripple><icon name="upload"></icon> {{buttonAddText}}</raised-button>
                                    </div>
                                </div>
                            </div>
                        </cards-image>
                        <input type="file" ref="inputFile" id="inputFile" @change="upload">
                        <form @submit.prevent="addEvent">
                            <cards-content>
                                <div>Event Information</div>
                                <div class="row has-gutter">
                                    <div class="col-xs-fluid-24">
                                        <textfield v-model="parse.name" placeholder="Event Name"></textfield>
                                    </div>
                                    <div class="col-xs-fluid-24">
                                        <textfield v-model="parse.location" placeholder="Event Location"></textfield>
                                    </div>
                                    <div class="col-xs-fluid-24">
                                        <textfield v-model="parse.assemblyLocation" placeholder="Assembly Location"></textfield>
                                    </div>
                                    <div class="col-xs-fluid-24">
                                        <textfield v-model="parse.contactNumber" placeholder="Contact Number"></textfield>
                                    </div>
                                </div>
                            </cards-content>
                            <divider></divider>
                            <cards-content>
                                <div>Event Start Date</div>
                                <div class="row has-gutter">
                                    <div class="col-xs-fluid-10">
                                        <dropdown-select v-model="parse.dateStart.year" label="Year">
                                            <menu-option v-for="y in possibleYears" :key="y" :value="y">{{y}}</menu-option>
                                        </dropdown-select>
                                    </div>
                                    <div class="col-xs-fluid-14">
                                        <dropdown-select v-model="parse.dateStart.month" label="Month">
                                            <menu-option v-for="(m, index) in possibleMonths" :key="index" :value="index">{{m}}</menu-option>
                                        </dropdown-select>
                                    </div>
                                    <div class="col-xs-fluid-12">
                                        <dropdown-select v-model="parse.dateStart.day" label="Day" :disabled="isDisabledStartDay">
                                            <menu-option v-for="d in possibleStartDays" :key="d" :value="d">{{d}}</menu-option>
                                        </dropdown-select>
                                    </div>
                                    <div class="col-xs-fluid-12">
                                        <dropdown-select v-model="parse.dateStart.hourMinute" label="Hours Minute">
                                            <menu-option v-for="h in possibleHour" :key="h" :value="h">{{h}}</menu-option>
                                        </dropdown-select>
                                    </div>
                                </div>
                            </cards-content>
                            <!--<divider></divider>
                            <cards-content>
                                <div>Event End Date</div>
                                <div class="row has-gutter">
                                    <div class="col-xs-fluid-6">
                                        <dropdown-select v-model="parse.dateEnd.year" label="Year">
                                            <menu-option v-for="y in possibleYears" :key="y" :value="y">{{y}}</menu-option>
                                        </dropdown-select>
                                    </div>
                                    <div class="col-xs-fluid-12">
                                        <dropdown-select v-model="parse.dateEnd.month" label="Month">
                                            <menu-option v-for="(m, index) in possibleMonths" :key="index" :value="index">{{m}}</menu-option>
                                        </dropdown-select>
                                    </div>
                                    <div class="col-xs-fluid-6">
                                        <dropdown-select v-model="parse.dateEnd.day" label="Day">
                                            <menu-option v-for="d in possibleEndDays" :key="d" :value="d">{{d}}</menu-option>
                                        </dropdown-select>
                                    </div>
                                </div>
                            </cards-content>-->
                            <divider></divider>
                            <cards-action>
                                <div class="pull-right">
                                    <color-button type="submit" class="primary" v-ripple><icon name="plus"></icon> Create</color-button>
                                </div>
                            </cards-action>
                        </form>
                    </cards>
                </div>
            </div>
        </page-container>
    </div>
</template>

<script>
    import {Event} from "/imports/model/Event";
    import {Images} from "/imports/model/Images";
    export default {
        data() {
            return {
                possibleStartDays: [],
                possibleEndDays: [],
                possibleYears: [2017, 2018],
                possibleHour: ["12:00am"],
                possibleMonths: ["January", "February", "March", "April","May",  "June", "July", "August", "September", "October", "November", "December"],
                image: "",
                parse: {
                    name: "",
                    dateStart: {year: "", month: "", day: "", hourMinute: ""},
                    dateEnd: {year: "", month: "", day: "", hourMinute: ""},
                    location: "",
                    assemblyLocation: "",
                    contactNumber: "",
                    imageId: "",
                }
            }
        },
        watch: {
            "parse.dateStart.year"(year) {
                if (this.parse.dateStart.month !== "" || year !== "") {
                    this.possibleStartDays = this.generateDays(this.parse.dateStart.month, year);
                }
            },
            "parse.dateStart.month"(month) {
                if (this.parse.dateStart.year !== "" || month !== "") {
                    this.possibleStartDays = this.generateDays(month, this.parse.dateStart.year);
                }
            },
            "parse.dateEnd.year"(year) {
                if (this.parse.dateEnd.month !== "" || year !== "") {
                    this.possibleEndDays = this.generateDays(this.parse.dateEnd.month, year);
                }
            },
            "parse.dateEnd.month"(month) {
                if (this.parse.dateEnd.year !== "" || month !== "") {
                    this.possibleEndDays = this.generateDays(month, this.parse.dateEnd.year);
                }
            }
        },
        computed: {
            isDisabledStartDay() {
                if (this.parse.dateStart.month !== "" && this.parse.dateStart.year !== ""){
                    return false;
                }

                return true;
            },
            buttonAddText() {
                if (this.image) {
                    return "Change Photo";
                }
                return "Add Photo";
            }
        },
        methods: {
            addFile() {
                this.$refs.inputFile.click();
            },
            daysInMonth(month,year) {
                return new Date(year, month + 1, 0).getDate();
            },
            generateDays(month, year) {
                let result = [];
                
                for (let i = 1; i <= this.daysInMonth(month, year); i++) {
                    result.push(i);
                }

                return result;
            },
            addEvent() {
                let parse = this.parse;

                if (!parse.imageId) {
                    return this.$snackbar.run("Please upload banner image", ()=> {}, "OK", "error");
                }

                if (!parse.name || !parse.location || !parse.assemblyLocation || !parse.contactNumber) {
                    return this.$snackbar.run("Please enter all input", ()=> {}, "OK", "error");
                }

                if (!parse.dateStart.year || parse.dateStart.month === "" || !parse.dateStart.day || !parse.dateStart.hourMinute) {
                    return this.$snackbar.run("Please enter all input", ()=> {}, "OK", "error");
                }

                let newDate = new Date(parse.dateStart.year, parse.dateStart.month, parse.dateStart.day);
                let today = new Date();
                let todayBeginning = today.beginningOfDay();

                if (todayBeginning > newDate) {
                    return this.$snackbar.run("Event date cannot be in the past", ()=> {}, "OK", "error");
                }

                let ev = new Event();

                ev.callMethod("create", parse, (err, result)=> {
                    if (err) {
                        return this.$snackbar.run("Error when creating new event: "+ err.reason, ()=> {}, "OK", "error");
                    }

                    return this.$snackbar.run("Succefully add new event", ()=> {});
                });
            },
            upload() {
                let self = this;
                let fileInput = this.$refs.inputFile;

                if (fileInput.files && fileInput.files[0]) {
                    var upload = Images.insert({
                        file: fileInput.files[0],
                        streams: 'dynamic',
                        chunkSize: 'dynamic'
                    }, false);
    
                    upload.on('start',function() {
                        // self.uploadNewData = false;
                        // setTimeout(()=> {
                        //     self.currentUpload.set(this);
                        //     self.showCardsUploader = true;
                        // }, 300);
                    });
    
                    upload.on('end', (error, fileObj) => {
                        if (error) {
                            return this.$snackbar.run('Error during upload: ' + error.reason, ()=> {}, "OK", "error");
                        } 
                        console.log(fileObj);
                        this.$snackbar.run('File "' + fileObj.name + '" successfully uploaded');
                        this.parse.imageId = fileObj._id;
                        this.image = fileObj._downloadRoute + "/images/" + fileObj._id + "/original/" + fileObj._id + "." +fileObj.extension;
                        // this.currentUpload.set(false);
                    });
                    upload.start();
                }
            }
        },
        mounted() {
            function pad (str, max) {
                str = str.toString();
                return str.length < max ? pad("0" + str, max) : str;
            }
            for (let i = 1; i < 12; i++) {
                this.possibleHour.push(pad(i) + ":00am");
            }
            this.possibleHour.push(pad(12) + ":00pm");
            for (let i = 1; i < 12; i++) {
                this.possibleHour.push(pad(i) + ":00pm");
            }
        }
    }
</script>

<style>
    #inputFile {
        display: none;
    }
</style>