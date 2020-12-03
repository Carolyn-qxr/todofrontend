<template>
  <div id="completeForm">
    <h3 class="h3 text-info">完成任务表</h3>
    <table class="table table-bordered table-hover">
      <tr class="text-danger">
        <th class="text-center">序号</th>
        <th class="text-center">任务标题</th>
        <th class="text-center">创建人</th>
        <th class="text-center">任务描述</th>
        <th class="text-center">开始日期</th>
        <th class="text-center">截止日期</th>
        <th class="text-center">完成情况</th>
        <th class="text-center">操作</th>
      </tr>
      <tr id="doingtr" class="text-center" v-for="(item,index) in completeList" :key="index" @click="getDetail($event)"
          :itemId="index">
        <td>{{index+1}}<span v-show="item.taskLevel=='import'" style="color: red">*</span></td>
        <td>{{item.title}}</td>
        <td>{{item.createMan}}</td>
        <td v-if="item.taskDescribe.length<=5" :key="3">{{item.taskDescribe}}</td>
        <el-button v-else type="text" @click="open" :key="4"><span @click="clickItem=item.taskDescribe">详情</span></el-button>
        <td>{{item.beginTime}}</td>
        <td v-bind:class="bindTimeStyle(index)">{{item.deadLine}}</td>
        <td v-if="item.taskCompleteDescribe.length<=5" :key="1">{{item.taskCompleteDescribe}}</td>
        <el-button v-else type="text" @click="open1" :key="2"><span @click="clickItem1=item.taskCompleteDescribe">详情</span>
        </el-button>
        <td :index="index">
          <button class="btn btn-primary btn-sm" data-toggle="modal" data-target="#layer"
                  @click="deleteItem(index)">删除
          </button>
          <!--          <popup :updateItem="updateItem" @updateItem="changeItemData($event)"/>-->
        </td>
      </tr>
      <tr v-show="completeList.length!=0">
        <td colspan="8" class="text-right">
          <button class="btn btn-danger btn-sm" @click="deleteItem(-66)" data-toggle="modal" data-target="#layer">
            删除全部
          </button>
        </td>
      </tr>
      <tr v-show="completeList.length==0">
        <td colspan="9" class="text-center text-muted">
          <p>暂无数据....</p>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
  export default {
    name: "completeForm",
    data() {
      return {
        clickItem: "",
        clickItem1: ""
      }
    },
    props: {
      completeList: Array,
      deleteComplete:Function
    },
    methods: {
      bindTimeStyle(index) {
        const doing = this.completeList[index]
        var begintime = doing.beginTime;
        var deadline = doing.deadLine;
        begintime = new Date(begintime)
        deadline = new Date(deadline)
        var now = new Date();
        const totalTime = deadline - begintime
        const remainTime = deadline - now
        var percent = remainTime / totalTime;
        if (percent > 0.75 && percent <= 1) {
          return "enough"
        } else if (percent <= 0.75 && percent > 0.1) {
          return "warning"
        } else if (percent <= 0.1) {
          return "unenough"
        } else {
          return "unbegin"
        }
      },
      deleteItem(index) {
        if (window.confirm("确定删除或完成这个已完成的任务吗？")) {
          this.deleteComplete(index)
        }
      },
      getDetail(item) {
        // console.log(item.currentTarget.getAttribute("itemid"))
        var id = item.currentTarget.getAttribute("itemid");
        this.updateItem = this.completeList[id]
        // console.log(this.updateItem)
        return;
      },
      open1() {
        this.$alert(this.clickItem1, '任务完成描述详情', {
          confirmButtonText: '确定',
        });
      },
      open() {
        this.$alert(this.clickItem, '任务描述详情', {
          confirmButtonText: '确定',
        });
      }

    }
  }
</script>

<style scoped>
  .unbegin {
    color: blue;
  }

  .enough {
    color: green;
  }

  .warning {
    color: orange;
  }

  .unenough {
    color: red;
  }
</style>
