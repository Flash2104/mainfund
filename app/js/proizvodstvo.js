$(document).ready(function () {
	if ($('#modelimg').length > 0) {
		d3.xml("images/new_map.svg", function (xml) {
			var m;
			document.getElementById("modelimg").appendChild(xml.documentElement);
			map.svg = d3.select("#svg").append("svg");
			m = map.svg.append("m");
			var popups = {
				"2_1": {
					"title": "Окрасочно-сушильный комплекс COLORTECH",
					"phone": "<img src='images/12.jpg' width='100%' ><p >Используется для грунтовки и нанесения всех видов защитных покрытий металлоконструкций.</p>",
					"link": "contact",
					"img": "belgorod"
				},
				"2_5": {
					"title": "Плазменный станок для раскроя листа",
					"phone": "<img src='images/cycle2.jpg' width='100%' ><div >Используется для нарезки лопастей, площадок, косынок.</div>",
					"link": "contact",
					"img": "belgorod"
				},
				"2_6": {
					"title": "Роботизированный сварочный комплекс Fanuc",
					"phone": "<img src='images/10-1.jpg' width='100%' ><div >Экспериментальный программируемый сварочный комплекс используется для создания неразъемных соединений разного вида с применением дуговой сварки.</div>",
					"link": "contact",
					"img": "belgorod"
				},
				"2_7": {
					"title": "Приемосдаточный контроль",
					"phone": "<img src='images/11.jpg' width='100%' ><p >Включает в себя проверку наличия документов, визуальный контроль внешнего вида свай, покрытия, сварных швов, размеров, маркировки.</p>",
					"link": "contact",
					"img": "belgorod"
				},
				"2_8": {
					"title": "Неразрушающий контроль",
					"phone": "<img src='images/nwe1.jpg' width='100%' ><p >Проводится в два этапа. На первом выявляются внешние дефекты сварных соединений (ВИК), на втором - проверяется сплошность сварного шва (УЗК и др.).</p>",
					"link": "contact",
					"img": "belgorod"
				},
				"2_9": {
					"title": "Плазменный станок для раскроя трубы",
					"phone": "<img src='images/7.jpg' width='100%' ><p >Используется для резки розочек, усилений, колец, вставышей.</p>",
					"link": "contact",
					"img": "belgorod"
				},
				"3_1": {
					"title": "Мастер",
					"phone": "<p >Осуществляет техническую подготовку производства, производственный учет и операционно-производственный контроль, а также координирует действия сотрудников производства.</p>",
					"link": "contact",
					"img": "belgorod"
				},
				"3_2": {
					"title": "Оператор станка формовки лопастей",
					"phone": "<p >В соответствие с техническим заданием проектного отдела осуществляет формовку лопастей.</p>",
					"link": "contact",
					"img": "belgorod"
				},
				"3_3": {
					"title": "Заведующий складом",
					"phone": "<p >Снабжает производство необходимыми сырьем и комплектующими, осуществляет прием и отгрузку готовой продукции.</p>",
					"link": "contact",
					"img": "belgorod"
				},
				"3_4": {
					"title": "Слесарь",
					"phone": "<p >Является ответственным за бесперебойную подачу сырья и/или комплектующих на различные участки производства.</p>",
					"link": "contact",
					"img": "belgorod"
				},
				"3_5": {
					"title": "Оператор покрасочной линии",
					"phone": "<p >Выполняет весь комплекс работ, связанных с нанесением покрытия на винтовую сваю.</p>",
					"link": "contact",
					"img": "belgorod"
				},
				"3_6": {
					"title": "Оператор ПРЛ",
					"phone": "<p >В соответствии с технологической картой раскроя листа задает программы для станка плазменной резки с ЧПУ.</p>",
					"link": "contact",
					"img": "belgorod"
				},
				"3_7": {
					"title": "Слесарь",
					"phone": "<p >Является ответственным за бесперебойную подачу сырья и/или комплектующих на различные участки производства.</p>",
					"link": "contact",
					"img": "belgorod"
				},
				"3_8": {
					"title": "Специалист ОТК",
					"phone": "<p >Осуществляет проверку наличия документов по входному и операционному контролю, визуальный контроль внешнего вида свай, покрытия, сварных швов, размеров, маркировки.</p>",
					"link": "contact",
					"img": "belgorod"
				},
				"3_9": {
					"title": "Специалист неразрушающего контроля",
					"phone": "<p >Осуществляет контроль качества сварных соединений с использованием различных методов (ВИК, УЗК и др.).</p>",
					"link": "contact",
					"img": "belgorod"
				},
				"3_10": {
					"title": "Оператор ПРТ",
					"phone": "<p >В соответствии с технологическими картами раскроя трубы задает программы для станка плазменной резки с ЧПУ.</p>",
					"link": "contact",
					"img": "belgorod"
				},
				"3_11": {
					"title": "Слесарь",
					"phone": "<p >Является ответственным за бесперебойную подачу сырья и/или комплектующих на различные участки производства.</p>",
					"link": "contact",
					"img": "belgorod"
				},
				"3_12": {
					"title": "Упаковщик",
					"phone": "<p >Осуществляет упаковку изделий, прошедших проверку ОТК, в стрейч-пленку и паллеты.</p>",
					"link": "contact",
					"img": "belgorod"
				},
				"3_13": {
					"title": "Сварщик",
					"phone": "<p >Выполняет неразъемное соединение металлических конструкций. Допуск к работам осуществляется на основании аттестационного удостоверения.</p>",
					"link": "contact",
					"img": "belgorod"
				},
				"3_14": {
					"title": "Оператор роботизированного сварочного комплекса",
					"phone": "<p >Задает программы для экспериментального сварочного комплекса при выполнении сварных соединений.</p>",
					"link": "/",
					"img": "belgorod"
				},
				"4_1": {
					"title": "Склад сырья<br>",
					"phone": "<img src='images/2.jpg' width='100%' ><div >Контроль качества хранения гарантирует сохранность сырья и комплектующих.</div>",
					"link": "contact",
					"img": "belgorod"
				},
				"4_2": {
					"title": "Отгрузка готовой продукции",
					"phone": "<img src='images/171.jpg' width='100%' ><p >Погрузка продукции осуществляется в соответствии с правилами погрузки/разгрузки.</p>",
					"link": "contact",
					"img": "belgorod"
				},
				"4_3": {
					"title": "Склад готовой продукции",
					"phone": "<img src='images/new16.jpg' width='100%' ><p >Хранение свай осуществляется в соответствии с требованиями ГОСТ 7566-94 и ГОСТ 15150-69.</p>",
					"link": "contact",
					"img": "belgorod"
				},
				"4_4": {
					"title": "Склад сырья<br>",
					"phone": "<img src='images/1.jpg' width='100%' ><div >Контроль качества хранения гарантирует сохранность сырья и комплектующих.</div>",
					"link": "contact",
					"img": "belgorod"
				},
				"0_0": {
					"title": "",
					"phone": "",
					"link": "contact",
					"img": "belgorod"
				},
			};
			d3.selectAll(".objs").popover(function () {
				var popupframe = popups[$(this).attr("id")];
				return {
					title: popupframe.title,
					content: { phone: popupframe.phone },
					placement: "mouse",
					gravity: "mouse",
					displacement: [20, 20],
					mousemove: true
				};
			}).on("click", function () {
				$(".fil1").css('fill', 'rgba(255, 255, 255, 0.7)');
				var id = $(this).attr('data-items');
				if (id == '0_0') {
					$('#reset').click();
				} else {
					$('#modelimg [data-items="' + id + '"').find('.fil1').css('fill', 'rgba(255, 255, 255, 0)');
					var popupframe = popups[$(this).attr("id")];
					$('#ex1 .modal-body').html('<b>' + popupframe.title + '</b><br>' + popupframe.phone);
					$('#ex1').modal();
				}
			});
		});

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

		//allACtive
		$('#reset').on('click', function (e) {
			e.preventDefault();
			$('#modelimg').find('.fil1').css('fill', 'rgba(255, 255, 255, 0)');
			$('#check :checkbox').removeAttr("checked");
			$('#check img').addClass('img-opacity');
			$('.panel-group .collapse').collapse('show');
		});
	}
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