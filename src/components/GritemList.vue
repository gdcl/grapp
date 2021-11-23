<template>
  <base-card>
    <template v-slot:header>
      <profile-selector v-if="name === 'Selected Profile'" />
      <h1 v-else>{{ name }}</h1>
    </template>

    <div class="item">
      <gritem v-for="item in listItems" :key="item.id" :item="item"> </gritem>
      <!-- #TODO should form be a separate component or not? Maybe if we want to use 3rd party form solution.  -->
    </div>
    <div class="form">
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
        <button>New Item</button>
      </form>
    </div>
  </base-card>
</template>

<script>
import Gritem from "./Gritem.vue";
import { mapActions, mapGetters } from "vuex";
import ProfileSelector from "./ProfileSelector.vue";

export default {
  components: {
    ProfileSelector,
    Gritem,
  },
  props: {
    name: String,
    profile: Number,
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
      if (this.newName !== "") {
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
      }
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
.form {
  padding: 0px 0px;
  margin: 0.5rem 0.5rem;
}
h1 {
  display: inline-block;
  vertical-align: middle;
}
</style>
