<template>
  <div id="doingForm">
    <h3 class="h3 text-info" style="margin-top: 10px">进行任务表</h3>

    <table class="table table-bordered table-hover">
      <tr class="text-danger">
        <th class="text-center">序号</th>
        <th class="text-center">任务标题</th>
        <th class="text-center">创建人</th>
        <th class="text-center">任务描述</th>
        <th class="text-center">完成进度</th>
        <th class="text-center">开始日期</th>
        <th class="text-center">截止日期</th>
        <th class="text-center">操作</th>
      </tr>
      <tr id="doingtr" class="text-center" v-for="(item,index) in doingList" :key="index" @click="getDetail($event)"
          :itemId="index">
        <td>{{index+1}}<span v-show="item.taskLevel=='import'" style="color: red">*</span></td>
        <td>{{item.title}}</td>
        <td>{{item.createMan}}</td>
        <td v-if="item.taskDescribe.length<=5">{{item.taskDescribe}}</td>
        <el-button v-else type="text" @click="open"><span
          @click="clickItem=item.taskDescribe">详情</span></el-button>
          <td>{{item.percentage}}</td>
          <td>{{item.beginTime}}</td>
          <td v-bind:class="bindTimeStyle(index)">{{item.deadLine}}</td>
          <td :index="index">
            <button class="btn btn-primary btn-sm" data-toggle="modal" data-target="#layer"
                    @click="deleteItem(index)">删除
            </button>
            <popup :updateItem="updateItem" @updateItem="changeItemData($event)"/>
          </td>
      </tr>
      <tr v-show="doingList.length!=0">
        <td colspan="8" class="text-right">
          <button class="btn btn-danger btn-sm" @click="deleteItem(-66)" data-toggle="modal" data-target="#layer">
            删除全部
          </button>
        </td>
      </tr>
      <tr v-show="doingList.length==0">
        <td colspan="8" class="text-center text-muted">
          <p>暂无数据....</p>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
  import popup from "./popup";

  export default {
    name: "doingForm",
    data() {
      return {
        updateItem: {},
        doingListId: 0,
        clickItem:""
      }
    },
    props: {
      doingList: Array,
      deleteDoing: Function
    },
    methods: {
      showDescribeDetail() {
        alert(this.clickItem)
      },
      deleteItem(index) {
        if (this.doingList[index].percentage === 100 && this.doingList[index].taskCompleteDescribe) {
          if (window.confirm("确定删除或完成这个任务吗？")) {
            this.deleteDoing(index)
          }
        } else if (!(this.doingList[index].percentage === 100)) {
          if (window.confirm("确定删除或完成这个任务吗？")) {
            this.deleteDoing(index)
          }
        } else {
          return;
        }
      },
      updateDoing() {

      },
      bindTimeStyle(index) {
        const doing = this.doingList[index]
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
      changeItemData(value) {
        console.log(this.doingList.indexOf(value))
        if (value.percentage === 100) {
          this.deleteItem(this.doingList.indexOf(value))
          this.$emit("completeData",)
        }
      },
      getDetail(item) {
        // console.log(item.currentTarget.getAttribute("itemid"))
        var id = item.currentTarget.getAttribute("itemid");
        this.updateItem = this.doingList[id]
        // console.log(this.updateItem)
        return;
      },
      open() {
        this.$alert(this.clickItem, '任务描述详情', {
          confirmButtonText: '确定',
        });
      }
    },
    components: {
      popup
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
