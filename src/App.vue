<template>
  <div id="nav">
    <router-link v-if="isLoggedIn" to="/">Shopping List</router-link>
    <button v-if="isLoggedIn" class="nav" @click="doLogout">Logout</button>
    <span v-if="isLoggedIn">{{ getUser() }}</span>
    <router-link v-else to="/login">Login</router-link>
  </div>
  <router-view />
</template>

<script>
import { mapActions, mapGetters } from "vuex";
//import router from "./router";
export default {
  computed: {
    ...mapGetters(['isLoggedIn']),
  },
  methods: {
    ...mapActions(['logout']),
    ...mapGetters(['getUser']),
    async doLogout() {
      await this.logout();
      this.$router.push('/login');
    }
  }
}
</script>
<style>
* {
  margin: 0px 0px;
}

:root {
  --main-bg-color: white;
  --header-bg-color: #f6f8fa;
  --link-hover-color: #248aff;
  --h1-color: #0969da;
  --border-color: rgb(208, 215, 222);
  --card-body-color: rgba(255, 255, 255, 0.892);
}

html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  width: 100vw;
  font-size: 1.2rem;
  margin: 0 0 1.5rem 0;
  padding: 1rem;
  border-bottom: 1px solid var(--border-color);
  color: var(--h1-color);
  background-color: var(--header-bg-color);
}

#nav a {
  font-weight: bold;
  /* color: #2c3e50; */
  font-size: 1.2rem;
  margin: 0;
  padding: 0 1rem;
  color: black;
  /* background-color: var(--header-bg-color); */
}

#nav a:hover {
  color: var(--link-hover-color);
}

#nav a.router-link-exact-active {
  color: var(--h1-color);
}

/* 
#app {
  font-family: Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #000000;
  background-color: rgb(255, 255, 255);
  padding: 0.1rem 0;
  height: 100%;
} */

img.icon {
  display: block;
  margin: auto;
}

div {
  box-sizing: border-box;
}

.app-header {
  display: block;
}

h1 {
  font-size: 1rem;
  margin: 0rem;
  color: black;
  vertical-align: middle;
}

.list-container {
  position: absolute;
  top: 5rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 0 0.5rem;
}

input {
  background: #f6f8fa;
  border: solid 1px #d0d7de;
  border-radius: 4px;
  padding: 5px 2px 5px 5px;
  margin: 3px 5px 3px 3px;
}

input:focus {
  background: white;
  color: black;
  border: solid 1px #8fc4f8;
  border-radius: 4px;
  padding: 5px 2px 5px 5px;
  margin: 3px 5px 3px 3px;
}

button {
  font-family: "Arial" sans-serif;
  font-size: 0.8em;
  text-align: middle;
  color: rgb(255, 255, 255);
  background: rgb(45, 164, 78);
  margin: 0px 0px 0px 10px;
  padding: 5px 16px;
  border: 1px solid rgba(27, 31, 36, 0.15);
  border-radius: 6px;
  vertical-align: middle;
  cursor: pointer;
}

button.lean {
  background: transparent;
  border: none;
  padding: 0;
  transition: 250ms;
}

button.nav {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-weight: bold;
  /* color: #2c3e50; */
  margin: 0;
  padding: 0 1rem;
  font-size: 1.2rem;
  color: black;
  background-color: transparent;
  vertical-align: inherit;
  text-decoration: underline;
  border-style: none;
}

button.nav:hover {
  color: var(--link-hover-color);
}

svg {
  fill: black;
}

svg:hover {
  fill: var(--link-hover-color);
}
</style>