<template>
  <h1>Inspect your components here:</h1>
  <h2>ShareForm</h2>
  <share-form :open="true"></share-form>
  <!-- <h2>BaseCard</h2>
  <base-card modal="false">
    <template #header>The header</template>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis ad corrupti, asperiores rem hic in! Error laudantium totam velit neque optio reprehenderit eaque hic. Eligendi dolorum provident sapiente, non culpa quos eos laudantium? Exercitationem ullam saepe totam at cupiditate rem ducimus repellat! Dolores corrupti distinctio repellat iusto, esse aspernatur neque.
    <template
      #footer
    >The footer</template>
  </base-card>

  <h2>BaseDialog</h2>
  <base-dialog open="true">
    <template #dialogTitle>Dialog Title</template>
    <template
      #dialogBody
    >Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis ad corrupti, asperiores rem hic in! Error laudantium totam velit neque optio reprehenderit eaque hic. Eligendi dolorum provident sapiente, non culpa quos eos laudantium? Exercitationem ullam saepe totam at cupiditate rem ducimus repellat! Dolores corrupti distinctio repellat iusto, esse aspernatur neque.</template>
    <template #dialogFooter>Dialog Footer</template>
  </base-dialog>-->
</template>

<script>
import ShareForm from "../../src/components/ShareForm-options.vue"
export default {
  name: "Test",
  components: { ShareForm }
}
</script>

<style>
* {
  margin: 0px 0px;
}

:root {
  --main-bg-color: white;
  --header-bg-color: #f6f8fa;
  --link-hover-color: #248aff;
  --h1-color: #0969da;
  --border-color: rgb(208, 215, 222);
}

#app {
  /* font-family: Helvetica, Arial, sans-serif;  */
  font-family: Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #000000;
  background-color: rgb(255, 255, 255);
  padding: 0.1rem 0;
  height: 100%;
}

img.icon {
  display: block;
  margin: auto;
}
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}

div {
  box-sizing: border-box;
}

.app-header {
  display: block;
}

h1.app {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  font-size: 1.2rem;
  margin: 0 0 1.5rem 0;
  padding: 1rem 1rem 1.5rem 1rem;
  border-bottom: 1px solid var(--border-color);
  color: var(--h1-color);
  background-color: var(--header-bg-color);
}

h1 {
  font-size: 1rem;
  margin: 0rem;
  color: black;
  vertical-align: middle;
}

.list-container {
  position: absolute;
  top: 5rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 0 0.5rem;
}

input {
  background: #f6f8fa;
  border: solid 1px #d0d7de;
  border-radius: 4px;
  padding: 5px 2px 5px 5px;
  margin: 3px 5px 3px 3px;
}

input:focus {
  background: white;
  color: black;
  border: solid 1px #8fc4f8;
  border-radius: 4px;
  padding: 5px 2px 5px 5px;
  margin: 3px 5px 3px 3px;
}

button {
  font-family: "Arial" sans-serif;
  font-size: 0.8em;
  text-align: middle;
  color: rgb(255, 255, 255);
  background: rgb(45, 164, 78);
  margin: 0px 0px 0px 10px;
  padding: 5px 16px;
  border: 1px solid rgba(27, 31, 36, 0.15);
  border-radius: 6px;
  vertical-align: middle;
  cursor: pointer;
}

button.lean {
  background: transparent;
  border: none;
  padding: 0;
  transition: 250ms;
}

svg {
  fill: black;
}

svg:hover {
  fill: var(--link-hover-color);
}
</style>
