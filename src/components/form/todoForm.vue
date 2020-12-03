<template>
  <div class="container" id="box">
    <button @click="isShowForm=!isShowForm" class="btn btn-primary btn-sm btn-success" style="margin-bottom: 10px">
    新建任务
    </button>
    <form-header :addDoing="addDoing" v-show="isShowForm"/>
    <hr>
    <doing-form :doingList="doingList" :deleteDoing="deleteDoing" @completeData/>
    <hr>
    <complete-form :completeList="completeList" :deleteComplete="deleteComplete"/>
  </div>
</template>

<script>
  import formHeader from "./formHeader";
  import doingForm from "./doingForm";
  import storageUtil from "../../util/storageUtil";
  import completeForm from "./completeForm";
  import $ from 'jquery'

  export default {
    name: "box",
    data() {
      return {
        doingList: storageUtil.restoreData("doingList"),
        completeList: storageUtil.restoreData("completeList"),
        isShowForm: false
      }
    },
    methods: {
      addDoing: function (task) {
        this.doingList.unshift(task)
      },
      addComplete(task) {
        this.completeList.unshift(task)
      },
      deleteDoing: function (index) {
        if (index === -66) {
          this.doingList = [];
        } else {
          if (this.doingList[index].percentage === 100) {
            this.addComplete(this.doingList[index])
            this.doingList.splice(index, 1);
          } else
            this.doingList.splice(index, 1);
        }
      },
      deleteComplete: function (index) {
        if (index === -66) {
          this.completeList = [];
        } else {
          this.completeList.splice(index, 1);
        }
      },

    },
    watch: {
      completeList: {
        deep: true,
        handler: function (data) {
          storageUtil.saveData('completeList', data)
        }
      },
      doingList: {
        deep: true,
        handler: function (data) {
          storageUtil.saveData('doingList', data)
        }
      }
    },
    components: {
      formHeader,
      doingForm,
      completeForm
    }
  }
</script>

<style scoped>
  #showForm {
    border-radius: 10px;
    background-color: #007CFC;
    padding: 5px;
    margin-bottom: 20px;
    font-family: inherit;
    color: #ffffff;
    border: 0 blue;
  }

</style>
