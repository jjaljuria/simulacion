class Monitor{
	constructor(monitor) {
		this.monitor = monitor;
		this.mostrar = [];
	}

	agregar(nodo) {
		this.mostrar.push(nodo);
		
	}

	presentar() {
		let monito = document.getElementById('monitor');
		monito.innerHTML = this.mostrar.join('');
		this.mostrar.pop();
	}
}