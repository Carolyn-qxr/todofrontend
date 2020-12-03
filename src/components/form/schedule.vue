<template>
  <div id="box">
    <div class="body">
      <div class="dragnum">
        <span>{{startNum}}</span>
      </div>
      <div class="dragnum dragbox" @mousemove="timeMove($event)" @mouseleave="timeEnd($event)" ref="dragbox">
        <div class="progress" @click="timeClick($event)">
          <div class="progressbar" :style="{width:distance+'px',transition:'width '+transTime+'s'}">
          </div>
        </div>
        <div class="bardrag" @mousedown="timeDown($event)" @mouseup="timeEnd($event)" :style="{left:distance+'px'}">
        </div>
      </div>
      <div class="dragnum">
        <span>{{endNum}}</span>
      </div>
      <div class="nowbar">
        当前值：{{nowNum}}
      </div>
    </div>
  </div>
</template>

<script>
  import $ from "jquery"
  export default {
    name: "box",
    data() {
      return {
        pos: {},
        startX: null,
        locked: false,
        distance: 0, //当前位置
        endDistance: 0, //上次操作结束位置
        transTime: .3, //点击拖动动画
        dragWidth: 0, //进度条宽度

        startNum: 0,
        endNum: 100,
        nowNum: 0
      }
    },
    methods: {
      mousePos: function (e) {
        var pos = {};
        pos.x = e.pageX;
        this.pos = pos;
        return pos;
      },
      timeDown: function (e) { // 当鼠标指针移动到元素上方，并按下鼠标左键时
        this.transTime = 0;
        this.mousePos(e);
        this.startX = this.pos.x;
        this.locked = true;
        this.endDistance = this.distance;
        // console.log(this.pos);
      },
      timeMove: function (e) { // 当鼠标指针移动到元素上方移动时
        if (!this.locked) return;
        var pos = this.mousePos(e);
        var moveX = pos.x - this.startX;
        if (this.distance >= this.dragWidth) {
          this.distance = this.dragWidth - 10;
        } else {
          if ((this.distance <= 0 && moveX < 0) || (this.distance >= this.dragWidth && moveX > 0)) return;
          this.distance = this.endDistance + moveX;

          this.countNum(this.distance);

        }
        // console.log(moveX);
      },
      timeEnd: function (e) {
        this.transTime = .3;
        this.locked = false;
      },
      timeClick: function (e) { //点击拖动到指定位置
        var x = e.offsetX,
          moveX = x - this.distance;
        this.distance += moveX;
        this.countNum(this.distance);

      },
      countNum: function (num) {
        var len = this.endNum - this.startNum;
        var scale = Math.ceil(this.dragWidth / len);
        this.nowNum = this.startNum + Math.ceil(num / scale);
      }

    },
    mounted: function () {
      this.dragWidth = $('.dragbox').width();
      console.log(this.dragWidth)
    }
  }
</script>

<style scoped>
  * {
    margin: 0;
    padding: 0;
    list-style: none;
    /*background: #e1e0db;*/
  }

  #box {
  }

  .body {
    padding: 80px;
    width: 800px;
    height: 100px;
    margin: 0 auto;
    text-align: center;
  }

  .dragbox {
    width: 200px;
    position: relative;
    height: 20px;
    background-color: #f5f5f5;
    border-radius: 4px;
    -webkit-box-shadow: inset 0 1px 2px rgba(0, 0, 0, .1);
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, .1);
  }

  .progress {
    background: #a7a7a7;
    margin-bottom: 0px;
    height: 20px;
    margin-bottom: 20px;
    overflow: hidden;
    border-radius: 4px;
    -webkit-box-shadow: inset 0 1px 2px rgba(0, 0, 0, .1);
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, .1);
  }

  .progressbar {
    background-color: #337ab7;
    float: left;
    width: 0;
    height: 100%;
    font-size: 12px;
    line-height: 20px;
    color: #fff;
    text-align: center;
    -webkit-box-shadow: inset 0 -1px 0 rgba(0, 0, 0, .15);
    box-shadow: inset 0 -1px 0 rgba(0, 0, 0, .15);
    -webkit-transition: width .6s ease;
    -o-transition: width .6s ease;
    transition: width .6s ease;
  }

  .bardrag {
    position: absolute;
    top: -6px;
    left: 10px;
    display: inline-block;
    height: 28px;
    width: 10px;
    background-color: #337ab7;
    border: 1px solid #e1e0de;
    border-radius: 10px;
    cursor: e-resize;
  }

  .dragnum {
    display: inline-block;
    vertical-align: middle;
  }

  .nowbar {
    margin-top: 10px;
  }

</style>
