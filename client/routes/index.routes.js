import {IndexNavigation, Toolbar} from "/imports/client/template";
import IndexPage from '/imports/client/views/public/Index.vue';

let routesParent = "";
export default [{
    path: `${routesParent}/`,
    name: "Index",
    meta: { fixToolbar: true, pageTitle: "Viu Doc" },
    components: {
        default: IndexPage,
    }
}, ];
