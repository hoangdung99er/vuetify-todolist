<template>
 <v-app-bar-title class="text-subtitle-1 ml-4"
  ><div>{{ date }}</div>
 </v-app-bar-title>
</template>

<script>
import { format } from "date-fns";

export default {
 data() {
  return {
   date: "",
  };
 },
 methods: {
  getDate() {
   this.date = format(new Date(), "MMMM d yyyy, H:mm:ss");
   setTimeout(this.getDate, 1000);
  },
 },
 mounted() {
  this.getDate();
 },
};
</script>

<style></style>
