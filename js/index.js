window.addEventListener('load', inicio);

function inicio(){

	let canvas = new Canvas();
	let monitor = new Monitor(document.getElementById('monitor'));
	let controles = new Controles(canvas, monitor);

	let botonIniciar = document.getElementById('iniciar');
	botonIniciar.addEventListener('click', function () {
		controles.iniciar();
	})

	let botonParar = document.getElementById('parar');
	botonParar.addEventListener('click', function () {
		controles.parar();
	})

	
}

class Controles{
	constructor(canvas, monitor){
		
		this.canvas = canvas;
		this.monitor = monitor;
		this.canvas.dibujar();
		this.iniciarFechas();
	}

	setFechas(inicial, final) {
		//Fecha inicial
		this.date = moment(inicial).format('YYYY-MM-DD HH:mm');
		this.final = moment(final).format('YYYY-MM-DD HH:mm');
		console.log(this.date);

	}

	async simular() {

		this.norteSur = 0;
		this.surNorte = 0;
		this.trafico = 0;
		

		if (moment(this.date) < moment(this.final)) {

			let comprobarFestivo = moment(this.date).format('DD/MM');
			if (comprobarFestivo !== '24/12' && comprobarFestivo !== '31/12' && comprobarFestivo !== '18/11') {//no trabaja los 24 y 31 y no le pueso mas feriados por que no me acordaba

				let hora = moment(this.date).format('h');
				let min = moment(this.date).format('m');
				let aux = parseFloat(hora + "." + min);

				switch (moment(this.date).format('dddd')) {
					case 'Monday':
					case 'Tuesday':
					case 'Wednesday':
					case 'Thursday':
					case 'Friday':

						console.log('entre semana');
						switch (moment(this.date).format('a')) {
		
							case 'am':
								//Norte -> Sur
								if (aux >= 6.0 && aux <= 9.0) {
									this.norteSur = this.aleatorio(0, 1189);
								} else if (aux >= 11.3 && aux <= 12.0) {
									this.norteSur = this.aleatorio(0, 957)
								} else {
									this.norteSur = this.aleatorio(0, 200)//valor arbitrario no se especifica en el planteamiento
								}
							
								// Sur -> Norte
								if (aux >= 6.0 && aux <= 9.0) {
									this.surNorte = this.aleatorio(0, 873);
								} else if (aux >= 11.3 && aux <= 12.0) {
									this.surNorte = this.aleatorio(0, 761)
								} else {
									this.surNorte = this.aleatorio(0, 200)
								}
							
								break;
							
							case 'pm':
							
								//Norte -> Sur
								if (aux >= 0.0 && aux <= 1.0) {
									this.norteSur = this.aleatorio(0, 957);
								} else if (aux >= 5.0 && aux <= 9.15) {
									this.norteSur = this.aleatorio(0, 699)
								} else {
									this.norteSur = this.aleatorio(0, 200)
								}

								//Sur -> Norte
								if (aux >= 0.0 && aux <= 1.0) {
									this.surNorte = this.aleatorio(0, 761);
								} else if (aux >= 5.0 && aux <= 9.15) {
									this.surNorte = this.aleatorio(0, 1344)
								} else {
									this.surNorte = this.aleatorio(0, 200)
								}
								break;
						}
					

						break;
				
					case 'Saturday':
					case 'Sunday':
					
						console.log('fin de semana');
						switch (moment(this.date).format('a')) {

							case 'am':
								//Norte -> Sur
								if (aux >= 6.0 && aux <= 12.0) {
									this.norteSur = this.aleatorio(0, 548);
								} else {
									this.norteSur = this.aleatorio(0, 200)
								}

								// Sur -> Norte
								if (aux >= 6.0 && aux <= 12.0) {
									this.surNorte = this.aleatorio(0, 633);
								} else {
									this.surNorte = this.aleatorio(0, 200)
								}

								break;

							case 'pm':

								//Norte -> Sur
								if (aux >= 0.0 && aux <= 1.0) {
									this.norteSur = this.aleatorio(0, 548);
								} else if (aux >= 3.0 && aux <= 8.0) {
									this.norteSur = this.aleatorio(0, 399)
								} else {
									this.norteSur = this.aleatorio(0, 200)
								}

								//Sur -> Norte
								if (aux >= 0.0 && aux <= 1.0) {
									this.surNorte = this.aleatorio(0, 633);
								} else if (aux >= 3.0 && aux <= 8.0) {
									this.surNorte = this.aleatorio(0, 355)
								} else {
									this.surNorte = this.aleatorio(0, 200)
								}
								break;
						}
						break;
					default:
						console.log('error');
					
				}

				//Evalua cual tiene mas vehiculos (la necesidad de otra via)
				if (this.norteSur > this.surNorte) {
					this.direccionNorte++;
					this.canvas.Norte();
					this.trafico = this.norteSur;
				} else {
					this.direccionSur++;
					this.canvas.Sur();
					this.trafico = this.surNorte;
				}


			
				
			} else {
				this.canvas.Colapsado();
			}
			
			this.date = moment(this.date).add(2, 'hours').format('YYYY-MM-DD HH:mm');
		}else{
			this.parar();
		}
		
		await this.mostrar();		
	}


	async iniciar() {
		let iniciof = document.getElementById('inicio').value;
		let finalizacionf = document.getElementById('finalizacion').value;
		this.setFechas(iniciof, finalizacionf);

		this.direccionNorte = 0;
		this.direccionSur = 0;

		this.simulacion = await setInterval(this.simular.bind(this), 1000);
	}

	parar() {
		clearInterval(this.simulacion);
	}

	iniciarFechas(){
		let fechaInicio = document.getElementById('inicio');
		let fechaFinal = document.getElementById('finalizacion');
		fechaInicio.value = moment().format('YYYY-MM-DDTHH:mm');
		fechaFinal.value = moment().format('YYYY-MM-DDTHH:mm');
		
	}

	setMonitor(monitor){
		this.monitor = monitor;
	}

	aleatorio(min, max) {
		return Math.floor(Math.random() * (max - min)) + min;
	}

	mostrar() {
		this.monitor.agregar(`
			<h1 style="display: inline; margin: auto;">Simulacion</h1>
			<h2>Tiempo Actual: ${this.date}<h2>
			<h2>N° Vehiculos hacia el Norte : ${this.norteSur} </h2><h2>N° Vehiculos hacia el Sur:${this.surNorte}</h2>
			<h2>N° Direccionamientos</h2>
			<h2>Norte: ${this.direccionNorte} Sur: ${this.direccionSur}</h2>
		`);
		this.monitor.presentar();
	}
}

