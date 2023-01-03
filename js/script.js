let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let mood= "create";
let tmp;
let searchData="searchTitle"

function getTotal() {
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.backgroundColor = "green"
    }
    else {
        total.innerHTML = "";
        total.style.backgroundColor = "rgb(174, 8, 8)";
    }
}

//Create
let dataPros;
if (localStorage.products != null) {
    dataPros = JSON.parse(localStorage.products)
} else {
    dataPros = []
}
console.log(dataPros.length)

submit.onclick = function () {
    if(title.value!="" && price.value!=""){
        let newPro = {
            title: title.value.toLowerCase(),
            price: price.value,
            taxes: taxes.value,
            ads: ads.value,
            discount: discount.value,
            total: (+price.value + +taxes.value + +ads.value) - +discount.value,
            count: count.value,
            category: category.value.toLowerCase(),
        }
        
        if(mood==="create"){
            if(count.value>1){
                for(i=0;i< +count.value;i++)
                    dataPros.push(newPro)
            }else{
                dataPros.push(newPro);
            }
            
            
        }
        else{ 
            dataPros[tmp]=newPro;
            mood="create";
            submit.innerHTML="Create"
            count.style.display="block"
        }

    }
    localStorage.setItem("products", JSON.stringify(dataPros))
    clearData();
    ReadData();
}


//Clear Data Function
function clearData() {
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    count.value = "";
    category.value = "";
    total.innerHTML = "";
    total.style.backgroundColor = "rgb(174, 8, 8)";
}

//ReadData
function ReadData(){
    let table=""
    for(i=0;i<dataPros.length;i++){
        table+=`
        <tr>
                        <td>${i+1}</td>
                        <td>${dataPros[i].title}</td>
                        <td>${dataPros[i].price}</td>
                        <td>${dataPros[i].taxes}</td>
                        <td>${dataPros[i].ads}</td>
                        <td>${dataPros[i].discount}</td>
                        <td>${dataPros[i].total}</td>
                        <td>${dataPros[i].category}</td>
                        <td><button onclick="updateItem(${i})" id="update">Update</button></td>
                        <td><button onclick="deleteItem(${i})" id="delete">Delete</button></td>
                    </tr>
        `
    }
    document.getElementById("content").innerHTML=table;
    if(dataPros.length>0){
        document.getElementById("deleteAll").innerHTML=`<button onclick='deleteAll()' >Delete All(${dataPros.length})</button>`
    }else{
        document.getElementById("deleteAll").innerHTML=""
    }
} 
ReadData();

//Delete item
function deleteItem(i){
    dataPros.splice(i,1)
    localStorage.products=JSON.stringify(dataPros);
    ReadData();
}


//Delete All items
function deleteAll(){
    localStorage.clear();
    dataPros.splice(0)
    ReadData()
}

// Update Item
function updateItem(i){
    console.log("asd")
    tmp=i
    title.value=dataPros[i].title
    price.value=dataPros[i].price
    taxes.value=dataPros[i].taxes
    ads.value=dataPros[i].ads
    discount.value=dataPros[i].discount
    category.value=dataPros[i].category
    count.style.display="none"
    scroll({
        top:0,
        behavior:"smooth"
    })
    submit.innerHTML="Update"
    mood="update"
    getTotal()
}

// Search Data 
function searchFunction(id){
    search = document.getElementById("search");
    if(id=="searchCategory"){
        searchData="searchCategory";
        search.placeholder="Search by Category"
    }
    else{
        searchData="searchTitle"
        search.placeholder="Search by Title"
    }
    search.focus();
    search.value=""
    ReadData();
}

function searchItem(value){
    let table=""
    for(i=0;i<dataPros.length;i++){
        if(searchData=="searchTitle" && dataPros[i].title.toLowerCase().includes(value.toLowerCase())){
            table+=`
        <tr>
                        <td>${i}</td>
                        <td>${dataPros[i].title}</td>
                        <td>${dataPros[i].price}</td>
                        <td>${dataPros[i].taxes}</td>
                        <td>${dataPros[i].ads}</td>
                        <td>${dataPros[i].discount}</td>
                        <td>${dataPros[i].total}</td>
                        <td>${dataPros[i].category}</td>
                        <td><button onclick="updateItem(${i})" id="update">Update</button></td>
                        <td><button onclick="deleteItem(${i})" id="delete">Delete</button></td>
                    </tr>
        `
        }
        if(searchData=="searchCategory" && dataPros[i].category.includes(value.toLowerCase())){
            table+=`
        <tr>
                        <td>${i}</td>
                        <td>${dataPros[i].title}</td>
                        <td>${dataPros[i].price}</td>
                        <td>${dataPros[i].taxes}</td>
                        <td>${dataPros[i].ads}</td>
                        <td>${dataPros[i].discount}</td>
                        <td>${dataPros[i].total}</td>
                        <td>${dataPros[i].category}</td>
                        <td><button onclick="updateItem(${i})" id="update">Update</button></td>
                        <td><button onclick="deleteItem(${i})" id="delete">Delete</button></td>
                    </tr>
        `
        }
    }
    document.getElementById("content").innerHTML=table;
}

