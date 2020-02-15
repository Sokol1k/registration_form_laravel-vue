<template>
  <v-col md="6" offset-md="3" class="text-center">
    <div class="text-left">
      <v-btn class="my-3" color="primary" :to="{ name: 'participant'}">Back</v-btn>
    </div>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th v-if="admin" class="text-center">Hide</th>
            <th class="text-center">Photo</th>
            <th class="text-center">Full name</th>
            <th class="text-center">Report Subject</th>
            <th class="text-center">Email</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="participant in participants" :key="participant.id">
            <td v-if="admin">
              <input
                type="checkbox"
                :checked="participant.deleted_at"
                @change="hide(participant.id)"
              />
            </td>
            <td>
              <img
                :src="participant.photo ? !isNaN(participant.photo.slice(-1)) ? participant.photo : ('/storage/uploads/' + participant.photo) : '/img/def.jpg'"
                alt="Photo"
                style="width: 100px;"
              />
            </td>
            <td>{{ participant.firstname }} {{ participant.lastname }}</td>
            <td>{{ participant.report_subject }}</td>
            <td>
              <a :href="'mailto:' + participant.email">{{ participant.email }}</a>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-col>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    this.$store.dispatch("getAllMembers");
  },
  methods: {
    hide(id) {
      this.$store.dispatch("hide", id);
    }
  },
  computed: {
    participants() {
      if (this.$store.getters.admin) {
        return this.$store.getters.getHideParticipants;
      } else {
        return this.$store.getters.getAllMembers;
      }
    },
    admin() {
      return this.$store.getters.admin;
    }
  }
};
</script>