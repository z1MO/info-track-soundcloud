
// Styles
// .sc-button-medium.sc-button-share.extract-information:before {
// 	background-image: url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTguMS4xLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDMyIDMyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAzMiAzMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSIxNnB4IiBoZWlnaHQ9IjE2cHgiPgo8Zz4KCTxnIGlkPSJoYXNoIj4KCQk8cGF0aCBkPSJNMzAsMTJWOGgtNS4wMDRsMS04aC00bC0xLDhoLTcuOTk4bDEtOGgtNGwtMSw4SDJ2NGg2LjQ5OEw3LjUsMjBIMnY0aDVsLTEsOGg0bDEtOGg4bC0xLjAwMiw4SDIyICAgIGwxLThoN3YtNGgtNi41bDAuOTk2LThIMzB6IE0xOS41LDIwaC04bDAuOTk4LThoNy45OThMMTkuNSwyMHoiIGZpbGw9IiMwMDAwMDAiLz4KCTwvZz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K);
// }

// .wrapper {
// 	margin-top: 100px;
// 	font-size: 24px;
// 	text-align: center;
// }
// .hashtags {
// 	width: 1100px;
// 	margin: 0 auto;
// }
// .track-info {
// 	margin: 20px 0;
// }
// .track-info > summary {
// 	cursor: pointer;
// 	outline: none;
// }
// .track-info__content {
// 	width: 800px;
// 	margin: 15px auto;
// 	font-size: 16px;
// 	text-align: left;
// }


$(window).load(function() {

	function gener() {
		// Добавление стилей в head
		var styles = document.createElement('style');
		styles.innerHTML = '.wrapper{margin-top:100px;font-size:24px;text-align:center}.hashtags{width:1100px;margin:0 auto}.track-info{margin:20px 0}.track-info>summary{cursor:pointer;outline:0}.track-info__content{width:800px;margin:15px auto;font-size:16px;text-align:left}';
		document.querySelector('head').appendChild(styles);

		//Остановка трека (если он играет)
		var pause_butt = document.querySelector('.heroPlayButton-pause');
		if (pause_butt) pause_butt.click();

		var tags = document.querySelectorAll('.sc-tag-group .sc-truncate'), // хештеги soundclound
			hashtags = '', // отформатированные хештеги soundcloud под vk
			picture = getComputedStyle(document.querySelectorAll('.customImage > .sc-artwork')[0]).backgroundImage.replace(/url\(|\)|"/g, '').replace('200x200', '500x500'), // Урл изображения трека
			title = document.querySelector('.g-type-shrinkwrap-inline > span').innerText, // Название трека
			title_hash = [], // Массив для будущих хештегов из названия трека
			content = document.querySelector('.listenDetails .sc-type-small').innerHTML; // Описание к треку (простое копирование)

		// Удаление пробелов в хештегах и добавление решетки хештега
		for (var i = 0; i < tags.length; i++) 
			hashtags += '#' + tags[i].innerText.replace(/ /g, '') + ' ';

		// Генерация хештегов из названия трека
		title_hash = title.split('-');
		for (var i = 0, title_hash_c = title_hash, title_hash = ''; i < title_hash_c.length; i++) 
			title_hash += '#' + title_hash_c[i].replace(/ /g, '') + ' ';

		// Сборка готового кода
		var res = 	'<div class="hashtags">' + hashtags + '</div>' +
					title_hash + '<br><br>' +
					title + '<br><br>' +
					'<img src="' + picture + '" alt="" style="display:inline;">' +
					'<details class="track-info">' +
						'<summary>Информация об треке</summary>' +
						'<div class="track-info__content">' + content + '</div>' +
					'</details>';
		document.body.innerHTML = '<div class="wrapper">' + res + '</div>';
	}

	function main() {
		if (!$('.extract-information').length) {
			var group = $('.sc-button-group-medium').eq(0),
				template = '<button class="extract-information sc-button-share sc-button sc-button-medium sc-button-responsive" title="Извлечь информацию о треке">Extract info</button>';

			group.append(template);
			group.find('.extract-information').on('click', function() {
				gener();
				return false;
			});
		}
	}
	main();

	var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver,
		list = document.querySelector('head > title'),
		observer = new MutationObserver(function(mutations) {
			setTimeout(main, 300);
		});

	observer.observe(list, {
		characterData: true,
		subtree: true,
		childList: true
	});

});
