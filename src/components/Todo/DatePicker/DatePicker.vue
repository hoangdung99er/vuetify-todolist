<template>
 <v-dialog
  ref="dialog"
  :value="true"
  :return-value.sync="date"
  persistent
  width="290px"
 >
  <v-date-picker v-model="date" scrollable>
   <v-spacer></v-spacer>
   <v-btn text color="error" @click="$emit('hide-dialogs')"> Cancel </v-btn>
   <v-btn text color="primary" :disabled="invalidDueDate" @click="saveDate">
    OK
   </v-btn>
  </v-date-picker>
 </v-dialog>
</template>

<script>
export default {
 name: "DatePicker",
 props: ["task"],
 data: () => ({
  date: null,
 }),
 mounted() {
  if (this.task.dueDate) {
   this.date = this.task.dueDate;
  }
 },
 computed: {
  invalidDueDate() {
   return this.task.dueDate === this.date;
  },
 },
 methods: {
  saveDate() {
   const payload = {
    id: this.task.id,
    dueDate: this.date,
   };
   if (!this.invalidDueDate) {
    this.$store.dispatch("updateTaskDueDate", payload);
    this.$emit("set-date-picker");
   }
  },
 },
};
</script>

<style></style>
