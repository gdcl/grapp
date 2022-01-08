<template>
  <BaseCard :modal="false">
    <template #header>
      <h1>Login</h1>
    </template>
    <div class="share-form">
      <form v-if="formState === 'init' || error" @submit.prevent="doLogin">
        <div class="formaction">
          <label>
            Enter Email
            <input type="email" class="errorClass" v-model="email" />
          </label>
        </div>
        <div class="formaction">
          <label>
            Enter Password
            <input type="password" class="errorClass" v-model="password" />
          </label>
        </div>
        <div class="formaction">
          <button>Login</button>
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
  </BaseCard>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  data() {
    return {
      email: "",
      password: "",
      formState: "init",
      error: false,
      feedback: ""
    }
  },
  computed: {
    ...mapGetters(["apiErrors", "isLoggedIn"]),
    errorClass() {
      return this.error ? "forminput error" : "forminput";
    },
    feedbackClass() {
      return this.error ? "feedback error" : "feedback";
    }



  },
  methods: {
    ...mapActions(["login"]),
    async doLogin() {
      await this.login({ email: this.email, password: this.password })
      if (this.isLoggedIn) {
        this.$router.push('/')
        this.resetForm();
      } else {
        this.error = true;
        this.feedback = "E-mail / Password incorrect, please try again"
      }
    },

    resetForm() {
      this.email = "",
        this.password = "",
        this.formState = "init",
        this.feedback = ""
      this.error = false
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