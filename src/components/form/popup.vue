<template>
  <div>
    <button type="text" @click="dialogVisible=true" class="btn btn-primary btn-sm btn-success" style="margin-top: 2px">
      更改
    </button>
    <el-dialog title="表单弹框" :visible.sync="this.dialogVisible" width="30%" :show-close=false :modal="true">
      <el-form ref="form" :model="form" label-width="70px">
        <el-form-item label="开始时间">
          <el-date-picker v-model="form.beginTime"></el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间">
          <el-date-picker v-model="form.deadline"></el-date-picker>
        </el-form-item>
        <el-form-item label="完成进度">
          <!--          <el-progress :percentage="percentage" :color="customColor"></el-progress>-->
          <el-progress :text-inside="true" :stroke-width="26" :percentage="this.form.percentage"></el-progress>
          <div style="margin-top: 15px">
            <el-button-group>
              <el-button icon="el-icon-minus" @click="decrease"></el-button>
              <el-button icon="el-icon-plus" @click="increase"></el-button>
            </el-button-group>
          </div>
        </el-form-item>
        <el-form-item label="任务描述">
          <el-input type="textarea" :rows="6" v-model="form.taskDescribe" height=200px></el-input>
        </el-form-item>

        <el-form-item label="完成情况" v-show="this.form.percentage===100">
          <el-input type="textarea" :rows="6" v-model="form.taskCompleteDescribe" height=200px
                    v-show="this.form.percentage===100"></el-input>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible=false">取 消</el-button>
        <el-button type="primary" @click="sureDialog">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        dialogVisible: false,
        showClose:false,
        form: {
          beginTime: '',
          deadline: '',
          taskDescribe: "",
          percentage: 0,
          taskCompleteDescribe: ""
        }
      };
    },
    props: {
      updateItem: Object,
    },
    methods: {
      closeDialog() {
        this.dialogVisible = false
        // this.updateItem={}

      },
      sureDialog() {
        const updateItem = this.updateItem
        updateItem.percentage = this.form.percentage
        updateItem.taskDescribe = this.form.taskDescribe
        updateItem.beginTime = this.form.beginTime
        updateItem.deadLine = this.form.deadline
        if (this.form.percentage === 100) {
          if (this.form.taskCompleteDescribe) {
            updateItem.taskCompleteDescribe = this.form.taskCompleteDescribe
          } else {
            alert("请填写完成情况呦！~")
          }
        }
        this.dialogVisible = false
        this.$emit("updateItem", updateItem)
      },
      showDetail() {
        // this.dialogVisible = true
        const updateItem = this.updateItem
        this.form.percentage = updateItem.percentage
        this.form.deadline = updateItem.deadLine
        this.form.beginTime = updateItem.beginTime
        this.form.taskDescribe = updateItem.taskDescribe
      },
      decrease() {
        const updateItem = this.updateItem
        if (this.form.percentage > 0)
          this.form.percentage -= 10
        else
          this.form.percentage = 0
      },
      increase() {
        const updateItem = this.updateItem
        if (this.form.percentage < 100)
          this.form.percentage += 10
        else
          this.form.percentage = 100
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
      }
    },
    watch: {
      updateItem: function (newValue) {
        this.updateItems = newValue
        this.showDetail()
        return;
      }
    }
  };
</script>
