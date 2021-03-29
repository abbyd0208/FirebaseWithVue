window.$ = window.jQuery = require('jquery');

$(function () {
    $('.side_open').on('click', function () {
        $('.side').addClass('active')
    });
    $('.side_clode').on('click', function () {
        $('.side').css({ 'visibility': 'visible' });
        $('.side').removeClass('active')
    });

    var applyHtml = `<a class="apply_btn" href="https://forms.gle/vNLRHH1pHpdv9iS77" target="_blank">馬上<br class="d-sm-none">申請 <i class="fas fa-arrow-alt-circle-right"></i><a>`;
    $('body').append(applyHtml);

    var gototopHtml = `<div class="gototop"><i class="fas fa-chevron-up"></i></div>`;
    $('body').append(gototopHtml);

    var iScrollPointA = 0;  //滾回的位置
    var iScrollPointB = 200; //滾到的位置 出現gototop
    var timer = '', iWinScroll='';
    var $totop = $('.gototop');


    $(window).on('scroll',function(){
        iWinScroll = $(this).scrollTop();
        if(timer){clearTimeout(timer)}
        timer = setTimeout(function(){
            if(iWinScroll >   iScrollPointB) {
                $totop.css({"opacity":"1", "bottom":"40px"});
            }else{
                $totop.css({"opacity":"0", "bottom":"0px"});
            };
        },500);
    });

    // 讓捲軸用動畫的方式移動到到指定id位罝
	$('.gototop').on("click", function(){
		var $body = (window.opera) ? (document.compatMode === "CSS1Compat" ? $('html') : $('body')) : $('html,body'); //修正 Opera 問題
		$body.animate({scrollTop: iScrollPointA}, 500);
		return false;
	});

});