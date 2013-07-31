
var Kilix = {
    isCateg: false,
    colors: {
        col1: '#e63429',
        col2: '#fab400',
        col3: '#009884',
        col4: '#85cedf',
        col5: '#087ec2'
    },
    
    init: function(){
        /*--- INIT LOADING IMG 66---*/
        Kilix.loaders();
        
        /*--- INIT SVG SWITCHING ---*/
        Kilix.switchSVG();
        /*----- STICKY HEADING -----*/
        Kilix.nav();
        /*--- FUNCTIONS ON RESIZE --*/
        Kilix.resize();Kilix.resize();
        $(window).on('resize',Kilix.resize);
        
        /*---- INIT ANIMATIONS -----*/
        setTimeout(function(){Kilix.animations()},500);
        /*------- INIT BUTTON ------*/
        $('.categories .discover').on('click', this.section.openCategorie);
        $('.detailled-menu aside, a.undiscover').on('click', this.section.closeCategorie);
        
        /*--- INIT SUPA SKROLLA ----*/
        skrollr.init({
            smoothScrolling:true
        });
        
        console.log(window.matchMedia("only screen and (max-width: 768px)").matches+" hu");
        var isWebkit = 'webkitRequestAnimationFrame' in window;
        //if(isWebkit){
            /* --- INIT CANVAS --- */
            createCanvasIn('container',             '#ffffff',          '#989898',          '#555555',  '#ffffff',          18,     9,      0.8,        0.1);
            createCanvasIn('vision-delaunay',       Kilix.colors.col1,  Kilix.colors.col1,  '#555555',  '#ffffff',          18,     7,      0.8,        0.1);
            createCanvasIn('historique-delaunay',   Kilix.colors.col2,  Kilix.colors.col2,  '#616161',  '#4a3606',          18,     7,      0.8,        0.4);
            createCanvasIn('expertise-delaunay',    Kilix.colors.col3,  Kilix.colors.col3,  '#555555',  '#3c3c3c',          18,     7,      0.8,        0.4);
            createCanvasIn('equipe-delaunay',       Kilix.colors.col4,  Kilix.colors.col4,  '#555555',  '#3c3c3c',          18,     7,      0.8,        0.4);
            createCanvasIn('references-delaunay',   Kilix.colors.col5,  Kilix.colors.col5,  '#555555',  '#3c3c3c',          18,     7,      0.8,        0.4);
        //}
    },
    resize: function(){
        $('#home').width($(window).width());
        $('#home').height(3000);
        $('.height-full-centered').css({
            'height': $(window).height(),
            'line-height': $(window).height()+'px'
        });
        $('section article.content').height($(window).height() - $('.menu').height());
        $('.but-wait-there-is-more').css({
            'margin-top': - $('.but-wait-there-is-more').height()/2,
            'top': '50%'
        });
        
        
        
        if(Kilix.isCateg){
            var currentHeader = $('.categories').eq($('.detailled-menu aside').data('categ')).find('header');
            $('html,body').scrollTop(currentHeader.offset().top + currentHeader.outerHeight() - $('.menu').height());
        }
    },
    switchSVG: function(){
        $('img.svg').each(function(){
            var $img = $(this);
            var imgID = $img.attr('id');
            var imgClass = $img.attr('class');
            var imgURL = $img.attr('src');
            $.get(imgURL, function(data) {
                // Get the SVG tag, ignore the rest
                var $svg = $(data).find('svg');
                // Add replaced image's ID to the new SVG
                if(typeof imgID !== 'undefined') {
                    $svg = $svg.attr('id', imgID);
                }
                // Add replaced image's classes to the new SVG
                if(typeof imgClass !== 'undefined') {
                    $svg = $svg.attr('class', imgClass+' replaced-svg');
                }
                // Remove any invalid XML tags as per http://validator.w3.org
                $svg = $svg.removeAttr('xmlns:a');
                // Replace image with new SVG
                $img.replaceWith($svg);
            });
        });
    },
    nav: function(){
        var links = $('.menu li[data-slide], .mobile-nav li');
        var slide = $('.❤');
        slide.waypoint({
            handler: function ( direction) {
                dataslide = $(this).attr('data-slide');
                if (direction === 'down') {
                    $('.menu li[data-slide="' + dataslide + '"]').addClass('active').siblings().removeClass('active');
                    if($(this).hasClass('categories')){
                        var color = Kilix.colors[$(this).data('color')];
                        Kilix.changeXColor($('#logo svg polygon'), color);
                        $('.menu').css('box-shadow', color+ ' 0px 3px 1px, rgba(0, 0, 0, 0.0470588) 0px 18px 1px');
                    }
                }
            },
            offset: '15%'
        });
        slide.waypoint({
            handler: function (direction) {
                dataslide = $(this).attr('data-slide');
                if (direction === 'up') {
                    $('.menu li[data-slide="' + dataslide + '"]').addClass('active').siblings().removeClass('active');
                    if($(this).hasClass('categories')){
                        var color = Kilix.colors[$(this).data('color')];
                        Kilix.changeXColor($('#logo svg polygon'), color);
                        $('.menu').css('box-shadow', color+ ' 0px 3px 1px, rgba(0, 0, 0, 0.0470588) 0px 18px 1px');
                    }
                    else{
                        Kilix.changeXColor($('#logo svg polygon'), 'none'); 
                        $('.menu').attr('style','');
                    }
                }
            },
            offset: '-60%'
        });
        $('#about').waypoint(function (direction) {
            if (direction == 'down') {
                $('.menu, .mobile-nav, .contact-info').addClass('fixed');
                $('#container, .lead-text, #home h1').hide();
            }
            else {
                $('.menu, .mobile-nav, .contact-info').removeClass('fixed');
                $('#container, .lead-text, #home h1').show();
                $('.menu li').removeClass('active');
                Kilix.changeXColor($('#logo svg polygon'), 'none'); 
            }
        });
        
        links.on('click', function (e) {
            e.preventDefault();
            dataslide = $(this).attr('data-slide');
            
            var gohere = $('.❤[data-slide="' + dataslide + '"]').offset().top  - $('.menu').height() +5;
            if(dataslide == 1) gohere = $('.❤[data-slide="' + dataslide + '"]').offset().top;
            
            console.log($(this).parent());
            if($(this).parent().hasClass('mobile'))$('.mobile-close').trigger('click');
            
            $('html,body').animate({
                scrollTop: gohere
            }, 2000);
        });
        $('#logo').on('click',function(e){
            $('html,body').animate({
                scrollTop: $('.❤[data-slide="0"]').offset().top
            }, 2000);
        });
        $('#home footer a').on('click',function(e){
            e.preventDefault();
            $('html,body').animate({
                scrollTop: $('.❤[data-slide="1"]').offset().top
            }, 3000);
        });
        $('.mobile-close, .unfold').on('click', function(e){
            e.preventDefault();
            $('nav.mobile-nav').toggleClass('open');
            $('body').toggleClass('push-left').toggleClass('nope');
        });
        
        $('.contact-link, .contact-close, .contact-mobile').on('click', function(e){
            e.preventDefault();
            $('.contact-info').toggleClass('open');
            $('body').toggleClass('push-right').toggleClass('nope');
        });
        
        
        
    },
    loaders: function(){
        for (var i = 0; i < 8; i++) {
            $('.loader').append('<div class="block"></div>');
        }
    },
    changeXColor: function($el, col){
        if(col!='none'){
            $('h1#logo').addClass('animated');
            setTimeout(function(){
                $('h1#logo').removeClass('animated'); 
            },2000);
            $el.each(function(i){
                var poly = $(this);
                setTimeout(function () {
                    poly.css('fill',col);
                }, (i + 1) * 100);
            });
        }else{
            $('h1#logo').addClass('animated');
            setTimeout(function(){
                $('h1#logo').removeClass('animated'); 
            },2000);
            $el.each(function(i){
                var poly = $(this);
                setTimeout(function () {
                    poly.attr('style','');
                }, (i + 1) * 100);
            });
        }
    },
    animations: function(){
        
        $('section.categories header canvas').hide();
        $('section.categories header').bind('inview',function(e, isInView, visiblePartX, visiblePartY){
            var canvas = $(this).find('canvas');
            if(isInView){
                console.log('view');
                canvas.show();
            }
            else{
                console.log('notview');
                canvas.hide();
            }
        });
        
        $('section.categories header h1').css({
            y: '-5rem'        
            }).waypoint({
            handler: function (direction) {
                if (direction === 'down') {
                    $(this).closest('.categories').addClass('active');
                    $(this).transition({
                        y: '0'
                    },500, 'easeInOutCirc');
                }
                else{
                    $(this).closest('.categories').removeClass('active');
                    $(this).transition({
                        delay:500,
                        y: '-5rem'
                    },500, 'easeOutCirc');
                }
            },
            offset: '90%'
        });
        
        $('section.categories header .replaced-svg').css({
            y: '14rem'        
            }).waypoint({
            handler: function (direction) {
                if (direction === 'down') {
                    $(this).transition({
                        delay: 500,
                        y: '0'
                    },500, 'easeOutCirc');
                }
                else{
                    $(this).transition({
                        y: '14rem'
                    },500, 'easeOutCirc');
                }
            },
            offset: '75%'
        });
        
        $('.categories h1').addClass('before-0').waypoint({
            handler: function (direction) {
                var $el = $(this);
                if (direction === 'down') {
                    $el.removeClass('before-0');
                }else{
                    setTimeout(function() {
                        $el.addClass('before-0');
                    }, 500);
                }
            },
            offset: '75%'
        });  
    },
    section:{
        openCategorie: function(){
            var button = $(this);
            var currentCateg =  button.closest('.categories');
            var currentHeader =  currentCateg.find('header');
            var pageFirst =  currentCateg.find('.but-wait-there-is-more');
            var pageTwo =  currentCateg.find('.detailled-content');
            
            Kilix.isCateg = true;
            button.addClass('loading');
            $('.detailled-menu aside').data('categ',currentCateg.index('.categories'));
            $('#logo').addClass('disabled');
            console.log($('.detailled-menu aside').data('categ'));
            
            $('html,body').animate({
                scrollTop: pageFirst.parent().offset().top - $('.menu').height()
            }, 400, 'easeOutQuint');

            pageTwo.find('detailled-wrapper').scrollTop(0);
            
            //pageTwo.find('footer').css('position','absolute').css('position','fixed'); //fixing moz bug ?

            pageTwo.find('.inception-detailled-wrapper').css({
                marginTop:'0rem'
            });
            
            $('.detailled-menu h2').html(currentHeader.find('h1').html());


            //simulate loading
            setTimeout(function(){
                
                
                console.log('more');
                button.removeClass('loading');
                      
                var inClass = 'pt-page-moveToLeftEasing ';
                var outClass = 'pt-page-moveFromRightFade pt-page-ontop';
                pageFirst.addClass(inClass);
                pageTwo.addClass(outClass + ' current');
                $('.menu .right').transition({
                    y: '-10rem'
                },600, 'snap',function(){
                    pageFirst.removeClass(inClass + ' current');
                    pageTwo.removeClass(outClass);


                    pageTwo.find('.inception-detailled-wrapper').transition({
                        marginTop:'40rem',
                    },800, 'easeInOutQuint');
                });
                
                $('body').css('overflow','hidden');

                
                
                
                
            },1200);
            
            
            
        },
        
        closeCategorie: function(){
            var currentCateg = $('.categories').eq($('.detailled-menu aside').data('categ'));
            var pageFirst =  currentCateg.find('.but-wait-there-is-more');
            var pageTwo =  currentCateg.find('.detailled-content');
            
            var inClass = 'pt-page-moveToRightEasing pt-page-ontop';
            var outClass = 'pt-page-moveFromLeftFade';
            Kilix.isCateg = false;
            pageTwo.addClass(inClass);
            pageFirst.addClass(outClass + ' current');
            $('#logo').removeClass('disabled');
            $('.menu .right').transition({
                y: '0rem'
            },600, 'snap',function(){
                pageTwo.removeClass(inClass + ' current');
                pageFirst.removeClass(outClass);
            });
            
            $('body').css('overflow','auto');
            
        }
    },
    kilixLogo:{
        over: function(){
            Kilix.changeXColor($('#home svg polygon'), '#ff9400')
        }, 
        
        out: function(){
            Kilix.changeXColor($('#home svg polygon'), 'none')
        }
    }
}
$(function() {
    Kilix.init();
    $('body').jpreLoader({
        loaderVPos: '40%'
    },function(){
        
    });
});
