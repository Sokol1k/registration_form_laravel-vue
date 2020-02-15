import Vue from "vue";
import Vuex from "vuex";
import admin from "./modules/admin";
import participant from './modules/participant';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        admin,
        participant
    }
})