<template>
 <div class="no-tasks">
  <div class="text-h5 primary--text">
   <v-icon color="primary" size="80"> mdi-check </v-icon>
   No Tasks
  </div>
 </div>
</template>

<script>
export default {};
</script>

<style lang="sass" scoped>
.no-tasks
  position : absolute
  left : 50%
  top : 50%
  transform : translate(-50%, -50%)
  opacity : 0.5
</style>
