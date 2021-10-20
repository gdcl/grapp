<template>
  <img alt="Vue logo" src="./assets/groceries.png" />
  <TheList
    name="Saved Profile"
    direction="source"
    :items="profile_items"
    @item-select="addItem"
  />
  <TheList
    name="List for Today"
    direction="destination"
    :items="current_items"
    @item-select="removeItem"
  />
</template>

<script>
import TheList from "./components/TheList.vue";
export default {
  name: "App",
  components: {
    TheList,
  },
  data() {
    return {
      lists: {
        profile: [
          { name: "chicken strips", nr: 5 },
          { name: "wok veggies", nr: 3 },
          { name: "lemons", nr: 5 },
        ],
        current: [],
      },
    };
  },
  methods: {
    addItem(item, list) {
      const itemIdx = this.lists[list].findIndex(
        (element) => element.name === item.name
      );

      const currentItemIdx = this.current_items.findIndex(
        (element) => element.name === name
      );

      if (currentItemIdx === -1) {
        this.current_items.push({
          name: this.profile_items[itemIdx].name,
          nr: this.profile_items[itemIdx].nr,
        });
      } else {
        this.current_items[currentItemIdx].nr =
          this.current_items[currentItemIdx].nr +
          this.profile_items[itemIdx].nr;
      }
    },

    removeItem(name) {
      const itemIdx = this.current_items.findIndex(
        (element) => element.name === name
      );
      this.current_items.splice(itemIdx, 1);
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
}
</style>
