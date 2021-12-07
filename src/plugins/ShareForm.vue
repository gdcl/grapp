<template>
    <teleport to="#app">
        <base-dialog :open="open">
            <template v-slot:dialogTitle>
                <h1>Share Shopping List</h1>
            </template>
            <template v-slot:dialogBody>
                <div class="share-form">
                    <form v-if="formState === 'init' || error" @submit.prevent="share">
                        <label>
                            <p>Enter Phone Number:</p>
                            <input :class="errorClass" v-model="phonenr" />
                        </label>
                        <button>Share</button>
                        <button @click="close" class="cancel">Cancel</button>
                    </form>
                    <div :class="feedbackClass" v-if="feedback" class="feedback">{{ feedback }}</div>
                </div>
            </template>
        </base-dialog>
    </teleport>
</template>

<script>
import shareFactory from "./ShareProviderFactory";
import { mapGetters } from "vuex";

export default {
    props: ['open'],
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
            this.error = false;
            let nr = this.phonenr
            if (!nr.startsWith('+')) {
                nr = `+1${nr}`;
            }
            const textShare = shareFactory.create('text');
            try {
                const result = await textShare.share(nr, this.shoppingListItems);
                this.formState = "submitted";
                console.log('share done - got back:')
                console.dir(result)
                this.feedback = 'Success! Shopping list was shared to ' + this.phonenr;
                setTimeout(() => {
                    this.close();
                }, 3000)
            } catch (error) {
                this.error = true;
                this.feedback = error;
                this.formState = "init";

            }
        }
    }
}
    // watch: {
    //     apiResult(newResult, oldResult) {
    //         if (newResult.success) {
    //             setTimeout(this.close(), 1000);
    //         }
    //         console.debug(oldResult);
    //     }
    // }


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

input.forminput {
    margin-left: 0;
}

input.error {
    margin-left: 0;
    background-color: rgba(232, 180, 180, 0.338);
    border: 1px solid red;
}

div.feedback {
    margin: 0.5rem 0;
    padding: 0.5rem;
    border: 1px solid blue;
    border-radius: 10px;
    font-size: 0.9rem;
}
div.error {
    margin: 0.5rem 0;
    padding: 0.5rem;
    border: 1px solid red;
    border-radius: 10px;
    font-size: 0.9rem;
}

button.cancel {
    background-color: white;
    color: inherit;
    border: 1px solid rgb(160, 160, 160);
}
</style>