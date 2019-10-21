$(function(){

  //注册进度条事件
  $(document).ajaxStart(function(){
    NProgress.start()
  }).ajaxStop(function(){
    NProgress.done()
  })

  //获取用户信息
  $.ajax({
    url: Bignew.user_info,
    success(res){
      if(res.code === 200){
        $('.user_info>img').attr('src',res.data.userPic)
        $('.user_info>span').html('欢迎&nbsp;&nbsp;'+res.data.nickname)
        $('.user_center_link>img').attr('src',res.data.userPic)
      }
    }
    
  })


  //文章管理下拉
  var $article = $('#article');
  var $article_list = $('.menu .level02');
  var $level02 = $('.level02 .level');

  $article.click(function () { 
    if($article_list.css('display') == 'none'){
      $(this).children('.iconfont').css('transform','none');
    }else{
      $(this).children('.iconfont').css('transform','rotate(90deg)');
    }
    
    $article_list.slideToggle();
  })

  $level02.click(function(){
    $(this).addClass('active').siblings().removeClass('active')
  })


  //切换侧边栏
  var $levels = $('.level01');
  $levels.click(function(){
    $(this).addClass('active').siblings().removeClass('active')
    if($(this).index() != 1){
      $article_list.slideUp();
      $article.children('.iconfont').css('transform','rotate(90deg)');
    }
  })


  //退出功能
  $('.logout').click(function(){
    localStorage.removeItem('token');
    location.href = '/admin/login.html'
  })

})