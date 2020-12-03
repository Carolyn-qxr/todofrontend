<template>
  <div id="app">
    <carousel id="imageTurn"/>
    <todoForm id="form"/>
    <grid-image style="text-align: center"/>
  </div>
</template>

<script>
  import carousel from "./components/imageTurn/imageTurn";
  import todoForm from  "./components/form/todoForm";
  import 'bootstrap/dist/css/bootstrap.min.css'
  import 'bootstrap/dist/js/bootstrap.min.js'
  import gridImage from "./components/gridImage/gridImage";
  import schedule from "./components/form/schedule";
  export default {
    name: 'App',
    data(){
      return{
      }
    },
    components: {
      carousel,
      todoForm,
      // gridImage
      schedule
    }
  }
</script>

<style>
  #form{
    margin-top: 20px;
  }
  #imageTurn{
    margin-left: 100px;
    margin-right: 100px;
    margin-top: 10px;
  }
</style>
