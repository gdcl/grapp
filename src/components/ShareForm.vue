<template>
  <teleport to="#app">
    <base-dialog :open="open">
      <template #dialogTitle>
        <h1>Share Shopping List</h1>
      </template>
      <template #dialogBody>
        <div class="share-form">
          <form v-if="formState === 'init' || error" @submit.prevent="doShare">
            <p>Enter {{ shareToMessage() }}:</p>
            <div class="formaction">
              <label>
                <input :class="errorClass" v-model="shareTo" />
              </label>
              <button>Share</button>
              <button @click="close" class="cancel">Cancel</button>
            </div>
          </form>
          <div :class="feedbackClass" v-if="feedback" class="feedback">
            <svg
              v-if="error"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="100px"
              height="48px"
            >
              <path d="M0 0h24v24H0z" fill="none" />
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
              <path d="M0 0h24v24H0z" fill="none" />
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
              />
            </svg>

            <blockquote v-html="feedback" />
          </div>
        </div>
      </template>
      <template #dialogFooter>
        <ul class="shareselect">
          <li
            :class="shareSelectClass(item)"
            v-for="item  in getShareProviders()"
            :key="item.index"
          >
            <button :class="shareSelectClass(item)" @click="selectShare(item)">Share as {{ item }}</button>
          </li>
        </ul>
      </template>
    </base-dialog>
  </teleport>
</template>

<script>
import { ref, computed, watch } from "vue";
import { useStore } from "vuex";
import useShare from "../hooks/ShareHook";

export default {
  props: {
    open: {
      type: Boolean,
      default: false
    }
  },
  emits: ['dialog-closed'],
  setup(props, context) {
    // form control
    const formState = ref('init');
    const error = ref(false);
    const feedback = ref('');

    const errorClass = computed(() => error.value ? "forminput error" : "forminput");
    const feedbackClass = computed(() => error.value ? "feedback error" : "feedback");

    // handle to who to share to
    const shareTo = ref('');

    // items to be shared
    const store = useStore();
    const shoppingListItems = computed(() => store.getters.shoppingListItems);

    // Share hook
    const { selectedShare, selectShare, getShareProviders, shareToMessage, share } = useShare();
    console.dir(getShareProviders());

    function shareSelectClass(item) {
      return (item === selectedShare.value) ? 'shareselect selected' : 'shareselect'
    }

    function reset() {
      formState.value = "init";
      error.value = false;
      feedback.value = "";
      shareTo.value = "";
    }

    function close() {
      context.emit('dialog-closed');
      reset();
    }

    watch(shareTo, function (newVal, oldVal) {
      if (oldVal !== newVal && formState.value === "submitted") {
        formState.value = "init";
        feedback.value = "";
      }
    });

    async function doShare() {
      try {
        const result = await share(shareTo.value, shoppingListItems.value);
        formState.value = "submitted";
        error.value = false;
        console.log('share done - got back:')
        console.dir(result)
        feedback.value = `<strong>Success</strong> <p>Shopping list was shared to <em>${shareTo.value}</em>`;
        setTimeout(() => {
          close();
        }, 1500)
      } catch (shareError) {
        error.value = true;
        feedback.value = "<strong>Error</strong> <p>" + shareError;
        formState.value = "submitted";
      }
    }

    return {
      formState,
      error,
      errorClass,
      feedback,
      feedbackClass,
      shareTo,
      close,
      doShare,
      getShareProviders,
      selectShare,
      selectedShare,
      shareToMessage,
      shareSelectClass,
      shoppingListItems
    };
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

ul.shareselect {
  list-style: none;
  padding: 0;
  display: flex;
}

li.shareselect {
  flex: 1 1 0;
  background-color: #d8d9da;
  padding: 0;
  border-radius: 0px 0px 10px 10px;
  border-style: none solid solid solid;
  border-width: 1px;
  border-color: white;
}

li.shareselect.selected,
li.shareselect:hover {
  background-color: #e9e9e9;
}

button.shareselect {
  background-color: transparent;
  display: block;
  border: none;
  padding: 0;
  transition: 250ms;
  color: black;
  margin: 0.2rem auto;
  width: 100%;
  font-size: 0.9rem;
}

button.shareselect:hover,
button.shareselect.selected {
  color: var(--link-hover-color);
}
</style>