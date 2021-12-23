<template>
  <teleport to="#app">
    <base-dialog :open="open">
      <template #dialogTitle>
        <h1>Share Shopping List</h1>
      </template>
      <template #dialogBody>
        <div class="share-form">
          <form
            v-if="formState === 'init' || error"
            @submit.prevent="share"
          >
            <p>Enter Phone Number:</p>
            <div class="formaction">
              <label>
                <input
                  :class="errorClass"
                  v-model="phonenr"
                >
              </label>
              <button>Share</button>
              <button
                @click="close"
                class="cancel"
              >
                Cancel
              </button>
            </div>
          </form>
          <div
            :class="feedbackClass"
            v-if="feedback"
            class="feedback"
          >
            <svg
              v-if="error"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="100px"
              height="48px"
            >
              <path
                d="M0 0h24v24H0z"
                fill="none"
              />
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
              />
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="48px"
              height="48px"
            >
              <path
                d="M0 0h24v24H0z"
                fill="none"
              />
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
              />
            </svg>

            <blockquote v-html="feedback" />
          </div>
        </div>
      </template>
    </base-dialog>
  </teleport>
</template>

<script>
import shareFactory from "./ShareProviderFactory";
import { mapGetters } from "vuex";

export default {
  props: {
    open: {
      type: Boolean,
      default: false
    }
  },
  emits: ['dialog-closed'],
  data() {
    return {
      phonenr: "",
      formState: "init",
      error: false,
      feedback: ""
    }
  },
  computed: {
    ...mapGetters(['shoppingListItems']),
    errorClass() {
      return this.error ? "forminput error" : "forminput"
    },
    feedbackClass() {
      return this.error ? "feedback error" : "feedback"
    }
  },
  methods: {
    reset() {
      this.phonenr = "";
      this.formState = "init";
      this.error = false;
      this.feedback = "";
    },

    close() {
      this.$emit('dialog-closed');
      this.reset();
    },

    async share() {
      let nr = this.phonenr
      if (!nr.startsWith('+')) {
        nr = `+1${nr}`;
      }
      const textShare = shareFactory.create('text');
      try {
        const result = await textShare.share(nr, this.shoppingListItems);
        this.formState = "submitted";
        this.error = false;
        console.log('share done - got back:')
        console.dir(result)
        this.feedback = `<strong>Success</strong> <p>Shopping list was shared to <em>${this.phonenr}</em>`;
        setTimeout(() => {
          this.close();
        }, 1500)
      } catch (error) {
        this.error = true;
        this.feedback = "<strong>Error</strong> <p>" + error;
        this.formState = "submitted";

      }
    }
  },
  watch: {
    phonenr(oldVal, newVal) {
      if (oldVal !== newVal && this.formState === "submitted") {
        this.formState = "init";
        this.feedback = "";
      }
    }
  }
}

</script>

<style scoped>
h1 {
  padding: 0.4rem;
}
.share-form {
  margin: 0.5rem;
  padding: 0.5rem;
}

p {
  font-size: 0.9rem;
}

.formaction {
  display: flex;
  align-items: center;
}

input.forminput {
  margin-left: 0;
}

input.error {
  margin-left: 0;
  background-color: rgba(244, 190, 190, 0.4);
  border: 1px solid red;
}

div.feedback {
  display: flex;
  flex-direction: row;
  align-content: center;
  align-items: center;
  gap: 0.5rem;
  justify-content: flex-start;
  margin: 0.5rem 0;

  padding: 0.5rem;
  border: 1px solid rgb(45, 164, 78);
  border-radius: 8px;
  font-size: 0.9rem;
  background-color: white;
}

div.feedback svg {
  fill: rgb(45, 164, 78);
}

div.error {
  border: 1px solid red;
}

div.error svg {
  fill: #cc0000;
}

button.cancel {
  background-color: white;
  color: inherit;
  border: 1px solid rgb(160, 160, 160);
}
</style>