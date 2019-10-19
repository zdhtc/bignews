$(function(){
  //获取用户信息
  $.ajax({
    url: 'http://localhost:8080/api/v1/admin/user/info',
    headers:{
      'Authorization' : localStorage.getItem('token')
    },
    success(res){
      if(res.code === 200){
        $('.user_info>img').attr('src',res.data.userPic)
        $('.user_info>span').html('欢迎&nbsp;&nbsp;'+res.data.nickname)
        $('.user_center_link>img').attr('src',res.data.userPic)
      }
    },
    error(res){
      location.href = '/admin/login.html'
    }
  })


  //文章管理下拉
  var $article = $('#article');
  var $article_list = $('.menu .level02');

  $article.click(function () { 
    if($article_list.css('display') == 'none'){
      $(this).children('.iconfont').css('transform','none');
    }else{
      $(this).children('.iconfont').css('transform','rotate(90deg)');
    }
    
    $article_list.slideToggle();
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

})