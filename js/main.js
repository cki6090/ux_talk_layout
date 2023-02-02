$(document).ready(function () {
    //첫 로딩시 로그인페이지로
    var context = window.location.pathname.substring(0, window.location.pathname.indexOf("/",2));
    var menu_lode = sessionStorage.getItem("menu_lode");

    if (!menu_lode) {
        sessionStorage.setItem("menu_lode", "login"); 
        location.reload();

    } else {//console.log("값이 있음");

        $('.'+ menu_lode +'').css('font-weight', 'bold;'); 
        $('.bottom_menu ul li.'+ menu_lode +'').addClass("on");

        
    }

    $.ajax({
        url: context + "/" + menu_lode+ ".html",
        success: function (menu_lode) {
            $(".main_con").empty();
            $(".main_con").prepend(menu_lode);
        }
    });

    //햄버거메뉴 + 하단메뉴 클릭시 클래스명 가져와서 main_con 불러오기
    $(".menu_slide .ms_con .msc_bottom ul li, .bottom_menu ul li").click(function () {
        $(".main_con").empty();
        $(".bottom_menu ul li").removeClass("on")

        var smenu = $(this).attr('class');
        sessionStorage.setItem("menu_lode", smenu); // 세션 스토리지에 메뉴명 저장
        $.ajax({
            url: context + "/" + smenu,
            success: function (smenu) {
                $(".main_con").prepend(smenu);
            }
        });
        location.reload();
         // 클릭 메뉴에 맞는 css적용
    });

    //메뉴 my_profile 클릭
    $(document).on('click', ".my_profile", function (e) {
        sessionStorage.setItem("menu_lode", "myprofile"); 
        location.reload();
    });

    //햄버거메뉴 슬라이드
    $(document).on('click', ".menu_btn", function (e) {
        $(".menu_slide").toggleClass("on")
    });
    
    //input 효과 포커서 온 오프 효과
    $(document).on('focus', "[type=text], [type=password], [type=number]", function (e) {
        $(this).css('border', '1px solid #396FD8');
    });
    $(document).on('focusout', "[type=text], [type=password], [type=number]", function (e) {
        if ($(this).val().length != 0) { // 값이 있을때 
            $(this).css('border', '1px solid #396FD8');
        } else { // 값이 없을때
            $(this).css('border', '1px solid #D2D8DE');
        }
    });

    $(document).on('keyup', "[type=text], [type=password], [type=number]", function (e) {
        if ($(this).val() > "") {
            $(this).siblings(".input_ck").remove();
            $(this).after("<div class='input_ck'></div>");
        } else {
            $(this).siblings(".input_ck").remove();
        }
    });

    $(document).on('click', ".input_ck", function (e) {
        $(this).prev(".input_st").css('border', '1px solid #D2D8DE');
        $(this).siblings(".input_st").val("");
        $(this).remove();
    });


    $(document).mouseup(function (e){
        var LayerPopup = $(".bottom_popup");
        var LayerPopup2 = $(".daterangepicker");
        if(LayerPopup.has(e.target).length === 0 && LayerPopup2.has(e.target).length === 0){
           //LayerPopup.fadeOut(500);
        }
    });

    $(document).mouseup(function (e){
        if($(".ms_con").has(e.target).length === 0 ){
            $(".menu_slide").removeClass("on");
        }
    });

    $(document).on('click', ".tab ul li", function (e) { 
        $(".tab ul li").removeClass('on');
        $(".tab .conBox").removeClass('on');
        $(this).addClass('on');
        $("#" + $(this).data('id')).addClass('on');
    });

    $(document).on('click', ".bar", function (e) {
        $(".show_gate_pass").fadeOut(500);
        $(".bottom_popup").fadeOut(500);
    });


    $(document).on('click', ".bottom_popup .sgpc_90 .sgpc_Company_list ul li", function (e) {
    //    $(this).toggleClass("on");
    })      

    $(document).on('click', ".input_con ul li", function (e) {
        //$(this).toggleClass("on");
    })

    /*팝업 버튼클릭시 닫기*/
    $(document).on('click', ".bottom_popup .main_btn", function (e) {
       //$(this).parents(".bottom_popup").hide();
    })
});