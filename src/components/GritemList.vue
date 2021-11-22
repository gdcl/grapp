<template>
  <base-card>
    <h1>{{ name }}</h1>
    <div>
      <gritem v-for="item in listItems" :key="item.id" :item="item"> </gritem>
      <!-- #TODO should form be a separate component or not? Maybe if we want to use 3rd party form solution.  -->
    </div>
    <div>
      <form @submit.prevent="addNewItem">
        <input
          type="text"
          name="name"
          placeholder="name"
          v-model="newName"
          ref="inputname"
        />
        <input
          type="text"
          name="quantity"
          size="5"
          placeholder="nr"
          v-model.number="newQty"
        />
        <input
          type="text"
          name="unit"
          size="5"
          placeholder="units"
          v-model="newUnit"
        />
        <button>Add new</button>
      </form>
    </div>
  </base-card>
</template>

<script>
import Gritem from "./Gritem.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  props: {
    name: String,
    profile: Number,
  },
  components: {
    Gritem,
  },
  data() {
    return {
      newName: "",
      newQty: 1,
      newUnit: "",
      //      dataSubmitted: false,
    };
  },
  computed: {
    ...mapGetters(["getItemsByProfile", "shoppingListProfile"]),
    listItems() {
      return this.getItemsByProfile(this.profile);
    },
  },
  methods: {
    ...mapActions(["addItem"]),
    addNewItem() {
      this.addItem({
        name: this.newName,
        quantity: this.newQty,
        unit: this.newUnit,
        profile: this.profile,
      });
      this.newName = "";
      this.newQty = 1;
      this.newUnit = "";
      this.dataSubmitted = true;
      this.$refs.inputname.focus();
    },
  },

  mounted() {
    if (this.profile !== this.shoppingListProfile) {
      this.$refs.inputname.focus();
    }
  },
};

</script>
<style scoped>
h1 {
  font-size: 1rem;
}

div {
  display: inline-block;
  vertical-align: top;
  padding: 0px 0px;
  margin-right: 2rem;
}

ul {
  padding-inline-start: 0px;
  list-style: none;
}

span {
  margin-left: 5px;
}

input {
  background: lightgrey;
  border: none;
  border-radius: 5px;
  padding: 2px 2px 2px 6px;
  margin: 3px 3px;
}

input:focus {
  background: rgb(196, 237, 228);
  color: white;
  border: none;
  border-radius: 5px;
  color: rgb(3, 85, 68);
  padding: 2px 2px 2px 6px;
  margin: 3px 3px;
}

button {
  font-family: "Verdana" sans-serif;
  font-size: 0.8em;
  text-align: middle;
  color: rgba(4, 129, 101, 1);
  background: none;
  margin: 0;
  padding: 0 0 0 5px;
  border: none;
  cursor: pointer;
}
</style>
