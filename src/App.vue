<template>
  <div id="app">
    <tiptap />
  </div>
</template>

<script>
export default {
  name: "App",
  components: {
    Tiptap: require("@/components/TipTap").default
  }
};
</script>
