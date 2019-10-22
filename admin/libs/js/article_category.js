
$(function () {

  //注册进度条事件
  $(document).ajaxStart(function () {
    window.top.NProgress.start()
  }).ajaxStop(function () {
    window.top.NProgress.done()
  })

  // 获取分类列表
  function getCatList() {
    $.ajax({
      url: Bignew.category_list,
      dataType: 'json',
      success(res) {
        var html = template('temp', res);
        $('tbody').html(html)
      }
    })
  }

  getCatList();

  //输入框的值为空时进行的操作
  function isEmpty() {
    var flag = true;
    $('.my-input').each(function (i, item) {
      if ($(item).val().trim().length == 0) {
        flag = false;
        $(item).popover('show');
        setTimeout(() => {
          $(item).popover('hide');
        }, 2000)

      }
    })
    return flag;
  }

  //为模态框添加隐藏之后的事件，清空其中的输入框
  //为模态框添加显示之前的事件，修改其中的文本
  $('#myModal').on('hidden.bs.modal', function () {
    $('.my-input').each(function (i, item) {
      $(item).val('');
    })
  }).on('show.bs.modal', function (e) {
    if ($(e.relatedTarget).hasClass('add')) {
      $('#myModalLabel').text('新增分类');
      $('#operate').text('新增').addClass('btn-add').removeClass('btn-edit')

    } else {
      $('#myModalLabel').text('编辑分类');
      $('#operate').text('编辑').addClass('btn-edit').removeClass('btn-add')

    }
  })



  // 新增分类功能
  // 编辑分类功能
  $('.btn-add').click(function () {
    var flag;
    var id = $("#id").val();
    //判断输入框的值为空时
    flag = isEmpty();

    if (flag) {
      // 添加的数据不为空  执行添加操作
      //隐藏模态框
      $('#myModal').modal('hide');
      //当为添加按钮时，执行添加操作
      if ($(this).hasClass('btn-add')) {
        //发动添加post请求
        $.ajax({
          type: 'post',
          url: Bignew.category_add,
          data: {
            name: $('#name').val().trim(),
            slug: $('#slug').val().trim()
          },
          dataType: 'json',
          success(res) {
            if (res.code === 201) {
              getCatList();
            } else {
              alert('添加失败，请稍后重试!');
            }
          }
        })
      } else {

        //发动编辑post请求
        $.ajax({
          type: 'post',
          url: Bignew.category_edit,
          data: {
            id: id,
            name: $('#name').val().trim(),
            slug: $('#slug').val().trim()
          },
          success(res) {
            if (res.code === 200) {
              getCatList();
            } else {
              alert('编辑失败，请稍后重试!')
            }
          }
        })
      }

    }

  })


  //点击编辑按钮时，请求某条数据
  //删除功能
  $('tbody').on('click', '.btn-delete', function () {
    var id = $(this).data('id');
    var that = $(this).parents('tr');
    $.ajax({
      type: 'post',
      url: Bignew.category_delete,
      data: {
        id: parseInt(id)
      },
      success(res) {
        if (res.code === 204) {
          that.remove();
        } else {
          alert('删除错误，请稍后重试!')
        }
      }
    })
  })
    .on('click', '.edit', function () {
      var id = $(this).data('id')

      $.ajax({
        url: Bignew.category_search,
        data: {
          id: id
        },
        success(res) {
          $('#id').val(res.data[0].id);
          $('#name').val(res.data[0].name);
          $('#slug').val(res.data[0].slug);
          $('#myModal').modal('show')
        }
      })
    })

})
