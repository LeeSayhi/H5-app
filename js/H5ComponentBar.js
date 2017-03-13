/*  H5ComponentBar对象（水平散点图表组件对象） */

var H5ComponentBar = function (name, config) {
	var component = new H5ComponentBase(name, config);
	$.each(config.data, function(index, item) {
		var line = $('<div class="line">');
		var name = $('<div class="name">');
		var rate = $('<div class="rate">');
		var per = $('<div class="per">');

		var width = item[1]*100 + '%';
		rate.css('width', width);

		var bgStyle = '';
		if (item[2]) {
			bgStyle = 'style="background-color:'+item[2]+ '"';
		}

		rate.html('<div class="bg" '+bgStyle+'></div');

		name.text(item[0]);
		per.text(width);

		component.append(line);
		line.append(name).append(rate).append(per);
	})
	
	return component;
}

