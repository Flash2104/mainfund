/*
 * Работа с Яндекс.Картами
 */
(function () {
	window.ymaps.ready(init);

	var objectMap;
	var mapSettings = {
		wrapperID: "objects-map"
	};

	var pointCollection,
		clusterer,
		arPlacemark = [],
		iPlacemark = {};

	function renderObject(geoObject) {

		var html = "<div class='col-xs-12'>";

		html += geoObject.name;

		if (geoObject.type_object != 12580) {
			if (geoObject.corr_active !== null) {
				html += "<span> - <span class='opac50'>коррозионная агрессивность грунтов - </span> " + geoObject.corr_active + "</span><br>"
			}
			if (geoObject.lopast_conf !== null) {
				html += "<span> - <span class='opac50'>конфигурация лопасти - </span> " + geoObject.lopast_conf + "</span><br>"
			}
			if (geoObject.twist_moment !== null) {
				html += "<span> - <span class='opac50'>крутящий момент (проектное значение): </span> " + geoObject.twist_moment + " Н/м</span><br>"
			}
			if (geoObject.twist_moment_fact !== null) {
				html += "<span> - <span class='opac50'>крутящий момент (фактическое значение, min): </span> " + geoObject.twist_moment_fact + " Н/м</span><br>"
			}
		}

		return html;
	}


	// Инициализация карты
	function init() {
		$(".load-informer").hide();
		if (object_coords !== "") {
			objectMap = new ymaps.Map(mapSettings.wrapperID, {
				// Центрируем на Уфе
				center: object_coords,
				zoom: 15,
				controls: ['typeSelector', 'fullscreenControl']
			}, { minZoom: 1, maxZoom: 30 });
		} else {
			objectMap = new ymaps.Map(mapSettings.wrapperID, {
				center: [54.73, 55.96],
				zoom: 3,
				controls: ['typeSelector', 'fullscreenControl']
			}, { minZoom: 1, maxZoom: 30 });

			searchControl = new ymaps.control.SearchControl({ provider: 'yandex#publicMap' });

			// добавляем панель на карту в нужную позицию
			objectMap.controls.add(searchControl, { left: '0px', top: '0px' });

		}

		// ПРокрутка колесиком
		objectMap.behaviors.enable('scrollZoom');

		pointCollection = new ymaps.GeoObjectCollection();
		clusterer = new ymaps.Clusterer({
			clusterDisableClickZoom: false
		});
		var get_id = getQueryVariable('object_id');
		for (var i = 0; i < arObjects.length; i++) {
			myPlacemark = new ymaps.Placemark(arObjects[i].coords, {
				iconContent: '<img width="100%" src="/bitrix/templates/main_template/img/short_logo.png" alt="">',
				balloonContentHeader: arObjects[i].type_object_name,
				balloonContentBody: renderObject(arObjects[i])
			});
			(function (i) {
				myPlacemark.events.add('click', function (event) {
					event.preventDefault();
					getPlacemarkAddress(i);
				})
			})(i);
			arPlacemark.push(myPlacemark);
			iPlacemark["p" + arObjects[i].object_id] = i;
			pointCollection.add(myPlacemark);
		}
		// if != false
		if (get_id !== false) {
			for (var l = 0; l < arObjects.length; l++) {
				if (arObjects[l].object_id == get_id) {
					setTimeout(getPlacemarkAddress(l), 1000);
				}
			}
		}
		clusterer.add(arPlacemark);
		objectMap.geoObjects.add(clusterer);
	}

	// Get param from url
	function getQueryVariable(variable) {
		var query = window.location.search.substring(1);
		var vars = query.split("&");
		for (var i = 0; i < vars.length; i++) {
			var pair = vars[i].split("=");
			if (pair[0] == variable) { return pair[1]; }
		}
		return (false);
	}

	// Поиск по координатам
	function getPlacemarkAddress(i) {
		var self = arPlacemark[i],
			coords = self.geometry.getCoordinates(),
			myGeocoder = ymaps.geocode(coords);
		myGeocoder.then(
			function (res) {
				var nearest = res.geoObjects.get(0),
					name = nearest.properties.get('name');

				$.ajax({
					url: siteTemplatePath + "/ajax/mapregions.php",
					type: "get",
					dataType: "json",
					data: {
						SECTION_ID: arObjects[i].section_id,
						IBLOCK_CODE: "maps"
					},
					success: function (response) {
						var address = "";
						for (var j in response) {
							address = (address == "") ? response[j].NAME : address + ", " + response[j].NAME;
						}
						address = address;
						// address = "'"+name+"'";
						var edit_link = getURL('Редактировать объект', arObjects[i].edit_link, '_blank');
						// console.log(arObjects[i].object_id);
						//getParams corr_active, lopast_conf, twist_moment
						$.ajax({
							url: siteTemplatePath + "/ajax/get-obj-params.php",
							type: "get",
							dataType: "json",
							data: {
								OBJ_ID: arObjects[i].object_id
							},
							success: function (res) {
								var result = res[0];
								if (result.PROPERTY_EDO_LINK_VALUE !== null) {
									edo_link = getURL('Ссылка на ЭДО', result.PROPERTY_EDO_LINK_VALUE, '_blank');
								} else {
									edo_link = '<span class="text-danger">Нет ссылки на ЭДО</span>';
								}
								if (result.PROPERTY_NEW_LINK_VALUE !== null) {
									new_link = getURL('Ссылка', result.PROPERTY_NEW_LINK_VALUE, '_blank');
								} else {
									new_link = '<span class="text-danger">Ссылка отсутствует</span>';
								}
								var link = '',
									edittext = '';
								if (result.build_url !== null) link = getURL(result.link_text, result.build_url);
								ballontext = "<div class='col-xs-12'>";
								if (arObjects[i].type_object != 12580) {
									if (result.PROPERTY_CORR_ACTIVE_VALUE !== null) {
										ballontext += "<span> - <span class='opac50'>коррозионная агрессивность грунтов - </span> " + result.PROPERTY_CORR_ACTIVE_VALUE + "</span><br>"
									}
									if (result.PROPERTY_LOPAST_CONF_VALUE !== null) {
										ballontext += "<span> - <span class='opac50'>конфигурация лопасти - </span> " + result.PROPERTY_LOPAST_CONF_VALUE + "</span><br>"
									}
									if (result.PROPERTY_TWIST_MOMENT_VALUE !== null) {
										ballontext += "<span> - <span class='opac50'>крутящий момент (проектное значение): </span> " + result.PROPERTY_TWIST_MOMENT_VALUE + " Н/м</span><br>"
									}
									if (result.PROPERTY_TWIST_MOMENT_FACT_VALUE !== null) {
										ballontext += "<span> - <span class='opac50'>крутящий момент (фактическое значение, min): </span> " + result.PROPERTY_TWIST_MOMENT_FACT_VALUE + " Н/м</span><br>"
									}
								}
								ballontext += "<br><div class='obj-foto col-xs-12'></div>" +
									"<div class='clearfix'></div>" +
									"<p>" + link + "</p>" +
									"</div>";
								edittext += "<div class='col-xs-12'><p>Для внутреннего пользования</p>" +
									"<p>" + edit_link + "</p>" +
									"<p>" + edo_link + "</p>" +
									"<p>" + new_link + "</p>" +
									"<p>Разместил: " + arObjects[i].creator + "</p></div>";
								$('#edittext').html(edittext);
								$('#exampleModalLongTitle').html("<b>" + arObjects[i].name + "</b><p class='text-red'><i class='fa fa-map-marker fa-lg' aria-hidden='true'></i><span>" + address + "</span></p>");
								$('#all-info').html(ballontext);
							},
							error: function () {
							}
						});

						setTimeout(function () {

							$.ajax({
								url: siteTemplatePath + "/ajax/get-videos.php",
								type: "get",
								dataType: "json",
								data: {
									OBJ_ID: arObjects[i].object_id,
									IBLOCK_CODE: "maps"
								},
								success: function (newres) {
									var imgs = '';
									for (var j in newres) {
										var reg = /(.*?)\.(jpg|bmp|jpeg|png)$/;
										if (newres[j].toLowerCase().match(reg)) {
											imgs += "<div class='image'><a href='" + newres[j] + "' data-toggle='lightbox' data-gallery='objs_img'><img class='img-responsive' src='" + newres[j] + "' alt='title'></a></div>";
										}
									}
									/*$.when($('.obj-foto').append(imgs))
									 .done(function(){
									$('.obj-foto').slick({
																						 autoplay: true,
																						 slidesPerRow: 1,
																						 slidesToScroll: 1,
																						 slidesToShow: 1,
																						 prevArrow: '<div class="carousel-control slick-prev cursor-pointer right-videos-slide slick-arrow" style="display: block;"><span class="glyphicon glyphicon-chevron-left"></span></div>',
																						 nextArrow: '<div class="carousel-control slick-next cursor-pointer right-videos-slide slick-arrow" style="display: block;"><span class="glyphicon glyphicon-chevron-right"></span></div>',
																						 infinite: true,
																					});
										 console.log('append completed');
									$('#all-info-modal').modal();
									});*/
									$('.obj-foto').html(imgs);
									$('#all-info-modal').modal();
									//setTimeout(function(){
									/*$('#all-info .obj-foto').slick({
										 autoplay: true,
										 slidesPerRow: 1,
										 slidesToScroll: 1,
										 slidesToShow: 1,
										 prevArrow: '<div class="carousel-control slick-prev cursor-pointer right-videos-slide slick-arrow" style="display: block;"><span class="glyphicon glyphicon-chevron-left"></span></div>',
										 nextArrow: '<div class="carousel-control slick-next cursor-pointer right-videos-slide slick-arrow" style="display: block;"><span class="glyphicon glyphicon-chevron-right"></span></div>',
										 infinite: true,
									});*/

									//}, 1000);
								},
								error: function () {
								}
							});

						}, 100);


					},
					error: function () {
					}
				})
			},
			function (err) {
			}
		);
	}

	function getURL(text, url, target = '_blank') {
		return '<a href="' + (typeof url !== 'undefined' ? url : '') + '" target="' + target + '" class="blue-link">' + text + '</a>';
	}

	var frm = document.forms.meform,
		existChb = localStorage.getItem('checkboxes'),
		chkd = [],
		chkbArr = [];
	if (existChb) {
		chkd = JSON.parse(existChb),
			chkbArr = JSON.parse(existChb);
		$('#rst').removeAttr('disabled');
	}

	// Выделить что уже выбрано
	$(frm).find('input:checkbox').each(function () {
		if (jQuery.inArray(this.id, chkbArr) !== -1)
			$(this).prop('checked', true);
	});
	//Сравнение 2х массивов
	function isSameArr(arr, arr2) {
		if (arr.length != arr2.length) return false;
		var on = 0;
		for (var i = 0; i < arr.length; i++) {
			for (var j = 0; j < arr2.length; j++) {
				if (arr[i] === arr2[j]) {
					on++;
					break;
				}
			}
		}
		return on == arr.length ? true : false;
	}

	frm.onclick = function (event) { // слушаем клик на форме
		if (event.target.type == "checkbox") { // если клик по чекбоксу
			var t = event.target.id; // тащим id чекбокса
			if (chkd.indexOf(t) > -1) { // если в массиве уже есть такое значение - удаляем
				chkd.splice(chkd.indexOf(t), 1);
			} else { // если нет - кладём в массив (id)
				chkd.push(t);
			} // следующая строчка в оригнале раскомментируется
			var isSame = isSameArr(chkbArr, chkd);
			if (isSame) {
				$('.change-color-btn').removeClass('btn-danger').attr('disabled', 'disabled');
			} else {
				$('.change-color-btn').addClass('btn-danger').removeAttr('disabled');
			}
			localStorage.setItem('checkboxes', JSON.stringify(chkd));
		}
	};

	$('#rst').on('click', function (e) {
		window.location.href = "/fiz_licam/objects/";
		localStorage.removeItem('checkboxes');
	});
	$('strong').on('click', function () {
		$("#" + $(this).attr('for')).click();
	});
}());



