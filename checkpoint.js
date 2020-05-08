// ----- IMPORTANTE -----

// IMPORTANTE!: Para este checkpoint se les brindarán las implementaciones ya realizadas en las
// homeworks de Queue, LinkedLis y BinarySearchTree. Sobre dicha implementación van a tener que agregar nuevos
// métodos o construir determinadas funciones explicados más abajo. Pero todos los métodos ya implementados
// en las homeowrks no es necesario que los vuelvan a definir.

const {
  Queue,
  Node,
  LinkedList,
  BinarySearchTree
} = require('./DS.js');

// ----------------------

// ----- Recursión -----

// EJERCICIO 1
// Implementar la función objContains: debe buscar dentro de un objeto anidado un par {clave: valor}
// especifico. Tanto el objeto como el nombre de la propiedad y su valor serán recibidos por parámetro.
// En el caso de que encuentre el valor indicado en cualquier nivel del objeto debe devolver true,
// de lo contrario, devolver false.
// Aclaraciones:
//   - Un objeto anidado es un objeto que dentro tiene uno o más objetos.
//     Ej:
//        const user = {
//            id: 6,
//            email: 'homero@maxpower.com',
//            infoPersonal: {
//                nombre: 'Homero Simpson',
//                direccion: {
//                    calle: 'Avenida Siempreviva',
//                    numero: 742,
//                    barrio: 'Springfield',
//                    estado: 'Massachusetts'
//                }
//            }
//        }
//   - Caso que devuelve true  --> objContains(user, "barrio", "Springfield");
//   - Caso que devuelve false --> objContains(user, "empleo", "Empleado en planta nuclear");
// Pista: utilizar typeof para determinar si el valor de una propiedad es un objeto para aplicar
// allí la recursión

var objContains = function(obj, prop, value){
	for (var clave in obj) {
		if (typeof obj[clave] === "object"){
			return objContains(obj[clave], prop, value);
		}
		else if(clave === prop && obj[clave] === value) {
			return true;
		}
		else{}
	}
	return false;
}


// EJERCICIO 2
// Implementar la función countArray: a partir de un array en el cual cada posición puede ser un único
// número u otro array anidado de números, determinar la suma de todos los números contenidos en el array.
// El array será recibido por parámetro.
// Ejemplo:
//    const array = [1, [2, [3,4]], [5,6], 7];
//    countArray(array); --> Debería devolver 28 (1 + 2 + 3 + 4 + 5 + 6 + 7)
// Pista: utilizar el método Array.isArray() para determinar si algun elemento de array es un array anidado
// [Para más información del método: https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Array/isArray]

var countArray = function(array){
	var suma = 0;
	
	if (!array.length) {
		return 0;
	}
	
  for (let i = 0; i < array.length; i++){
		if(!Array.isArray(array[i])){
			suma = suma + array[i];
		}
		else {
			suma = suma + countArray(array[i]);
		}
	}
	return suma;
}

// ---------------------

// ----- LinkedList -----

// EJERCICIO 3
// Implementar el método size dentro del prototype de LinkedList que deberá retornar el tamaño actual de
// la LinkedList. En el caso de que la lista se encuentre vacía deberá retornar cero.
// Ejemplo:
//    var lista = new LinkedList();
//    lista.size(); --> 0
//    lista.add(1);
//    lista.size(); --> 1
//    lista.add(2);
//    lista.add(3);
//    lista.size(); --> 3

LinkedList.prototype.size = function(){
	if (this.head === null) {
		return 0;
	}
	else {
		var array_size = 1;
		var puntero = this.head;
    while (puntero.next !== null) {
			array_size++;
      puntero = puntero.next;
    }
		return array_size;
	}
}


// EJERCICIO 4
// Implementar el método addInPos dentro del prototype de LinkedList que deberá agregar un elemento en
// la posición indicada. Ambos datos serán brindados como parámetro (pos, value). Donde "pos" será la
// posición en la cual se deberá agregar el valor "value". En el caso de que la posición en la que se
// quiera hacer la inserción no sea válida (Supere el tamaño de la lista actual) debe devolver false.
// Si el nodo fue agregado correctamente devolver true.
// Aclaración: la posición cero corresponde al head de la LinkedList
// Ejemplo 1:
//    Suponiendo que la lista actual es: Head --> [1] --> [2] --> [4]
//    lista.addInPos(2, 3);
//    Ahora la lista quedaría: Head --> [1] --> [2] --> [3] --> [4]
// Ejemplo 2:
//    Suponiendo que la lista está vacía: Head --> null
//    lista.addInPos(2, 3); --> Debería devolver false ya que no es posible agregar en la posición 2
//    sin antes tener cargada la posición 0 y 1.

LinkedList.prototype.addInPos = function(pos, value){
	var array_size = this.size();
  if (pos > array_size){
		return false;
	}
	else {
		
		if (pos === array_size){
			this.add(value);
			return true;
		}
		
		if (pos < array_size){
			this.add("x");
			var puntero = this.head;
			
			var i = pos;
			while (i !== 0) {
				puntero = puntero.next;
				i--;
			}
			
			var valorEnCache = "x";
			
			while(puntero.next !== null){
				valorEnCache = puntero.value;
				puntero.value = value;
				puntero = puntero.next;
				puntero.value = valorEnCache;
			}
			
			return true;
		}
	}
}

// EJERCICIO 5
// Implementar el método reverse dentro del prototype de LinkedList que invierta el orden de la lista
// original y retorne una nueva lista con dichos elementos invertidos de posición.
// Ejemplo:
//    Lista original: Head --> 1 --> 4 --> 10 --> 13 --> null
//    Lista nueva luego de aplicar el reverse: Head --> 13 --> 10 --> 4 --> 1 --> null

LinkedList.prototype.reverse = function(){
	var puntero = this.head;
	var listaDeValores = [];
	while (puntero.next !== null) {
		listaDeValores.push(puntero.value);
    puntero = puntero.next;
  }
	listaDeValores.push(puntero.value);
	
	//puntero = this.head;
	//var i = listaDeValores.length - 1;
	//while (puntero.next !== null) {
	//	puntero.value = listaDeValores[i];
	//	puntero = puntero.next;
	//	i--;
	//}
	//puntero.value = listaDeValores[i];
	
	var listaInvertida = new LinkedList();
	for (let i = 0; i < listaDeValores.length; i++){
		listaInvertida.add(listaDeValores[listaDeValores.length - 1 - i]);
	}
	
	return listaInvertida;
}


// ----------------------


// ----- QUEUE -----

// EJERCICIO 6
// Implementar la función cardGame: a partir de dos Queue que va a recibir como paráemtros tiene
// que determinar quién será el ganador del juego de cartas. Las reglas de dicho juego son las siguientes:
//    - Cada jugador tendrá un mazo con cartas numeradas del 1 al 12
//    - Estos mazos estarán implementados a partir de la estructura de Queue utilizada en el homework
//    - En cada turno del juego, cada jugador lanzará la carta que se encuentre primero en su mazo (Queue)
//    - El jugador que tenga el número más alto en el turno ganará dicho turno
//    - El jugador que gane dicho turno se quedará con ambas cartas agregándolas al final del mazo (Primero
//    la suya y luego la de su contrincante)
//    - En el caso de que haya empate ambos pierden las cartas y no se agregan a ningún mazo
//    - El ganador del juego será quien deje a su oponente sin cartas en su mazo
// Aclaración: la función cardGame debe retornar "A wins!" en el caso de que el ganador sea el jugador A o
// "B wins!" en caso contrario. [Puede ocurrir que haya empate, en dicho caso retornat "Game tie!"]
// Ejemplo:
//    - mazoUserA = [4,2,10,11]
//    - mazoUserB = [6,9,10,3]
//    Primer mano:
//     A --> 4  vs  6 <-- B [6 > 4 entones gana la mano B y pone ambas cartas en su mazo, colocando primero la suya]
//    - mazoUserA = [2,10,11]
//    - mazoUserB = [6,9,10,3,6,4]

var cardGame = function(mazoUserA, mazoUserB){
	var cartaA = 0;
	var cartaB = 0;
	while((mazoUserA.size() !== 0) && (mazoUserB.size() !== 0)){
		cartaA = mazoUserA.dequeue();
		cartaB = mazoUserB.dequeue();
		
		if (cartaA > cartaB){
			mazoUserA.enqueue(cartaA);
			mazoUserA.enqueue(cartaB);
		}
		else if (cartaA < cartaB){
			mazoUserB.enqueue(cartaB);
			mazoUserB.enqueue(cartaA);
		}
		else{}
	}

	if((mazoUserA.size() === 0) && (mazoUserB.size() === 0)){
		return "Game tie!";
	}
	else if(mazoUserA.size() === 0){
		return "B wins!";
	}
	else{
		return "A wins!";
	}
}

// ---------------


// ----- BST -----

// EJERCICIO 7
// Implementar la función generateBST para que a partir de un array recibido como parametro
// genere un BinarySearchTree. Devolver dicho arbol generado.
// Ejemplo:
//    - array(16,6,23,2,17,31,14,5);
//    - arbol generado:
//             16
//          /      \
//        6         23
//      /  \       /   \
//     2    14    17    31
//      \
//       5

var generateBST = function(array){
	var tree = new BinarySearchTree(array[0]);
	
	for(let i = 1; i < array.length; i++){
		tree.insert(array[i]);
	}
	
	return tree;
}


// ---------------


// Ejercicio 8
// Dado un arreglo ordenado, encontrar el índice de un elemento específico pasado como parámetro
// utilizando el método conocido como búsqueda binaria. En el caso de que el número buscado no se encuentre
// en el array devolver -1.
// Para mayor información sobre dicho método:
//    - https://www.khanacademy.org/computing/computer-science/algorithms/binary-search/a/binary-search
//    - https://en.wikipedia.org/wiki/Binary_search_algorithm
// Ejemplo:
//    array = [1,2,3,4,5,6,7,8,9,10];
//    binarySearch(array, 2) --> Devolvería 1 ya que array[1] = 2
//    [Donde 2 sería el número sobre el cuál queremos saber su posición en el array]


var binarySearch = function (array, target) {
	var min = 0;
	var max = array.length - 1;
	var average = 0;
	
	var nBusquedas = 0
	while(nBusquedas !== 5){
		average = Math.floor((max - min)/2);
		index = min + average;
		if(array[index] === target){
			return average;
		}
		else if(array[index] < target){
			min = index + 1;
		}
		else {
			max = index - 1;
		}
		nBusquedas++;
	}
	return -1;
	
}

// EJERCICIO 9
// Ordená un arreglo de números usando selection sort. El nuevo arreglo debe ser devuelto.
// Para mayor información sobre dicho método:
//    - https://en.wikipedia.org/wiki/Selection_sort
//    - https://www.khanacademy.org/computing/computer-science/algorithms/sorting-algorithms/a/sorting
// Ejemplo:
//     selectionSort([1, 6, 2, 5, 3, 4]) --> [1, 2, 3, 4, 5, 6]


var selectionSort = function(array) {
	var indice;
	
	acc = 0;
	while(acc < array.length - 1){
		indice = acc;
		for(var i = 1 + acc; i<array.length; i++){
			if(array[indice] > array[i]){
				indice = i;
			}
		}
		var cache = array[acc];
		array[acc] = array[indice];
		array[indice] = cache;
		acc++;
	}
	return array;
}

// ----- Closures -----

// EJERCICIO 10
// Implementar la función closureSum que recibe un parámetro (numFijo) y que debe retornar otra función
// que también debe recibir un parámetro y debe devolver la suma de este últimom parámetro con numFijo.
// Ejemplo 1:
//    var sumaCinco = closureSum(5);
//    sumaCinco(2);  --> Devolverá 7 (Ya que 2 + 5 = 7)
//    sumaCinco(11); --> Devolverá 16 (Ya que 11 + 5 = 16)
// Ejemplo 2:
//    var sumaDiez = closureSum(10);
//    sumaDiez(2);  --> Devolverá 12 (Ya que 2 + 10 = 12)
//    sumaDiez(11); --> Devolverá 21 (Ya que 11 + 10 = 21)

function closureSum(numFijo) {
 
	return function funcion(a){
		return a + numFijo;
	};
	
}

// -------------------


// ----- EXTRA CREDIT -----

// Implementar una función que a partir de un String recibido como parámetro
// genere todos los posibles anagramas de ese String y retorne un arreglo con ellos.
// Extra-Extra credit: Sacar las palabras duplicados del array final.
// Ejemplo:
//    const anagrams = allAnagrams('abc');
//    console.log(anagrams); // [ 'abc', 'acb', 'bac', 'bca', 'cab', 'cba' ]

function nFactorial(n) {
		if ( n === 0 || n === 1 ) return 1;
		else if ( n > 0 && n % Math.round(n) === 0 ) return n * nFactorial(n - 1);
		else return 0;
	}

var allAnagrams = function(string){ // Intento fallido de hacerlo para cualquier cantidad de caracteres. Desastre.
	
	var caracteres = [];
	for(let i = 0; i<string.length; i++){
		caracteres[i] = string[i];
	}
	var cantidadDeCaracteres = caracteres.length;
	
	var cantidadDeAnagramas = nFactorial(cantidadDeCaracteres);
	var anagramas = [];
	for(let i = 0; i<cantidadDeAnagramas; i++){
		anagramas.push("");
	}
	
	var primeros = 0;
	for(let i = 0; i<cantidadDeCaracteres; i++){
		
		for(let j = primeros; j < primeros + 2; j++){
			anagramas[j] = anagramas[j] + caracteres[i];
		}
		primeros = primeros + cantidadDeAnagramas/cantidadDeCaracteres;
	}
	
	var repetido = false;
	var repetidos = [];
	for(let k = 0; k < anagramas.length; k++){
		
		for(let l = 0; l < caracteres.length; l++){
			
			repetido = false;
			
			for(let o = 0; o < anagramas[k].length; o++){
				if(anagramas[k][o] === caracteres[l]){
					repetido = true;
				}
			}
			
			if(!repetido){
				anagramas[k] = anagramas[k] + caracteres[l];
				repetidos.push(caracteres[l]);
			}
		}
	}
	
	console.log(caracteres);
	console.log(anagramas);
};

module.exports = {
  objContains,
  countArray,
  LinkedList,
  Queue,
  cardGame,
  generateBST,
  binarySearch,
  allAnagrams,
  selectionSort,
  closureSum,
}
