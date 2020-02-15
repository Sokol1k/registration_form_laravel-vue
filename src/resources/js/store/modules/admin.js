import Axios from "axios";

const state = {
    admin: localStorage["admin"],
    error: false
};

const actions = {
    async loginAdmin({ commit }, date) {
        await Axios.post("api/panel", date)
            .then(response => {
                commit("noError");
                commit("login");
            })
            .catch(error => {
                commit("error");
            });
    },
    async hide({ commit }, id) {
        await Axios.post(`api/destroy/${id}`);
    }
};

const mutations = {
    login(state) {
        state.admin = true;
        localStorage["admin"] = true;
    },
    logout(state) {
        state.admin = false;
        localStorage.removeItem("admin");
    },
    error(state) {
        state.error = true;
    },
    noError(state) {
        state.error = false;
    }
};

const getters = {
    admin(state) {
        return state.admin;
    },
    error(state) {
        return state.error;
    }
};

export default {
    state,
    actions,
    mutations,
    getters
};
