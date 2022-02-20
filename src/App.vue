<template>
  <v-app id="inspire">
    <v-navigation-drawer :mobile-breakpoint="768" v-model="drawer" app>
      <v-img
        src="mountains.jpg"
        height="170"
        class="pa-4 pt-7"
        gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
      >
        <v-avatar src="mountains.jpg" alt="mountains" size="70" class="mb-2" />
        <div class="white--text text-subtitle-1 font-weight-bold">My Name</div>
        <div class="white--text text-subtitle-2">User Name</div>
      </v-img>
      <!-- 
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6"> Vuetify Todo </v-list-item-title>
          <v-list-item-subtitle>
            Todo app Base on Vuetify
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item> -->

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item v-for="item in items" :to="item.to" :key="item.title" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-toolbar-title>{{ item.title }}</v-toolbar-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      :height="$route.path === '/' ? '238' : '170'"
      color="primary"
      src="mountains.jpg"
      app
      dark
      prominent
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(19,84,122,.9), rgba(128,208,199,.9)"
        ></v-img>
      </template>

      <v-container class="pa-2 header-container">
        <v-row>
          <v-app-bar-nav-icon
            @click.stop="drawer = !drawer"
          ></v-app-bar-nav-icon>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="$store.state.search"
            @input="$store.commit('setSearch', $event)"
            class="mt-1 expanding-search"
            :class="{ closed: searchClosed && !$store.state.search }"
            @focus="searchClosed = false"
            :disabled="$store.state.sorting"
            @blur="searchClosed = true"
            placeholder="Search"
            prepend-inner-icon="mdi-magnify"
            dense
            clearable
            filled
          ></v-text-field>
        </v-row>
        <v-row>
          <v-app-bar-title class="text-h4 ml-4">{{
            $store.state.appTitle
          }}</v-app-bar-title>
        </v-row>
        <v-row>
          <live-date-time />
        </v-row>
        <v-row v-if="$route.path === '/'">
          <field-add-task />
        </v-row>
      </v-container>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
      <snackbar />
    </v-main>
  </v-app>
</template>

<script>
import SearchTask from "./components/UI/SearchTask.vue";
import LiveDateTime from "./components/UI/LiveDateTime.vue";
import FieldAddTask from "@/components/Todo/FieldAddTask.vue";

export default {
  name: "App",
  components: {
    "search-task": SearchTask,
    "live-date-time": LiveDateTime,
    "field-add-task": FieldAddTask,
    snackbar: require("@/components/Shared/Snackbar.vue").default,
  },
  mounted() {
    this.$store.dispatch("getTasks");
  },
  data: () => ({
    drawer: null,
    items: [
      { title: "Todo", icon: "mdi-format-list-checks", to: "/" },
      { title: "About", icon: "mdi-help-box", to: "/about" },
    ],
    searchClosed: true,
  }),
};
</script>

<style lang="scss" scoped>
.expanding-search {
  transition: max-width 0.3s;
  .v-input__slot {
    cursor: pointer !important;
    &:before {
      border-color: unset !important;
      border-style: unset !important;
      border-width: unset !important;
    }
  }
  &.closed {
    max-width: 45px;
    &.v-input__slot {
      background: transparent !important;
    }
  }
}
.header-container {
  max-width: none !important;
}
</style>
