/*  H5ComponentBar_v对象（垂直散点图组件对象） */
var H5ComponentBar_v = function (name, config) {
	var obj = new H5ComponentBar(name, config);

	var w = (100/config.data.length)>>0;
	obj.find('.line').width(w+'%');

	$.each(obj.find('.rate'), function() {
		var w = $(this).css('width');
		$(this).width('').height(w);
	})
	$.each(obj.find('.per'), function() {
		$(this).appendTo($(this).prev());
	})

	return obj;

}

