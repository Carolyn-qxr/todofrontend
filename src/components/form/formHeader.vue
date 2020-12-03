<template>
  <div id="header">
    <h3 class="h3 text-info">添加任务</h3>
    <form role="form">
      <div class="form-group">
        <label for="taskTitle"><span style="color: red">*</span>任务标题:</label>
        <input type="text" id="taskTitle" class="form-control" placeholder="任务标题" v-model="taskTitle">
      </div>
      <div class="form-group" id="taskLevel">
        <label for="taskLevel"><span style="color: red">*</span>任务重要程度:</label>
        <br/>
        <input type="radio" id="normal" value="normal" v-model="level">
        <label for="normal">普通任务</label>
        <br/>
        <input type="radio" id="import" value="import" v-model="level">
        <label for="import">重要任务</label>
      </div>
      <div class="form-group">
        <label for="createMan"><span style="color: red">*</span>创建人:</label>
        <input type="text" id="createMan" class="form-control" placeholder="创建用户" v-model="createMan">
      </div>
      <div class="form-group">
        <label for="beginTime"><span style="color: red">*</span>开始时间:</label>
        <input type="date" id="beginTime" class="form-control" v-model="beginTime">
      </div>
      <div class="form-group">
        <label for="deadLine"><span style="color: red">*</span>截止时间:</label>
        <input type="date" id="deadLine" class="form-control" v-model="deadLine">
      </div>
      <div class="form-group">
        <label for="taskDescribe">任务描述:</label>
        <textarea id="taskDescribe" class="form-control" placeholder="任务描述" v-model="taskDescribe" rows="10"/>
      </div>
    </form>
    <div class="form-group" id="buttons">
      <input type="button" value="添加" id="add_button" class="btn btn-primary" @click="addDoingItem">
      <input type="reset" value="重置" id="reset_button" class="btn btn-danger">
    </div>
  </div>
</template>

<script>
  export default {
    name: "header",
    data() {
      return {
        taskTitle: '',
        createMan: '',
        beginTime: 0,
        deadLine: 0,
        taskDescribe: "",
        percentage: 0,
        level: 'normal'
      }
    },
    props: {
      addDoing: Function
    },
    methods: {
      addDoingItem() {
        const title = this.taskTitle.trim();
        const createMan = this.createMan.trim();
        var beginTime = this.beginTime;
        var deadLine = this.deadLine;
        const taskDescribe = this.taskDescribe.trim();
        const taskLevel = this.level
        const percentage = this.percentage;
        const duringTime = new Date(deadLine) - new Date(beginTime);
        // beginTime=new Date(beginTime)
        // deadLine=new Date(deadLine)
        console.log(duringTime)
        if (duringTime <= 0) {
          alert('时间填写的有问题')
          return;
        }
        if (title && createMan) {
          const task = {
            title,
            createMan,
            beginTime,
            deadLine,
            taskDescribe,
            taskLevel,
            percentage
          }
          this.addDoing(task)
        } else {
          alert("除了描述以外的任何一项都不可以为空哦~")
          return;
        }
        this.taskTitle = "";
        this.createMan = "";
        this.beginTime = 0;
        this.deadLine = 0;
        this.taskDescribe = "";
        this.percentage = 0;
        this.level = "normal"
      }
    }
  }
</script>

<style scoped>

  #header {
    border: 1px solid #DEE2E6;
    padding: 3px;
  }

  #buttons {
    text-align: center;
  }

  #reset_button, #add_button {
    margin: 20px;
  }

  #normal, #import {
    margin-left: 20px;
  }

</style>
