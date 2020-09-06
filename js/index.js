// 设置宽高
document.body.style.width = document.documentElement.clientWidth + 'px';
document.body.style.height = document.documentElement.clientHeight + 'px';
document.documentElement.style.fontSize = document.documentElement.clientWidth / 10 + 'px';
// 视口发生改变时，重新适配
window.onresize = function(){
	document.body.style.width = document.documentElement.clientWidth + 'px';
	document.body.style.height = document.documentElement.clientHeight + 'px';
	document.documentElement.style.fontSize = document.documentElement.clientWidth / 10 + 'px';
}
// 资源加载完成
window.onload = function(){
	// 获取app
	let appNode = document.querySelector('.app');
	// 获取wrap节点
	let wrapNode = document.querySelector('.app > .wrap');
	// 获取子弹节点
	let bulletNode = document.querySelector('.app > .wrap > img:nth-child(2)');
	// 获取飞机节点
	let planeNode = document.querySelector('.app > .wrap > img.plane');
	// 获取敌机节点
	let enemyNode = document.querySelector('.app > .enemy');
	// 设置过渡总时间timeAll
	let timeAll = 1000;
	// 分数
	let score = 0;
	// 设置分数节点
	let scoreNode = document.querySelector('.number');
	// 设置总距离
	let disAll = document.documentElement.clientHeight - 1.8 * parseFloat(document.documentElement.style.fontSize);
	// 过渡单位时间
	let timeStep = 5;
	// 设置帧
	let frame = disAll / timeAll * timeStep;
	// 设置子弹位置
	let bulletPosition = 0;
	// 设置子弹前后位置不同
	let bulletPreAndEnd = 0;
	// 图片地址
	let src = bulletNode.src;
	// 子弹数组
	let bulletArr = [];
	// 打中子弹数组
	let bulletArray = [];
	console.log(planeNode.src);
	// 子弹移动函数
	function bulletMove(bullet){
		// let id;
		// function move(){
		// 	buttletPosition = bullet.offsetTop - frame;
		// 	if(buttletPosition <= -0.712 * parseFloat(document.documentElement.style.fontSize)){
		// 		bullet.remove();
		// 		cancelAnimationFrame(id)
		// 	}
		// 	bullet.style.top = buttletPosition + 'px';
		// 	id = requestAnimationFrame(move);
		// }
		// id = requestAnimationFrame(move);
		let timer = setInterval(function(){
			buttletPosition = bullet.offsetTop - frame;
			if(buttletPosition <= -0.712 * parseFloat(document.documentElement.style.fontSize)){
				bullet.remove();
				bulletArr.shift();
				clearInterval(timer);
			}
			bullet.style.top = buttletPosition + 'px';
		}, timeStep)
	}
	// 子弹循环出现
	function bulletAppear(){
		setInterval(function(){
			let imgNode = document.createElement('img');
			imgNode.src = src;
			imgNode.style.position = 'fixed';
			imgNode.style.width = wrapNode.offsetWidth + 'px';
			imgNode.style.left = wrapNode.offsetLeft + (imgNode.offsetWidth / 2 - wrapNode.offsetWidth / 2) + 'px';
			imgNode.style.top = planeNode.offsetTop - planeNode.offsetHeight / 2 + 'px';
			appNode.appendChild(imgNode);
			bulletArr.push(imgNode);
			bulletMove(imgNode);
		}, 400)
	}
	// 判断子弹和敌人是否碰撞
	function collision(bulletArr, enemy){
		let i;
		for(i = 0; i < bulletArr.length; i++){
			if((bulletArr[i].offsetTop - enemy.offsetTop <= enemy.offsetHeight) && ((bulletArr[i].offsetLeft < enemy.offsetLeft + enemy.offsetWidth) && (bulletArr[i].offsetLeft + bulletArr[i].offsetWidth > enemy.offsetLeft))){
				bulletArray.push(bulletArr[i]);
				return true;
			}
		}
		
		return false;
	}
	// 敌机循环出现
	function enemyAppear(){
		setInterval(function(){
			let enemy = document.createElement('div');
			enemy.className = 'enemyAppear';
			enemy.style.left = Math.floor(Math.random() * document.documentElement.clientWidth) + 'px';
			// enemy.style.top = Math.floor(Math.random() * document.documentElement.clientHeight / 2) + 'px';
			enemy.innerHTML = '<img src="img/c-07b.png" style="height: 100%">';
			appNode.appendChild(enemy);
			enemyMove(enemy);
		}, 500)
	}
	// 敌机循环移动
	function enemyMove(enemy){
		let flag = enemy.offsetLeft > document.documentElement.clientWidth / 2 ? true : false;
		let id;
		function move(){
			let left = enemy.offsetLeft;
			let top = enemy.offsetTop;
			if(flag){
				left = left - 40;
			}else{
				left = left + 40;
			}
			top += 150;
			if(left > document.documentElement.clientWidth + enemy.offsetWidth || 0){
				enemy.remove();
				cancelAnimationFrame(id);
			}
			if(top > document.documentElement.clientHeight){
				enemy.remove();
				cancelAnimationFrame(id);
			}
			id = requestAnimationFrame(move);
			if(collision(bulletArr, enemy)){
				// 打中子弹消失
				while(bulletArray.length != 0){
					bulletArray[0].remove();
					bulletArray.shift();
				}
				// 设置分数
				score++;
				scoreNode.innerHTML = `${score}分`;
				cancelAnimationFrame(id);
				enemy.style.transition = 'none';
				if(flag){
					left = left + 60;
				}else{
					left = left - 60;
				}
				top = top - 80;
				enemy.remove();
				let boom = document.createElement('div');
				boom.className = 'boom';
				boom.style.left = left + 'px';
				boom.style.top = top + 'px';
				appNode.appendChild(boom);
				setTimeout(function(){
					boom.remove();
				}, 1000);
				
			}
			enemy.style.left = left + 'px';
			enemy.style.top = top + 'px';
			
		}
		id = requestAnimationFrame(move);
		// setInterval(function(){
		// 	let left = enemy.offsetLeft;
		// 	let top = enemy.offsetTop;
		// 	if(flag){
		// 		left = left - 30;
		// 	}else{
		// 		left = left + 30;
		// 	}
		// 	top += 40;
		// 	// 判断是否超出地图
		// 	if(left > document.documentElement.clientWidth || left < 0){
		// 		enemy.remove();
		// 	}
		// 	if(top > document.documentElement.clientHeight){
		// 		enemy.remove();
		// 	}
		// 	// 设置敌机的位置
		// 	enemy.style.left = left + 'px';
		// 	enemy.style.top = top + 'px';
		// }, 200)
	}
	// 添加拖拽
	planeNode.addEventListener('touchstart', function(event){
		// 获取最初的飞机的水平位置
		this.startLeft = this.offsetLeft;
		// 竖直位置
		this.startTop = this.offsetTop;
		// 因为初始化在中间
		this.startWidth = wrapNode.offsetLeft;
		// 获取手指的初始水平位置
		this.startX = event.targetTouches[0].clientX;
		// 竖直位置
		this.startY = event.targetTouches[0].clientY;
	});
	planeNode.addEventListener('touchmove', function(event){
		// 获取手指的最终位置
		this.endX = event.targetTouches[0].clientX;
		this.endY = event.targetTouches[0].clientY;
		// 设置飞机位置
		this.setY = this.endY - this.startY + this.startTop;
		this.setX = this.endX - this.startX + this.startLeft + this.startWidth + wrapNode.offsetWidth / 2;
		
		if(this.setX <= 0.84 * parseFloat(document.documentElement.style.fontSize)){
			this.setX = 0.84 * parseFloat(document.documentElement.style.fontSize);
		}
		if(this.setY < 0){
			this.setY = 0;
		}
		if(this.setX >= 9.15 * parseFloat(document.documentElement.style.fontSize)){
			this.setX = 9.15 * parseFloat(document.documentElement.style.fontSize);
		}
		if(this.setY > document.documentElement.clientHeight - planeNode.offsetHeight){
			this.setY = document.documentElement.clientHeight - planeNode.offsetHeight;
		}
		wrapNode.style.left = this.setX + 'px';
		planeNode.style.top = this.setY + 'px';
	})
	bulletMove(bulletNode);
	bulletAppear();
	enemyAppear();
	enemyMove(enemyNode);
}