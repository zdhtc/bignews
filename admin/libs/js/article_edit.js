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

  // 获取文章列表
  var idArr = window.location.search.slice(1).split('=')
 
  $.ajax({
    url: Bignew.article_search,
    data: {
      id : idArr[1]
    },
    success(res){
      if(res.code === 200){
        $('[name="id"]').val(res.data.id)
        $('#inputTitle').val(res.data.title)
        $('#inputCover').prev('img').attr('src',res.data.cover)
        $('.category').val(res.data.categoryId)
        $('#date').val(res.data.date)
        editor.txt.text(res.data.content)
      }else{
        alert('请求出错，请稍后重试!')
      }
    }
  })

  //编辑功能
  function editActicle(state) {

    var formdata = new FormData($('#form')[0])
    formdata.append('content', editor.txt.text())
    formdata.append('state', state)
    $.ajax({
      type: 'post',
      url: Bignew.article_edit,
      data: formdata,
      dataType: 'json',
      contentType: false,
      processData: false,
      success(res) {
        if (res.code === 200) {
          alert('修改成功')
          window.location.href = "/admin/article_list.html"
        } else {
          alert(res.msg)
        }
      }
    })

  }
  //文章状态为发布
  $('.btn-edit').click(function () {
    editActicle('已发布')
  })
  //文章状态为草稿
  $('.btn-draft').click(function () {
    editActicle('草稿')
  })
  


})