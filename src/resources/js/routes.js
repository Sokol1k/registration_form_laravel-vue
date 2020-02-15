import Vue from "vue";
import VueRouter from "vue-router";
import Allmembers from "./views/Allmembers";
import Participant from "./views/Participant";
import AdminPanel from "./views/AdminPanel";

Vue.use(VueRouter);

export default new VueRouter({
    mode: "history",
    routes: [
        {
            path: "/",
            name: "participant",
            component: Participant
        },
        {
            path: "/allmembers",
            name: "allmembers",
            component: Allmembers
        },
        {
            path: "/panel",
            name: "panel",
            component: AdminPanel
        }
    ]
});