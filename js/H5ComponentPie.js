/*  H5ComponentPie对象（饼图组件对象） */

var H5ComponentPie = function (name, config) {
	var component = new H5ComponentBase(name, config);

	var w = config.width;
	var h = config.height;
	var cns = document.createElement('canvas');
	var ctx = cns.getContext('2d');
	cns.width = ctx.width = w;
	cns.height = ctx.height = h;
	$(cns).css('zIndex', 1);
	component.append(cns);

	var r = w/2;

	// 底图层
	ctx.beginPath();
	ctx.fillStyle = '#eee';
	ctx.strokeStyle = '#eee';
	ctx.lineWidth = 1;
	ctx.arc(r, r, r, 0, 2*Math.PI);
	ctx.fill();
	ctx.stroke();

	// 数据层
	var cns = document.createElement('canvas');
	var ctx = cns.getContext('2d');
	cns.width = ctx.width = w;
	cns.height = ctx.height = h;
	$(cns).css('zIndex', 2);
	component.append(cns);

	var colors = ['yellow', 'orange', 'green', 'gray', 'blue'];   // 备用颜色
	var sAngel = 1.5 * Math.PI;  // 设置起始角度 12点位置
	var eAngel = 0;   // 结束角度
	var aAngel = 2*Math.PI; // 100%圆结束角度  360 = 2PI

	var step = config.data.length;
	for (var i = 0; i < step; i++) {
		var item = config.data[i];
		eAngel = sAngel + aAngel*item[1];
		var color = item[2] || (item[2] = colors.pop());

		ctx.beginPath();
		ctx.fillStyle = color;
		ctx.strokeStyle = color;
		ctx.lineWidth = .1;

		ctx.moveTo(r, r);
		ctx.arc(r, r, r, sAngel, eAngel);
		ctx.fill();
		ctx.stroke();
		sAngel = eAngel;

		// 所有的项目文本以及所占比例数据
		var text = $('<div class="text">');
		text.text(config.data[i][0]);
		var roate = $('<div class="per">');
		roate.text(config.data[i][1]*100 + '%');
		text.append(roate);		
		component.append(text);
		text.css('transition', 'all .5s ' +i*.2+ 's');

		var x = r + Math.sin(.5*Math.PI-sAngel) * r;
		var y = r + Math.cos(.5*Math.PI-sAngel) * r;

		if (x >= w/2) {
			text.css('left', x/2);
		}else {
			text.css('right', (w-x)/2);
		}
		if (y >= h/2) {
			text.css('top', y/2);
		}else {
			text.css('bottom', (h-y)/2);
		}

		if (config.data[i][2]) {
			text.css('color', config.data[i][2])
		}
	}

	//  数据层上的遮罩层
	var cns = document.createElement('canvas');
	var ctx = cns.getContext('2d');
	cns.width = ctx.width = w;
	cns.height = ctx.width = h;
	$(cns).css('zIndex', 3);
	component.append(cns);

	ctx.lineWidth = 1;
	ctx.fillStyle = '#eee';
	ctx.strokeStyle = '#eee';

	// 生长动画
	var draw = function(per) {

		ctx.clearRect(0, 0, w, h);
		ctx.beginPath();
		ctx.moveTo(r, r);

		if (per <= 0) {
			ctx.arc(r, r, r, 0, 2*Math.PI);
			 component.find('.text').css('opacity', 0);
		}else {
			ctx.arc(r, r, r, sAngel, sAngel+2*Math.PI*per, true);
			component.find('.text').css('opacity', 1);
		}
		ctx.fill();
		ctx.stroke();		
	}
	draw(0);

	component.on('afterLoad', function() {
		var s = 0;
		for (var i = 0; i < 100; i++) {
			setTimeout(function() {
				s+=.01;
				draw(s);
			}, i*10);
		}
	});

	component.on('onLeave', function() {
		var s = 1;
		for (var i = 0; i < 100; i++) {
			setTimeout(function() {
				s-=.01;
				draw(s);				
			}, i*10);
		}
	});


	return component;
}

