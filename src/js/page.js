window.$ = window.jQuery = require('jquery');

$(function () {
    $('.side_open').on('click', function () {
        $('.side').addClass('active')
    });
    $('.side_clode').on('click', function () {
        $('.side').css({ 'visibility': 'visible' });
        $('.side').removeClass('active')
    });

    var applyHtml = `<a class="apply_btn" href="https://forms.gle/vNLRHH1pHpdv9iS77" target="_blank">
                        馬上申請 <i class="fas fa-arrow-circle-right"></i>
                    <a>`;
    $('body').append(applyHtml)
});