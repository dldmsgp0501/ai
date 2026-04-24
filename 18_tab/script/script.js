    $(function(){
        $(".tab li").click(function(){
            let num = $(this).index();
            $(".tab li").removeClass("on")
            $(this).addClass("on");
            $(".list_wrap").hide();
            $(".list_wrap").eq(num).show();
        });
    });