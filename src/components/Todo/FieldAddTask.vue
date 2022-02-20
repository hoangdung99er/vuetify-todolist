<template>
 <v-text-field
  v-model="newTaskTitle"
  @keyup.enter="addTask"
  class="field-add-task pa-3"
  outlined
  placeholder="Add Task"
  hide-details
  clearable
 >
  <template v-slot:append>
   <v-icon @click="addTask" color="primary" :disabled="newtaskTitleInvalid"
    >mdi-plus</v-icon
   >
  </template>
 </v-text-field>
</template>

<script>
export default {
 data() {
  return {
   newTaskTitle: "",
  };
 },
 computed: {
  newtaskTitleInvalid() {
   return !this.newTaskTitle;
  },
 },
 methods: {
  addTask() {
   if (!this.newtaskTitleInvalid) {
    this.$store.dispatch("addTask", {
     id: Math.random().toString(36),
     title: this.newTaskTitle,
     done: false,
     dueDate: null,
    });
    this.newTaskTitle = "";
   }
  },
 },
};
</script>

<style lang="scss">
.field-add-task.v-input--is-focused {
 .v-input__slot {
  background: rgba(31, 94, 129, 0.5) !important;
 }
}
</style>
