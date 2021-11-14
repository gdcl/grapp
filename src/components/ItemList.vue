<template>
  <base-card>
    <h1>{{ name }}</h1>
    <!--#TODO #15 refactor profile selector into component common to both itemlists -->
    <div v-if="profiles && profiles!='none' &&  profiles.length > 0">
      <select @change="$emit('update:activeProfileId', $event.target.value)">
        <option
          v-for="prf in profiles"
          :value="prf.id"
          :key="prf.id"
          :selected="prf.id === activeProfileId"
        >
          {{ prf.name }}
        </option>
      </select>
    </div>
    <!-- #TODO #16 refactor profile creation as a component. 
         Should it be composed inside of ItemList or also be a more common component -->
    <form v-if="profiles!=='none'" @submit.prevent="submitNewProfile">
      <button>Add new</button>
      <input type="text" name="newprofile" size="8" v-model="newProfile" />
    </form>
    <ul>
      <li v-for="item in items" :key="item.id">
        <!-- #TODO #17 create individual item component -->
        <button @click.prevent="$emit('select-item', item)">
          {{ action }}
        </button>
        <button @click.prevent="$emit('increase-item', item)">+1</button>
        <button @click.prevent="$emit('decrease-item', item)">-1</button>
        <span class="name"> {{ item.name }}: </span>
        <span> {{ item.quantity }} </span>
        <span> {{ item.unit }} </span>
      </li>
      <!-- #TODO should form be a separate component or not? Maybe if we want to use 3rd party form solution.  -->
      <form @submit.prevent="submitNewItem">
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
    </ul>
  </base-card>
</template>

<script>
export default {
  props: ["name", "activeProfileId", "profiles", "items"],
  emits: [
    "select-item",
    "increase-item",
    "decrease-item",
    "new-item",
    "new-profile",
    "update:activeProfileId",
  ],
  data() {
    return {
      newName: "",
      newQty: 1,
      newUnit: "",
      newProfile: "",
    };
  },
  computed: {
    action() {
      return this.profiles !== [] ? "Select" : "Remove";
    },
  },
  methods: {
    submitNewItem() {
      if (this.newName !== "") {
        this.$emit("new-item", {
          name: this.newName,
          quantity: this.newQty,
          unit: this.newUnit,
          profile: { id: this.activeProfileId },
        });
        this.newName = "";
        this.newQty = 1;
        this.newUnit = "";
        this.dataSubmitted = true;
      }
    },

    submitNewProfile() {
      if (this.newProfile !== "") {
        this.$emit("new-profile", this.newProfile);
        this.newProfile = "";
      }
    },
  },

  mounted() {
    if (this.profiles !== []) {
      this.$refs.inputname.focus();
    }
  },

  updated() {
    if (this.dataSubmitted) {
      this.$refs.inputname.focus();
      this.dataSubmitted = false;
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
