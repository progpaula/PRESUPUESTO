var dataAllLocalStorage = localStorage.getItem("localKey") == null ? [] : JSON.parse(localStorage.getItem("localKey"));
var sumaEgresos = 0;
var sumaIngreso = 0;
const initialValue = 0;
const nodeBalance = document.getElementById("porcentajeBalance");
const nodeFatherBalance = document.querySelector(".textBalance");

const colorBalance = (porcentaje) => {
    document.getElementById("jh").style.color = "black";
    nodeBalance.style.color = "black";

    if (porcentaje > 50){

        nodeFatherBalance.style.backgroundColor = "#1dc41d";
    }
    else if (porcentaje > 10 && porcentaje <= 50){

        nodeFatherBalance.style.backgroundColor = "yellow";
    }
    else if (porcentaje >= 0 && porcentaje <= 10 ){

        nodeFatherBalance.style.backgroundColor = "red";
    }
    else if (porcentaje < 0){

        nodeFatherBalance.style.backgroundColor = "black";
        document.getElementById("jh").style.color = "white";
        nodeBalance.style.color = "white";
    }
}

const writeBalanceWindows = () =>{

    if (dataAllLocalStorage.length == 0){

        nodeBalance.innerHTML = "Ningun Dato Registrado";
        nodeFatherBalance.style.backgroundColor = "gray";
    }else{
        
        dataAllLocalStorage.forEach((e) => {

           if(e.kind == "ingreso"){

                sumaIngreso = sumaIngreso + parseInt(e.dinero);
           }else{

                sumaEgresos = sumaEgresos + parseInt(e.dinero);
           }
        });

        let resta = sumaIngreso - sumaEgresos;

        let operacionBalance = (resta * 100) / sumaIngreso;
        nodeBalance.innerHTML = Math.round(operacionBalance) + "%";

        colorBalance(Math.round(operacionBalance))
    }
}

writeBalanceWindows()

const kindSuccess = (kind) => {

    if (kind == "ingreso"){

        return "color: green"
    }else{

        return "color: red"
    }
}

const quit = (i) => {

    dataAllLocalStorage.splice(i, 1);
    localStorage.setItem("localKey", JSON.stringify(dataAllLocalStorage));  
    loadChild();
    location.reload();
}

const loadChild = () => {

    let father = document.getElementById("fatherChildren");
    father.innerHTML = "";
    
    dataAllLocalStorage.forEach((e, i) => {
        
        let newChild = document.createElement("div");
        newChild.id = i;
        newChild.classList.add("children");

        if(kindSuccess(e.kind) == "color: green"){

            newChild.style.border = "1px solid green"
        }else{

            newChild.style.border = "1px solid red"
        }

        newChild.innerHTML = `
        <div class="quit" onclick="quit(${i});"><img src="cancelar.png"></div>
        <center><h4 style="${kindSuccess(e.kind)}" >${e.kind}</h4></center>
        <br>
        <h3>Dinero: <span> $${e.dinero}</span></h3>
        <h3>Fecha: <span> ${e.fecha}</span></h3>
        <center><br>
        <div>
            <p>DESCRIPCION: ${e.descripcion}</p>
        </div>
        </center>
        `

        father.appendChild(newChild)
    });
}

//LOAD FIRST
loadChild();

const form = document.getElementById("form");
form.addEventListener("submit", (e) => {

    e.preventDefault();

    //Agregar datos al Local Storage
    var dataFormOne = {

        "kind": document.getElementById("kind").value,
        "dinero": document.getElementById("dinero").value,
        "fecha": document.getElementById("fecha").value,
        "comprobante": document.getElementById("file").value,
        "descripcion": document.getElementById("descripcion").value
    };

    dataAllLocalStorage.push(dataFormOne);
    localStorage.setItem("localKey", JSON.stringify(dataAllLocalStorage));

    document.getElementById("kind").value = "";
    document.getElementById("dinero").value = "";
    document.getElementById("fecha").value = "";
    document.getElementById("file").value = "";
    document.getElementById("descripcion").value = "";   
    
    loadChild()
    writeBalanceWindows()
    location.reload();
});
