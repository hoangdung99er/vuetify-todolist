<template>
 <v-dialog :value="true" max-width="290">
  <v-card>
   <v-card-title class="text-h5"> Edit Task </v-card-title>
   <v-card-text
    >Edit the title of this task:
    <v-text-field @keyup.enter="saveTask" v-model="taskTitle" />
   </v-card-text>
   <v-card-actions>
    <v-spacer></v-spacer>
    <v-btn text @click="hideDialogs"> Cancel </v-btn>
    <v-btn
     color="red darken-1"
     :disabled="validateOnUpdateTaskTitle"
     text
     @click="saveTask"
    >
     Save
    </v-btn>
   </v-card-actions>
  </v-card>
 </v-dialog>
</template>

<script>
export default {
 props: ["task"],
 data() {
  return {
   taskTitle: null,
  };
 },
 emits: ["hideDialogs"],
 methods: {
  saveTask() {
   const payload = {
    id: this.task.id,
    title: this.taskTitle,
   };
   if (!this.validateOnUpdateTaskTitle) {
    this.$store.dispatch("updateTaskTitle", payload);
    this.hideDialogs();
    this.$vuetify.goTo(0, { duration: 0 });
   }
  },
  hideDialogs() {
   this.$emit("hide-dialogs");
  },
 },
 mounted() {
  this.taskTitle = this.task.title;
 },
 computed: {
  validateOnUpdateTaskTitle() {
   return !this.taskTitle || this.taskTitle === this.task.title;
  },
 },
};
</script>

<style></style>
