
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
        /*--- INIT LOADING IMG ---*/
        Kilix.loaders();
        
        /*--- INIT SVG SWITCHING ---*/
        Kilix.switchSVG();

        /*----- STICKY HEADING -----*/
        Kilix.nav();

        /*--- FUNCTIONS ON RESIZE --*/
        Kilix.resize();
        $(window).on('resize',Kilix.resize);
        
        /*---- INIT ANIMATIONS -----*/
        if(!isMobile)Kilix.animations();

        /*------- INIT BUTTON ------*/
        $('.categories .discover').on('click', this.section.openCategorie);
        $('.detailled-menu aside, a.undiscover, .close-categ-mobile').on('click', this.section.closeCategorie);
        
        /*--- INIT SUPA SKROLLA ----*/
        if(!isMobile){
            skrollr.init({
                smoothScrolling:true
            });
        }
        
        /* --- INIT CANVAS --- */
        if(!isMobile && Modernizr.canvas){
            createCanvasIn('container',             '#ffffff',          '#989898',          '#555555',  '#ffffff',          18,     9,      0.8,        0.1);
        }
    },
    resize: function(){
        $('#home').width($(window).width());
        $('#home').height(isMobile?$(window).height():3000);
        $('.height-full-centered').css({
            'height': $(window).height(),
            'line-height': $(window).height()+'px'
        });
     
        
        if(Kilix.isCateg){
            var currentCateg = $('.categories').eq($('.detailled-menu aside').data('categ'));
            currentCateg.css({
                height:$(window).height() - $('.menu').height()
            });
            $('html,body').scrollTop(currentCateg.offset().top - $('.menu').height());
        }


    },
    switchSVG: function(){

        if (Modernizr.svg) {
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
        }
        else{
            $('img.svg[src*="svg"]').attr('src', function() {
                return $(this).attr('src').replace('.svg', '.png');
            });
        }
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
                        $('.menu').css('box-shadow', color+ ' 0px 3px 0px, rgba(0, 0, 0, 0.0470588) 0px 18px 0px');
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
                        $('.menu').css('box-shadow', color+ ' 0px 3px 0px, rgba(0, 0, 0, 0.0470588) 0px 18px 0px');
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
            
            if($(this).parent().hasClass('mobile'))$('.mobile-close').trigger('click');
            
            $('html,body').animate({
                scrollTop: gohere
            }, 2000);
        });
        $('#logo').on('click',function(e){

            if(Kilix.isCateg)Kilix.section.closeCategorie();
            $('html,body').animate({
                scrollTop: $('.❤[data-slide="0"]').offset().top
            }, 2000);
        });
        $('#home footer a').on('click',function(e){
            e.preventDefault();
            $('html,body').animate({
                scrollTop: $('.❤[data-slide="1"]').offset().top
            }, 2000);
        });
        $('.mobile-close, .unfold').on('click', function(e){
            e.preventDefault();
            $('nav.mobile-nav').toggleClass('open');
            $('body').toggleClass('push-left').toggleClass('nope');
        });
        
        $('.contact-link, .contact-close, .contact-mobile, .contact-button').on('click', function(e){
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
            //$('#logo').addClass('disabled');
            console.log($('.detailled-menu aside').data('categ'));
            
            

            pageTwo.scrollTop(0);
            
            pageTwo.find('.inception-detailled-wrapper').transition({
                marginTop:$(window).height()
            });
            
            $('.detailled-menu h2').html(currentHeader.find('h1').html());

            


            //simulate loading
            setTimeout(function(){
                
                $('html,body').animate({
                    scrollTop: currentCateg.offset().top - $('.menu').height()
                }, 200,function(){

                    currentCateg.css({
                        height:$(window).height() - $('.menu').height()
                    });
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
                            marginTop: isMobile?'20rem':'40rem',
                        },800, 'easeInOutCirc');
                    });

                    $('.unfold').addClass('hidden');
                    $('.close-categ-mobile').removeClass('hidden');     
                    $('body').css('overflow','hidden');

                    });
                
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
            //$('#logo').removeClass('disabled');

            $('.menu .right').transition({
                y: '0rem'
            },600, 'snap',function(){
                pageTwo.removeClass(inClass + ' current');
                pageFirst.removeClass(outClass);
            });


            $('.unfold').removeClass('hidden');
            $('.close-categ-mobile').addClass('hidden');
            $('body').css('overflow','auto');

            currentCateg.attr('style','');
            
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
