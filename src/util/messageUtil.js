import $ from 'jquery'
$(function () {
  $('.btn-success').on('click', function () {
    $.message('成功');
  })
  $('.btn-danger').on('click', function () {
    $.message({
      message: '失败提示',
      type: 'error'
    });
  })
  $('.btn-warning').on('click', function () {
    $.message({
      message: '警告提示',
      type: 'warning'
    });
  })
  $('.btn-info').on('click', function () {
    $.message({
      message: '信息提醒',
      type: 'info'
    });
  })

})
