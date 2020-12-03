<template>
  <div>
    <el-col :span="9" style="text-align: right;">
      <el-button @click="dialogVisible=true"
                 style="text-align: right;font-weight:700;font-size: 17px;padding: 7px 10px;">点我弹框
      </el-button>
    </el-col>
    <!--弹框-->
    <el-dialog title="弹框" :visible.sync="dialogVisible" :close-on-click-modal="true" :modal="true" :show-close="true" :center="true">
      内容展示
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>
  </div>

</template>
<script>
  export default {
    data() {
      return {
        dialogVisible: false
      };
    },
    methods: {}
  };
</script>
