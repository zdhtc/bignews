$(function () {

  var perpage = 10

  //注册进度条事件
  $(document).ajaxStart(function () {
    window.top.NProgress.start()
  }).ajaxStop(function () {
    window.top.NProgress.done()
  })


  //请求所有文章分类
  $.ajax({
    url: Bignew.category_list,
    success(res) {
      var html = template('temp', res);
      $('#selCategory').html(html)
    }
  })

  //  请求所有文章(封装为一个函数)
  function getArticleList(flag,query = {}) {
    $.ajax({
      url: Bignew.article_query,
      data: {
        key: query.key,
        type: query.type,
        state: query.state,
        page: query.page,
        perpage: query.perpage
      },
      success(res) {
        var html = template('temp_art', res.data)
        $('tbody').html(html)

        // 初始化分页插件或者更改插件
        // flag为true时表示初始化分页器，此时会显示第一页
        // flag为false时表示点击的是页码而调用的函数，此时就不需要初始化分页器
        if(flag){
          $('#pagination').twbsPagination('destroy');
          $('#pagination').twbsPagination({
            totalPages: res.data.totalPage,
            visiblePages: 7,
            first: '首页',
            last: '尾页',
            prev: '上一页',
            next: '下一页',
            initiateStartPageClick: false,
            onPageClick: function (event, page) {
              getArticleList(false,{
                type: $('#selCategory').val(),
                state: $('#selStatus').val(),
                page: page,
                perpage: perpage
              })
            }
          });

        }
      }
    })
  }

  
  getArticleList(true,{perpage});

  //筛选功能
  $('#btnSearch').click(function (e) {
    e.preventDefault()

    var category = $('#selCategory').val()
    var status = $('#selStatus').val()

    getArticleList(true,{
      type: category,
      state: status,
      perpage: perpage
    })
  })

  

})

