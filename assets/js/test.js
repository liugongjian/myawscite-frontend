$(document).ready(function() {
//        console.log($.cookie('token'));
 //       console.log($.cookie('username'));
        if($.cookie('username')!= null && $.cookie('token')!= null ){
                checkloginstatus();
            }
    });


function checkloginstatus(){

                    $.ajax({
                    type:"GET",
                    url:"http://localhost:8080/user/checkstatus",
                    crossDomain: true,
                    xhrFields: {
                        withCredentials: true
                    },
                    // contentType: "application/json;charset=UTF-8",
                    //data:{"username":$("#login-user").val(),"password":$("#login-password").val()},
                    success:function(result){
                         $("title").html($.cookie('testno'));
                         //$(document).attr("title",$.cookie('testsubject')+'--'+$.cookie('testno'));
                         $('#mainContent').attr('src','./'+$.cookie('testsubject')+'/'+$.cookie('testno')+'.html');
                         //$.cookie('testsubject', '', { expires: -1 }); 
                         //$.cookie('testno', '', { expires: -1 }); 
                },
                    error:function(){
                         $(location).attr("href","./error.html");
                    }   
                
                });
}