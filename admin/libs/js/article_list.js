$(function(){
  //注册进度条事件
  $(document).ajaxStart(function(){
    window.top.NProgress.start()
  }).ajaxStop(function(){
      window.top.NProgress.done()
  })


   //请求所有文章分类
   $.ajax({
     url: Bignew.category_list,
     success(res){
       var html = template('temp',res);
       $('#selCategory').html(html)
     }
   })

  //  请求所有文章(封装为一个函数)
  function getArticleList(query = {}){
    $.ajax({
      url: Bignew.article_query,
      data: {
        key : query.key,
        type : query.type,
        state : query.state,
        page : query.page,
        perpage : query.perpage
      },
      success(res){
        var html = template('temp_art',res.data)
        $('tbody').html(html)
      }
    })
  }

  getArticleList();

})