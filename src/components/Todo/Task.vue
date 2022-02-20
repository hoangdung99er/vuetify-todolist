<template>
 <div>
  <v-list-item
   @click="doneTask(task.id)"
   :class="{ 'blue lighten-3': task.done }"
   :ripple="false"
   class="white"
  >
   <template #default>
    <v-list-item-action>
     <v-checkbox :input-value="task.done"></v-checkbox>
    </v-list-item-action>

    <v-list-item-content>
     <v-list-item-title
      :class="{ 'text-decoration-line-through': task.done }"
      >{{ task.title }}</v-list-item-title
     >
    </v-list-item-content>

    <v-list-item-action v-if="task.dueDate">
     <v-list-item-action-text>
      <v-icon small> mdi-calendar </v-icon>
      {{ task.dueDate | niceDate }}</v-list-item-action-text
     >
    </v-list-item-action>

    <v-list-item-action>
     <task-menu :task="task" />
    </v-list-item-action>

    <v-list-item-action v-if="$store.state.sorting">
     <v-btn class="handle" color="primary" icon>
      <v-icon>mdi-drag-horizontal-variant</v-icon>
     </v-btn>
    </v-list-item-action>
   </template>
  </v-list-item>
  <v-divider></v-divider>
 </div>
</template>

<script>
import TaskMenu from "@/components/Todo/TaskMenu.vue";
import { format } from "date-fns";

export default {
 name: "Task",
 filters: {
  niceDate(value) {
   return format(new Date(value), "MMM d yyyy");
  },
 },
 components: {
  "task-menu": TaskMenu,
 },
 props: {
  task: {
   id: {
    type: String,
    required: true,
   },
   title: {
    type: String,
    required: true,
   },
   done: {
    type: String,
    required: true,
   },
   dueDate: {
    type: Date,
    required: false,
   },
  },
 },
 methods: {
  doneTask(id) {
   this.$store.dispatch("doneTask", id);
  },
 },
};
</script>

<style lang="scss" scoped>
.sortable-ghost {
 opacity: 0;
}
.sortable-drag {
 box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}
</style>
