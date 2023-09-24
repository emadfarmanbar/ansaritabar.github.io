/*!

 =========================================================
 * Now-ui-kit - v1.1.0
 =========================================================

 * Product Page: https://www.creative-tim.com/product/now-ui-kit
 * Copyright 2017 Creative Tim (http://www.creative-tim.com)
 * Licensed under MIT (https://github.com/creativetimofficial/now-ui-kit/blob/master/LICENSE.md)

 * Designed by www.invisionapp.com Coded by www.creative-tim.com

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 */

var transparent = true;

var transparentDemo = true;
var fixedTop = false;

var navbar_initialized,
    backgroundOrange = false,
    toggle_initialized = false;

$(document).ready(function () {
    //  Activate the Tooltips
    $('[data-toggle="tooltip"], [rel="tooltip"]').tooltip();

    // Activate Popovers and set color for popovers
    $('[data-toggle="popover"]').each(function () {
        color_class = $(this).data('color');
        $(this).popover({
            template: '<div class="popover popover-' + color_class + '" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
        });
    });

    // Activate the image for the navbar-collapse
    nowuiKit.initNavbarImage();

    $navbar = $('.navbar[color-on-scroll]');
    scroll_distance = $navbar.attr('color-on-scroll') || 500;

    // Check if we have the class "navbar-color-on-scroll" then add the function to remove the class "navbar-transparent" so it will transform to a plain color.

    if ($('.navbar[color-on-scroll]').length != 0) {
        nowuiKit.checkScrollForTransparentNavbar();
        $(window).on('scroll', nowuiKit.checkScrollForTransparentNavbar)
    }

    $('.form-control').on("focus", function () {
        $(this).parent('.input-group').addClass("input-group-focus");
    }).on("blur", function () {
        $(this).parent(".input-group").removeClass("input-group-focus");
    });

    // Activate bootstrapSwitch
    $('.bootstrap-switch').each(function () {
        $this = $(this);
        data_on_label = $this.data('on-label') || '';
        data_off_label = $this.data('off-label') || '';

        $this.bootstrapSwitch({
            onText: data_on_label,
            offText: data_off_label
        });
    });

    if ($(window).width() >= 992) {
        big_image = $('.page-header-image[data-parallax="true"]');

        $(window).on('scroll', nowuiKitDemo.checkScrollForParallax);
    }

    // Activate Carousel
    $('.carousel').carousel({
        interval: 4000
    });

    $('.date-picker').each(function () {
        $(this).datepicker({
            templates: {
                leftArrow: '<i class="now-ui-icons arrows-1_minimal-left"></i>',
                rightArrow: '<i class="now-ui-icons arrows-1_minimal-right"></i>'
            }
        }).on('show', function () {
            $('.datepicker').addClass('open');

            datepicker_color = $(this).data('datepicker-color');
            if (datepicker_color.length != 0) {
                $('.datepicker').addClass('datepicker-' + datepicker_color + '');
            }
        }).on('hide', function () {
            $('.datepicker').removeClass('open');
        });
    });


});

$(window).on('resize', function () {
    nowuiKit.initNavbarImage();
});

$(document).on('click', '.navbar-toggler', function () {
    $toggle = $(this);

    if (nowuiKit.misc.navbar_menu_visible == 1) {
        $('html').removeClass('nav-open');
        nowuiKit.misc.navbar_menu_visible = 0;
        $('#bodyClick').remove();
        setTimeout(function () {
            $toggle.removeClass('toggled');
        }, 550);
    } else {
        setTimeout(function () {
            $toggle.addClass('toggled');
        }, 580);
        div = '<div id="bodyClick"></div>';
        $(div).appendTo('body').click(function () {
            $('html').removeClass('nav-open');
            nowuiKit.misc.navbar_menu_visible = 0;
            setTimeout(function () {
                $toggle.removeClass('toggled');
                $('#bodyClick').remove();
            }, 550);
        });

        $('html').addClass('nav-open');
        nowuiKit.misc.navbar_menu_visible = 1;
    }
});

nowuiKit = {
    misc: {
        navbar_menu_visible: 0
    },

    checkScrollForTransparentNavbar: debounce(function () {
        if ($(document).scrollTop() > scroll_distance) {
            if (transparent) {
                transparent = false;
                $('.navbar[color-on-scroll]').removeClass('navbar-transparent');
            }
        } else {
            if (!transparent) {
                transparent = true;
                $('.navbar[color-on-scroll]').addClass('navbar-transparent');
            }
        }
    }, 17),

    initNavbarImage: function () {
        var $navbar = $('.navbar').find('.navbar-translate').siblings('.navbar-collapse');
        var background_image = $navbar.data('nav-image');

        if ($(window).width() < 991 || $('body').hasClass('burger-menu')) {
            if (background_image != undefined) {
                $navbar.css('background', "url('" + background_image + "')")
                    .removeAttr('data-nav-image')
                    .css('background-size', "cover")
                    .addClass('has-image');
            }
        } else if (background_image != undefined) {
            $navbar.css('background', "")
                .attr('data-nav-image', '' + background_image + '')
                .css('background-size', "")
                .removeClass('has-image');
        }
    },

    initSliders: function () {
        // Sliders for demo purpose in refine cards section
        var slider = document.getElementById('sliderRegular');

        noUiSlider.create(slider, {
            start: 40,
            connect: [true, false],
            range: {
                min: 0,
                max: 100
            }
        });

        var slider2 = document.getElementById('sliderDouble');

        noUiSlider.create(slider2, {
            start: [20, 60],
            connect: true,
            range: {
                min: 0,
                max: 100
            }
        });
    }
}


var big_image;

// Javascript just for Demo purpose, remove it from your project
nowuiKitDemo = {
    checkScrollForParallax: debounce(function () {
        var current_scroll = $(this).scrollTop();

        oVal = ($(window).scrollTop() / 3);
        big_image.css({
            'transform': 'translate3d(0,' + oVal + 'px,0)',
            '-webkit-transform': 'translate3d(0,' + oVal + 'px,0)',
            '-ms-transform': 'translate3d(0,' + oVal + 'px,0)',
            '-o-transform': 'translate3d(0,' + oVal + 'px,0)'
        });

    }, 6)

}

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.

function debounce(func, wait, immediate) {
    var timeout;
    return function () {
        var context = this,
            args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        }, wait);
        if (immediate && !timeout) func.apply(context, args);
    };
};
var accItem = document.getElementsByClassName('accordionItem');
var accHD = document.getElementsByClassName('accordionItemHeading');
for (i = 0; i < accHD.length; i++) {
    accHD[i].addEventListener('click', toggleItem, false);
}
function toggleItem() {
    var itemClass = this.parentNode.className;
    for (i = 0; i < accItem.length; i++) {
        accItem[i].className = 'accordionItem close';
    }
    if (itemClass == 'accordionItem close') {
        this.parentNode.className = 'accordionItem open';
    }
};
function myFunction() {
    var dots = document.getElementById("dots");
    var moreText = document.getElementById("more");
    var btnText = document.getElementById("myBtn");

    if (dots.style.display === "none") {
        dots.style.display = "inline";
        btnText.innerHTML = "ادامه مطلب";
        moreText.style.display = "none";
    } else {
        dots.style.display = "none";
        btnText.innerHTML = "خلاصه مطلب";
        moreText.style.display = "inline";
    }
};
function emad() {
    var dotss = document.getElementById("emadf");
    var farm = document.getElementById("farr");
    var textbtn = document.getElementById("myga");
    var dotssa = document.getElementById("emadfa");

    if (dotss.style.display === "none") {
        dotss.style.display = "inline";
        textbtn.innerHTML = "خلاصه مطلب";

    } else {
        dotss.style.display = "none";
        textbtn.innerHTML = "ادامه  مطلب";
    }
};
function emada() {
    var dotssa = document.getElementById("emadfa");
    var textdoc = document.getElementById("mydoc");

    if (dotssa.style.display === "none") {
        dotssa.style.display = "inline";
        textdoc.innerHTML = "خلاصه مطلب";
    } else {
        dotssa.style.display = "none";
        textdoc.innerHTML = "ادامه  مطلب";
    }
};
function emadfa() {
    var dotssar = document.getElementById("emadfar");
    var textdoca = document.getElementById("mydoca");

    if (dotssar.style.display === "none") {
        dotssar.style.display = "inline";
        textdoca.innerHTML = "خلاصه مطلب";
    } else {
        dotssar.style.display = "none";
        textdoca.innerHTML = "ادامه  مطلب";
    }
};
function emadfar() {
    var dotssarm = document.getElementById("emadfarm");
    var textdocar = document.getElementById("mydocar");

    if (dotssarm.style.display === "none") {
        dotssarm.style.display = "inline";
        textdocar.innerHTML = "خلاصه مطلب";
    } else {
        dotssarm.style.display = "none";
        textdocar.innerHTML = "ادامه  مطلب";
    }
};
function emadfarm() {
    var dotssarma = document.getElementById("emadfarma");
    var textdocarm = document.getElementById("mydocarm");

    if (dotssarma.style.display === "none") {
        dotssarma.style.display = "inline";
        textdocarm.innerHTML = "خلاصه مطلب";
    } else {
        dotssarma.style.display = "none";
        textdocarm.innerHTML = "ادامه  مطلب";
    }
};
function lati() {
    var latins = document.getElementById("latis");
    var latinb = document.getElementById("latib");

    if (latins.style.display === "none") {
        latins.style.display = "inline";
        latinb.innerHTML = "خلاصه مطلب";
    } else {
        latins.style.display = "none";
        latinb.innerHTML = "ادامه  مطلب";
    }
};
function latin() {
    var latinsp = document.getElementById("latisp");
    var latinbu = document.getElementById("latibu");

    if (latinsp.style.display === "none") {
        latinsp.style.display = "inline";
        latinbu.innerHTML = "خلاصه مطلب";
    } else {
        latinsp.style.display = "none";
        latinbu.innerHTML = "ادامه  مطلب";
    }
};
function latinm() {
    var latinspa = document.getElementById("latispa");
    var latinbut = document.getElementById("latibut");

    if (latinspa.style.display === "none") {
        latinspa.style.display = "inline";
        latinbut.innerHTML = "خلاصه مطلب";
    } else {
        latinspa.style.display = "none";
        latinbut.innerHTML = "ادامه  مطلب";
    }
};
function latinma() {
    var latinspan = document.getElementById("latispan");
    var latinbutn = document.getElementById("latibutn");

    if (latinspan.style.display === "none") {
        latinspan.style.display = "inline";
        latinbutn.innerHTML = "خلاصه مطلب";
    } else {
        latinspan.style.display = "none";
        latinbutn.innerHTML = "ادامه  مطلب";
    }
};