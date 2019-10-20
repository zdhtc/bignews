$(function(){
  $('.input_sub').click(function(e){
    e.preventDefault();
    var $user = $('.input_txt').val().trim()
    var $pwd = $('.input_pass').val().trim()

    if($user.length === 0 || $pwd.length === 0){
      alert('记得输入用户名或者密码');
      return;
    }

    $.ajax({
      type:'post',
      url: Bignew.user_login,
      data: {
        username : $user,
        password : $pwd
      },
      success(res){
        if(res.code === 200){
          if(!localStorage.getItem('token')){
            localStorage.setItem('token', res.token)
          }
          location.href = '/admin/index.html';
        }else{
          alert(res.msg)
        }
      }
    })

  })
})