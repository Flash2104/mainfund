$(function () {

	// $(":radio").on('click', function () {
	// 	$(this).parent().addClass("checked");
	// });
	$('.popup-with-form').magnificPopup({
		type: 'inline',
		preloader: false,
		focus: '#name',

		// When elemened is focused, some mobile browsers in some cases zoom in
		// It looks not nice, so we disable it:
		callbacks: {
			beforeOpen: function () {
				if ($(window).width() < 700) {
					this.st.focus = false;
				} else {
					this.st.focus = '#name';
				}
			}
		}
	});
	$('.gallery').magnificPopup({
		delegate: 'a',
		type: 'image',
		tLoading: 'Loading image #%curr%...',
		mainClass: 'mfp-img-mobile',
		gallery: {
			enabled: true,
			navigateByImgClick: true,
			preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
		},
		callbacks: {
			// this - is Magnific Popup object.
			change: function () {
				$(this.content)
					.find('.mfp-counter')
					.html(
						'<div> <a class="image-source-link-map" href="' + $(this.currItem.el).attr('title-map') + '" target="_blank"><img src="images/icon-city.svg" alt="">Посмотреть на карте</a></div>'
					);
				$(this.content)
					.find('.mfp-close')
					.html(
						'<img src="images/close2.svg" alt="">'
					);
			},
			open: function () {
				jQuery('body').addClass('noscroll');
			},
			close: function () {
				jQuery('body').removeClass('noscroll');
			},
			buildControls: function () {
				// re-appends controls inside the main container
				this.arrowLeft.appendTo(this.contentContainer);
				this.arrowRight.appendTo(this.contentContainer);
			}
		},
		image: {
			titleSrc: function (item) {
				return item.el.attr('title') + '<div class="title-city"> Выполнен ' + '<span>' + item.el.attr('title-city') + '</span>' + '</div>' + '<div> <a class="image-source-link" href="' + item.el.attr('data-source') + '" target="_blank">Подробнее об объекте <img src="images/arrow-red.svg" alt=""></a></div>';
			}
		},


	});

	$('.gallery-requisites').magnificPopup({
		delegate: 'a',
		type: 'image',
		overflowY: 'scroll',
		closeOnContentClick: true,
		closeBtnInside: true,
		mainClass: 'mfp-with-zoom mfp-img-mobile',
		// image: {
		// 	verticalFit: true,
		// 	titleSrc: function (item) {
		// 		return item.el.attr('title') + ' &middot; <a class="image-source-link" href="' + item.el.attr('data-source') + '" target="_blank">image source</a>';
		// 	}
		// },
		gallery: {
			enabled: true
		},
		callbacks: {
			change: function () {
				// $(this.content)
				// 	.find('.mfp-counter')
				// 	.html(
				// 		'<div> <a class="image-source-link-map" href="' + $(this.currItem.el).attr('title-map') + '" target="_blank"><img src="images/icon-city.svg" alt="">Посмотреть на карте</a></div>'
				// 	);
				$(this.content)
					.find('.mfp-close')
					.html(
						'<img src="images/close2.svg" alt="">'
					);
			},
			// open: function () {
			// 	jQuery('body').addClass('noscroll');
			// },
			// close: function () {
			// 	jQuery('body').removeClass('noscroll');
			// },
			buildControls: function () {
				// re-appends controls inside the main container
				this.arrowLeft.appendTo(this.contentContainer);
				this.arrowRight.appendTo(this.contentContainer);
			}
		},
		zoom: {
			enabled: true,
			duration: 300, // don't foget to change the duration also in CSS
			opener: function (element) {
				return element.find('img');
			}
		}

	});

	$('.image-popup-vertical-fit').magnificPopup({
		type: 'image',
		closeOnContentClick: true,
		mainClass: 'mfp-img-mobile',
		image: {
			verticalFit: true
		}

	});

	if ($('#modelimg').length > 0) {
		//Checkbox events
		$('#check :checkbox').change(function () {
			$('#modelimg').find('.fil1').css('fill', 'rgba(255, 255, 255, 0.7)');
			$('#check :checkbox').each(function () {
				$(this).parent().find('img').addClass('img-opacity');
			});
			$('#check :checkbox:checked').each(function () {
				$('#modelimg').find('[data-group="' + $(this).val() + '"] .fil1').css('fill', 'rgba(255, 255, 255, 0)');
				$(this).parent().find('img').removeClass('img-opacity');
				var id = '#block_' + this.id;
				setTimeout(function () {
					$(id).collapse('show');
				}, 200);
			});
			if ($('#check :checkbox:checked').length == 0) {
				$('#modelimg').find('.fil1').css('fill', 'rgba(255, 255, 255, 0)');
				$('.panel-group .collapse').collapse('show');
			} else {
				$('#check :checkbox').not(':checked').each(function () {
					var id = '#block_' + this.id;
					setTimeout(function () {
						$(id).collapse('hide');
					}, 200);
				});
			}
		});
	}



	//allACtive
	$('#reset').on('click', function (e) {
		e.preventDefault();
		$('#modelimg').find('.fil1').css('fill', 'rgba(255, 255, 255, 0)');
		$('#check :checkbox').removeAttr("checked");
		$('#check img').addClass('img-opacity');
		$('.panel-group .collapse').collapse('show');
	});
});

//fullscreen
document.cancelFullScreen = document.cancelFullScreen || document.webkitCancelFullScreen || document.mozCancelFullScreen;
// Note: FF nightly needs about:config full-screen-api.enabled set to true.
function enterFullscreen(id) {
	var el = document.getElementById(id);
	var onfullscreenchange = function (e) {
		var fullscreenElement = document.fullscreenElement || document.mozFullscreenElement || document.webkitFullscreenElement;
		var fullscreenEnabled = document.fullscreenEnabled || document.mozFullscreenEnabled || document.webkitFullscreenEnabled;
	}
	el.addEventListener("webkitfullscreenchange", onfullscreenchange);
	el.addEventListener("mozfullscreenchange", onfullscreenchange);
	el.addEventListener("fullscreenchange", onfullscreenchange);
	if (el.webkitRequestFullScreen) {
		el.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
	} else {
		el.mozRequestFullScreen();
	}
	document.querySelector('#screen').onclick = function () {
		exitFullscreen(id);
	}
}
function exitFullscreen(id) {
	document.cancelFullScreen();
	document.querySelector('#screen').onclick = function () {
		enterFullscreen(id);
	}
}

$t1 = $(".tooltip1");
$('.myicon1').hover(function () { $t1.addClass('active'); }, function () { $t1.removeClass('active'); });
$(document).on('mousemove', function (e) { $t1.css({ left: e.pageX, top: e.pageY + 50 }); });

$t2 = $(".tooltip2");
$('.myicon2').hover(function () { $t2.addClass('active'); }, function () { $t2.removeClass('active'); });
$(document).on('mousemove', function (e) { $t2.css({ left: e.pageX, top: e.pageY + 50 }); });

$t3 = $(".tooltip3");
$('.myicon3').hover(function () { $t3.addClass('active'); }, function () { $t3.removeClass('active'); });
$(document).on('mousemove', function (e) { $t3.css({ left: e.pageX, top: e.pageY + 50 }); });

$t4 = $(".tooltip4");
$('.myicon4').hover(function () { $t4.addClass('active'); }, function () { $t4.removeClass('active'); });
$(document).on('mousemove', function (e) { $t4.css({ left: e.pageX, top: e.pageY + 50 }); });

$t5 = $(".tooltip5");
$('.myicon5').hover(function () { $t5.addClass('active'); }, function () { $t5.removeClass('active'); });
$(document).on('mousemove', function (e) { $t5.css({ left: e.pageX, top: e.pageY + 50 }); });

$t6 = $(".tooltip6");
$('.myicon6').hover(function () { $t6.addClass('active'); }, function () { $t6.removeClass('active'); });
$(document).on('mousemove', function (e) { $t6.css({ left: e.pageX, top: e.pageY + 50 }); });

$t7 = $(".tooltip7");
$('.myicon7').hover(function () { $t7.addClass('active'); }, function () { $t7.removeClass('active'); });
$(document).on('mousemove', function (e) { $t7.css({ left: e.pageX, top: e.pageY + 50 }); });

$t8 = $(".tooltip8");
$('.myicon8').hover(function () { $t8.addClass('active'); }, function () { $t8.removeClass('active'); });
$(document).on('mousemove', function (e) { $t8.css({ left: e.pageX, top: e.pageY + 50 }); });

$t9 = $(".tooltip9");
$('.myicon9').hover(function () { $t9.addClass('active'); }, function () { $t9.removeClass('active'); });
$(document).on('mousemove', function (e) { $t9.css({ left: e.pageX, top: e.pageY + 50 }); });

$('.modal-examples .btn-red').click(function () {
	$('#modal_example1').removeClass('show');
	// $(this).parent(this).addClass('checked');
});

$('input:radio').click(function () {
	$('input:radio').parent().removeClass('checked');
	$(this).parent(this).addClass('checked');
});

$p1 = $(".production1");
$('.production-icon1').hover(function () { $p1.addClass('active'); }, function () { $p1.removeClass('active'); });
$(document).on('mousemove', function (e) { $p1.css({ left: e.pageX, top: e.pageY + 50 }); });
$p2 = $(".production2");
$('.production-icon2').hover(function () { $p2.addClass('active'); }, function () { $p2.removeClass('active'); });
$(document).on('mousemove', function (e) { $p2.css({ left: e.pageX, top: e.pageY + 50 }); });
$p3 = $(".production3");
$('.production-icon3').hover(function () { $p3.addClass('active'); }, function () { $p3.removeClass('active'); });
$(document).on('mousemove', function (e) { $p3.css({ left: e.pageX, top: e.pageY + 50 }); });
$p4 = $(".production4");
$('.production-icon4').hover(function () { $p4.addClass('active'); }, function () { $p4.removeClass('active'); });
$(document).on('mousemove', function (e) { $p4.css({ left: e.pageX, top: e.pageY + 50 }); });
$p5 = $(".production5");
$('.production-icon5').hover(function () { $p5.addClass('active'); }, function () { $p5.removeClass('active'); });
$(document).on('mousemove', function (e) { $p5.css({ left: e.pageX, top: e.pageY + 50 }); });

$('.l1').on('click', function () {
	var tag = $(this).attr('value');
	var tag1 = $(this).text();
	// window.alert("#layer"+tag1);
	var back_link = "#layer" + tag;
	//window.alert(back_link);
	$('.nav-link').attr('href', back_link);
	//$('.nav-link').text(tag1);
	$('.nav-link').attr('value', tag);
	$("#layer" + tag).removeClass('hide-menu');
	$("#layer" + tag).toggleClass('show-menu');
});
$('.nav-link').on('click', function () {
	var tag = $(this).attr('href');
	var val = $(this).attr('value');
	// window.alert(val);
	$(tag).removeClass('show-menu');
	var back_link = "#layer" + (val - 1);
	$('.nav-link').attr('href', back_link);
	$('.nav-link').attr('value', val - 1);
	//window.alert(back_link);

});

$('.photo-slider-center').slick({
	slidesToShow: 2,
	infinite: false,
	slidesToScroll: 1,
	arrows: false,
	responsive: [
		{
			breakpoint: 960,
			settings: {
				slidesToShow: 1.8,
				slidesToScroll: 1,
				centerMode: true,
				// centerPadding: '190px',
			}
		},
		{
			breakpoint: 640,
			settings: {
				slidesToShow: 1.3,
				slidesToScroll: 1,
				centerMode: false,
				centerMode: true,
			}
		},
		{
			breakpoint: 480,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				centerMode: false,
				centerMode: true,
			}
		},
	]
});


jQuery(($) => {
	$('.select').on('click', '.select__head', function () {
		if ($(this).hasClass('open')) {
			$(this).removeClass('open');
			$(this).next().fadeOut();
		} else {
			$('.select__head').removeClass('open');
			$('.select__list').fadeOut();
			$(this).addClass('open');
			$(this).next().fadeIn();
		}
	});

	$('.select').on('click', '.select__item', function () {
		$('.select__head').removeClass('open');
		$(this).parent().fadeOut();
		$(this).parent().prev().text($(this).text());
		$(this).parent().prev().prev().val($(this).text());
	});

	$(document).click(function (e) {
		if (!$(e.target).closest('.select').length) {
			$('.select__head').removeClass('open');
			$('.select__list').fadeOut();
		}
	});
});

/* Modal
	 =====================*/

const modalCall = $("[data-modal]");
const modalClose = $("[data-close]");

modalCall.on("click", function (event) {
	event.preventDefault();

	let $this = $(this);
	let modalId = $this.data('modal');

	$(modalId).addClass('show');
	$("body").addClass('no-scroll');

	setTimeout(function () {
		$(modalId).find(".modals-content").css({
			transform: "scale(1)"
		});
	}, 200);


});


modalClose.on("click", function (event) {
	event.preventDefault();

	let $this = $(this);
	let modalParent = $this.parents('.modals');

	modalParent.find(".modals-content").css({
		transform: "scale(0)"
	});

	setTimeout(function () {
		modalParent.removeClass('show');
		$("body").removeClass('no-scroll');
	}, 200);
});


$(".modals").on("click", function (event) {
	let $this = $(this);

	$this.find(".modals-content").css({
		transform: "scale(0)"
	});

	setTimeout(function () {
		$this.removeClass('show');
		$("body").removeClass('no-scroll');
	}, 200);
});

$(".modals-content").on("click", function (event) {
	event.stopPropagation();
});


$(".section-calc-fund .tab:nth-child(1)").on("click", function (event) {
	$(".section-calc-fund .tab:nth-child(2)").toggleClass('show');
	$(".section-calc-fund .tab:nth-child(3)").toggleClass('show');
	$(".section-calc-fund .tab:nth-child(4)").toggleClass('show');
	$(".section-calc-fund .tab:nth-child(1)").toggleClass('rotate');
});

$(".search-more").on("click", function (event) {
	$(".projects-search").toggleClass('show');
	$(this).toggleClass('active');
});

$(".favorites").on("click", function (event) {
	$(this).toggleClass('add');
});

//АККОРДЕОН
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
	acc[i].addEventListener("click", function () {
		this.classList.toggle("active");
		var panel = this.nextElementSibling;
		if (panel.style.maxHeight) {
			panel.style.maxHeight = null;
		} else {
			panel.style.maxHeight = panel.scrollHeight + "px";
		}
	});
}

$('.tabs-wrapper').each(function () {
	let ths = $(this);
	ths.find('.tab-item').not(':first').hide();
	ths.find('.tab').click(function () {
		ths.find('.tab').removeClass('active').eq($(this).index()).addClass('active');
		ths.find('.tab-item').hide().eq($(this).index()).fadeIn()
	}).eq(0).addClass('active');
});

$(window).scroll(function () {
	var scroll = $(window).scrollTop();

	if (scroll >= 500) {
		$(".topbutton").addClass("show");
	} else {
		$(".topbutton").removeClass("show");
	}

});


$(window).on('load resize', function () {
	if ($(window).width() < 1338) {
		$('.logo-link').append($('.city'));
	}
	if ($(window).width() < 1200) {
		$('.section-management-time .big').append($('.section-management-time .year'));
		$('.supervision-item1').append($('.supervision-item2'));
		$('.management-control-wrapper2').append($('.section-management-supervision .photo-item2'));
		$('.section-search .search-wrapper').append($('.section-search .form-btn'));
		// $('.projects-search__wrapper-col:nth-child(1)').append($('.projects-search__wrapper-col:nth-child(5)'));
		$('.projects-search__item:nth-child(1) .projects-search__wrapper-col:nth-child(1)').append($('.projects-search__wrapper-col .checkbox1'));
		$('.projects-search__item:nth-child(1) .projects-search__wrapper-col:nth-child(2)').append($('.projects-search__wrapper-col .checkbox2'));
		$('.projects-search__item:nth-child(1) .projects-search__wrapper-col:nth-child(3)').append($('.projects-search__wrapper-col .checkbox3'));

	}

	if ($(window).width() < 960) {
		$('.leadership-name').append($('.leadership-socials'));
		$('.photo-item2-mobile').append($('.photo-item2'));
		$('.photo-item3-mobile').append($('.photo-item3'));
		$('.conf-img1').append($('.conf1img'));
		$('.internship-item').append($('.internship-item-mob'));
		$('.pictures').append($('.picture'));
		$('.conference-list__item--first').append($('.section-conference .li-mobile'));
		$('.section-guarantee-certificate .text-wrapper__item1').append($('.guarantee-certificate-list__item1'));
		$('.section-guarantee-certificate .text-wrapper__item2').append($('.guarantee-certificate__title'));
		$('.section-guarantee-cases .text-wrapper__item--mobile').append($('.guarantee-cases-list'));
		$('.section-guarantee-cases .text-wrapper__item--mobile .guarantee-cases-list li:nth-child(3)').append($('.guarantee-cases-text'));
		$('.section-management-control .text-wrapper1 .text-wrapper__item2').append($('.section-management-control .text-wrapper2 .text-wrapper__item p:nth-child(1)'));
		$('.section-management-quality .text-mobile').append($('.section-management-quality .text-mob'));
		$('.section-management-operating .text-wrapper2 .text-wrapper__item:nth-child(2)').append($('.section-management-operating .photo-item1'));
		$('.section-management-operating .text-wrapper2 .text-wrapper__item:nth-child(1)').append($('.section-management-operating .text-wrapper2 .text-wrapper__item:nth-child(2) p'));
		$('.section-management-surrender .management-surrender-wrapper__item:nth-child(2)').append($('.section-management-surrender .management-border'));
		$('.section-management-surrender .management-surrender-wrapper__item:nth-child(1)').append($('.section-management-surrender .management-text'));
		$('.section-legal2 .text-wrapper').append($('.section-legal .legal-text'));
		$('.screen-play-testing .play-testing__bottom').append($('.screen-play-testing .legal-circle'));
		$('.section-articles .articles-search__wrapper-col:nth-child(1)').append($('.section-articles .articles-search__wrapper-col:nth-child(2) .checkbox:nth-child(1)'));
		$('.section-articles .articles-search__wrapper-col:nth-child(3)').append($('.section-articles .articles-search__wrapper-col:nth-child(2) .checkbox:nth-child(1)'));
		$('.projects-search__wrapper-col1').append($('.projects-search__wrapper-col2'));
		$('.projects-search__wrapper-col3').append($('.projects-search__wrapper-col4'));
		$('.projects-search__wrapper-col6').append($('.projects-search__wrapper-col7'));
		$('.projects-search__wrapper-col8').append($('.projects-search__wrapper-col9'));
	}
	if ($(window).width() < 640) {
		$('.footer-box3').append($('.politics'));
		$('.footer-box2').append($('.title-footer'));
		$('.footer-box3').append($('.footer .info'));
		$('.footer-box1').append($('.footer-box3'));
		$('.footer-box2').append($('.footer-box4'));
		$('.header-mobile .inner').append($('.header .box'));
		$('.section-management-acceptance .acceptance-mob-list').append($('.section-management-acceptance .acceptance-mobile1'));
		$('.section-management-acceptance .section-inner').append($('.section-management-acceptance .acceptance-mobile2'));
		$('.section-management-acceptance .section-inner').append($('.section-management-acceptance .acceptance-mobile3'));
		$('.section-management-surrender .mob1').append($('.section-management-surrender .management-mobile1'));
		$('.section-management-surrender .text-wrapper').append($('.section-management-surrender .management-text'));
		$('.section-management-years .text-wrapper__item:nth-child(1) .year').append($('.section-management-years .comment'));
		// $('.section-testing-methodology2 .text-wrapper__item:nth-child(2) p:nth-child(3)').append($('.section-testing-methodology2 .text-break'));

		// $('.section-statics ul li').append( $('.section-statics ul .li-top img') );
	}
	if ($(window).width() < 480) {
		$('.section-management-years .text-wrapper__item:nth-child(1)').append($('.section-management-years .comment'));
		$('.screen-play-testing .screen-play__inner').append($('.screen-play-testing .legal-circle'));
		$('.section-testing-consumption .text-wrapper__item:nth-child(1) p:nth-child(1)').append($('.section-testing-consumption .sciencetechnics-year-mob1'));
		$('.section-testing-consumption .text-wrapper__item:nth-child(1) p:nth-child(1)').append($('.section-testing-consumption .sciencetechnics-year-mob2'));
		$('.section-testing-consumption .text-wrapper__item:nth-child(1) p:nth-child(4)').append($('.section-testing-consumption .sciencetechnics-year-mob3'));
		$('.section-articles .articles-search__wrapper-col:nth-child(3)').append($('.section-articles .articles-search__wrapper-col:nth-child(1) .checkbox.star'));
	}

});

function openNav() {
	document.getElementById("mySidenav").style.width = "300px";
}

function closeNav() {
	document.getElementById("mySidenav").style.width = "0";
}



// (function () {

// 	'use strict';

// 	$('.input-file').each(function () {
// 		var $input = $(this),
// 			$label = $input.next('.js-labelFile'),
// 			labelVal = $label.html();

// 		$input.on('change', function (element) {
// 			var fileName = '';
// 			if (element.target.value) fileName = element.target.value.split('\\').pop();
// 			fileName ? $label.addClass('has-file').find('.js-fileName').html(fileName) : $label.removeClass('has-file').html(labelVal);
// 		});
// 	});

// })();

const dt = new DataTransfer(); // Permet de manipuler les fichiers de l'input file

$("#attachment").on('change', function (e) {
	for (var i = 0; i < this.files.length; i++) {
		let fileBloc = $('<span/>', { class: 'file-block' }),
			fileImg = '<img src="images/file.svg" alt="">',
			fileName = $('<span/>', { class: 'name', text: this.files.item(i).name });
		fileBloc.append(fileImg)
			.append(fileName)
			.append('<span class="file-delete"><span>+</span></span>');

		$("#filesList > #files-names").append(fileBloc);
	};
	// Ajout des fichiers dans l'objet DataTransfer
	for (let file of this.files) {
		dt.items.add(file);
	}
	// Mise à jour des fichiers de l'input file après ajout
	this.files = dt.files;

	// EventListener pour le bouton de suppression créé
	$('span.file-delete').click(function () {
		let name = $(this).next('span.name').text();
		// Supprimer l'affichage du nom de fichier
		$(this).parent().remove();
		for (let i = 0; i < dt.items.length; i++) {
			// Correspondance du fichier et du nom
			if (name === dt.items[i].getAsFile().name) {
				// Suppression du fichier dans l'objet DataTransfer
				dt.items.remove(i);
				continue;
			}
		}
		// Mise à jour des fichiers de l'input file après suppression
		document.getElementById('attachment').files = dt.files;
	});
});

$('.focus').mousemove(function (e) {
	var X = e.pageX;
	var Y = e.pageY;
	var top = Y - 60 + 'px';
	var left = X - 30 + 'px';
	// var left = X + 5 + 'px';
	var id = $(this).data('tooltip');
	$('#tip-' + id).css({
		display: "block",
		top: top,
		left: left
	});
});
$('.focus').mouseout(function () {
	var id = $(this).data('tooltip');
	$('#tip-' + id).css({
		display: "none"
	});
});

$(window).on('load resize', function () {
	if ($(window).width() < 1200) {
		$('.order-list:not(.slick-initialized)').slick({
			centerMode: true,
			dots: false,
			arrows: false,
			infinite: false,
			// centerPadding: '10px',
			slidesToShow: 2.8,
			responsive: [
				{
					breakpoint: 960,
					settings: {
						slidesToShow: 2.5,
						slidesToScroll: 1,
					}
				},
				{
					breakpoint: 640,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
						centerMode: false,
					}
				},

			]
		});
	} else {
		$(".order-list.slick-initialized").slick("unslick");
	}
});

$('.photo-slider-right').slick({
	slidesToShow: 1.2,
	slidesToScroll: 1,
	infinite: false,
	arrows: true,
	prevArrow: $('.slider-controls__left'),
	nextArrow: $('.slider-controls__right'),
	responsive: [
		{
			breakpoint: 960,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
			}
		},
		{
			breakpoint: 640,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				centerMode: false,
			}
		},

	]
	// prevArrow: '<button class="review-slider-btn review-slider-btnprev"><svg width="27" height="40" viewBox="0 0 27 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L26.488 19.762" stroke="#333333" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M1 38.5242L26.488 19.7622" stroke="#333333" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/></svg></button>',
	// nextArrow: '<button class="review-slider-btn review-slider-btnnext"><svg width="27" height="40" viewBox="0 0 27 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L26.488 19.762" stroke="#333333" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M1 38.5242L26.488 19.7622" stroke="#333333" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/></svg></button>',
});
$('.photo-slider-right2').slick({
	slidesToShow: 1.2,
	slidesToScroll: 1,
	infinite: false,
	arrows: true,
	prevArrow: $('.slider-controls__left3'),
	nextArrow: $('.slider-controls__right3'),
	responsive: [
		{
			breakpoint: 960,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
			}
		},
		{
			breakpoint: 640,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				centerMode: false,
			}
		},

	]
	// prevArrow: '<button class="review-slider-btn review-slider-btnprev"><svg width="27" height="40" viewBox="0 0 27 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L26.488 19.762" stroke="#333333" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M1 38.5242L26.488 19.7622" stroke="#333333" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/></svg></button>',
	// nextArrow: '<button class="review-slider-btn review-slider-btnnext"><svg width="27" height="40" viewBox="0 0 27 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L26.488 19.762" stroke="#333333" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M1 38.5242L26.488 19.7622" stroke="#333333" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/></svg></button>',
});
$('.photo-slider-right3').slick({
	slidesToShow: 1.2,
	slidesToScroll: 1,
	infinite: false,
	arrows: true,
	prevArrow: $('.slider-controls__left4'),
	nextArrow: $('.slider-controls__right4'),
	responsive: [
		{
			breakpoint: 960,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
			}
		},
		{
			breakpoint: 640,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				centerMode: false,
			}
		},

	]
	// prevArrow: '<button class="review-slider-btn review-slider-btnprev"><svg width="27" height="40" viewBox="0 0 27 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L26.488 19.762" stroke="#333333" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M1 38.5242L26.488 19.7622" stroke="#333333" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/></svg></button>',
	// nextArrow: '<button class="review-slider-btn review-slider-btnnext"><svg width="27" height="40" viewBox="0 0 27 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L26.488 19.762" stroke="#333333" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M1 38.5242L26.488 19.7622" stroke="#333333" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/></svg></button>',
});
$('.photo-slider-right4').slick({
	slidesToShow: 1.2,
	slidesToScroll: 1,
	infinite: false,
	arrows: true,
	prevArrow: $('.slider-controls__left5'),
	nextArrow: $('.slider-controls__right5'),
	responsive: [
		{
			breakpoint: 960,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
			}
		},
		{
			breakpoint: 640,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				centerMode: false,
			}
		},

	]
	// prevArrow: '<button class="review-slider-btn review-slider-btnprev"><svg width="27" height="40" viewBox="0 0 27 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L26.488 19.762" stroke="#333333" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M1 38.5242L26.488 19.7622" stroke="#333333" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/></svg></button>',
	// nextArrow: '<button class="review-slider-btn review-slider-btnnext"><svg width="27" height="40" viewBox="0 0 27 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L26.488 19.762" stroke="#333333" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M1 38.5242L26.488 19.7622" stroke="#333333" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/></svg></button>',
});
$('.photo-slider-right5').slick({
	slidesToShow: 1.2,
	slidesToScroll: 1,
	infinite: false,
	arrows: true,
	prevArrow: $('.slider-controls__left6'),
	nextArrow: $('.slider-controls__right6'),
	responsive: [
		{
			breakpoint: 960,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
			}
		},
		{
			breakpoint: 640,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				centerMode: false,
			}
		},

	]
	// prevArrow: '<button class="review-slider-btn review-slider-btnprev"><svg width="27" height="40" viewBox="0 0 27 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L26.488 19.762" stroke="#333333" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M1 38.5242L26.488 19.7622" stroke="#333333" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/></svg></button>',
	// nextArrow: '<button class="review-slider-btn review-slider-btnnext"><svg width="27" height="40" viewBox="0 0 27 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L26.488 19.762" stroke="#333333" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M1 38.5242L26.488 19.7622" stroke="#333333" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/></svg></button>',
});
$('.photo-slider-right6').slick({
	slidesToShow: 1.2,
	slidesToScroll: 1,
	infinite: false,
	arrows: true,
	prevArrow: $('.slider-controls__left7'),
	nextArrow: $('.slider-controls__right7'),
	responsive: [
		{
			breakpoint: 960,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
			}
		},
		{
			breakpoint: 640,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				centerMode: false,
			}
		},

	]
	// prevArrow: '<button class="review-slider-btn review-slider-btnprev"><svg width="27" height="40" viewBox="0 0 27 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L26.488 19.762" stroke="#333333" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M1 38.5242L26.488 19.7622" stroke="#333333" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/></svg></button>',
	// nextArrow: '<button class="review-slider-btn review-slider-btnnext"><svg width="27" height="40" viewBox="0 0 27 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L26.488 19.762" stroke="#333333" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M1 38.5242L26.488 19.7622" stroke="#333333" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/></svg></button>',
});
$('.photo-slider-right7').slick({
	slidesToShow: 1.2,
	slidesToScroll: 1,
	infinite: false,
	arrows: true,
	prevArrow: $('.slider-controls__left8'),
	nextArrow: $('.slider-controls__right8'),
	responsive: [
		{
			breakpoint: 960,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
			}
		},
		{
			breakpoint: 640,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				centerMode: false,
			}
		},

	]
	// prevArrow: '<button class="review-slider-btn review-slider-btnprev"><svg width="27" height="40" viewBox="0 0 27 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L26.488 19.762" stroke="#333333" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M1 38.5242L26.488 19.7622" stroke="#333333" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/></svg></button>',
	// nextArrow: '<button class="review-slider-btn review-slider-btnnext"><svg width="27" height="40" viewBox="0 0 27 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L26.488 19.762" stroke="#333333" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M1 38.5242L26.488 19.7622" stroke="#333333" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/></svg></button>',
});
$('.photo-slider-right-horizontal').slick({
	slidesToShow: 2,
	slidesToScroll: 1,
	infinite: false,
	arrows: true,
	prevArrow: $('.slider-controls__left2'),
	nextArrow: $('.slider-controls__right2'),
	responsive: [
		{
			breakpoint: 960,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
			}
		},
		{
			breakpoint: 640,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				centerMode: false,
			}
		},

	]
	// prevArrow: '<button class="review-slider-btn review-slider-btnprev"><svg width="27" height="40" viewBox="0 0 27 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L26.488 19.762" stroke="#333333" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M1 38.5242L26.488 19.7622" stroke="#333333" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/></svg></button>',
	// nextArrow: '<button class="review-slider-btn review-slider-btnnext"><svg width="27" height="40" viewBox="0 0 27 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L26.488 19.762" stroke="#333333" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M1 38.5242L26.488 19.7622" stroke="#333333" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/></svg></button>',
});


$('.reconstruction-slider1').slick({
	slidesToShow: 1,
	slidesToScroll: 1,
	infinite: false,
	centerMode: true,
	centerPadding: '20%',
	arrows: true,
	prevArrow: '<button class="slider-btn slider-btnprev"><svg width="27" height="40" viewBox="0 0 27 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L26.488 19.762" stroke="#333333" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M1 38.5242L26.488 19.7622" stroke="#333333" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/></svg></button>',
	nextArrow: '<button class="slider-btn slider-btnnext"><svg width="27" height="40" viewBox="0 0 27 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L26.488 19.762" stroke="#333333" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M1 38.5242L26.488 19.7622" stroke="#333333" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/></svg></button>',
	responsive: [
		{
			breakpoint: 960,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				centerPadding: '0px',
				centerMode: false,
			}
		},
		{
			breakpoint: 640,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				centerMode: false,
			}
		},

	]

});

$('.reconstruction-slider2').slick({
	slidesToShow: 1,
	slidesToScroll: 1,
	infinite: false,
	centerMode: true,
	centerPadding: '20%',
	arrows: true,
	prevArrow: '<button class="slider-btn slider-btnprev"><svg width="27" height="40" viewBox="0 0 27 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L26.488 19.762" stroke="#fff" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M1 38.5242L26.488 19.7622" stroke="#fff" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/></svg></button>',
	nextArrow: '<button class="slider-btn slider-btnnext"><svg width="27" height="40" viewBox="0 0 27 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L26.488 19.762" stroke="#fff" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M1 38.5242L26.488 19.7622" stroke="#fff" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/></svg></button>',
	responsive: [
		{
			breakpoint: 960,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				centerPadding: '0px',
				centerMode: false,
			}
		},
		{
			breakpoint: 640,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				centerMode: false,
			}
		},

	]

});