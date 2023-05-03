function generiereZahlen() {
	var anzahl = document.getElementById("anzahl").value;
	var folge = document.getElementById("folgen").value;
	var zahlen = [];
	
	if (folge == "1") {
		// Fn=n*n;F1=1
		for (var i = 1; i <= anzahl; i++) {
			var zahl = i * i;
			zahlen.push(zahl);
		}
	} else if (folge == "2") {
		// Fn=Fn-1+Fn-2;F1=F2=1
		var f1 = 1;
		var f2 = 1;
		zahlen.push(f1);
		zahlen.push(f2);
		
		for (var i = 3; i <= anzahl; i++) {
			var fn = f1 + f2;
			zahlen.push(fn);
			f1 = f2;
			f2 = fn;
		}
	} else if (folge == "3") {
		// Fn=n-te Primzahl;F1=2
		var zahl = 2;
		while (zahlen.length < anzahl) {
			if (istPrimzahl(zahl)) {
				zahlen.push(zahl);
			}
			zahl++;
		}
	}

	else if (folge == "4") {
		// Fn=Fn-1*2;F1=1
		var f1 = 1;
		zahlen.push(f1);
		
		for (var i = 1; i <= anzahl; i++) {
			var fn = f1 * 2;
			zahlen.push(fn);
			f1 = fn;
		}
	}
	
	// Ausgabe der generierten Zahlen in HTML
	var ergebnis = document.getElementById("ergebnis");
	ergebnis.innerHTML = "";
	for (var i = 0; i < zahlen.length; i++) {
		ergebnis.innerHTML += zahlen[i] + "<br>";
	}
}

function istPrimzahl(zahl) {
	if (zahl < 2) {
		return false;
	}
	
	for (var i = 2; i <= Math.sqrt(zahl); i++) {
		if (zahl % i == 0) {
			return false;
		}
	}
	
	return true;
}
