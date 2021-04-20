

var carts = document.querySelectorAll('.add-cart');

let products = [
    {
        tag: "Old Port Street",
        price: 5,
        inCart: 0
    },
   
    {
        tag: "Rue Du Fort",
        price: 7,
        inCart: 0
    },
    {
        tag: "Cresent",
        price: 9,
        inCart: 0
    },
    {
        tag: "Luise",
        price: 4,          
        inCart: 0
    },
    {
        tag: "Saint Catherin",
        price: 6,
        inCart: 0
    },
    {
        tag: "Rue de Luise",
        price: 8,
        inCart: 0
    },
    {
        tag: "Old Streets",
        price: 5,
        inCart: 0
    },
    {
        tag: "Rue Saint Marc",
        price: 7,
        inCart: 0
    },
    {
        tag: "Rue de juliet",
        price: 9,
        inCart: 0
    },
];

 
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

var myCart = document.querySelector("#myCart");
console.log(myCart);


for (let i=0; i < carts.length; i++) {
   carts[i].addEventListener('click', () => {
    event.preventDefault();
    myCart.style.opacity = '1';
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
            <img scr="./media/lake.jpg">
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
            var price = removeIndex.price;
            delete removeIndex.price;
            delete removeIndex.inCart;
            delete removeIndex.tag;

            if(removeIndex.tag == null){
                console.log("i am deleted");
            }
            
            console.log(removeIndex);
            
            localStorage.setItem("productsInCart", JSON.stringify(cartItems));
            */
           var buttonClicked = event.target;
           buttonClicked.parentElement.parentElement.remove();
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
           */
          updateFinalTotal();
            })
            
     }


     function addQuantity(){
    
     var increaseButton = document.querySelectorAll('.Increase');
     console.log(increaseButton);
    for (let i=0; i < increaseButton.length; i++) {
        increaseButton[i].addEventListener('click', () => { 
            var addQuantity = Object.values(cartItems)[i];
            var newQuantityValue = document.querySelectorAll('.inCart');
            var newQuantity = addQuantity.inCart+=1;
            newQuantityValue[i].innerText = newQuantity;
            var newPrice = addQuantity.price*newQuantity;
            var updatePrice = document.querySelectorAll('.Total');
            updatePrice[i].textContent=newPrice;

            updateFinalTotal();
        })
    }  

} addQuantity();




function subQuantity(){
    var DicreaseButton = document.querySelectorAll('.Dicrease');
    
   for (let i=0; i < DicreaseButton.length; i++) {
    DicreaseButton[i].addEventListener('click', () => { 
           var subQuantity = Object.values(cartItems)[i];
           
           var newQuantityValue = document.querySelectorAll('.inCart');
           var newQuantity = subQuantity.inCart-=1;
           newQuantityValue[i].innerText = newQuantity;
           var newPrice = subQuantity.price*newQuantity;
           var updatePrice = document.querySelectorAll('.Total');
           updatePrice[i].innerText=newPrice;
           updateFinalTotal();
       })
    }
    

} subQuantity();

   function updateFinalTotal(){
   var priceCollumn = document.querySelector('.Total');
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
    updateTotal = document.querySelector('.fTotal');
        console.log(updateTotal);
        updateTotal.innerText = '$'+total+'.00';
}   

        


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

