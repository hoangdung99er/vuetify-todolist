import Vue from "vue";
import Vuex from "vuex";
import Localbase from "localbase";

const db = new Localbase("db");
db.config.debug = false;

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    snackbar: {
      show: false,
      text: "",
    },
    appTitle: process.env.VUE_APP_TITLE,
    tasks: [
      // {
      //   id: 1,
      //   title: "Wake up",
      //   done: false,
      //   dueDate: null,
      // },
      // {
      //   id: 2,
      //   title: "Scumming",
      //   done: false,
      //   dueDate: "2020-10-16",
      // },
      // {
      //   id: 3,
      //   title: "Work out",
      //   done: false,
      //   dueDate: null,
      // },
    ],
    search: null,
    sorting: false,
  },
  mutations: {
    addTask(state, payload) {
      state.tasks.push(payload);
    },
    doneTask(state, payload) {
      const task = state.tasks.filter((task) => task.id === payload)[0];
      task.done = !task.done;
    },
    deleteTask(state, payload) {
      state.tasks = state.tasks.filter((task) => task.id !== payload);
    },
    showSnackbar(state, text) {
      let timeout = 0;
      if (state.snackbar.show) {
        state.snackbar.show = false;
        timeout = 300;
      }
      setTimeout(() => {
        state.snackbar.show = true;
        state.snackbar.text = text;
      }, timeout);
    },
    closeSnackbar(state) {
      state.snackbar.show = false;
    },
    updateTaskTitle(state, payload) {
      const taskToEdit = state.tasks.find((task) => task.id === payload.id);
      taskToEdit.title = payload.title;
    },
    updateTaskDueDate(state, payload) {
      const taskToEdit = state.tasks.find((task) => task.id === payload.id);
      taskToEdit.dueDate = payload.dueDate;
    },
    setSearch(state, value) {
      state.search = value;
    },
    toggleSorting(state) {
      state.sorting = !state.sorting;
    },
    updateTask(state, payload) {
      state.tasks = payload;
    },
  },
  actions: {
    addTask({ commit }, payload) {
      db.collection("tasks")
        .add(payload)
        .then(() => {
          commit("addTask", payload);
          commit("showSnackbar", "Task Added!");
        });
    },
    doneTask({ commit, state }, payload) {
      const task = state.tasks.filter((task) => task.id === payload)[0];
      db.collection("tasks")
        .doc({ id: payload })
        .update({
          done: !task.done,
        })
        .then(() => {
          commit("doneTask", payload);
        });
    },
    deleteTask({ commit }, payload) {
      db.collection("tasks")
        .doc({ id: payload })
        .delete()
        .then(() => {
          commit("deleteTask", payload);
          commit("showSnackbar", "Task Deleted!");
        });
    },
    updateTaskTitle({ commit }, payload) {
      db.collection("tasks")
        .doc({ id: payload.id })
        .update({
          title: payload.title,
        })
        .then(() => {
          commit("updateTaskTitle", payload);
          commit("showSnackbar", "Task Updated!");
        });
    },
    updateTaskDueDate({ commit }, payload) {
      db.collection("tasks")
        .doc({ id: payload.id })
        .update({
          dueDate: payload.dueDate,
        })
        .then(() => {
          commit("updateTaskDueDate", payload);
          commit("showSnackbar", "Date Was Updated!");
        });
    },
    getTasks({ commit }) {
      db.collection("tasks")
        .get()
        .then((tasks) => {
          commit("updateTask", tasks);
        });
    },
    updateTask({ commit }, payload) {
      db.collection("tasks").set(payload);
      commit("updateTask", payload);
    },
  },
  getters: {
    text(state) {
      return state.snackbar.text;
    },
    tasksFiltered(state) {
      if (!state.search) return state.tasks;
      return state.tasks.filter((task) =>
        task.title.toLowerCase().includes(state.search.toLowerCase()),
      );
    },
  },
  modules: {},
});
