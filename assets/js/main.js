//登录

$("#btn-getbackpwd").click(function(event) {

        $("#Fgtpwd").modal('show');
        $("#Login").modal('hide');
        getpwdbackreq();

});

$("#btn-modpwd").click(function(event) {

        $("#Modpwd").modal('show');
        $("#Login").modal('hide')

    });

$(document).ready(function() {

        //SAA下拉点击事件
        $('#dropdown-saa > a').each(function () {
            $(this).on('click',function (event) {
                var testno;
                switch(event.target.text){
                    case "试题1":
                        testno = "saa-exam1";
                        break;
                    case "试题2":
                        testno = "saa-exam2";
                        break;
                    case "试题3":
                        testno = "saa-exam3";
                        break;
                    case "试题4":
                        testno = "saa-exam4";
                        break;
                    case "试题5":
                        testno = "saa-exam5";
                        break;
                    case "试题6":
                        testno = "saa-exam6";
                        break;
                    case "试题7":
                        testno = "saa-exam7";
                        break;
                    case "试题8":
                        testno = "saa-exam8";
                        break;
                    case "试题9":
                        testno = "saa-exam9";
                        break;
                }
               $.cookie("testsubject","SAA", { path: '/', secure: false });
               $.cookie("testno",testno, { path: '/', secure: false });
               $(location).attr("href","./test.html");
            });
        })

        //SAP下拉点击事件
        $('#dropdown-sap > a').each(function () {
            $(this).on('click',function (event) {
                var testno;
                switch(event.target.text){
                    case "试题1":
                        testno = "sap-01";
                        break;
                    case "试题2":
                        testno = "sap-02";
                        break;
                    case "试题3":
                        testno = "sap-03";
                        break;
                    case "试题4":
                        testno = "sap-04";
                        break;
                    case "试题5":
                        testno = "sap-05";
                        break;
                }
               $.cookie("testsubject","SAP", { path: '/', secure: false });
               $.cookie("testno",testno, { path: '/', secure: false });
               $(location).attr("href","./test.html");
            });
        })

        //BDS下拉点击事件
        $('#dropdown-bds > a').each(function () {
            $(this).on('click',function (event) {
                var testno;
                switch(event.target.text){
                    case "试题1":
                        testno = "bds1";
                        break;
                    case "试题2":
                        testno = "bds2";
                        break;
                    case "试题3":
                        testno = "bds3";
                        break;
                }
               $.cookie("testsubject","BDS", { path: '/', secure: false });
               $.cookie("testno",testno, { path: '/', secure: false });
               $(location).attr("href","./test.html");
            });
        })

        if($.cookie('email') != null && $.cookie('token') != null ){
                $("#btn-index-login").text("登出");
                $("#btn-index-login").attr('data-target','#Logout');
                $("#btn-index-login").attr('id','btn-index-logout');
                $("#index-signin").hide();
                $("#welcome-text").text("欢迎回来"+$.cookie("email"));
            }

        //$(location).attr("href","./error.html");
});

$("#btn-logout").click(function(event) {
    

        logoutreq();
});


$("#btn-login").click(function(event) {

        event.preventDefault();
        $("#login-inform").val("");
        if ($("#login-user").val().length == 0) {
            $("#login-inform").text("用户名不能为空");
        }else if ($("#login-password").val().length == 0) {
            $("#login-inform").text("密码不能为空");
        }else {
            
                loginreq();
            
        }
    });


function loginreq(){
                    $.ajax({
                    type:"POST",
                    url:"http://localhost:8080/user/login",
                    // contentType: "application/json;charset=UTF-8",
                    data:{"email":$("#login-user").val(),"password":$("#login-password").val()},
                    success:function(result){
                        //alert(result);
                        if(result.success == null){
                            $("#login-inform").text(result.message);
                        }else if (result.success == 1) {
                            //window.location.href="index.jsp";
                            $("#login-inform").text(result.message);
                            //alert("done");
                        }else if (result.success == 0){
                            $("#login-inform").text("登录成功,即将进入");
                            $.cookie("email",result.data.email, { path: '/', secure: false });
                            $.cookie("token",result.data.token, { path: '/', secure: false });
                            $("#login-user").attr("disabled", true);
                            $("#login-password").attr("disabled", true);
                            setTimeout(function(){$("#Login").modal('hide')}, 3000);
                            //setTimeout(function(){$(".modal-backdrop.fade.show").remove()}, 3000);
                            $("#btn-index-login").text("登出");
                            $("#btn-index-login").attr('data-target','#Logout');
                            $("#btn-index-login").attr('id','btn-index-logout');
                            $("#index-signin").hide();
                            $("#welcome-text").text("欢迎回来"+$.cookie("email"));
                            $("#welcome-text").show();
                        }
                    }
                });
}



function logoutreq(){
                    $.ajax({
                    type:"GET",
                    url:"http://localhost:8080/user/logout",
                    // contentType: "application/json;charset=UTF-8",
                    data:{"token":$.cookie("token")},
                    success:function(result){
                        //alert(result);
                        if(result.success == null){
                            $("#login-inform").text(result.message);
                        }else if (result.success == 1) {
                            //window.location.href="index.jsp";
                            $("#login-inform").text(result.message);
                            //alert("done");
                        }else if (result.success == 0){
                            //$("#login-inform").text("登录成功");
                            $.cookie('token', '', { expires: -1 }); //删除cookie
                            $.cookie('email', '', { expires: -1 }); 
                            //$("#Login").hide();
                            //$(".modal-backdrop.fade.show").hide();
                            //setTimeout(function(){$("#Logout").modal('hide')}, 3000);
                            $("#Logout").modal('hide')
                            $("#btn-index-logout").attr('data-target','#Login');
                            $("#btn-index-logout").attr('id','btn-index-login');
                            $("#btn-index-login").text("登录");
                            $("#login-inform").text("");
                            $("#index-signin").show();
                            $("#welcome-text").hide();
                        }
                    }
                });
}



function getpwdbackreq(){
                    $.ajax({
                    type:"GET",
                    url:"http://localhost:8080/user/getbackpwd",
                    // contentType: "application/json;charset=UTF-8",
                    data:{"email":$("#getpwdback-email").val()},
                    success:function(result){
                        //alert(result);
                        if(result.success == null){
                            $("#getbackpwd-inform").text("服务器忙，请稍后再试");
                        }else if (result.success == 1) {
                            $("#getbackpwd-inform").text(result.message);
                            //alert("done");
                        }else if (result.success == 0){
                            $("#getbackpwd-inform").text("新密码已发送到您的邮箱，请前往查看");
                        }
                    }
                });
}