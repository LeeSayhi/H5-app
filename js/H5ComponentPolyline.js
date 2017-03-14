/*  H5ComponentPolyline对象（折线图组件对象） */

var H5ComponentPolyline = function (name, config) {
	var component = new H5ComponentBase(name, config);

	// 绘制网格线
	var w = config.width;
	var h = config.height;

	// 加入一个画布（网格线的背景）
	var cns = document.createElement('canvas');
	var ctx = cns.getContext('2d');

	cns.width = ctx.width = w;
	cns.height = ctx.height = h;
	component.append(cns);

	// 水平网格线
	var step = 10;
	ctx.beginPath();
	ctx.lineWidth = 1;
	ctx.strokeStyle = '#AAAAAA';

	for (var i = 0; i < step+1; i++) {
		var y = (h/step)*i;
		ctx.moveTo(0, y);
		ctx.lineTo(w, y);		
	}

	// 垂直网格线
	step = config.data.length+1;
	for (var i = 0; i < step+1; i++) {
		var x = (w/step)*i;
		ctx.moveTo(x, 0);
		ctx.lineTo(x, h);

		if (config.data[i]) {
			var text = $('<div class="text">');
			text.text(config.data[i][0]);

			text.css({
				'width': (w/step)/2,
				'left': x/2+w/step/4,
			})
		}
		component.append(text);
	}

	ctx.stroke();

	// 加入画布 - 数据层
	var cns = document.createElement('canvas');
	var ctx = cns.getContext('2d');

	cns.width = ctx.width = w;
	cns.height = ctx.height = h;
	component.append(cns);

	var draw = function(per) {
		ctx.clearRect(0,0,w,h);

		// 绘制折线
		ctx.beginPath();
		ctx.lineWidth = 3;
		ctx.strokeStyle = '#ff8878';

		var x = 0;
		var y = 0;

		var row_w = (w/(config.data.length+1));

		// 画点
		for(var i = 0; i < config.data.length; i++) {
			var item = config.data[i];
			x = row_w*i + row_w;
			y = (h-item[1]*h*per);

			ctx.moveTo(x,y);
			ctx.arc(x,y,5,0,2*Math.PI);
		}

		// 连线
			// 移动画笔到第一个数据的位置
			ctx.moveTo(row_w, h-config.data[0][1]*h*per);	

		for (var i = 0; i < config.data.length; i++) {
		 	var item = config.data[i];
		 	x = row_w*i + row_w;
			y = h-item[1]*h*per;
		
		 	ctx.lineTo(x,y)
	    }

		ctx.stroke();

		// 绘制阴影
		ctx.lineTo(x,h);
		ctx.lineTo(row_w, h);
		ctx.fillStyle = 'rgba(255, 136, 120, 0.2)';
		ctx.fill();

	    // 写数据
	    for (var i = 0; i < config.data.length; i++) {
	    	var item = config.data[i];
	    	x = row_w*i + row_w;
	    	y = h-item[1]*h*per;

	    	ctx.fillStyle = item[2] ? item[2] : '#595959';
	    	ctx.fillText((item[1]*100>>0)+'%', x-10, y-10);
	    }
	}

	// 折线图生长动画
	component.on('afterLoad', function() {
		var s = 0;

		for( i=0; i<100; i++){
			setTimeout(function() {
				s+=.01;
				draw(s);
			}, i*10+500)
		}
	})
	component.on('onLeave', function() {
		var s=1;

		for ( i=0; i<100; i++){
			setTimeout(function() {
				s-=.01
				draw(s);
			}, i*10)
		}
	})	

	return component;

}

