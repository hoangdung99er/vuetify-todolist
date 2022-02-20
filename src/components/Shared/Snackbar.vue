<template>
 <v-snackbar v-model="$store.state.snackbar.show">
  {{ text }}

  <template v-slot:action="{ attrs }">
   <v-btn
    color="pink"
    text
    v-bind="attrs"
    @click="$store.commit('closeSnackbar')"
   >
    Close
   </v-btn>
  </template>
 </v-snackbar>
</template>

<script>
import { mapGetters } from "vuex";
export default {
 computed: {
  ...mapGetters(["snackbar", "text"]),
 },
};
</script>

<style lang="scss">
div.v-snack:not(.v-snack--absolute) {
 height: 100%;
}
</style>
