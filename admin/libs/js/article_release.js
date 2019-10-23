$(function ($) {

  

  //注册进度条事件
  $(document).ajaxStart(function () {
    window.top.NProgress.start()
  }).ajaxStop(function () {
    window.top.NProgress.done()
  })

  //初始化日期组件
  jeDate("#date", {
    // 年月日
    format: "YYYY-MM-DD",
    isTime: false,
    minDate: "2014-09-19 00:00:00",
    isinitVal: true,
  })

  // 初始化富文本编辑器
  var E = window.wangEditor
  var editor = new E('#content')
  editor.create()

  // 文件预览功能
  $('#inputCover').change(function () {
    $(this).prev('img').attr('src', URL.createObjectURL(this.files[0]))
  })


  //请求所有文章分类
  $.ajax({
    url: Bignew.category_list,
    success(res) {
      var html = template('temp', res);
      $('.category').html(html)
    }
  })

  // 发布功能
  function releaseActicle(state) {

    var formdata = new FormData($('#form')[0])
    formdata.append('content', editor.txt.text())
    formdata.append('state', state)
    $.ajax({
      type: 'post',
      url: Bignew.article_publish,
      data: formdata,
      dataType: 'json',
      contentType: false,
      processData: false,
      success(res) {
        if (res.code === 200) {
          alert('添加成功')
          $('.level02>li:eq(0)', window.parent.document).trigger('click')
          

          window.location.href = "/admin/article_list.html"
        } else {
          alert(res.msg)
        }
      }
    })

  }
  //文章状态为发布
  $('.btn-release').click(function () {
    releaseActicle('已发布')
  })
  //文章状态为草稿
  $('.btn-draft').click(function () {
    releaseActicle('草稿')
  })
  


})