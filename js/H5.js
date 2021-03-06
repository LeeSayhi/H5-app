/*内容管理对象*/
var H5 = function () {
	this.id = ('h5_'+ Math.random()).replace('.', '_');
	this.el = $('<div class="h5" id="'+this.id+'">').hide();
	this.page = [];
	$('body').append(this.el);

	/**
	 *新增一个页
	 *name 组件的名称
	 *text 页内的默认文本
	 *return {H5} H5对象，可以重复使用H5对象支持的方法
	 */
	this.addPage = function(name, text){
		var page = $('<div class="h5_page section">');
		if (name != undefined) {
			page.addClass('h5_page_'+name);
		}
		if (text != undefined) {
			page.text(text);
		}
		this.el.append(page);
		this.page.push(page)

		if (typeof this.whenAddPage === 'function') {
			this.whenAddPage();
		}

		return this;	
	}

	/* 新增一个组件 */
	this.addComponent = function(name,config) {
		var config = config || {};
		config = $.extend({
			type: 'base'
		}, config);

		var component; // 存贮 组件元素
		var page = this.page.slice(-1)[0];
		switch(config.type) {
			case 'base':
				component = new H5ComponentBase(name, config);
				break;
			case 'polyline':
				component = new H5ComponentPolyline(name, config);
				break;
			case 'pie' :
				component = new H5ComponentPie(name, config);
				break;
			case 'bar' :
				component = new H5ComponentBar(name, config);
				break;
			case 'bar_v' :
				component = new H5ComponentBar_v(name, config);
				break;
			case 'rader' :
				component = new H5ComponentRader(name, config);
				break;
			case 'ring' :
				component = new H5ComponentRing(name, config);
				break;
			case 'point' :
				component = new H5ComponentPoint(name, config);
				break;

				default:
		}
		page.append(component);
		return this;
	}

	/* H5对象初始化呈现 */
	this.loader = function(firstPage) {
		this.el.fullpage({
			onLeave: function(index, nextIndex, direction) {
				$(this).find('.h5_component').trigger('onLeave');
			},
			afterLoad: function(anchorLink, index) {
				$(this).find('.h5_component').trigger('afterLoad');
			},
		});	
		this.page[0].find('.h5_component').trigger('afterLoad');

		this.el.show();

		if (firstPage) {
			$.fn.fullpage.moveTo(firstPage)	;
		}	
	}
	this.loader = typeof H5_loading == 'function' ? H5_loading : this.loader;

	return this;
}