<template>
 <div>
  <v-menu bottom left>
   <template v-slot:activator="{ on, attrs }">
    <v-btn color="primary" icon v-bind="attrs" v-on="on">
     <v-icon>mdi-dots-vertical</v-icon>
    </v-btn>
   </template>

   <v-list>
    <v-list-item v-for="(item, i) in items" :key="i" @click="handleClick(i)">
     <v-list-item-icon>
      <v-icon v-text="item.icon"></v-icon>
     </v-list-item-icon>
     <v-list-item-content>
      <v-list-item-title>{{ item.title }}</v-list-item-title>
     </v-list-item-content>
    </v-list-item>
   </v-list>
  </v-menu>
  <dialog-delete
   :task="task"
   v-if="dialogs.delete"
   @hide-dialogs="hideDialogsDelete"
  />
  <date-picker
   v-if="dialogs.dueDate"
   @hide-dialogs="hideDialogsDatePicker"
   :task="task"
   @set-date-picker="setDatePicker"
  />
  <dialog-edit
   :task="task"
   v-if="dialogs.edit"
   @hide-dialogs="hideDialogsEdit"
  />
 </div>
</template>

<script>
import DialogDelete from "@/components/Todo/Dialog/DialogDelete.vue";
import DialogEdit from "@/components/Todo/Dialog/DialogEdit.vue";
import DatePicker from "@/components/Todo/DatePicker/DatePicker.vue";

export default {
 name: "TaskMenu",
 components: {
  "dialog-delete": DialogDelete,
  "dialog-edit": DialogEdit,
  "date-picker": DatePicker,
 },
 props: ["task"],
 data: () => ({
  items: [
   {
    title: "Edit",
    icon: "mdi-pencil",
    click() {
     this.dialogs.edit = true;
    },
   },
   {
    title: "Due Date",
    icon: "mdi-calendar",
    click() {
     this.dialogs.dueDate = true;
    },
   },
   {
    title: "Delete",
    icon: "mdi-delete",
    click() {
     // "this" keyword prefer to click method not vue instance
     // -> "this" keyword now prefer to vue instance
     this.dialogs.delete = true;
    },
   },
   {
    title: "Sort",
    icon: "mdi-drag-horizontal-variant",
    click() {
     // "this" keyword prefer to click method not vue instance
     // -> "this" keyword now prefer to vue instance
     if (!this.$store.state.search) {
      this.$store.commit("toggleSorting");
     } else {
      this.$store.commit(
       "showSnackbar",
       "How TF you are to sort while searching!"
      );
     }
    },
   },
  ],
  dialogs: {
   edit: false,
   delete: false,
   dueDate: false,
  },
 }),
 methods: {
  handleClick(index) {
   // "this" keyword prefer to vue instance -> call(this)

   this.items[index].click.call(this);
  },
  hideDialogsEdit() {
   this.dialogs.edit = false;
  },
  hideDialogsDelete() {
   this.dialogs.delete = false;
  },
  hideDialogsDatePicker() {
   this.dialogs.dueDate = false;
  },
  setDatePicker() {
   this.hideDialogsDatePicker();
  },
 },
};
</script>

<style></style>
