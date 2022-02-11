//const searchParams = new URLSearchParams(location.search);//
//const newId = searchParams.get("products");


const searchParams = new URLSearchParams(location.search);
const newId = searchParams.get("id");

console.log(newId)
const url = `http://localhost:3000/api/products/${newId}`;
let datas ; 
fetch(url)
  .then((response) => response.json())
  
  .then((data) => {
    DetailProduits(data);
    datas = data.imageUrl;   // récupére l'image dans le data //
    console.log(data)
  })

  .catch((erreur) => console.log("erreur : " + erreur));

  
function DetailProduits(data) {

  // ajout image du produit et du texte alternatif 
  const item__img = document.getElementsByClassName("item__img");
  item__img[0].innerHTML += `
      <img src="${data.imageUrl}" alt="${data.altTxt}">
      `;
  // ajout nom du produit 
  const title = document.getElementById("title")
  title.innerHTML = `${data.name}`;

  // ajout du prix du produit 
  const price = document.getElementById("price")
  price.innerText = ` ${data.price}  `;
  console.log('test prix',price);

  //ajout de la description du produit 
  const description = document.getElementById("description")
  description.innerText = data.description;
  //définition des choix possibles pour les couleurs du produit afin d'éviter les valeurs null ou undefined dans la liste 
  const colors = document.getElementById("colors");
  // si 2 couleurs
  colors.innerHTML += `
      <option value="${data.colors[0]}">${data.colors[0]}</option>
      <option value="${data.colors[1]}">${data.colors[1]}</option>
      `;
  // si il y a trois couleurs possibles
  if ((data.colors).length === 3) {
    colors.innerHTML += `      
        <option value="${data.colors[2]}">${data.colors[2]}</option>
        `;
  }
  // si il y a 4 couleurs possibles
  if ((data.colors).length === 4) {
    colors.innerHTML += `
        <option value="${data.colors[3]}">${data.colors[3]}</option>`;
  }

}




//bouton ajout de produits au panier

let el = document.getElementById("addToCart");
if (el.addEventListener)
  el.addEventListener("click", addProduct, false);
else if (el.attachEvent)
  el.attachEvent('onclick', addProduct);

  // fonction pour récupérer les valeurs du formulaire d'ajout de produit//
function addProduct(){
  let colors = document.getElementById("colors").value;
  let quantity = Number(document.getElementById("quantity").value);
 
  let title = document.getElementById("title").innerText;
   console.log(datas);
  let product = ({ id: newId,imageUrl:datas,title:title, colors: colors, quantity: quantity}) // objet Json//
  addBasket(product,title,quantity,colors);
}


//sauvegarder le panier
function saveBasket(basket) {
  localStorage.setItem("basket", JSON.stringify(basket)); // sérialiser en chaîne de charactére car local storage ne peut contenir autre chose que des chaînes de caractéres//
}

// récupérer éléments du panier//

function getBasket() {
  let basket = localStorage.getItem("basket")
  if (basket == null) {
    return [];
  } else {
    return JSON.parse(basket);
  }


}
// ajouter un produit au panier //
function addBasket(product,title,quantity,colors) {
  let basket = getBasket();
  let foundProduct = basket.find(p => (p.id == product.id) && ( p.colors==product.colors)); //find permet de trouver l'élément recherché ou retourne indefined si rien n'est trouvé//
  if (foundProduct != undefined) {
    foundProduct.quantity+=quantity;
  } else {
    product.quantity = quantity;
    basket.push(product);
  }

  saveBasket(basket);

}
// supprimer éléments dans panier//
function removeFromBasket(product) {
  let basket = getBasket();
  basket = basket.filter(p => p.id != product.id);
  saveBasket(basket);


}

// changer la quantité //

function changeQuantity(product, quantity) {
  let basket = getBasket();
  let foundProduct = basket.find(p => p.id == product.id); //find permet de trouver l'élément recherché ou retourne indefined si rien n'est trouvé//
  if (foundProduct != undefined) {
    foundProduct.quantity += quantity;
    if (foundProduct.quantity <= 0) {
      removeFromBasket(foundProduct);
    } else {
      saveBasket(basket);
    }
  }

}
// nombre de produit total du panier//
function getNumberProduct() {
  let basket = getBasket();
  let number = 0;
  for (let product of basket) {
    number + product.quantity;
  }
  return number;
}

function getTotalPrice() {
  let basket = getBasket();
  let total = 0;
  for (let product of basket) {
    total + product.quantity * product.price;
  }
  return total;
}
