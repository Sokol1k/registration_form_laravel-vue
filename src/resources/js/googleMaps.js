import Vue from "vue";
import config from './config';
import * as VueGoogleMaps from "vue2-google-maps";

Vue.use(VueGoogleMaps, {
    load: {
        key: config.googleKey,
        libraries: "places",
        language: "en"
    },
    installComponents: true
});
