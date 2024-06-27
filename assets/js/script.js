$(function () {

    $('.navbar-toggle').click(function () {
        $(this).toggleClass('act');
        if ($(this).hasClass('act')) {
            $('.main-menu').addClass('act');
        }
        else {
            $('.main-menu').removeClass('act');
        }
    });

    //jQuery for page scrolling feature - requires jQuery Easing plugin
    $(document).on('click', '.page-scroll a', function (event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1000, 'easeInOutExpo');
        event.preventDefault();
    });

    // Highlight the top nav as scrolling occurs
    $('body').scrollspy({
        target: '.site-header',
        offset: 10
    });

    /* Progress bar */
    var $section = $('.section-skills');
    function loadDaBars() {
        $('.progress .progress-bar').progressbar({
            transition_delay: 500
        });
    }

    $(document).bind('scroll', function (ev) {
        var scrollOffset = $(document).scrollTop();
        var containerOffset = $section.offset().top - window.innerHeight;
        if (scrollOffset > containerOffset) {
            loadDaBars();
            // unbind event not to load scrolsl again
            $(document).unbind('scroll');
        }
    });

    /* Counters  */
    if ($(".section-counters .start").length > 0) {
        $(".section-counters .start").each(function () {
            var stat_item = $(this),
                offset = stat_item.offset().top;
            $(window).scroll(function () {
                if ($(window).scrollTop() > (offset - 1000) && !(stat_item.hasClass('counting'))) {
                    stat_item.addClass('counting');
                    stat_item.countTo();
                }
            });
        });
    };

    // another custom callback for counting to infinity
    $('#infinity').data('countToOptions', {
        onComplete: function (value) {
            count.call(this, {
                from: value,
                to: value + 1
            });
        }
    });

    $('#infinity').each(count);

    function count(options) {
        var $this = $(this);
        options = $.extend({}, options || {}, $this.data('countToOptions') || {});
        $this.countTo(options);
    }

    // Navigation overlay
    var s = skrollr.init({
        forceHeight: false,
        smoothScrolling: false,
        mobileDeceleration: 0.004,
        mobileCheck: function () {
            //hack - forces mobile version to be off
            return false;
        }
    });

});


document.getElementById("gform").addEventListener("submit", validform);

function validform(e) {
    e.preventDefault();

    document.getElementById("namevalid").innerHTML = "";
    document.getElementById("lastnamevalid").innerHTML = "";
    document.getElementById("emailvalid").innerHTML = "";
    document.getElementById("phonevalid").innerHTML = "";
    document.getElementById("messagevalid").innerHTML = "";

    const name = document.getElementById("name").value;
    const lastname = document.getElementById("lastname").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("Phone").value;
    const message = document.getElementById("message").value;


    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isValid = emailPattern.test(email);

    const phonepattern = /^[6-9]\d{9}$/
    const isphonepattervalid = phonepattern.test(phone)


invalid=true;

    if (name === "") {
        document.getElementById("namevalid").innerHTML = "please enter Firstname";
        invalid = false
    }
    if (lastname === "") {
        document.getElementById("lastnamevalid").innerHTML = "please enter Lastname";
        invalid = false
    }
    if (isValid == false) {
        document.getElementById("emailvalid").innerHTML = "please enter valid email address";
        invalid = false
    }
    if (phone === "") {
        document.getElementById("phonevalid").innerHTML = "please enter phone number";
        invalid = false
    }
    if (message === "") {
        document.getElementById("messagevalid").innerHTML = "please some messages";
        invalid = false
    }
    if(isphonepattervalid==false){
        document.getElementById("phonevalid").innerHTML = "please enter valid phone number";
        invalid = false
    }

    if(invalid){

        $.ajax({
            url:"https://script.google.com/macros/s/AKfycbwD3L1f5AJoPoH-Z8QVbkqfvMGt0Zuy-aDc-iPwPArVtjcBcPe9TYNk0kohBFNRj5_FBQ/exec",
            data:$("#gform").serialize(),
            method:"post",
            success:function (response){
                alert("Form submitted successfully")
                window.location.reload()
                //window.location.href="https://google.com"
            },
            error:function (err){
                alert("Something Error")
    
            }
        })
    }

   
}

// $("#gform").submit((e)=>{
//     e.preventDefault()
    
   
// })

