const inputBinary = document.getElementById("input-Binary");
var outputDecimal = document.getElementById("output-decimal");

function inputBinaryFormater(value){
    value = value.replace(/[^0-1]/g,() => {
        alert("Digite 0 ou  1");
        return "";
    });
    
    inputBinary.value = value;
}

function converter(){    
    outputDecimal.innerHTML = ""
    var str = inputBinary.value;
    str = str.split("").reverse().join("");

    var decimalValue = 0;
    for (var i = 0; i < str.length; i++) {
        if(JSON.stringify(str[i]) === JSON.stringify('1')){
            decimalValue += Math.pow((1 * 2), i);
        }
    }

    outputDecimal.innerHTML += decimalValue;
}