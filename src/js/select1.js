$('.select').on('blur', function () {
    $(this).find('.select-ul').hide();
})
//下拉框点击出现下拉框内容
$('.select-div').on('click', function () {
    if ($(this).siblings('.select-ul').is(":hidden")) {
        $(this).siblings('.select-ul').show();
    } else {
        $(this).siblings('.select-ul').hide();
    }
})

$('.select-ul').on('click', 'li', function () {
    $(this).addClass('active').siblings('li').removeClass('active').parent().hide().siblings('.select-div').html($(this).html());
    var index = $('.select1 .select-div').text();
    var area = $('.select2 .select-div').text();
    getData(index, area);
})

$('.city').removeClass('select-ul');

$('#area-select').on('click', 'li', function(){
    $(this).addClass('active').siblings('li').removeClass('active');
    if($(this).text()=='省份'){
        areaIndex = 0;
        $('.city').removeClass('select-ul').css({display:'none'});
        $('.province').addClass('select-ul');
    }else{
        areaIndex = 1;
        $('.province').removeClass('select-ul').css({display:'none'});
        $('.city').addClass('select-ul');
    }
    $('.select1 .select-div').text($('.select1 .select-ul .active').text())
    $('.select2 .select-div').text($('.select2 .select-ul .active').text())
    getData($('.select1 .select-div').text(), $('.select2 .select-div').text());
})