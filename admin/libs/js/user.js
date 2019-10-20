$(function () {

  //请求个人用户信息详情
  $.ajax({
    url: Bignew.user_detail,
    dataType: 'json',
    success(res) {

      for (const key in res.data) {
        $('.' + key).val(res.data[key]);
      }

      $('.user_pic').attr('src', res.data.userPic)
    }
  })


  //图片预览功能
  $('#exampleInputFile').change(function () {
    var url = URL.createObjectURL(this.files[0]);
    $('.user_pic').attr('src', url)
  })

  //编辑之后提交
  $('.btn-edit').click(function (e) {
    e.preventDefault();
    var flag = true;
    $('#form input:not([type="file"])').each((i, item) => {
      //信息不全提醒用户
      if ($(item).val().trim().length === 0) {
        $(".modal-body").text("用户信息不能为空,请重新输入!");
        $("#myModal").modal('show');
        flag = false;
        return;
      }
    })

    //用户信息完整提交信息
    if (flag) {
      var formObj = $('#form')[0];
      $.ajax({
        type: 'post',
        url: Bignew.user_edit,
        data: new FormData(formObj),
        contentType: false,
        processData: false,
        dataType: 'json',
        success(res) {
          if (res.code === 200) {
            window.parent.location.reload();
          } else {
            $(".modal-body").text("信息更新失败，请稍后重试!");
            $("#myModal").modal('show');
          }
        }
      })
    }


  })

})