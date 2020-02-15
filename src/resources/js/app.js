import Vue from "vue";
import vuetify from "./vuetify";
import router from "./routes";
import store from "./store";
import VueTelInput from "vue-tel-input";

import "./googleMaps";
import "./share";

import App from "./views/App";

Vue.use(VueTelInput);

const app = new Vue({
    el: "#app",
    vuetify,
    router,
    store,
    components: { App }
});
