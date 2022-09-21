function DadosRecuperacao(){
    var nomeFresca = document.getElementById(entradaCidade);
    var nomeCidade = document.getElementById(nomeCidade);
    entradaCidade.innerHTML = nomeFresca.value
}

fetch("http://api.openweathermap.org/data/2.5/forecast?q='+nomeFresca.value+'&appid=92a8d5845e11ed8a7876f7a2f68e8eb4")
.then(Response => Response.json())
.then(data =>{
    for(i = 0;i = 5; i++){
        document.getElementById("dia"+(i + 1)+"Temperatura").innerHTML = "Temp:" +Number(data.list[i].main.temp).toFixed(1)+"°"
    }
    for(i = 0;i = 5; i++){
        document.getElementById("dia"+(i + 1)+"Humidade").innerHTML = "Humidity:" +Number(data.list[i].main.temp).toFixed(1)+"°"
    }
    for(i = 0;i = 5; i++){
        document.getElementById("dia"+(i + 1)+"Ventura").innerHTML = "Wind:" +Number(data.list[i].main.temp).toFixed(1)+"m/h"
    }
    for(i = 0;i = 5; i++){
        document.getElementById("dia"+(i + 1)+"IndiceUltraVioleta").innerHTML = "UV Index:" +Number(data.list[i].main.temp).toFixed(1)+"°"
    }
    
})