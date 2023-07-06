
$(document).ready(function() {
	
	"use strict";
	
	PageLoad();
	FirstLoad();
	HeroSection();
	Sliders();
	AjaxLoad();
	Portfolio();
	setTimeout(function(){
		Portfolio();						
	} , 100 );
	BackToTop();
	//VirtualScr();
	JustifiedGrid();
	Lightbox();
	AppearIteam();
	ContactForm();
	PlayVideo();
	
});



/*--------------------------------------------------
Function Page Load
---------------------------------------------------*/

	function PageLoad() {	
		
		if ($('#page-content').hasClass("light-content")) {
			$('.preloader-wrap').addClass('light-content');			
		}
		
		$('body').removeClass('hidden');		
		
		var width = 100,
			perfData = window.performance.timing, 
			EstimatedTime = -(perfData.loadEventEnd - perfData.navigationStart),
			time = ((EstimatedTime/1000)%10) * 50
		
		
		// Percentage Increment Animation
		var PercentageID = $("#precent"),
				start = 0,
				end = 100,
				durataion = time;
				animateValue(PercentageID, start, end, durataion);
				
		function animateValue(id, start, end, duration) {
		  
			var range = end - start,
			  current = start,
			  increment = end > start? 1 : -1,
			  stepTime = Math.abs(Math.floor(duration / range)),
			  obj = $(id);
			
			var timer = setInterval(function() {
				current += increment;
				$(obj).text(current);
			  //obj.innerHTML = current;
				if (current == end) {
					clearInterval(timer);
				}
			}, stepTime);
		}
		
		// Fading Out Loadbar on Finised
		setTimeout(function(){
			$('body').waitForImages({
					finished: function() {
						
						if( $('.split-slider').length > 0 ){
							TweenMax.to($(".preloader-wrap"),1, {force3D:true, xPercent: -101, delay:0.3, ease:Power2.easeInOut});
						} else {
							TweenMax.to($(".preloader-wrap"),0.7, {force3D:true, yPercent: -101, delay:0.3, ease:Power2.easeInOut});
						}
						TweenMax.set($(".preloader-wrap"), {visibility:'hidden', delay:0.9, opacity:0});
						
						setTimeout(function(){
						
							$('body').waitForImages({
								finished: function() {
									TweenMax.to($("#header-container, #footer-container"), 1, {force3D:true, opacity:1, ease:Power2.easeOut});
									TweenMax.to($(".split-slider #image-slider"), 1.2, {force3D:true, opacity:0.8, x:0, scale:1, delay:0.5, ease:Power2.easeOut});
									TweenMax.to($(".centered-slider #image-slider"), 1, {force3D:true, opacity:0.8, x:0, scale:0.6, delay:0.5, ease:Power2.easeOut});						
									var tlThumbs = new TimelineLite();
									$(".split-slider .swiper-slide").each(function(index, element) {
										tlThumbs.to(element, 1, {x:0, opacity:1, delay:0.5,  ease:Power2.easeOut}, index * 0.03)
									});
									TweenMax.to($("#external-caption"), 0.6, {force3D:true, opacity:1, delay:1, x:0, ease:Power2.easeOut});
									TweenMax.to($(".centered-slider .swiper-slide-active"), 1, {force3D:true, scale:1, opacity:1, delay:0.8, ease:Power2.easeOut  });
									TweenMax.to($(".centered-slider .swiper-slide-active").prev(), 1, {force3D:true, scale:1, opacity:1, delay:0.85, ease:Power2.easeOut  });
									TweenMax.to($(".centered-slider .swiper-slide-active").next(), 1, {force3D:true, scale:1, opacity:1, delay:0.85, ease:Power2.easeOut  });
									TweenMax.to($(".centered-slider .swiper-slide-active").prev().prev(), 1, {force3D:true, scale:1, opacity:1, delay:0.9, ease:Power2.easeOut  });
									TweenMax.to($(".centered-slider .swiper-slide-active").next().next(), 1, {force3D:true, scale:1, opacity:1, delay:0.9, ease:Power2.easeOut  });
									TweenMax.to($(".centered-slider .swiper-slide"), 1, {force3D:true, scale:1, opacity:1, delay:1, ease:Power2.easeOut  });
										
								},
								waitForAll: true
							});
							
							TweenMax.to($("#main"), 0.2, {force3D:true, opacity:1, delay:0.1, ease:Power2.easeOut});
							if( $('#hero').hasClass("has-image")) {	
								TweenMax.to($("#hero-bg-image"), 1, {force3D:true, scale:1.05 , opacity:0.8, delay:0.4, ease:Power2.easeOut});
								TweenMax.to($(".hero-title"), 0.4, {force3D:true, y: 0, opacity:1, delay:0.7, ease:Power2.easeOut});
								TweenMax.to($(".hero-subtitle"), 0.4, {force3D:true, y: 50, opacity:1, delay:0.75, ease:Power2.easeOut});
								TweenMax.to($(".scroll-down-wrap"), 0.4, {force3D:true, y: 0, opacity:1, delay:0.85, ease:Power2.easeOut});
								TweenMax.to($("#main-page-content"), 0.4, {force3D:true, opacity:1, y:0, delay:0.95, ease:Power2.easeOut});
							} else {
								TweenMax.to($(".hero-title"), 0.4, {force3D:true, y: 0, opacity:1, delay:0.7, ease:Power2.easeOut});
								TweenMax.to($(".hero-subtitle"), 0.4, {force3D:true, y: 50, opacity:1, delay:0.75, ease:Power2.easeOut});
								TweenMax.to($("#main-page-content"), 0.4, {force3D:true, opacity:1, y:0, delay:0.85, ease:Power2.easeOut});
							}
							TweenMax.to($("#footer-container"), 1, {force3D:true, opacity:1, ease:Power2.easeOut});
							
							if ($('#hero-bg-image').hasClass("light-content")) {
								$('#hero-caption').addClass('light-content');
								setTimeout(function(){
									$('#magic-cursor').addClass('light-content');
								} , 700 );			
								setTimeout(function(){
									$('#header-container').addClass('light-content');
								} , 600 );
							}		
								
							setTimeout( function(){	
								$('body').removeClass("load-project-page");
							} , 600 );
							
							setTimeout( function(){	
								$('body').removeClass("load-next-project");
								$('body').addClass("header-visible");
								$('#showcase-holder').removeClass("disabled");
							} , 1600 );
							
							setTimeout( function(){	
								$('body').removeClass("show-loader")
							} , 800 );	
							
						} , 100 );
					},
				waitForAll: true
			});
	  
		}, time);
		
		
		
	}// End Page Load
		


/*--------------------------------------------------
Function First Load
---------------------------------------------------*/	

	function FirstLoad() {	
		
		$("html,body").animate({scrollTop: 0}, 1);
		
		if ($("#page-content").hasClass("light-content")) {
			$("main, nav").css('background-color', '#0f1010');
			$('#magic-cursor').addClass('light-content');
			if( $('#hero').length > 0 ){						
				if( $('#hero').hasClass("has-image")) {	
					$("header").css('background-color', 'transparent');
				} else {
					$("header").css('background-color', '#0f1010');
				}
			}
		} else {
			$("main").css('background-color', '#fff');
			$("nav").css('background-color', '#0f1010');
			$('#magic-cursor').removeClass('light-content');
			if( $('#hero').hasClass("has-image")) {	
				$("header").css('background-color', 'transparent');
			} else {
				$("header").css('background-color', '#fff');
			}
		}
		
		$('.slider-img').each(function() {
			var image = $(this).data('src');	
			$(this).css({'background-image': 'url(' + image + ')'});
		});
		
		$('.video-cover').each(function() {
			var image = $(this).data('src');	
			$(this).css({'background-image': 'url(' + image + ')'});
		});
		
		//Load Default Page
		$('a.ajax-link').on('click', function() {
			$("body").addClass("show-loader");	
			$(".flexnav").removeClass("flexnav-show");
			$('#menu-burger').removeClass("open");
			var tlMenu = new TimelineLite();
			$(".fullscreen-menu .menu-timeline").each(function(index, element) {
				tlMenu.to(element, 0.25, {y:-80, opacity:0, ease:Power2.easeIn}, index * 0.05)
			});
			TweenMax.to($("nav"),0.4, {force3D:true, delay:0.2, opacity:0,  ease:Linear.easeNone });		
			TweenMax.to('#ball', 0.3,{borderWidth:"2px",scale:1,backgroundColor:"rgba(0, 0, 0, 0)",opacity:1});
			if( $('#showcase-holder').length > 0 ){
				TweenMax.to($(".split-slider .image-slider-wrapper"),0.4, {force3D:true, xPercent: -10, delay:0.2, opacity:0, ease:Power2.easeIn });
				TweenMax.to($(".split-slider .swiper-slide-active"), 0.4, {force3D:true, x:-250, opacity:0, delay:0, ease:Power2.easeIn  });
				TweenMax.to($(".split-slider .swiper-slide-active").next(), 0.4, {force3D:true, x:-250, opacity:0, delay:0.05, ease:Power2.easeIn  });
				TweenMax.to($(".split-slider .swiper-slide-active").next().next(), 0.4, {force3D:true, x:-250, opacity:0, delay:0.1, ease:Power2.easeIn  });
				TweenMax.to($(".split-slider .swiper-slide-active").next().next().next(), 0.4, {force3D:true, x:-250, opacity:0, delay:0.15, ease:Power2.easeIn  });
				TweenMax.to($(".split-slider .swiper-slide-active").next().next().next().next(), 0.4, {force3D:true, x:-250, opacity:0, delay:0.2, ease:Power2.easeIn  });
				
				TweenMax.to($(".centered-slider #image-slider"), 0.4, {force3D:true, opacity:0, x:0, scale:0.3, delay:0.2, ease:Power2.easeIn});
				TweenMax.to($(".centered-slider .swiper-slide-active"), 0.4, {force3D:true, scale:0.7, opacity:0, delay:0.3, ease:Power2.easeIn  });
				TweenMax.to($(".centered-slider .swiper-slide-active").prev(), 0.4, {force3D:true, scale:0.7, opacity:0, delay:0.35, ease:Power2.easeIn  });
				TweenMax.to($(".centered-slider .swiper-slide-active").next(), 0.4, {force3D:true, scale:0.7, opacity:0, delay:0.35, ease:Power2.easeIn  });
				TweenMax.to($(".centered-slider .swiper-slide-active").prev().prev(), 0.4, {force3D:true, scale:0.7, opacity:0, delay:0.4, ease:Power2.easeIn  });
				TweenMax.to($(".centered-slider .swiper-slide-active").next().next(), 0.4, {force3D:true, scale:0.7, opacity:0, delay:0.4, ease:Power2.easeIn  });
				TweenMax.to($("#main"), 0.3, {opacity:0, delay:0.4, ease:Power0.ease});
			} else {
				TweenMax.to($("#main"), 0.3, {opacity:0, delay:0.1, ease:Power0.ease});
			}		
			TweenMax.to($("#footer-container,#external-caption"), 0.3, {opacity:0, ease:Power0.ease});	
		});
		
		
		//Load Project Page from Split Slider
		$('.split-slider a.ajax-link-project').on('click', function() {
			$("body").addClass("show-loader");
			
			TweenMax.to($(".swiper-slide-active"), 0.4, {force3D:true, x:-250, opacity:0, delay:0, ease:Power2.easeIn  });
			TweenMax.to($(".swiper-slide-active").next(), 0.4, {force3D:true, x:-250, opacity:0, delay:0.05, ease:Power2.easeIn  });
			TweenMax.to($(".swiper-slide-active").next().next(), 0.4, {force3D:true, x:-250, opacity:0, delay:0.1, ease:Power2.easeIn  });
			TweenMax.to($(".swiper-slide-active").next().next().next(), 0.4, {force3D:true, x:-250, opacity:0, delay:0.15, ease:Power2.easeIn  });
			TweenMax.to($(".swiper-slide-active").next().next().next().next(), 0.4, {force3D:true, x:-250, opacity:0, delay:0.2, ease:Power2.easeIn  });			
			TweenMax.to($("#image-slider"), 0.7, {left:0, ease:Power2.easeInOut});
			TweenMax.to($("#image-slider .image-slider-wrapper"), 0.7, {x:0, ease:Power2.easeInOut});		
			setTimeout( function(){
				$("body").addClass("load-project-page");
			} , 100 );	
			TweenMax.to($("#footer-container, #external-caption"), 0.2, {opacity:0, ease:Power0.easeNone});									
		});
		
		//Load Project Page from Centered Slider
		$('.centered-slider a.ajax-link-project').on('click', function() {
			$("body").addClass("show-loader");
			
			TweenMax.to($(".centered-slider .swiper-slide-active"), 0.4, {force3D:true, scale:1.2, opacity:0, delay:0, ease:Power2.easeIn  });
			TweenMax.to($(".centered-slider .swiper-slide-active").prev(), 0.4, {force3D:true, scale:1.1, opacity:0, delay:0.05, ease:Power2.easeIn  });
			TweenMax.to($(".centered-slider .swiper-slide-active").next(), 0.4, {force3D:true, scale:1.1, opacity:0, delay:0.05, ease:Power2.easeIn  });
			TweenMax.to($(".centered-slider .swiper-slide-active").prev().prev(), 0.4, {force3D:true, scale:1, opacity:0, delay:0.1, ease:Power2.easeIn  });
			TweenMax.to($(".centered-slider .swiper-slide-active").next().next(), 0.4, {force3D:true, scale:1, opacity:0, delay:0.1, ease:Power2.easeIn  });			
			TweenMax.to($("#image-slider"), 0.7, {scale:1, ease:Power2.easeInOut});		
			setTimeout( function(){
				$("body").addClass("load-project-page");
			} , 100 );	
			TweenMax.to($("#footer-container, #external-caption"), 0.2, {opacity:0, ease:Power0.easeNone});									
		});
		
		//Load Page From Menu
		$('.sm-screen .ajax-link').on('click', function() {							
			$("body").addClass("show-loader");			
			var tlMenu = new TimelineLite();
			$(".menu-timeline").each(function(index, element) {
				tlMenu.to(element, 0.25, {y:-80, opacity:0, ease:Power2.easeIn}, index * 0.05)
			});
			$('#menu-burger, nav').removeClass("open");
		});
		
		$('#burger-wrapper').on('click', function() {
			$('#menu-burger, nav').toggleClass('open');
			$('#header-container').toggleClass('light-content');
			setTimeout( function(){			
				if ($('#menu-burger').hasClass("open")) {
						
					//Fade In Navigation Lists
					var tlMenu = new TimelineLite();
					tlMenu.set($(".menu-timeline"), {y: 80, opacity:0});
					$(".menu-timeline").each(function(index, element) {
						tlMenu.to(element, 0.5, {y:0, opacity:1, delay:0.4, ease:Power2.easeOut}, index * 0.1)
					});
						
				} else {	
					//Fade Out Navigation Lists					
					var tlMenu = new TimelineLite();
					$(".menu-timeline").each(function(index, element) {
						tlMenu.to(element, 0.25, {y:-80, opacity:0, ease:Power2.easeIn}, index * 0.05)
					});
					setTimeout( function(){
						$(".touch-button.active").trigger("click");
					} , 500 );
				}							
			} , 20 );
		});
		
		if( $('.copyright-wrap').length > 0 ){
			$('footer').addClass('centered');			
		}
		
		if( $('.hero-video-wrapper').length > 0 ){
			$('#hero-bg-wrapper').find('video').each(function() {
				$(this).get(0).play();
			}); 
		}	
		
		
		var viewportWidth = $(window).width();
		if (viewportWidth < 1024) {				
			$('.hero-video-wrapper').remove();							 
		}	
		
		
	}// End First Load
	
	
/*--------------------------------------------------
Function Lazy Load
---------------------------------------------------*/

	function LazyLoad() {	
		
		$('body').waitForImages({
			finished: function() {
				$('body').removeClass('loading')
				setTimeout( function(){	
					$('body').removeClass('hidden').removeClass('scale-up').removeClass('scale-none');
				} , 1500 );
			},
			waitForAll: true
		});	
		
		$('body').waitForImages({
			finished: function() {
				TweenMax.to($(".split-slider #image-slider"), 1.2, {force3D:true, opacity:0.8, x:0, scale:1, delay:0.3, ease:Power2.easeOut});
				TweenMax.to($(".centered-slider #image-slider"), 1, {force3D:true, opacity:0.8, x:0, scale:0.6, delay:0.3, ease:Power2.easeOut});
				TweenMax.to($("#header-container, #footer-container"), 1, {force3D:true, opacity:1, ease:Power2.easeOut});
				var tlThumbs = new TimelineLite();
				$(".split-slider .swiper-slide").each(function(index, element) {
					tlThumbs.to(element, 1, {x:0, opacity:1, delay:0.3,  ease:Power2.easeOut}, index * 0.03)
				});
				TweenMax.to($("#external-caption"), 0.7, {force3D:true, opacity:1, delay:0.7, x:0, ease:Power2.easeOut});
				TweenMax.to($(".centered-slider .swiper-slide-active"), 1, {force3D:true, scale:1, opacity:1, delay:0.6, ease:Power2.easeOut  });
				TweenMax.to($(".centered-slider .swiper-slide-active").prev(), 1, {force3D:true, scale:1, opacity:1, delay:0.65, ease:Power2.easeOut  });
				TweenMax.to($(".centered-slider .swiper-slide-active").next(), 1, {force3D:true, scale:1, opacity:1, delay:0.65, ease:Power2.easeOut  });
				TweenMax.to($(".centered-slider .swiper-slide-active").prev().prev(), 1, {force3D:true, scale:1, opacity:1, delay:0.7, ease:Power2.easeOut  });
				TweenMax.to($(".centered-slider .swiper-slide-active").next().next(), 1, {force3D:true, scale:1, opacity:1, delay:0.7, ease:Power2.easeOut  });
				TweenMax.to($(".centered-slider .swiper-slide"), 1, {force3D:true, scale:1, opacity:1, delay:0.8, ease:Power2.easeOut  });	
			},
			waitForAll: true
		});
		
		
		TweenMax.to($("#main"), 0.2, {force3D:true, opacity:1, delay:0.1, ease:Power2.easeOut});
		if( $('#hero').hasClass("has-image")) {	
			TweenMax.to($("#hero-bg-image"), 0.7, {force3D:true, scale:1.05 , opacity:0.8, delay:0.6, ease:Power2.easeOut});
			TweenMax.to($(".hero-title"), 0.4, {force3D:true, y: 0, opacity:1, delay:0.7, ease:Power2.easeOut});
			TweenMax.to($(".hero-subtitle"), 0.4, {force3D:true, y: 50, opacity:1, delay:0.75, ease:Power2.easeOut});
			TweenMax.to($(".scroll-down-wrap"), 0.4, {force3D:true, y: 0, opacity:1, delay:0.85, ease:Power2.easeOut});
			TweenMax.to($("#main-page-content"), 0.4, {force3D:true, opacity:1, y:0, delay:0.95, ease:Power2.easeOut});
		} else {
			TweenMax.to($(".hero-title"), 0.4, {force3D:true, y: 0, opacity:1, delay:0.7, ease:Power2.easeOut});
			TweenMax.to($(".hero-subtitle"), 0.4, {force3D:true, y: 50, opacity:1, delay:0.75, ease:Power2.easeOut});
			TweenMax.to($("#main-page-content"), 0.4, {force3D:true, opacity:1, y:0, delay:0.85, ease:Power2.easeOut});
		}
		TweenMax.to($("#footer-container"), 1, {force3D:true, opacity:1, ease:Power2.easeOut});
		
		if ($('#hero-bg-image').hasClass("light-content")) {
			$('#hero-caption').addClass('light-content');
			setTimeout(function(){
				$('#magic-cursor').addClass('light-content');
			} , 700 );			
			setTimeout(function(){
				$('#header-container').addClass('light-content');
			} , 600 );
		}		
			
		setTimeout( function(){	
			$('body').removeClass("load-project-page");
		} , 600 );
		
		setTimeout( function(){	
			$('body').removeClass("load-next-project");
			$('#showcase-holder').removeClass("disabled");
		} , 1900 );
		
		setTimeout( function(){	
			$('body').removeClass("show-loader")
		} , 800 );
		
	
	}// End Lazy Load		



/*--------------------------------------------------
Function Hero Section
---------------------------------------------------*/
	
	function HeroSection() {
		
		if( $('#hero').length > 0 ){
						
			if( $('#hero').hasClass("has-image")) {	
			
				// Hero Caption Options			
				var HeroCaption = document.querySelector('#hero-caption');
				var HeroImage = document.querySelector('#hero-image-parallax');
				var windowScrolled;
				function HeroParallaxScroll() {	
					windowScrolled = window.pageYOffset || document.documentElement.scrollTop;				
					if ($('#hero-styles').hasClass("parallax-onscroll")) {		
						TweenMax.to(HeroCaption, 0.1, {y: windowScrolled / 4});	
						TweenMax.to(HeroImage, 0.1, {y: windowScrolled / 5});						
					}
					if ($('#hero-styles').hasClass("opacity-onscroll")) {
						HeroCaption.style.opacity =  (1 - (windowScrolled/15) / 40);
					}				
				}
				
				$(window).on('scroll', HeroParallaxScroll);
					
				$('a.ajax-link, a.ajax-link-menu').on('click', function() {
					$(window).off('scroll', HeroParallaxScroll);
				});
			
			}
			
			
			// Hero Image Parallax
			if( $('#hero').hasClass("has-image")) {				
				var timeout;
				$(window).resize(changePersective);				
				changePersective();				
				function changePersective(){
					TweenMax.set('#hero-bg-wrapper', {perspective: $('body').width()});
				}
				$('#hero').mousemove(function(e){
					if(timeout) clearTimeout(timeout);
					setTimeout(callParallaxHero.bind(null, e));			
				});				
				function callParallaxHero(e){
					parallaxItHero(e, '#hero-bg-image', 0); //5
					moveItHero(e, '#hero-bg-image', - 30); //80
				}				
				function parallaxItHero(e, target, movement){
					var $this = $('#hero-bg-wrapper');
					var relX = e.pageX - $this.offset().left;
					var relY = e.pageY - $this.offset().top;					
					TweenMax.to(target, 1, {
						rotationY: (relX - $this.width()/1.5) / $this.width() * movement,
						rotationX: (relY - $this.height()/2) / $this.height() * movement,
					})
				}				
				function moveItHero(e, target, movement){
					var $this = $('#hero-bg-wrapper');
					var relX = e.pageX - $this.offset().left;
					var relY = e.pageY - $this.offset().top;					
					TweenMax.to(target, 1, {
						x: (relX - $this.width()/2) / $this.width() * movement,
						y: (relY - $this.height()/2) / $this.height() * movement,
					})
				}
				
				function HeroChangeHeaderColor() {	
				
					var scroll = $(window).scrollTop();
					
					if (!$('#page-content').hasClass("light-content")) {					
						if ($('#hero-bg-image').hasClass("light-content")) {
							
							if (scroll >= $("#hero").height() - 80) {					
								$('#magic-cursor, #header-container').removeClass('light-content');
							} else { 
								$('#magic-cursor, #header-container').addClass('light-content');
							}						
						}
					
					}
					
					if (scroll >= $("#hero").height()) {					
						$('#hero-bg-wrapper').find('video').each(function() {
							$(this).get(0).pause();
						});
					} else { 
						$('#hero-bg-wrapper').find('video').each(function() {
							$(this).get(0).play();
						});
					}
						
				}
				
				$(window).on('scroll', HeroChangeHeaderColor);
				
				$('a.ajax-link, a.ajax-link-menu').on('click', function() {
					$(window).off('scroll', HeroChangeHeaderColor);
				});
			}
			
		
		}
		
	}//End Hero Section
	




/*--------------------------------------------------
Function Portfolio
---------------------------------------------------*/
	
	function Portfolio() {
		
		
		// Split and Full Slider
		if( $('.split-slider').length > 0 ){
			
			// Create Fixed Caption
			if ($("#main-content").hasClass("split-slider")) {
                $("#main-content").append('<div id="external-caption"></div>');
                $("#showcase-slider").find(".swiper-slide .slide-caption").each(function() {
                    $("#external-caption").append($(this))
                })
            }

			var swiperOptions = {
				slidesPerView: 'auto',
				direction: "horizontal",
				loop: true,
				grabCursor: true,
				resistance : true,
				resistanceRatio : 0,
				speed:800,
				autoplay: false,
				effect: "slide",
				mousewheel: true,				
				on: {					
					init: function () {
						
						//Load Project Page
						$('.split-slider a.ajax-link-project').on('click', function() {
							$("body").addClass("show-loader");
							
							TweenMax.to($(".swiper-slide-active"), 0.4, {force3D:true, x:-250, opacity:0, delay:0, ease:Power2.easeIn  });
							TweenMax.to($(".swiper-slide-active").next(), 0.4, {force3D:true, x:-250, opacity:0, delay:0.05, ease:Power2.easeIn  });
							TweenMax.to($(".swiper-slide-active").next().next(), 0.4, {force3D:true, x:-250, opacity:0, delay:0.1, ease:Power2.easeIn  });
							TweenMax.to($(".swiper-slide-active").next().next().next(), 0.4, {force3D:true, x:-250, opacity:0, delay:0.15, ease:Power2.easeIn  });
							TweenMax.to($(".swiper-slide-active").next().next().next().next(), 0.4, {force3D:true, x:-250, opacity:0, delay:0.2, ease:Power2.easeIn  });			
							TweenMax.to($("#image-slider"), 0.7, {left:0, ease:Power2.easeInOut});
							TweenMax.to($("#image-slider .image-slider-wrapper"), 0.7, {x:0, ease:Power2.easeInOut});		
							setTimeout( function(){
								$("body").addClass("load-project-page");
							} , 100 );	
							TweenMax.to($("#footer-container, #external-caption"), 0.2, {opacity:0, ease:Power0.easeNone});									
						});
						
						//Load Image Changer
						$('.slider-img:nth-child(1)').addClass('active');
						$('.slider-img:nth-child(1)').find('video').each(function() {
							$(this).get(0).play();
						});
						$('.swiper-slide').on('mouseenter touchstart', function() {
							if (!$(this).hasClass("active")) {
								$('.slider-img').find('video').each(function() {
									$(this).get(0).pause();
								});
								$('.swiper-slide').removeClass('active');
								$(this).addClass('active');	
								var slide = $(this).data('slide'),
								preview = $('.slider-img[data-slide="' + slide + '"]');	
								$('#image-slider').find('.slider-img').removeClass('active');
								preview.addClass('active');
								preview.find('video').each(function() {
									$(this).get(0).play();
								});						
								counter = $('#counter-wrap span[data-slide-count="' + slide + '"]');	
								TweenLite.to($('#counter-wrap').find('span'), 0.3, {force3D:true, opacity:0, delay:0, y: 10, ease:Power2.easeIn, onComplete:function(){
									TweenMax.set(counter, {opacity:0, y:-10, delay:0});
									TweenMax.to(counter, 0.3, {force3D:true, opacity:1, y:0, delay:0, ease:Power2.easeOut});
								}});
								
								caption = $('#external-caption .slide-caption[data-slide-caption="' + slide + '"]');	
								TweenLite.to($('#external-caption').find('.slide-caption'), 0.3, {force3D:true, opacity:0, delay:0, y: 0, ease:Power2.easeIn, onComplete:function(){
									TweenMax.set(caption, {opacity:0, y:0, delay:0});
									TweenMax.to(caption, 0.3, {force3D:true, opacity:1, y:0, delay:0, ease:Power2.easeOut});
								}});								
							}
							
						}).on('mouseleave touchend', function() {
							
						});
						
					},
				}
			};
				
			var swiper = new Swiper(".swiper-container", swiperOptions);
			
		}
		
		// Centered Slider
		if( $('.centered-slider').length > 0 ){

			var swiperOptions = {
				centeredSlides: true,
				slidesPerView: 'auto',
				direction: "horizontal",
				loop: true,
				grabCursor: true,
				resistance : true,
				resistanceRatio : 0,
				speed:800,
				autoplay: false,
				effect: "slide",
				mousewheel: true,
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				},
				on: {					
					init: function () {
						
						//Load Project Page
						$('.centered-slider a.ajax-link-project').on('click', function() {
							$("body").addClass("show-loader");
							
							TweenMax.to($(".centered-slider .swiper-slide-active"), 0.4, {force3D:true, scale:1.2, opacity:0, delay:0, ease:Power2.easeIn  });
							TweenMax.to($(".centered-slider .swiper-slide-active").prev(), 0.4, {force3D:true, scale:1.1, opacity:0, delay:0.05, ease:Power2.easeIn  });
							TweenMax.to($(".centered-slider .swiper-slide-active").next(), 0.4, {force3D:true, scale:1.1, opacity:0, delay:0.05, ease:Power2.easeIn  });
							TweenMax.to($(".centered-slider .swiper-slide-active").prev().prev(), 0.4, {force3D:true, scale:1, opacity:0, delay:0.1, ease:Power2.easeIn  });
							TweenMax.to($(".centered-slider .swiper-slide-active").next().next(), 0.4, {force3D:true, scale:1, opacity:0, delay:0.1, ease:Power2.easeIn  });			
							TweenMax.to($("#image-slider"), 0.7, {scale:1, ease:Power2.easeInOut});		
							setTimeout( function(){
								$("body").addClass("load-project-page");
							} , 100 );	
							TweenMax.to($("#footer-container, #external-caption"), 0.2, {opacity:0, ease:Power0.easeNone});									
						});
						
						//Load Image Changer
						$('.slider-img:nth-child(1)').addClass('active');
						$('.slider-img:nth-child(1)').find('video').each(function() {
							$(this).get(0).play();
						});
						$('.swiper-slide').on('mouseenter touchstart', function() {
							if (!$(this).hasClass("active")) {
								$('.slider-img').find('video').each(function() {
									$(this).get(0).pause();
								});
								$('.swiper-slide').removeClass('active');
								$(this).addClass('active');	
								var slide = $(this).data('slide'),
								preview = $('.slider-img[data-slide="' + slide + '"]');	
								$('#image-slider').find('.slider-img').removeClass('active');
								preview.addClass('active');
								preview.find('video').each(function() {
									$(this).get(0).play();
								});							
								counter = $('#counter-wrap span[data-slide-count="' + slide + '"]');	
								TweenLite.to($('#counter-wrap').find('span'), 0.3, {force3D:true, opacity:0, delay:0, y: 10, ease:Power2.easeIn, onComplete:function(){
									TweenMax.set(counter, {opacity:0, y:-10, delay:0});
									TweenMax.to(counter, 0.3, {force3D:true, opacity:1, y:0, delay:0, ease:Power2.easeOut});
								}});								
							}
							
						}).on('mouseleave touchend', function() {
							
						});
						
					},
				}
			};
				
			var swiper = new Swiper(".swiper-container", swiperOptions);
			
		}
		
		// Drag Circle on Slider
		$('#showcase-slider').on('click', function(event){event.preventDefault()} );
		$('#showcase-slider').on('mousedown touchstart', function(event) {				
			$('body').addClass('scale-up');
			TweenMax.to('#ball', 0.1,{transformOrigin: '15px 15px', borderWidth: '1px', scale: 2});
		});
		$('#showcase-slider a').on('mousedown touchstart', function(event) {				
			$('body').addClass('scale-none');
		});				
		$('#showcase-slider').on('mouseup touchend', function(event) {				
			$('body').removeClass('scale-up');
			TweenMax.to('#ball', 0.1,{borderWidth: '2px', scale:1, x: -15, y: -15});
		});
		
		
		// Project Navigation Events
		$('a.next-ajax-link-project').on('click', function() {
			$("body").addClass("load-next-project");
			$("body").addClass("show-loader");
			TweenMax.to('#ball', 0.3,{borderWidth:"2px",scale:1,backgroundColor:"rgba(0, 0, 0, 0)",opacity:1});
			if ($('#project-nav').hasClass("light-content")) {				
				setTimeout(function(){
					$('body').addClass('light-content');								
				} , 300 );
			}						
		});	
		
		$('.next-project-title').on('click', function() {					
			TweenMax.set($(".main-title"), {y:0});
			TweenMax.set($(".main-subtitle"), {y:40, opacity:0});
			TweenMax.to($("#main-page-content"), 0.3, {opacity:0});			
			setTimeout(function(){
				TweenMax.to($("#project-nav"), 0.6, {height:"100vh", ease:Power2.easeInOut});
				TweenMax.to($(".next-project-image"), 0.6, {top:"0", y: 0, ease:Power2.easeInOut});
				TweenMax.to($("footer"), 0.3, {opacity:0, ease:Power2.easeInOut});
			} , 50 );	
		});
		
		if( $('#project-nav').length > 0 ){
			$('#main-page-content').addClass('project-page');			
		}
			
			
	}//End Portfolio
	

/*--------------------------------------------------
Function Back To Top
---------------------------------------------------*/
	
	function BackToTop() {
		
		$('.scroll-down-wrap').on('click', function() {
			$('html, body').animate({ scrollTop: $('#main-content').offset().top +1 },700);
			return false;
		});
		
		$(".flexnav").flexNav({ 'animationSpeed' : 250 });
	
	}//End Back To Top
	
	
	
/*--------------------------------------------------
Function Virtual Scroll
---------------------------------------------------*/

	function VirtualScr() {		
		
		new SmoothScroll();

		function SmoothScroll(el) {
			var t = this, h = document.documentElement;
			el = el || window;
			t.rAF = false;
			t.target = 0;
			t.scroll = 0;
			t.animate = function() {
			t.scroll += (t.target - t.scroll) * 0.1;
			if (Math.abs(t.scroll.toFixed(5) - t.target) <= 0.47131) {
			cancelAnimationFrame(t.rAF);
			t.rAF = false;}
			if (el == window) scrollTo(0, t.scroll);
			else el.scrollTop = t.scroll;
			if (t.rAF) t.rAF = requestAnimationFrame(t.animate);};
			el.onmousewheel = function(e) {
			e.preventDefault();
			e.stopPropagation();
			var scrollEnd = (el == window) ? h.scrollHeight - h.clientHeight : el.scrollHeight - el.clientHeight;
			t.target += (e.wheelDelta > 0) ? -100 : 100;
			if (t.target < 0) t.target = 0;
			if (t.target > scrollEnd) t.target = scrollEnd;
			if (!t.rAF) t.rAF = requestAnimationFrame(t.animate);};
			el.onscroll = function() {
			if (t.rAF) return;
			t.target = (el == window) ? pageYOffset || h.scrollTop : el.scrollTop;
			t.scroll = t.target;};
		}			
		
	}// End Virtual Scroll
	
	
/*--------------------------------------------------
Function Sliders
---------------------------------------------------*/
	
	function Sliders() {
		
		$('.slider').owlCarousel({
			loop:true,
			margin:500,
			center: true,
			autoHeight:false,
			nav:true,
			navSpeed: 500,
			items:1,			
		});
		
		$( ".slider .owl-prev" ).removeClass( "parallax-wrap" );
		$( ".slider .owl-next" ).removeClass( "parallax-wrap" );
		
		$('.carousel').owlCarousel({
			loop:true,
			margin:20,
			autoHeight:false,
			navSpeed: 600,
			nav:true,
			responsive:{
				0:{
					items:1
				},
				479:{
					items:2
				},
				1024:{
					items:3
				},
				1466:{
					items:3
				}
			}
		});
		
		$( ".carousel .owl-prev" ).removeClass( "parallax-wrap" );
		$( ".carousel .owl-next" ).removeClass( "parallax-wrap" );	
			
		$(".owl-prev").mouseenter(function(e) {	
			TweenMax.to('#ball', 0.1,{transformOrigin: '15px 15px', borderWidth: '1px', scale: 2});
			TweenMax.to('#ball-loader', 0.1,{borderWidth: '1px', top: 1, left: 1});
			$( "#ball" ).addClass("with-icon").append( '<i class="fa fa-chevron-left"></i>' );
		});
			
		$(".owl-prev").mouseleave(function(e) {
			TweenMax.to('#ball', 0.1,{borderWidth: '2px', scale:1, x: -15, y: -15});
			TweenMax.to('#ball-loader', 0.1,{borderWidth: '2px', top: 0, left: 0});
			$("#ball").removeClass("with-icon");
			$('#ball i').remove();
		});
		
		$(".owl-next").mouseenter(function(e) {	
			TweenMax.to('#ball', 0.1,{transformOrigin: '15px 15px', borderWidth: '1px', scale: 2});
			TweenMax.to('#ball-loader', 0.1,{borderWidth: '1px', top: 1, left: 1});
			$( "#ball" ).addClass("with-icon").append( '<i class="fa fa-chevron-right"></i>' );
		});
			
		$(".owl-next").mouseleave(function(e) {
			TweenMax.to('#ball', 0.1,{borderWidth: '2px', scale:1, x: -15, y: -15});
			TweenMax.to('#ball-loader', 0.1,{borderWidth: '2px', top: 0, left: 0});
			$("#ball").removeClass("with-icon");
			$('#ball i').remove();
		});
		
		$('.slider').on('click', function() {
			
			var $window = $(window),
				$element = $('.slider'),
				elementTop = $element.offset().top,
				elementHeight = $element.height(),
				viewportHeight = $window.height(),
				scrollIt = elementTop - ((viewportHeight - elementHeight) / 2 + 20);
							
			$("html, body").animate({ scrollTop: scrollIt }, 300);
			
		});
		
		if( $('.text-carousel').length > 0 ){		
			$(".text-carousel").owlCarousel({	
				loop:true,
				dots:false,
				items:1,
				autoplay:true,
				smartSpeed: 750,
				autoHeight:true,
				autoplayHoverPause:true,
				nav:true,
				navText: ["<div class='prev-testimonial parallax-element'><i class='fa fa-chevron-left' aria-hidden='true'></i></div>","<div class='next-testimonial parallax-element'><i class='fa fa-chevron-right' aria-hidden='true'></i></div>"],
			});			
			
		}
		
	}//End Sliders	
	
	
/*--------------------------------------------------
Function Justified Grid
---------------------------------------------------*/	
	
	function JustifiedGrid() {
		
		if( $('#justified-grid').length > 0 ){
		
			$('#justified-grid').justifiedGallery({
				rowHeight : 300,
				lastRow : 'nojustify',
				margins : 10
			});
		
		}
		
	}//End Justified Grid	
	
	
/*--------------------------------------------------
Function Lightbox
---------------------------------------------------*/
	
	function Lightbox() {
		
		$('.image-link').magnificPopup({
		  	type: 'image',
			mainClass: 'mfp-with-zoom',	
			gallery: {
			  enabled:true
			},		
			zoom: {
				enabled: true, 			
				duration: 300, 
				easing: 'ease-in-out', 
				opener: function(openerElement) {
					return openerElement.is('img') ? openerElement : openerElement.find('img');
				}
			}			
		});
		
		$(".image-link").mouseenter(function(e) {	
			TweenMax.to('#ball', 0.1,{transformOrigin: '15px 15px', borderWidth: '1px', scale: 1.8});
			TweenMax.to('#ball-loader', 0.1,{borderWidth: '1px', top: 1, left: 1});
			$( "#ball" ).addClass("with-icon").append( '<i class="fa fa-plus"></i>' );
		});
			
		$(".image-link").mouseleave(function(e) {
			TweenMax.to('#ball', 0.1,{borderWidth: '2px', scale:1,  x: -15, y: -15});
			TweenMax.to('#ball-loader', 0.1,{borderWidth: '2px', top: 0, left: 0});
			$("#ball").removeClass("with-icon");
			$('#ball i').remove();
		});
			
	}//End Lightbox	 		
	


/*--------------------------------------------------
Function AppearIteam
---------------------------------------------------*/	
		
	function AppearIteam() {		
		
		setTimeout(function(){
			$('.has-animation').each(function() {	
				$(this).appear(function() {				
					$(this).delay($(this).attr('data-delay')).queue(function(next){
						TweenMax.to($(this), 1, {force3D:true, opacity:1, y:0, ease:Power2.easeOut});
						next();
					});				 		
				});		
			});
		} , 250 );		
	
	}//End AppearIteam
	

	
	
/*--------------------------------------------------
Function Contact Formular
---------------------------------------------------*/	
		
	function ContactForm() {	
	
		if( jQuery('#contact-formular').length > 0 ){
			$('#contactform').submit(function(){
				var action = $(this).attr('action');
				$("#message").slideUp(750,function() {
					$('#message').hide();
					$('#submit').attr('disabled','disabled');		
					$.post(action, {
						name: $('#name').val(),
						email: $('#email').val(),
						comments: $('#comments').val()
					},
					function(data){
						document.getElementById('message').innerHTML = data;
						$('#message').slideDown('slow');
						$('#contactform img.loader').fadeOut('slow',function(){$(this).remove()});
						$('#submit').removeAttr('disabled');
						if(data.match('success') != null) $('#contactform').slideUp('slow');		
					}
				);		
				});		
				return false;		
			});		
		}

	}//End ContactForm
	
/*--------------------------------------------------
Function Page PlayVideo
---------------------------------------------------*/	


	function PlayVideo() {
	
		if( $('.video-wrapper').length > 0 ){	
			
			
			$(".video-wrapper").mouseenter(function(e) {	
				TweenMax.to('#ball', 0.1,{transformOrigin: '15px 15px', borderWidth: '1px', scale: 2});
				$( "#ball" ).addClass("over-movie").append( '<i class="fa fa-play"></i><i class="fa fa-pause"></i>' );
			});
			$(".video-wrapper .control").mouseenter(function(e) {	
				TweenMax.to('#ball', 0.2,{borderWidth: '20px', scale: 0});
			});
			
			$(".video-wrapper .control").mouseleave(function(e) {
				TweenMax.to('#ball', 0.1,{transformOrigin: '15px 15px', borderWidth: '1px', scale: 2});
				});
						
			$(".video-wrapper").mouseleave(function(e) {
				TweenMax.to('#ball', 0.1,{borderWidth: '2px', scale:1, x: -15, y: -15});
				$("#ball").removeClass("over-movie");
				$('#ball i').remove();
			});
			
			var videocenter = ($(window).height() - $('.video-cover').height()) / 2
			
			$('.video-cover').on('click', function() {
				$('html,body').animate({scrollTop: $(this).offset().top - videocenter},390);		
				$(this).addClass('hidden');
				$( "#ball" ).toggleClass("pause-movie");
				setTimeout(function(){
					$(".bgvid").trigger("click");
				} , 400 );
			});
			
			var playerTop = $(".video-wrapper").offset().top
					$(window).on("scroll", function(){
						if ($(window).scrollTop() > (playerTop + $(".video-wrapper").height())){ // if user scrolls down and past the video completely
							$('#main-page-content').find('video').each(function() {
								$(this).get(0).pause();
							});
							$( "#ball" ).removeClass("pause-movie");
						}
					})  	
			
			var video = $('#myVideo');
			
			//remove default control when JS loaded
			video[0].removeAttribute("controls");
			$('.control').fadeIn(500);
			$('.caption').fadeIn(500);
		 
			//before everything get started
			video.on('loadedmetadata', function() {
					
				//set video properties
				$('.current').text(timeFormat(0));
				$('.duration').text(timeFormat(video[0].duration));
				
					
				//start to get video buffering data 
				setTimeout(startBuffer, 150);
					
				//bind video events
				$('.videoContainer').on('hover', function() {		
					$('.control').stop().fadeIn();
					$('.caption').stop().fadeIn();
				}, function() {
					if(!volumeDrag && !timeDrag){
						$('.control').stop().fadeOut();
						$('.caption').stop().fadeOut();
					}
				})
				
			});
			
			//display video buffering bar
			var startBuffer = function() {
				var currentBuffer = video[0].buffered.end(0);
				var maxduration = video[0].duration;
				var perc = 100 * currentBuffer / maxduration;
				$('.bufferBar').css('width',perc+'%');
					
				if(currentBuffer < maxduration) {
					setTimeout(startBuffer, 500);
				}
			};	
			
			//display current video play time
			video.on('timeupdate', function() {
				var currentPos = video[0].currentTime;
				var maxduration = video[0].duration;
				var perc = 100 * currentPos / maxduration;
				$('.timeBar').css('width',perc+'%');	
				$('.current').text(timeFormat(currentPos));	
			});
			
			//CONTROLS EVENTS
			//video screen and play button clicked
			video.on('click', function() { playpause(); } );
			
			var playpause = function() {
				if(video[0].paused || video[0].ended) {			
					video[0].play();
				}
				else {			
					video[0].pause();
				}
			};
		
			
			//fullscreen button clicked
			$('.btnFS').on('click', function() {
				if($.isFunction(video[0].webkitEnterFullscreen)) {
					video[0].webkitEnterFullscreen();
				}	
				else if ($.isFunction(video[0].mozRequestFullScreen)) {
					video[0].mozRequestFullScreen();
				}
				else {
					alert('Your browsers doesn\'t support fullscreen');
				}
			});
			
			//sound button clicked
			$('.sound').on('click', function() {
				video[0].muted = !video[0].muted;
				$(this).toggleClass('muted');
				if(video[0].muted) {
					$('.volumeBar').css('width',0);
				}
				else{
					$('.volumeBar').css('width', video[0].volume*100+'%');
				}
			});
			
			//VIDEO EVENTS
			//video canplay event
			video.on('canplay', function() {
				$('.loading').fadeOut(100);
			});
			
			//video canplaythrough event
			//solve Chrome cache issue
			var completeloaded = false;
			video.on('canplaythrough', function() {
				completeloaded = true;
			});
			
			//video ended event
			video.on('ended', function() {		
				video[0].pause();
			});
		
			//video seeking event
			video.on('seeking', function() {
				//if video fully loaded, ignore loading screen
				if(!completeloaded) { 
					$('.loading').fadeIn(200);
				}	
			});
			
			//video seeked event
			video.on('seeked', function() { });
			
			//video waiting for more data event
			video.on('waiting', function() {
				$('.loading').fadeIn(200);
			});
			
			//VIDEO PROGRESS BAR
			//when video timebar clicked
			var timeDrag = false;	/* check for drag event */
			$('.progress').on('mousedown', function(e) {
				timeDrag = true;
				updatebar(e.pageX);
			});
			$(document).on('mouseup', function(e) {
				if(timeDrag) {
					timeDrag = false;
					updatebar(e.pageX);
				}
			});
			$(document).on('mousemove', function(e) {
				if(timeDrag) {
					updatebar(e.pageX);
				}
			});
			var updatebar = function(x) {
				var progress = $('.progress');
				
				//calculate drag position
				//and update video currenttime
				//as well as progress bar
				var maxduration = video[0].duration;
				var position = x - progress.offset().left;
				var percentage = 100 * position / progress.width();
				if(percentage > 100) {
					percentage = 100;
				}
				if(percentage < 0) {
					percentage = 0;
				}
				$('.timeBar').css('width',percentage+'%');	
				video[0].currentTime = maxduration * percentage / 100;
			};	
		
			//Time format converter - 00:00
			var timeFormat = function(seconds){
				var m = Math.floor(seconds/60)<10 ? "0"+Math.floor(seconds/60) : Math.floor(seconds/60);
				var s = Math.floor(seconds-(m*60))<10 ? "0"+Math.floor(seconds-(m*60)) : Math.floor(seconds-(m*60));
				return m+":"+s;
			};
			
		}
		
	}// End PlayVideo				
	
	
	
/*--------------------------------------------------
Function Load Via Ajax
---------------------------------------------------*/	
		
	function LoadViaAjax() {		
		
		FirstLoad();		
		LazyLoad();		
		HeroSection();
		Portfolio();		
		BackToTop();
		Sliders();
		JustifiedGrid();
		Lightbox();
		AppearIteam();
		ContactForm();
		PlayVideo();		
	
	}//End Load Via Ajax				
	
		