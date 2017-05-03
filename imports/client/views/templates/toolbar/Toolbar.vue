<template>
    <span>
        <app-bar :title="title" :fixed="true" :background-color="backgroundColor + ' changing-background'" v-depth="depth">
            <div slot="left">
                <icon-button v-show="!backIcon" name="menu" v-open v-ripple="{background: '#fff'}"></icon-button>
                <icon-button v-show="backIcon" name="arrow-left" @click="backOne" v-ripple="{background: '#fff'}"></icon-button>
            </div>
            <div slot="center" v-if="searchIcon">
                <search-box v-model="value"></search-box>
            </div>
        </app-bar>
    </span>
</template>

<script>
export default {
    data() {
        return {
            value: "",
            title: "",
            backgroundColor: "blue-grey-800",
        }
    },
    head: {
        title() {
            return {
                inner: this.title,
            }
        },
    },
    computed: {
        searchIcon() {
            if(this.$route.meta.searchIcon) {
                return true;
            }
            return false;
        },
        backIcon() {
            if(this.$route.meta.backIcon) {
                return true;
            }
            return false;
        },
        depth() {
            if(this.$route.meta.depth !== undefined) {
                return this.$route.meta.depth;
            }
            return 0;
        }
    },
    methods: {
        updateTitle() {
            if (this.$route) {
                if(this.$route.matched.some(record => record.meta.pageTitle)) {
                    this.title = this.$route.meta.pageTitle
                    this.$emit('updateHead')
                }
            }
        },
        backOne() {
            this.$router.go(-1);
        }
    },
    watch: {
        value(newVal) {
            Session.set("searchValue", newVal);
        },
        "$route.meta.pageTitle"(newVal) {
            this.updateTitle();
        }
    },
    mounted() {
        this.updateTitle();
    },
    meteor: {
        changingTitleFromSession() {
            this.updateTitle();
            return Session.get("titleChangeHappen");
        },
        changingBackgroundColorFromSession() {
            if (Session.get("backgroundColorChangeHappen")) {
                this.backgroundColor = Session.get("backgroundColorChangeHappen");
            }
            return Session.get("backgroundColorChangeHappen");
        }
    }
}
</script>
