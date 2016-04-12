$(window).load(function() {

	function gener() {
		// Добавление стилей в head
		var styles = document.createElement('style');
		styles.innerHTML = '.wrapper{margin-top:100px;font-size:24px;text-align:center}.hashtags_vk{width:1100px;margin:0 auto}.track-info{margin:20px 0}.track-info>summary{cursor:pointer;outline:0}.track-info__content{width:800px;margin:15px auto;font-size:16px;text-align:left}';
		document.querySelector('head').appendChild(styles);

		//Остановка трека (если он играет)
		var pause_butt = document.querySelector('.heroPlayButton-pause');
		if (pause_butt) pause_butt.click();

		var hashtags = document.querySelectorAll('.sc-tag-group .sc-truncate, .soundTitle__tagContent'), // хештеги soundclound
			hashtags_vk = '', // отформатированные хештеги soundcloud под vk
			picture = getComputedStyle(document.querySelectorAll('.customImage > .sc-artwork')[0]).backgroundImage.replace(/url\(|\)|"/g, '').replace('200x200', '500x500'), // Урл изображения трека
			title = document.querySelector('.g-type-shrinkwrap-inline > span').innerText, // Название трека
			title_hash = [], // Массив для будущих хештегов из названия трека
			content = document.querySelector('.listenDetails .sc-type-small').innerHTML; // Описание к треку (простое копирование)

		// Разбивание хештега по символу аперсанда (бывает попадется в теге), удаление проблелов и добавление символа решетки
		for (var i = 0, tmp_hashtag; i < hashtags.length; i++) {
			tmp_hashtag = hashtags[i].innerText.split('&');
			
			for (var j = 0; j < tmp_hashtag.length; j++)
				hashtags_vk += '#' + tmp_hashtag[j].replace(/ /g, '') + ' ';
		}

		// Генерация хештегов из названия трека
		title_hash = title.split('-');
		for (var i = 0, title_hash_c = title_hash, title_hash = ''; i < title_hash_c.length; i++) 
			title_hash += '#' + title_hash_c[i].replace(/ /g, '') + ' ';

		// Сборка готового кода
		var res = 	'<div class="hashtags_vk">' + hashtags_vk + '</div><br>' +
					title_hash + '<br>' +
					title + '<br><br>' +
					'<img src="' + picture + '" alt="" style="display:inline;">' +
					'<details class="track-info">' +
						'<summary>Информация об треке</summary>' +
						'<div class="track-info__content">' + content + '</div>' +
					'</details>';
		document.body.innerHTML = '<div class="wrapper">' + res + '</div>';
	}

	function main() {
		setTimeout(function() {
			if (!$('.extract-information').length) {
				var group = $('.sc-button-group-medium').eq(0),
					template = '<button class="extract-information sc-button-addtoset sc-button sc-button-medium sc-button-responsive" title="Извлечь информацию о треке">Extract info</button>';

				group.append(template);
				group.find('.extract-information').on('click', function() {
					gener();
					return false;
				});
			}
		}, 300);
	}
	main();

	// Отслеживание контента страницы (для тех сайтов, которые поддерживают ajax переход между страницами) и вызов функции main
	var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver,
		list = document.querySelector('head > title'),
		observer = new MutationObserver(main);

	observer.observe(list, {
		characterData: true,
		subtree: true,
		childList: true
	});

});