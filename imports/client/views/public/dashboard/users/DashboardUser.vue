<template>
    <div style="height:100%">
        <tab id="tab" v-depth="1" :class="'background-' + backgroundColor + ' changing-background'">
            <tab-item v-ripple><icon name="newspaper"></icon></tab-item>
            <tab-item v-ripple><icon name="bookmark"></icon></tab-item>
            <tab-item v-ripple><icon name="access-point"></icon></tab-item>
        </tab>
        <tab-content element="#tab" :size="3" @slideChange="changeTab">
            <tab-content-item>
                <dashboard-tab1></dashboard-tab1>
            </tab-content-item>
            <tab-content-item>
                <dashboard-tab2></dashboard-tab2>
            </tab-content-item>
            <tab-content-item>
                <dashboard-tab3></dashboard-tab3>
            </tab-content-item>
        </tab-content>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                backgroundColor: "blue-grey-800",
            }
        },
        mounted() {
            this.$nextTick(()=> {
                this.defaultTitle = this.$route.meta.pageTitle;
                this.$route.meta.pageTitle = "News & Activities";
                Session.set("titleChangeHappen",this.$route.meta.pageTitle);
                Session.set("backgroundColorChangeHappen",this.backgroundColor);
            })
        },
        destroyed() {
            this.backgroundColor = "blue-grey-800";
            Session.set("backgroundColorChangeHappen",this.backgroundColor);
        },
        methods: {
            changeTab(v) {
                if (v === 0) {
                    this.$route.meta.pageTitle = "News & Activities";
                    this.backgroundColor = "blue-grey-800";
                } else if(v === 1){
                    this.$route.meta.pageTitle = "Booking Facilities";
                    this.backgroundColor = "theme";
                } else if(v === 2){
                    this.$route.meta.pageTitle = "Active Events";
                    this.backgroundColor = "pink-700";
                } 
                Session.set("titleChangeHappen",this.$route.meta.pageTitle);
                Session.set("backgroundColorChangeHappen",this.backgroundColor);
            }
        }
    }
</script>