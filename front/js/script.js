// définition de l'adresse de l'API pour l'affichage de tous les produits. 
const url = "http://localhost:3000/api/products"

// fetch pour récupérer les données de l'API 
fetch(url)
  .then((response) => response.json())
  .then((data) => {
    addCards(data);
   console.log(data)      
  })
  .catch((erreur) => console.log("erreur : " + erreur));

//définition de la classe product pour affichage des produits//
class product {
    constructor(id, name, altTxt, imageUrl, description, colors, price) {
      this.id = id;
      this.name = name;
      this.altTxt = altTxt;
      this.imageUrl = imageUrl;
      this.description = description;
      this.colors = colors;
      this.price = price;
    }
  }
//page d'accueil fonction pour l'affichage des produits
function addCards(data) {
    //création de la boucle pour l'affichage des produits 
    for (product of data) {
      // récupération dans le DOM du html correspondant à la carte d'un produit 
      const items = document.getElementById("items")
      //incrémentation des informations du produit dans le html (carte du produit) grâce à la classe product
      items.innerHTML += `   
        <a href="./product.html?id=${product._id}">
        <article>
        <img src="${product.imageUrl}" alt="${product.altTxt}">
        <h3 class="product.name">${product.name}</h3>
          <p class="productDescription">${product.description}</p>
      </article>
      </a>`
  }
}

    
// Creation du lien qui méne le produit de la page d'accueil vers la page produit//
   
    




