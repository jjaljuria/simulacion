class Canvas{

	constructor(){
		this.direccion = "Sur";
		this.canvas = document.getElementById('canvas').getContext('2d');
	}

	dibujar(){
		let canvas = this.canvas;
		//encabezado
		canvas.beginPath();
		canvas.font = "bold 24px sans-serif";
		canvas.textAlign = "center";
		canvas.fillText("12 Kilometros", 250, 24);

		canvas.moveTo(10, 40);
		canvas.lineTo(490, 40);
		canvas.stroke();

		//calles
		canvas.strokeStyle = "green";
		canvas.fillRect(10, 50, 480, 60);
		canvas.strokeRect(10, 50, 480, 60);
		canvas.fillRect(10,230, 480, 60);
		canvas.strokeRect(10,230, 480, 60);
		canvas.strokeStyle = "white";

		for (let i = 10; i <= 490; i += 32) {

			canvas.moveTo(i, 80);
			canvas.lineTo(i+25, 80);
			canvas.moveTo(i, 260);
			canvas.lineTo(i+25, 260)
		}

		canvas.stroke();
	

		//via emergencia
		canvas.beginPath();
		canvas.fillStyle = "green";
		canvas.strokeStyle = "black";
		canvas.fillRect(10, 160, 480, 40);
		canvas.strokeRect(10, 160, 480, 40);

		this.obtenerDireccionar(canvas);
	}

	redibujar(){
		let canvas = this.canvas;
		canvas.clearRect(0,0, 500, 300);
		this.dibujar();
	}

	obtenerDireccionar(canvas){
		//direccion
		if (this.direccion === "Norte")
			this.direccionNorte(canvas);
		else if (this.direccion === "Sur")
			this.direccionSur(canvas);
		else if (this.direccion === "Colapso")
			this.direccionColapso(canvas);
			
		
	}

	direccionNorte(canvas){
		canvas.beginPath();
		canvas.fillStyle = "black";
		canvas.fillText("Norte", 210, 142, 60);
		canvas.fillRect(250, 125, 50, 20);
		canvas.moveTo(300, 145);
		canvas.lineTo(300, 150);
		canvas.lineTo(320, 135);
		canvas.lineTo(300, 120);
		canvas.closePath();
		canvas.fill();
	}

	direccionSur(canvas){
		canvas.beginPath();
		canvas.fillStyle = "black";
		canvas.fillText("Sur", 280, 142, 60);
		canvas.fillRect(200, 125, 50, 20);
		canvas.moveTo(200, 145);
		canvas.lineTo(200, 150);
		canvas.lineTo(170, 135);
		canvas.lineTo(200, 120);
		canvas.closePath();
		canvas.fill();
	}

	direccionColapso(canvas) {
		canvas.beginPath();
		canvas.fillStyle = "black";
		canvas.fillText("Colapsado", 230, 142, 120);
		canvas.closePath();
		canvas.fill();
	}

	Sur(){
		this.direccion = "Sur";
		this.redibujar();
	}

	Norte(){
		this.direccion = "Norte";
		this.redibujar();
	}

	Colapsado() {
		this.direccion = "Colapso";
		this.redibujar();
	}
}