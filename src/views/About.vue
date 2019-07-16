<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>
<script>
export default {
  name: 'about',
  optional(to, from) {
    console.log('Optional hook in About.vue');
  },
  required(to, from) {
    return new Promise(((resolve, reject) => {
      setTimeout(() => {
        console.log('Required hook in About.vue');
        resolve();
      }, 3000);
    }));
  },
};
</script>
