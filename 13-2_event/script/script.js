//jquery사용시 준비사항
$(function(){
    // $("button").css(cuser{"pointer"});
    // 부드럽게 사라지기
    $("#btn1").click(function(){
        $(".box div:first-child").fadeOut(1000);
    });
    // 부드럽게보이기
    $("#btn2").click(function(){
        $(".box div:first-child").fadeIn(1000);
    });
    // 숨김/보임
    $("#btn3").click(function(){
        $(".box div:last-child").fadeToggle();
    });
    // 박스높이0
    $("#btn4").click(function(){
        $(".box2 div:first-child").slideUp();
    });
    // 원래대로
    $("#btn5").click(function(){
        $(".box2 div:first-child").slideDown();
    });
    // 높이0/원래대로
    $("#btn6").click(function(){
        $(".box2 div:nth-child(2)").slideToggle();
    });
    $("#btn7").click(function(){
        $(".box2 .ani").animate({left: "840px"});
    });
    $("#btn8").click(function(){
        $(".box2 .ani").animate({left: "440px"});
    });
    $("#btn9").click(function(){
        $(".box3 div:first-child").addClass("bg");
    });
    $("#btn10").click(function(){
        $(".box3 div:first-child").removeClass("bg");
    });
    
});