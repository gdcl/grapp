<template>
  <base-card>
    <template v-slot:header>
      <profile-selector v-if="name === 'Selected Profile'" />
      <div v-else class="shoppinglist-header">
        <h1>{{ name }}</h1>
        <div class="icon">
          <button class="lean" @click="dialogOpen = true;">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22px" height="22px">
              <path
                d="M 18 2 A 3 3 0 0 0 15 5 A 3 3 0 0 0 15.054688 5.5605469 L 7.9394531 9.7109375 A 3 3 0 0 0 6 9 A 3 3 0 0 0 3 12 A 3 3 0 0 0 6 15 A 3 3 0 0 0 7.9355469 14.287109 L 15.054688 18.439453 A 3 3 0 0 0 15 19 A 3 3 0 0 0 18 22 A 3 3 0 0 0 21 19 A 3 3 0 0 0 18 16 A 3 3 0 0 0 16.0625 16.712891 L 8.9453125 12.560547 A 3 3 0 0 0 9 12 A 3 3 0 0 0 8.9453125 11.439453 L 16.060547 7.2890625 A 3 3 0 0 0 18 8 A 3 3 0 0 0 21 5 A 3 3 0 0 0 18 2 z"
              />
            </svg>
            <!-- <img src="../../public/icons8-share-20.svg" alt="Share" /> -->
          </button>
        </div>
      </div>
    </template>
    <div class="item">
      <gritem v-for="item in listItems" :key="item.id" :item="item"></gritem>
    </div>
    <div class="form">
      <form @submit.prevent="addNewItem">
        <input type="text" name="name" placeholder="name" v-model="newName" ref="inputname" />
        <input type="text" name="quantity" size="5" placeholder="nr" v-model.number="newQty" />
        <input type="text" name="unit" size="5" placeholder="units" v-model="newUnit" />
        <button>New Item</button>
      </form>
    </div>
  </base-card>
  <share-form
    v-if="name !== 'Selected Profile'"
    :open="dialogOpen"
    @dialog-closed="dialogOpen = false"
  ></share-form>
</template>
<script>
import Gritem from "./Gritem.vue";
import { mapActions, mapGetters } from "vuex";
import ProfileSelector from "./ProfileSelector.vue";
import ShareForm from "../plugins/ShareForm.vue";

export default {
  components: {
    ProfileSelector,
    Gritem,
    ShareForm,
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
      dialogOpen: false,
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

.shoppinglist-header {
  display: flex;
  flex-direction: row;
  flex-flow: nowrap;
  justify-content: space-between;
  align-items: center;
}

h1,
.icon {
  display: inline-block;
  vertical-align: middle;
  margin: 0.2rem 0.2rem;
}
</style>
