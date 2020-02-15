<template>
  <v-col md="4" offset-md="4" class="text-center">
    <div class="text-left">
      <v-btn class="my-3" color="primary" :to="{ name: 'participant'}">Back</v-btn>
    </div>
    <v-card class="mx-auto">
      <v-alert v-if="error" type="error">Wrong data</v-alert>
      <v-card-text>
        <v-form ref="form">
          <div class="headline">AdminPanel</div>
          <v-text-field label="Email" v-model="admin.email"></v-text-field>
          <v-text-field label="Password" v-model="admin.password" type="password"></v-text-field>
          <v-btn color="primary" @click="loginAdmin(admin)">Sign in</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
export default {
  data() {
    return {
      admin: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    loginAdmin(admin) {
      this.$store.dispatch("loginAdmin", admin).then(() => {
        if (this.$store.getters.admin) {
          this.$router.push({ name: "participant" });
        }
      });
    }
  },
  computed: {
    error() {
      return this.$store.getters.error
    }
  }
};
</script>