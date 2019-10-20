$(function(){

  //请求个人用户信息详情
  $.ajax({
    url: Bignew.user_detail,
    dataType: 'json',
    success(res){
      
      for (const key in res.data) {
       $('.' + key).val(res.data[key]);
      }

      $('.user_pic').attr('src',res.data.userPic)
    }
  })


  

})