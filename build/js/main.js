$(window).load(function () {

    modal();
    ordersMenu();
    btnExpand();
    btnChangePass();
    handsomeInit();
    swipeSpinner();
    menu();

    if ($.fn.glDatePicker !== undefined ) {
        $( ".mydate" ).each(function( index ) {
            $(this).glDatePicker({
                onClick: function(target, cell, date, data) {
                    target.val(date.getDate() + '/' +
                        date.getMonth() + '/' +
                        date.getFullYear());
                }
            });
        });
    }

});

function menu() {
    $('body').on('swiperight', function(){
        menuShow();
    })

    $('.header__btnMenu').on('click', function(){
        menuShow();
    })

    $('body').on('swipeleft', function(){
        menuClose();
    })

    $('.overlay').on('click', function(){
        menuClose();
    })
}
function menuShow() {
    $('.menu').animate({left: 0},300);
    $('.overlay').fadeIn(300);
    $('.header__btnMenu').animate({marginLeft: '-13px'},300);
}
function menuClose() {
    $('.menu').animate({left: '-230px'},300);
    $('.overlay').fadeOut(300);
    $('.header__btnMenu').animate({marginLeft: '-7px'},300);

}

function swipeSpinner() {
    var spinnerSwiper = $('.swipeSpinner').find('.swiper-container').swiper({
        mode: 'horizontal',
        noSwiping: true,
        slidesPerView: 'auto',
        watchActiveIndex: true,
        initialSlide: 4,
        centeredSlides: true,
        onSwiperCreated: function () {
            slideClasses();
        },
        onTouchMove: function() {
            slideClasses();
        },
        onTouchEnd: function () {
            slideClasses();
        },
        onSlideClick: function (swiper) {
            spinnerSwiper.swipeTo(swiper.clickedSlideIndex);
        },
        onSlideChangeEnd: function () {
            slideClasses();
        }
    });

    function slideClasses() {
        $('.swiper-slide').removeClass('near');

        $('.swiper-slide-active').prev().addClass('near');

        $('.swiper-slide-active').next().addClass('near');
    }
}

function handsomeInit() {
    if ($('.select').length) {
        $('.select').dropDown({useNativeMobile: true});
    }
    if ($('.checkbox').length) {
        $('.checkbox').checkBox();


        $('.checkboxHolder label').on('click',function(){
            $(this).siblings('div.bt-checkbox').children('a').click();
        });
    }


}
function btnChangePass() {
    $('.btnChangePass').on('click', function () {
        var $this = $(this);
        $this.next('.form__section_hidden').slideToggle(300);
    })
}

function btnExpand() {

    $('.orders__txt').find('.btnExpand').on('click', function () {
        var $this = $(this), $txtBlock = $this.parent();

        if ($txtBlock.hasClass('expanded')) {
            $txtBlock.animate({height: '150px'}, 200, function () {
                $txtBlock.removeClass('expanded')
            });
        }
        else {
            $this.css({visibility: 'hidden'});
            curHeight = $txtBlock.height(),
                autoHeight = $txtBlock.css('height', 'auto').height();
            $txtBlock.height(curHeight).animate({height: autoHeight}, 200, function () {
                $this.css({visibility: 'visible'});
                $txtBlock.addClass('expanded');
            });
        }
    })

    $('.form__section').find('.btnExpand').on('click', function(){
        var $this = $(this), $hidden = $this.next('.form__section__hidden'), $parent = $this.parent();

        if ($parent.hasClass('visible')) {
            $hidden.animate({height: '0'}, 200, function () {
                $parent.removeClass('visible');
            });
        }
        else {

            curHeight = $hidden.height(),
                autoHeight = $hidden.css('height', 'auto').height();
            $hidden.height(curHeight).animate({height: autoHeight}, 200, function () {

                $parent.addClass('visible');
            });
        }


    })
}


function ordersMenu() {
    $('.orders__menu').find('a').on('click', function () {
        var $this = $(this);
        $this.parent().addClass('selected');
        $this.parent().siblings().removeClass('selected');
    })
}


function modalSwiperInit() {

    if ($('.modal__swiper').find('.swiper-container').length) {

       var modalSwiper = $('.modal__swiper').find('.swiper-container').swiper({
            mode: 'horizontal',
            slidesPerView: 1
        });

        $('.modal__nav').find('a').on('click', function () {
            modalSwiper.swipeTo($(this).data('target'));
            return false;
        })

    }
}



function modal() {

    $('.btnShowModal').on('click', function () {
        var $this = $(this);

        modalShow($('#' + $this.data('target-id')));

        return false;
    })

    $('.modal__btnClose, .overlay').on('click', function () {
        closeModal();
    })

    $(document).on('keyup', function (e) {
        if (e.keyCode == 27) {
            closeModal();
        }
    });

}

function modalShow(popup) {
    if (popup.is(':hidden')) {
        popup.fadeIn(200, function () {
            modalSwiperInit();
        });
        $('body').css({overflow: 'hidden'});
    }
}


function closeModal() {
    $('.modal').fadeOut(200, function () {
        $('body').css({overflow: 'auto'});
    });
}



