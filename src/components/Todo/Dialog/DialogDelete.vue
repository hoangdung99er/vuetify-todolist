<template>
 <v-dialog :value="true" max-width="290">
  <v-card>
   <v-card-title class="text-h5"> Delete task? </v-card-title>
   <v-card-text>Are you sure you wanna delete this gosh darn task?</v-card-text>
   <v-card-actions>
    <v-spacer></v-spacer>
    <v-btn text @click="hideDialogs"> No </v-btn>
    <v-btn color="red darken-1" text @click="deleteTask(task.id)"> Yes </v-btn>
   </v-card-actions>
  </v-card>
 </v-dialog>
</template>

<script>
export default {
 props: ["task"],
 emits: ["hideDialogs"],
 methods: {
  deleteTask(id) {
   this.$store.dispatch("deleteTask", id);
  },
  hideDialogs() {
   this.$emit("hide-dialogs");
  },
 },
};
</script>

<style></style>
