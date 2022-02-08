//Selectors
    //inputs
    const carName = document.getElementById("car-name");
    const carDescription = document.getElementById("car-description");

    //forms
    const chooseCarForm = document.getElementById("choose-car-form");
    const addCarForm = document.getElementById("add-car-form");
    const notAvailable = document.getElementById("not-available");
    const contentHome = document.getElementById("content-home");
    const contentRefuel = document.getElementById("content-refuel");

//GET Storage
var storage;
if (localStorage.getItem("storage")===null){
    storage =
    {
    "cars":[],
    "gasStations":[]
    };
}else{
    storage = JSON.parse(localStorage.getItem("storage"));
}

//Functions
function showChooseCarForm(){
    let title = document.getElementById("choose-car-title");
    
    for(let i = 0;i<storage.cars.length;i++){
        if(isChildrenExists(chooseCarForm,storage.cars[i].name)===false){
            let carDiv = document.createElement("div");
            carDiv.className ="choose-car-btns";
            carDiv.innerHTML = `<span  onclick="chooseCarBtnClicked(this)">${storage.cars[i].name}</span><span class="choose-car-btns delete-btns" onclick="deleteCarFromStorage(this)">X</span>`;
            chooseCarForm.appendChild(carDiv);
            title.after(carDiv);
            // console.log(storage.cars[i].name);
        }
    }
    chooseCarForm.style.display='flex'; 
    addCarForm.style.display='none';
}

function deleteCarFromStorage(caller){
    for(let i = 0;i<storage.cars.length;i++){
        if(storage.cars[i].name + "X" === caller.parentElement.innerText){
            storage.cars.splice(i,1);
            localStorage.setItem("storage",JSON.stringify(storage));
        }
    }
    console.log(caller.parentElement.innerText);
    caller.parentElement.remove();
    showChooseCarForm();
}

function chooseCarBtnClicked(elm){
    let chooseCarBtn = document.getElementById("btn-login");
    chooseCarBtn.innerHTML = `${elm.innerText} <i class="fas fa-car"></i>`;
    chooseCarForm.style.display = "none";
}

function addCarBtnClicked(){
    storage.cars.push(createCarObj(carName.value,carDescription.value));
    carName.value = "";
    carDescription.value = "";
    localStorage.setItem("storage",JSON.stringify(storage));
    showChooseCarForm();
    chooseCarForm.style.display = "flex";
    addCarForm.style.display = "none";
}

function navBtnClicked(i){
    let loginStatus = document.getElementById("btn-login").innerText;
    showChooseCarForm();
    if(loginStatus !=="CHOOSE YOUR CAR"){
        switch(i.id){
            case "btn-home" :
                contentHome.style.display = "static";
                chooseCarForm.style.display = "none";
            break;
            case "btn-history" :
                notAvailable.style.display = "flex";
                chooseCarForm.style.display = "none";
            break;
            case "btn-reports" :
                notAvailable.style.display = "flex";
                chooseCarForm.style.display = "none";
            break;
            case "btn-reminders" :
                notAvailable.style.display = "flex";
                chooseCarForm.style.display = "none";
            break;
            case "btn-refueling" :
                console.log(contentRefuel);
                contentRefuel.style.display = "flex";
                contentHome.style.display = "none";
                chooseCarForm.style.display = "none";
            break;
            case "btn-about-us" :
                notAvailable.style.display = "flex";
                chooseCarForm.style.display = "none";
            break;
            default :
            console.log(`Clicked button: ${i.id}`);
        }
    }else{
        chooseCarForm.style.display = "flex";
    }
}

function createCarObj(carName,carDescription){
    return {
            "name":carName,
            "description":carDescription,
            "history":[]
        };
}
function createRefuelingObj(odo,station,price,liters){
    console.log("objCreated");
    return {
            "odometer":odo,
            "station":station,
            "price":price,
            "liters":liters
        };
}

function addRefueling(){
    let car = document.getElementById("btn-login").innerText
    for (let i = 0; i < storage.cars.length; i++) {
        const element = storage.cars[i].name;
        if (element === car) {
            console.log(document.getElementById("odometer").value);
            storage.cars[i].history.push(createRefuelingObj(
                document.getElementById("odometer").value,
                document.getElementById("station").value,
                document.getElementById("price").value,
                document.getElementById("quantity").value
                ));
            localStorage.setItem("storage",JSON.stringify(storage));
            document.getElementById("odometer").value = "";
            document.getElementById("station").value = "";
            document.getElementById("price").value = "";
            document.getElementById("quantity").value = "";
            document.getElementById("cost").value = "";
        }
    }
}


function isChildrenExists(parent,str){
    let children = parent.children;
    for(var i=0; i<children.length; i++){
        var child = children[i];
        if(child.innerText == str+"X"){
            return true;
        }
    }
    return false;
}
