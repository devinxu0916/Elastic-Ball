(function() {
	var disX = 0,
		disY = 0,
		top = 0,
		left = 0,
		speedX = 0,
		speedY = 0,
		timer = null,
		box = document.getElementById("box");
	
	box.onmousedown = function(e) {
		clearInterval(timer);
		var e = event || window.event;
		disX = e.clientX - box.offsetLeft;
		disY = e.clientY - box.offsetTop;
		document.onmousemove = function(e) {
			var e = event || window.event;
			box.style.left = e.clientX - disX + "px";
			box.style.top = e.clientY - disY + "px";

			speedX = box.offsetLeft - left;
			speedY = box.offsetTop - top;
			left = box.offsetLeft;
			top = box.offsetTop;
		};

		document.onmouseup = function() {
			document.onmousedown = document.onmousemove = null;
			clearInterval(timer);
			box.releaseCapture && box.releaseCapture();
			ballMove(box);
		};

		box.setCapture && box.setCapture();
		return false;

	}

	function ballMove(obj) {
		var maxX = document.documentElement.clientWidth - box.offsetWidth || document.body.clientWidth - box.offsetWidth;
		var maxY = document.documentElement.clientHeight - box.offsetHeight || document.body.clientHeight - box.offsetHeight;

		timer = setInterval(function() {

			speedY += 3;

			var x = obj.offsetLeft + speedX;
			var y = obj.offsetTop + speedY;

			if (x > maxX) {
				x = maxX;
				speedX *= -0.9;
				speedY *= 0.9;
			};
			if (x < 0) {
				x = 0;
				speedX *= -0.9;
				speedY *= 0.9;
			};
			if (y > maxY) {
				y = maxY;
				speedY *= -0.9;
				speedX *= 0.9;
			};
			if (y < 0) {
				y = 0;
				speedY *= -0.9;
				speedX *= 0.9;
			};

			obj.style.left = x + "px";
			obj.style.top = y + "px";

			if(Math.abs(speedX) < 1) speedX = 0;
            if(Math.abs(speedY) < 1) speedY = 0;
            if(speedX == 0 && speedY==0 && obj.offsetTop == maxY) clearInterval(timer);

		},30);
	}

})();
