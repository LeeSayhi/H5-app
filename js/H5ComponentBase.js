/*  H5ComponentBase对象（基本的图文组件对象） */

var H5ComponentBase = function (name,config) {
	this.config = config || {};
	
	var id = ('h5_c_' + Math.random()).replace('.', '_');
	// 把当前的组件类型(base)添加到样式中进行标记
	var cls = ' h5_component_' + config.type;
	var component = $('<div class="h5_component h5_component_name_'+name+' ' +cls+' " id="'+id+'" >');

	config.text   && component.text(config.text);
	config.width  && component.width(config.width/2);
	config.height && component.height(config.height/2);

	config.css && component.css(config.css);
	config.bg  && component.css('backgroundImage', 'url('+config.bg+')');

	if (config.center === true) {
		component.css({
			marginLeft: (config.width/4 * -1) + 'px',
			left: '50%',
		})
	}

	component.on('afterLoad', function() {
		component.addClass(cls+ '_load').removeClass(cls+'_leave');
		config.animateIn && component.animate(config.animateIn);
		return false;
	});
	component.on('onLeave', function() {
		component.addClass(cls+ '_leave').removeClass(cls+'_load');
		config.animateOut && component.animate(config.animateOut);
		return false;
	});

	return component;

}

