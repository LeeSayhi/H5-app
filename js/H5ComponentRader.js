/*  H5ComponentRader对象（雷达图组件对象） */

var H5ComponentRader = function (name, config) {
	var component = new H5ComponentBase(name, config);

	var w = config.width;
	var h = config.height;

	// 画布 - 网格线背景
	var cns = document.createElement('canvas');
	var ctx = cns.getContext('2d');
	cns.width = ctx.width = w;
	cns.height = ctx.height = h;
	component.append(cns);

	var r = w/2;
	var step = config.data.length;

	// 计算圆周上坐标（多边形的顶点坐标）
	// 已知：圆心坐标(a,b)、半径r、角度deg
	// rad = (2*Math.PI/360)*(360/step)*i
	// x = a + Math.sin(rad)*r
	// y = b+ Math.cos(rad)*r

	// 网格背景
	var isBlue = true;
	for(var s = 10; s > 0; s--) {

		ctx.beginPath();
		for (var i = 0; i < step; i++) {
			var rad = (2*Math.PI/360) * (360/step) * i;
			var x = r + Math.sin(rad) * r * (s/10);
			var y = r + Math.cos(rad) * r * (s/10);
			ctx.lineTo(x,y);	
		}
		ctx.closePath();

		isBlue = !isBlue;
		ctx.fillStyle = isBlue ? '#f1f9ff' : '#99c0ff';
		ctx.fill();
	}
	ctx.stroke();

	// 伞骨
	for (var i = 0; i < step; i++) {
		var rad = (2*Math.PI/360) * (360/step) * i;
		var x = r + Math.sin(rad) * r;
		var y = r + Math.cos(rad) * r;
		ctx.moveTo(r, r);
		ctx.lineTo(x, y);

		// 文字
		var text = $('<div class="text">');
		text.text(config.data[i][0]);
		component.append(text);
		text.css('transition', 'all .5s ' +i*.2+ 's');

		if (x > w/2) {
			text.css('left', x/2);
		}else {
			text.css('right', (w-x)/2);
		}
		if (y > h/2) {
			text.css('top', y/2);
		}else {
			text.css('bottom', (h-y)/2);
		}

		// 颜色
		if (config.data[i][2]) {
			text.css('color', config.data[i][2]);
		}

		text.css('opacity', 0);
	}
	ctx.strokeStyle = '#e0e0e0';
	ctx.stroke();

	// 画布 - 数据层
	var cns = document.createElement('canvas');
	var ctx = cns.getContext('2d');
	cns.width = ctx.width = w;
	cns.height = ctx.height = h;
	component.append(cns);

	var draw = function(per) {

		if (per >= 1) {
			component.find('.text').css('opacity', 1);
		}
		if (per <= 1) {
			component.find('.text').css('opacity', 0);
		}
			
		ctx.clearRect(0, 0, w, h);

		// 数据的折线
		ctx.strokeStyle = '#f00';
		for (var i = 0; i < step; i++) {
			var rad = (2*Math.PI/360) * (360/step) * i;
			var rate = config.data[i][1] * per;
			var x = r + Math.sin(rad) * r * rate;
			var y = r + Math.cos(rad) * r * rate;
			ctx.lineTo(x, y);
		} 
		ctx.closePath();
		ctx.stroke();

		// 数据的点
		ctx.fillStyle = '#ff7676';
		for (var i = 0; i < step; i++) {
			var rad = (2*Math.PI/360) * (360/step) * i;
			var rate = config.data[i][1] * per;
			var x = r + Math.sin(rad) * r * rate;
			var y = r + Math.cos(rad) * r * rate;

			ctx.beginPath();
			ctx.arc(x, y, 5, 0, 2*Math.PI);
			ctx.closePath();
			ctx.fill();
		}
	}

	component.on('afterLoad', function() {
		// 雷达图生长动画
		var s = 0;
		for(var i=0; i<100; i++){
			setTimeout(function() {
				s+=.01;
				draw(s);
			}, i*10);
		}
	})

	component.on('onLeave', function() {
		var s = 1;
		for(var i=0; i<100; i++) {
			setTimeout(function() {
				s-=.01;
				draw(s);
			}, i*10);
		}
	})

	return component;
}

