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
	}

	ctx.stroke();

	// 加入画布 - 数据层
	var cns = document.createElement('canvas');
	var ctx = cns.getContext('2d');

	cns.width = ctx.width = w;
	cns.height = ctx.height = h;
	component.append(cns);

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
		y = h*(1-item[1]);

		ctx.moveTo(x,y);
		ctx.arc(x,y,5,0,2*Math.PI);
	}

	// 连线
		// 移动画笔到第一个数据的位置
		ctx.moveTo(row_w, h*(1-config.data[0][1]));	

	for (var i = 0; i < config.data.length; i++) {
	 	var item = config.data[i];
	 	x = row_w*i + row_w;
		y = h*(1-item[1]);
	
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
    	y = h*(1-item[1]);

    	ctx.fillStyle = item[2] ? item[2] : '#595959';
    	ctx.fillText((item[1]*100>>0)+'%', x-10, y-10);
    }

	return component;

}

