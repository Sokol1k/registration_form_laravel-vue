import Axios from "axios";

const state = {
    userID: localStorage["userID"],
    hideParticipants: [],
    participants: [],
    serverErrors: []
};

const actions = {
    async createParticipant({ commit, dispatch }, data) {
        await Axios.post("api/store", data)
            .then(response => {
                commit("userId", response.data.userID);
                commit("serverErrors", []);
                dispatch("getAllMembers");
            })
            .catch(error => {
                commit("serverErrors", error.response.data.errors);
            });
    },
    async updateParticipant({ commit }, data) {
        var settings = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        };
        await Axios.post(`api/update/${state.userID}`, data, settings)
            .then(response => {
                state.userID = 0;
                commit("serverErrors", [])
                localStorage.removeItem("userID");
            })
            .catch(error => {
                commit("serverErrors", error.response.data.errors);
            });
    },
    async getAllMembers({ commit }) {
        await Axios.get("api/index").then(response => {
            commit("getAllMembers", response.data);
        });
    }
};

const mutations = {
    userId(state, id) {
        state.userID = id;
        localStorage["userID"] = id;
    },
    getAllMembers(state, data) {
        state.hideParticipants = data.hideParticipants;
        state.participants = data.participants;
    },
    serverErrors(state, errors) {
        state.serverErrors = errors;
    }
};

const getters = {
    userID(state) {
        return state.userID;
    },
    getAllMembers(state) {
        return state.participants;
    },
    getHideParticipants(state) {
        return state.hideParticipants;
    },
    serverErrors(state) {
        return state.serverErrors;
    }
};

export default {
    state,
    actions,
    mutations,
    getters
};
