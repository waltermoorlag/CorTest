var fs = require('fs');

Array.prototype.esCirculo = function () {
    for (let i = 0; i < this.length - 1; i++) {
        if (this[i].toString().ultimaLetra() !== this[i + 1].toString().primeraLetra()) {
            return false;
        }
    }
    return true;
}

String.prototype.ultimaLetra = function () {
    return this.substring(this.length - 1);
}
String.prototype.primeraLetra = function () {
    return this.substring(0, 1);
}

function escribirTxt(arr) {
    return new Promise(function (resolve, reject) {
        let nameFile = __dirname + '/Result.txt'
        let texto = "";
        for(let i = 0; i < arr.length; i++){
            texto += `Resultado Nro: ${i+1}\n`;
            texto += arr[i].join("\n");
            texto += '\n\n';
        }
        fs.writeFile(nameFile, texto, function (err, result) {
            resolve(true);
        });
    });
}

const permutator = (inputArr) => {
    let result = [];
    const permute = (arr, m = []) => {
        if (arr.length === 0) {
            if(m.esCirculo()){
                result.push(m);
            }
        } else {
            for (let i = 0; i < arr.length; i++) {
                let curr = arr.slice();
                let next = curr.splice(i, 1);
                permute(curr, m.concat(next))
            }
        }
    }
    permute(inputArr);
    return result.length > 0 ? result : false;
}

async function procesarArreglo(arreglo) {
    return new Promise(function (resolve, reject) {
        let data = permutator(arreglo);
        if (!data) {
            resolve("No se pude generar Circulo");
        } else {
            escribirTxt(data).then(function (data) {
                resolve("Circulo creado y grabado");
            });
        }
    });
}


var arregloProceo = ['chair', 'racket', 'touch', 'tunic', 'height'];
procesarArreglo(arregloProceo).then(data => console.log(data));
