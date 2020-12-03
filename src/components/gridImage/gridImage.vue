<template>
  <div class="grid" id="grid" >
    <photo-card img="../../../static/jq22-1.png" link="#"></photo-card>
    <photo-card img="../../../static/jq22-2.png" link="#"></photo-card>
    <photo-card img="../../../static/jq22-3.png" link="#"></photo-card>
    <photo-card img="../../../static/jq22-4.png" link="#"></photo-card>
    <photo-card img="../../../static/jq22-4.png" link="#"></photo-card>
    <photo-card img="../../../static/jq22-3.png" link="#"></photo-card>
    <photo-card img="../../../static/jq22-2.png" link="#"></photo-card>
    <photo-card img="../../../static/jq22-1.png" link="#"></photo-card>
  </div>
</template>

<script>
  import photoCard from "./singleImage";
  import "../../../static/style.css"

  export default {
    name: "grid",
    components: {
      photoCard
    }
  }
</script>

<style scoped>

</style>
