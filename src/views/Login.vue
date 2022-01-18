<template>
  <BaseCard :modal="false">
    <template #header>
      <h1>Please Login</h1>
    </template>
    <div class="share-form">
      <div class="formaction">
        <div class="forminput">
          <input
            type="email"
            placeholder="Email address"
            name="email"
            :class="errorClass"
            v-model="email"
          />
        </div>
        <div class="forminput">
          <input
            type="password"
            placeholder="Password"
            name="password"
            autocomplete="on"
            :class="errorClass"
            v-model="password"
          />
        </div>
        <button @click="doLogin">Login</button>
        <button @click="register">Register</button>
      </div>
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
    ...mapActions(["login", "createUser"]),

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

    async register() {
      try {
        this.error = false;
        await this.createUser({ email: this.email, password: this.password })
        // this.resetForm();
        this.feedback = "Registration was successfull, you can now log in with this user";
      }
      catch (Error) {
        this.error = true;
        this.feedback = Error.toString();
      }
    },


    resetForm() {
      this.email = "";
      this.password = "";
      this.formState = "init";
      this.feedback = "";
      this.error = false;
    }
  },

} 
</script>

<style scoped>
h1 {
  padding: 0.4rem;
}
.share-form {
  margin: 0.3rem;
  padding: 0.4rem;
}

p {
  font-size: 0.9rem;
}

.formaction {
  width: 100%;
  margin: auto;
}

.forminput {
  box-sizing: border-box;
  width: 100%;
  margin: 0.1rem auto;
  padding: 0.3rem;
}

button {
  margin: 0.2rem;
  /* padding: 0.2rem; */
}
.forminput input {
  width: 100%;
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