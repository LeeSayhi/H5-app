/*  H5ComponentRing对象（环图组件对象） */

var H5ComponentRing =function ( name, config ) {

	if (config.data.length > 1) {
		config.data = [config.data[0]];
	}

	config.type = 'pie';
	var component = new H5ComponentPie(name, config);
	component.addClass('h5_component_ring');

	var mask = $('<div class="mask">');
	component.append(mask);
	
	var text = component.find('.text');

	text.attr('style', '');
	if (config.data[0][2]) {
		text.css('color', config.data[0][2]);
	}
	mask.append(text);

	return component;
}
