
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
        Kilix.resize();Kilix.resize();
        $(window).on('resize',Kilix.resize);
        

        /*------- INIT BUTTON ------*/
        $('.categories .discover').on('click', this.section.openCategorie);
        $('.detailled-menu aside, a.undiscover, .close-categ-mobile').on('click', this.section.closeCategorie);
        

        
    },
    resize: function(){
        $('#home').width($(window).width());
        $('#home').height($(window).height());
        $('section article.content').height($(window).height() - $('.menu').height());
        $('.but-wait-there-is-more').each(function(index){
            $(this).css({
                'margin-top': - $(this).height()/2,
                'top': '50%'
            });
        })
        
        
        
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
            
            var gohere = $('.❤[data-slide="' + dataslide + '"]').offset().top  - $('.menu').height();
            if(dataslide == 1) gohere = $('.❤[data-slide="' + dataslide + '"]').offset().top;
            
            
            console.log($(this).parent().hasClass('mobile'));
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
            }, 2000);
        });
        $('.mobile-close, .unfold').on('click', function(e){
            e.preventDefault();
            $('nav.mobile-nav').toggleClass('open');
            $('body').toggleClass('push-left');
        });
        
        $('.contact-link, .contact-close, .contact-mobile').on('click', function(e){
            e.preventDefault();
            $('.contact-info').toggleClass('open');
            $('body').toggleClass('push-right');
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
            }, 400);

            pageTwo.find('detailled-wrapper').scrollTop(0);
            
            //pageTwo.find('footer').css('position','absolute').css('position','fixed'); //fixing moz bug ?

            pageTwo.find('.inception-detailled-wrapper').css({
                marginTop:'0rem'
            });


            //simulate loading
            setTimeout(function(){
                
                
                
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
                        marginTop:'20rem',
                    },800);
                });
                
                
                $('.unfold').addClass('hidden');
                $('.close-categ-mobile').removeClass('hidden');
                
                $('html,body').css('overflow','hidden');

                
                
                
                
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
            
            $('.unfold').removeClass('hidden');
            $('.close-categ-mobile').addClass('hidden');
            
            $('html,body').css('overflow','auto');
            
        }
    }
}
$(function() {
    Kilix.init();
    $('body').jpreLoader({
        loaderVPos: '40%'
    });
});
