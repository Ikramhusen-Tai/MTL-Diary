

var carts = document.querySelectorAll('.add-cart');

let products = [
    {
        tag: "Mount-Royal Sunrise",
        price: 3,
        inCart: 0
    },
   
    {
        tag: "Christ Church Cathedral",
        price: 5,
        inCart: 0
    },
    {
        tag: "Giant Wheel",
        price: 7,
        inCart: 0
    },
    {
        tag: "Biosphere, Environment Museum",
        price: 4,          
        inCart: 0
    },
    {
        tag: "Old Port",
        price: 6,
        inCart: 0
    },
    {
        tag: "Gare Pine Beach",
        price: 8,
        inCart: 0
    },
    {
        tag: "Church of Saint-Pierre",
        price: 3,
        inCart: 0
    },
    {
        tag: "Centre Canadian d'Architecture",
        price: 5,
        inCart: 0
    },
    {
        tag: "Colege Du Montreal",
        price: 7,
        inCart: 0
    },
];




/*
var searchButton = document.querySelector('#searchButton');
console.log(searchButton);

var key = document.querySelector('#key');
console.log(key);

var product = document.getElementsByClassName("Itag");
console.log(product);

searchButton.addEventListener('click' , ()=> {
    event.preventDefault();
    for(var i = 0; i<products.length; i++){
        var foundProduct = Object.values(products)[i].tag.toUpperCase();
        if(key.value.toUpperCase() == foundProduct) {
              product[i].scrollIntoView();
              //setInterval(function(){   alert("Hello");   }, 3000);
                   product[i].style.backgroundColor = 'green';    //product[i].style.backgroundColor = 'green';  //.style.border = "1px solid green";  border-color: coral;
              }else{
                console.log("product not found");
            }
    }
})

var clear = document.getElementById('clear');
clear.addEventListener('click', ()=> {
    event.preventDefault();
        key.value='';
        for(i = 0; i< products.length; i++){
            product[i].style.backgroundColor='white';
        }
}
 )
*/
var myCart = document.querySelector("#myCart");





for (let i=0; i < carts.length; i++) {
   carts[i].addEventListener('click', () => {
    event.preventDefault();
    cartsNumbers(products[i]);
    totalCost(products[i]);
   })
}

   

function onLoadCartNumbers(){

    let productNumbers = localStorage.getItem('cartNumbers');

    if(productNumbers){
        document.querySelector('#myCart span').textContent = productNumbers;
    }
   
}

function cartsNumbers(product){
    

    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);
    
    if(productNumbers){
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('#myCart span').textContent= productNumbers+1;
    }else{
        localStorage.setItem('cartNumbers',1);
        document.querySelector('#myCart span').textContent = 1;
    }
    
   setItems(product);
}

function setItems(product){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    if(cartItems != null) {

        if(cartItems[product.tag] == undefined){
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }

        cartItems[product.tag].inCart += 1;
    } else{
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product){
    let cartCost = localStorage.getItem('totalCost');
   
    if(cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price)
    }else{
        localStorage.setItem("totalCost", product.price);
    }
 }   


function displayCart(){
    let cartCost = localStorage.getItem('totalCost');
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".product-container");
    
    
    if(cartItems && productContainer) {
        
      var product = document.querySelector(".products");
      product.innerHTML='';
        Object.values(cartItems).map(item =>{
            product.innerHTML +=`
            <div class="row">
            <div class="product-title">
            <button class="remove"> X </button>
            <span>${item.tag}</span>
            </div>
            <div class="price">${item.price}</div>
            <div class="quantity">
           
            <button class="quantityB Increase"> + </button>
            <span class="inCart">${item.inCart}</span>
            <button class="quantityB Dicrease"> - </button>
            </div>
            <div class="total">
            $<p class='Total'>${item.inCart * item.price}</p>,00<span>
            </div>
            </div>
            `;    
        });
        product.innerHTML += `
        </br>
        </br>
        <h3 class="product-title">
        Basket Total
        <h4>
        <h5 class="price"></h5>
        <h5 class="quantity"></h5>
        <h3 class="total fTotal"> $${cartCost},00
        </h4>
        `;
        console.log()
    }
   
}

displayCart();
onLoadCartNumbers();






/*-------------------Delete item from cart---------------*/
let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
var removebutton = document.querySelectorAll(".remove");


    for (let i=0; i < removebutton.length; i++) {
        removebutton[i].addEventListener('click', () => {      
            /*
            
            var removeIndex = Object.values(cartItems)[i]; 
            delete removeIndex.inCart;
            localStorage.setItem("productsInCart", JSON.stringify(cartItems));
            var price = removeIndex.price;
            delete removeIndex.price;
           
            delete removeIndex.tag;
            var updatePrice = document.querySelectorAll('.Total')[i];
            console.log(updatePrice);
            updatePrice.parentElement.removeChild(updatePrice);
            */
            
            
           
            
           var buttonClicked = event.target;
           buttonClicked.parentElement.parentElement.remove();
           updateFinalTotal();
          /*  
           let cartCost = localStorage.getItem('totalCost');
           cartCost = parseInt(cartCost);
           console.log(typeof(removeIndex.price));
           cartCost = cartCost - price;
           console.log(cartCost);
           updateTotal = document.querySelector('.total');
           updateTotal.innerText = cartCost;
           //
           localStorage.setItem("totalCost", JSON.stringify(cartCost));
           
         // updateFinalTotal();
            })
            */
     })
    }

     function addQuantity(){
    
     var increaseButton = document.querySelectorAll('.Increase');
     console.log(increaseButton);
    for (let i=0; i < increaseButton.length; i++) {
        increaseButton[i].addEventListener('click', (e) => { 
           
            var addQuantity = Object.values(cartItems)[i];
            var AddQuantity = parseInt(e.target.nextElementSibling.innerText);
            //var newQuantityValue = document.querySelectorAll('.inCart');
            var newQuantity = AddQuantity+=1;
            e.target.nextElementSibling.innerText = newQuantity;
            //newQuantityValue[i].innerText = newQuantity;
            var newPrice = addQuantity.price*newQuantity;
           e.target.parentElement.nextElementSibling.childNodes[1].innerText=newPrice;
            
            //var updatePrice = document.querySelectorAll('.Total');
            //updatePrice[i].textContent=newPrice;
           
            console.log(AddQuantity);
            updateFinalTotal();
        })
    }  

} addQuantity();




function subQuantity(){
    var DicreaseButton = document.querySelectorAll('.Dicrease');
    
   for (let i=0; i < DicreaseButton.length; i++) {
    DicreaseButton[i].addEventListener('click', (e) => { 
           var subQuantity = Object.values(cartItems)[i];
           var AddQuantity = parseInt(e.target.previousElementSibling.innerText);
           //var newQuantityValue = document.querySelectorAll('.inCart');
           var newQuantity = AddQuantity-=1;
           if(newQuantity<1){
               newQuantity=1;
           }
           e.target.previousElementSibling.innerText = newQuantity;
           //newQuantityValue[i].innerText = newQuantity;
           var newPrice = subQuantity.price*newQuantity;
            console.log(typeof newPrice);
         e.target.parentElement.nextElementSibling.childNodes[1].innerText=newPrice;
            
           updateFinalTotal();
       })
    }
      /* 
           }*/
    

} subQuantity();

   function updateFinalTotal(){
   var priceCollumn = document.querySelectorAll('.Total');
   var total = 0;
       for (let i = 0; i < priceCollumn.length; i++) {
       //console.log(Object.values(priceCollumn)[i].innerText);
       var priceC = [];
         priceC[i] = Object.values(priceCollumn)[i].innerText; // console.log(typeof(priceC.values));  
        priceC[i] = parseFloat(priceC[i]);
        //priceC[i].innerText.replace('$','');
        console.log(priceC[i]);
        total = parseFloat(total);
        total = total + priceC[i];
        console.log(total);
        
    } 
    updateTotal = document.getElementsByClassName('fTotal')[0];
        console.log(updateTotal);
        updateTotal.innerText = '$'+total+'.00';
}   
//updateFinalTotal();
        
// Getting sum of numbers.
//var sum = priceC. reduce(function(a, b){
//return a + b;
//}, 0);
//console.log(sum);
/*
var productTitle = [];
productTitle = document.querySelectorAll(".product-title");
console.log(productTitle);

var removebutton = [];
removebutton = document.querySelector(".remove");
console.log(removebutton.parentNode);

var row = document.querySelectorAll(".row");
console.log(row);

for (let i=0; i < removebutton.length; i++) {
    removebutton.length[i].addEventListener('click', () => {
        row.splice(i, 1)
    })
 }
*/


/*--------------------------Validation------------------------*/ 
//alert("Working...");
// var inputs = document.querySelectorAll("input");
// console.log(inputs);

document.addEventListener("DOMContentLoaded",function(){
    
    //all form regular expression

var inputvalidate=document.querySelectorAll("input");
console.log(inputvalidate);

var patternvalidate={
    firstname:/^[a-z\s]{5,20}$/is,
    email:/^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/is,
    address:/^[\d\w.\s,-]{10,100}$/i,
    city:/^[a-z]{5,12}$/is,
    state:/^[A-Z]{2}$/s,
    zip:/^[a-z0-9\s]{7}$/is,
    cardnumber:/^[\d-]{19}$/s,
    telephone:/^[\d-]{12}$/s,
    expyear:/^[\d/]{5}$/s,
    cvv:/^[\d]{3}$/s,
    }
    
    function validate(field, regex)
    {
      if(regex.test(field.value)){
        field.className = "valid";
      }else{
        field.className = "invalid";
      }
    }
    
    inputvalidate.forEach(function(inputverify){
      inputverify.addEventListener("keyup",(e)=>{
        validate(e.target,patternvalidate[e.target.attributes.name.value])
      })
      
    })       


})


var checkout = document.querySelector("#checkOut");
console.log(checkout);

checkout.addEventListener('click', ()=>{
    event.preventDefault();
     console.log('iam working')
     
    {
    if(document.getElementById("fname").value == "")
    {
        alert("Please enter Missing Details");
    }
    else if(document.getElementById("email").value == "")
    {
        alert("Please enter Missing Details");
    }
    else if(document.getElementById("adr").value == "")
    {
        alert("Please enter Missing Details");
    }
    else if(document.getElementById("city").value == "")
    {
        alert("Please enter Missing Details");
    }
    else if(document.getElementById("state").value == "")
    {
        alert("Please enter Missing Details");
    }
    else if(document.getElementById("zip").value == "")
    {
        alert("Please enter Missing Details");
    }
    else if(document.getElementById("cname").value == "")
    {
        alert("Please enter Missing Details");
    }
    else if(document.getElementById("ccnum").value == "")
    {
        alert("Please enter Missing Details");
    }
    else if(document.getElementById("expyear").value == "")
    {
        alert("Please enter Missing Details");
    }
    else if(document.getElementById("cvv").value == "")
    {
        alert("Please enter Missing Details");
    }
    else
    {
        alert('Thank you for your purchase');
        var cartItems = document.querySelector(".product-container");
        
        
            console.log(cartItems);
            cartItems.parentElement.removeChild(cartItems)
            localStorage.clear();
            document.querySelector('#myCart span').textContent = 0;
            window.open("index.html");
    }
     }

    
})

function checkOut(){
       
}

 

/*
var r = confirm("Press a button!");
if (r == true) {
  
} else {
  
}*/


/*
// Get the modal
var modal = document.getElementById("myModal");
console.log(modal);
// Get the image and insert it inside the modal - use its "alt" text as a caption
var img = document.getElementsByClassName("myImg");
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");



for (var i = 0; i < 9; i++) {

img[i].addEventListener('click',  (e)=>{
     
modal.style.display = "block";
modalImg.src = e.target.src;

captionText.innerText = e.target.nextElementSibling.innerText;
   })
}
   
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() { 
 modal.style.display = "none";
}
 */

 /*
var searchButton = document.querySelector('#searchButton');
console.log(searchButton);

var key = document.querySelector('#key');
console.log(key);

var product = document.getElementsByClassName("Itag");
console.log(product);

searchButton.addEventListener('click' , ()=> {
    event.preventDefault();
    for(var i = 0; i<products.length; i++){
        var foundProduct = Object.values(products)[i].tag.toUpperCase();
        if(key.value.toUpperCase() == foundProduct) {
              product[i].scrollIntoView();
              //setInterval(function(){   alert("Hello");   }, 3000);
                   product[i].style.backgroundColor = 'green';    //product[i].style.backgroundColor = 'green';  //.style.border = "1px solid green";  border-color: coral;
              }else{
                console.log("product not found");
            }
    }
})

var clear = document.getElementById('clear');
clear.addEventListener('click', ()=> {
    event.preventDefault();
        key.value='';
        for(i = 0; i< products.length; i++){
            product[i].style.backgroundColor='white';
        }
}
 )
*/
