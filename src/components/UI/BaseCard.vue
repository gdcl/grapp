<template>
  <div class="card">
    <div class="card-header">
      <slot name="header"></slot>
    </div>
    <div class="card-body">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
div {
  box-sizing: border-box;
}
div.card {
  flex: 1 0 20rem;
  padding: 0rem;
  box-sizing: border-box;
  border-radius: 10px 10px 10px 10px;
  border: 1px solid rgb(208, 215, 222);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.112);
  background-color: rgba(255, 255, 255, 0.892);
}

div.card-header {
  border-bottom: solid 1px rgb(208, 215, 222);
  margin: 0;
  padding: 5px 10px;
  background: #f6f8fa;
  border-radius: 10px 10px 0px 0px;
  box-sizing: border-box;
}

.standard {
  height: 45px;
}
.extended {
  height: 60px;
}

div.card-body {
  margin: 0;
  padding: 0rem 0rem;
  box-sizing: border-box;
}
</style>