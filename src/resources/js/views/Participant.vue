<template>
  <div>
    <v-toolbar dark>
      <v-toolbar-title>Registration Form Laravel + Vue</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn v-if="!admin" :to="{ name: 'panel' }" text>Login</v-btn>
        <v-btn v-if="admin" @click="logout()" text>Logout</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <GmapMap
      :center="{lat:34.1012441, lng:-118.3458723}"
      :zoom="18"
      map-type-id="terrain"
      style="width: 100%; height: 450px"
    >
      <GmapMarker
        key="index"
        :position="{lat:34.1012441, lng:-118.3458723}"
        :clickable="true"
        :draggable="true"
        @click="center=m.position"
      />
    </GmapMap>
    <v-col md="4" offset-md="4" class="text-center">
      <ul style="padding: 0;">
        <li style="list-style-type: none;" v-for="key in serverErrors" :key="serverErrors[key]">
          <v-alert type="error">{{key[0]}}</v-alert>
        </li>
      </ul>
      <div v-if="!showShare">
        <v-card class="mx-auto" v-if="!userID">
          <v-card-text>
            <v-form ref="form" v-model="valid">
              <div class="headline">To participate in the conference, please fill out the form</div>
              <router-link :to="{ name: 'allmembers'}">All members ({{participants.length}})</router-link>
              <v-text-field
                label="Firstname"
                v-model="create_participant.firstname"
                :rules="rules.name"
                :success="!!create_participant.firstname"
              ></v-text-field>
              <v-text-field
                label="Lastname "
                v-model="create_participant.lastname"
                :rules="rules.name"
                :success="!!create_participant.lastname"
              ></v-text-field>
              <v-menu
                v-model="date"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="create_participant.birthdate"
                    label="Birth Date"
                    :rules="rules.birthdate"
                    :success="!!create_participant.birthdate"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  :max="new Date().toISOString().substr(0, 10)"
                  v-model="create_participant.birthdate"
                  @input="date = false"
                ></v-date-picker>
              </v-menu>
              <v-text-field
                label="Report Subject"
                v-model="create_participant.report_subject"
                :rules="rules.report_subject"
                :success="!!create_participant.report_subject"
              ></v-text-field>
              <v-select
                :items="countries"
                item-text="text"
                item-value="value"
                v-model="county"
                label="Country"
                return-object
                :rules="rules.country"
                :success="!!county"
              ></v-select>
              <v-text-field
                :prefix="county ? county.countryCode : ''"
                v-mask="county ? county.mask : ''"
                label="Phone Number"
                v-model="create_participant.phone"
                :rules="rules.phone"
                :success="!!create_participant.phone"
              ></v-text-field>
              <v-text-field
                label="Email"
                v-model="create_participant.email"
                :rules="rules.email"
                :success="!!create_participant.email"
              ></v-text-field>
              <div class="text-right">
                <v-btn
                  :disabled="!valid"
                  color="primary"
                  @click="createParticipant(create_participant, county)"
                >Next</v-btn>
              </div>
            </v-form>
          </v-card-text>
        </v-card>

        <v-card class="mx-auto" v-if="userID">
          <v-card-text>
            <v-form ref="form" v-model="valid">
              <router-link :to="{ name: 'allmembers'}">All members ({{participants.length}})</router-link>
              <v-text-field
                label="Company"
                v-model="update_participant.company"
                :rules="rules.company"
                :success="!!create_participant.company"
              ></v-text-field>
              <v-text-field
                label="Position "
                v-model="update_participant.position"
                :rules="rules.position"
                :success="!!create_participant.position"
              ></v-text-field>
              <v-textarea
                auto-grow
                label="About Me"
                v-model="update_participant.about_me"
                :rules="rules.about_me"
                :success="!!create_participant.about_me"
              ></v-textarea>
              <div class="d-flex" style="align-items: center;">
                <v-btn @click="$refs.fileInput.click()">Choose photo</v-btn>
                <input
                  ref="fileInput"
                  type="file"
                  accept="image/*"
                  class="d-none"
                  @change="addImage"
                />
                <v-text-field class="ml-4" readonly label="Photo" v-model="photoName"></v-text-field>
              </div>
              <div class="text-right">
                <v-btn
                  :disabled="!valid"
                  color="primary"
                  @click="updateParticipant(update_participant)"
                >Next</v-btn>
              </div>
            </v-form>
          </v-card-text>
        </v-card>
      </div>

      <div v-if="showShare">
        <v-card class="mx-auto">
          <v-card-text>
            <v-form ref="form">
              <div class="text-left">
                <v-btn class="my-3" color="primary" @click="home()">Back</v-btn>
              </div>
              <div class="headline">Share</div>
              <router-link :to="{ name: 'allmembers'}">All members ({{participants.length}})</router-link>
              <social-sharing
                url="https://vuejs.org/"
                title="Check out this Meetup with SoCal AngularJS!"
                inline-template
              >
                <div class="share">
                  <network class="facebook" network="facebook">
                    <v-btn color="#3b5998" style="color: #fff;">Facebook</v-btn>
                  </network>
                  <network class="twitter" network="twitter">
                    <v-btn color="#00acee" style="color: #fff;">Twitter</v-btn>
                  </network>
                </div>
              </social-sharing>
            </v-form>
          </v-card-text>
        </v-card>
      </div>
    </v-col>
  </div>
</template>

<script>
import { mask } from "vue-the-mask";

export default {
  directives: {
    mask
  },
  data() {
    return {
      create_participant: {
        firstname: "",
        lastname: "",
        birthdate: "",
        report_subject: "",
        country: "",
        phone: "",
        email: ""
      },
      update_participant: {
        company: "",
        position: "",
        about_me: ""
      },
      showShare: false,
      date: false,
      valid: true,
      county: "",
      photoName: "",
      countries: [
        {
          text: "Russian",
          value: "RU",
          countryCode: "+7",
          mask: "(###) ###-##-##"
        },
        {
          text: "Ukraine",
          value: "UA",
          countryCode: "+38",
          mask: "(###) ###-##-##"
        },
        {
          text: "United States",
          value: "US",
          countryCode: "+1",
          mask: "(###) ###-##-##"
        }
      ],
      rules: {
        name: [
          v => !!v || "The field must not be empty!",
          v =>
            (v.length >= 2 && v.length <= 30) ||
            "At least 2 and no more than 30 characters!",
          v => !/^\s/.test(v) || "The word should not begin with a space!",
          v => !/\s{2}/.test(v) || "You cannot use two spaces!",
          v => !/[0-9]/.test(v) || "Do not use numbers!",
          v =>
            !/[!"#$%&'()*+,./:;<=>?@[\]^_`{|}~]/.test(v) ||
            "You cannot use punctuation marks!"
        ],
        birthdate: [v => !!v || "The field must not be empty!"],
        report_subject: [
          v => !!v || "The field must not be empty!",
          v =>
            (v.length >= 2 && v.length <= 30) ||
            "At least 2 and no more than 30 characters!"
        ],
        country: [v => !!v || "The field must not be empty!"],
        phone: [
          v => !!v || "The field must not be empty!",
          v => v.length == 15 || "Wrong phone number!"
        ],
        email: [
          v => !!v || "The field must not be empty!",
          v =>
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
              v
            ) || "Wrong mail!"
        ],
        company: [v => v.length <= 30 || "No more than 30 characters!"],
        position: [v => v.length <= 30 || "No more than 30 characters!"],
        about_me: [v => v.length <= 255 || "No more than 255 characters!"]
      }
    };
  },
  mounted() {
    this.$store.dispatch("getAllMembers");
  },
  methods: {
    createParticipant(create_participant, county) {
      create_participant.country = county.text;
      this.$store.dispatch("createParticipant", create_participant).then(() => {
        create_participant.firstname = "";
        create_participant.lastname = "";
        create_participant.birthdate = "";
        create_participant.report_subject = "";
        create_participant.country = "";
        create_participant.phone = "";
        create_participant.email = "";
        county = "";
      });
    },
    updateParticipant(update_participant) {
      var data = new FormData();
      data.append("company", update_participant.company);
      data.append("position", update_participant.position);
      data.append("about_me", update_participant.about_me);
      data.append("photo", update_participant.photo);
      this.$store.dispatch("updateParticipant", data).then(() => {
        this.showShare = true;
        update_participant.company = "";
        update_participant.position = "";
        update_participant.about_me = "";
        update_participant.photo = "";
      });
    },
    addImage(event) {
      const file = event.target.files[0];
      this.photoName = file.name;
      this.update_participant.photo = file;
    },
    home() {
      window.location.reload();
    },
    logout() {
      this.$store.commit("logout");
    }
  },
  computed: {
    userID() {
      return this.$store.getters.userID;
    },
    participants() {
      if (this.$store.getters.admin) {
        return this.$store.getters.getHideParticipants;
      } else {
        return this.$store.getters.getAllMembers;
      }
    },
    serverErrors() {
      return this.$store.getters.serverErrors;
    },
    admin() {
      return this.$store.getters.admin;
    }
  }
};
</script>