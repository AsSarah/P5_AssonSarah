////// script du panier ///////

let panier = JSON.parse(localStorage.getItem('basket'));
console.log(panier);

const positionElement3 = document.querySelector("#cart__items");
console.log(positionElement3);


if(panier === null){
   alert('panier vide');                                                        // alerte si mon panier est bien vide//
}
    else{
        let structureProduitPanier=[];                                          //tableau vide//
        let qteTot = 0;
        let prixTot= 0;
        for (let i=0; i<panier.length; i ++){                                   // creation boucle for pour parcourir le panier avec un indice de condition i avec une condition de sortie de boucle

          let url = `http://localhost:3000/api/products/${panier[i].id}`;       //recuperer l'api
          let prixFinal ;                                                       //variable du prix final : prix produit * quantite
          let prixInitial ;                                                     //variable prix produit
          const fetchPromise= fetch(url);                                       //Promesse de données par fetch via api
          fetchPromise.then(Response => {return Response.json();                //recuperation de la promesse sous format json
          }).then(data => {                                                     //ensuite, dans les données json
            prixInitial = data.price;                                           //recuperation du prix produit dans le json
            prixFinal= prixInitial*panier[i].quantity;                          //calcul du prix final
            qteTot  += parseInt(panier[i].quantity) ;
            prixTot += prixFinal;  
                                   
            writePanier(structureProduitPanier,i,prixFinal,panier[i].id);       //ecriture de la fiche produit dans le panier avec le prix calculé
            majTotPanier(qteTot,prixTot); 
          });
        }
}
function writePanier(structureProduitPanier,i,prixFinal,id,qteTot,prixTot){     //fonction d'ecriture de la fiche produit avec les parametres :
                                                                                // structure du panier, indice de la boucle for, prix calculé

  structureProduitPanier= structureProduitPanier +   `
  <article class="cart__item" data-id="${id}">          
    <div class="cart__item__img">
        <img src="${panier[i].imageUrl}" alt="${panier[i].altTxt}"> 
    </div>
    <div class="cart__item__content">
        <div class="cart__item__content__titlePrice">
            <h2>${panier[i].title}</h2> 
            
            <p>${prixFinal}€</p>
        </div>
        
        <div class="cart__item__content__settings">
        <p>Couleur: ${panier[i].colors}</p>
            <div class="cart__item__content__settings__quantity">
                <p>Qté : </p>
                <input type="number" class="itemQuantity" name="itemQuantity" min="0" max="100" value="${panier[i].quantity}" onchange="maF(value,${i})">
            </div>
            <div class="cart__item__content__settings__delete">
               <button class="deleteItem"  onclick="supprBtn(${i})">Supprimer</button>
            </div>
        </div>
    </div>
    </article> 
  `;
 

  if(true){

  positionElement3.innerHTML += structureProduitPanier;
  console.log(structureProduitPanier);
  }
}
/////////////////////// Supprimer le produit  ////////////////////////
function supprBtn(refI){                                                 // fonction de suppression de produit dans le panier (indice de reference du produit)
 
  panier.splice(refI, 1);                                                // splice : retrait de ( à partir de indice, quantité à retirer)
  //console.log(panier)
  localStorage.setItem('basket', JSON.stringify(panier)) ;               // remise en place des produits dans le local storage sans l'element supprimé
  // element.getAtribute(refI).remove()
   window.location.reload();
  
   alert("bien supprimer");
}
///////////////////////Modifier la quantité ////////////////////////
function maF (value, i){
  if(value > 0){                                                        // si quantité de produits superieur à 0
    let monPanier = JSON.parse(localStorage["basket"]);                 // remise sous format JSON du panier dans le local storage
    monPanier[i].quantity = value;                                      // modification de la quantité reçus en parametre
    
    localStorage["basket"] = JSON.stringify(monPanier);                 //remise en place du localstorage avec valeur de quantité modifier
    
    window.location.reload();                                           // rechargement de la page
  }else{                                                                //sinon
    supprBtn(i);                                                        //on supprime le produit du panier par la fonction supprimer du bouton
  }
}

 ////////////////////// montant total du panier /////////////////////// 
 function majTotPanier(qteTot,prixTot){                                 //Le prix total est calculé dans notre promesse// mise à jour prix total panier
  prixTotAffichage            = document.getElementById("totalPrice");  //recupére l'élément avec id total price
  qteTotAffichage             = document.getElementById("totalQuantity")// "  " " " avec total quantity
  qteTotAffichage.innerHTML   = `${qteTot}`;                           
  prixTotAffichage.innerHTML  = `${prixTot}`;
 }

 // /////////////////////// Formulaire de commande ////////////////////////

let form = document.querySelector('#form');

firstName.addEventListener('change', function () {                          //Evènement = la modification de firstName
  validFirstName(this)
});

const validFirstName = function (inputFirstName) {
 
  let firstNameRegExp = new RegExp(                                          //Création regExp pour la validation du champ firstName
    '^[A-Z][a-zA-Z]+$', 'g'
  )
  let testFirstName = firstNameRegExp.test(inputFirstName.value);
  let firstNameErrorMsg = inputFirstName.nextElementSibling;
  if (testFirstName === true) {                                               //si la valeur est valide, 
                      
    firstNameErrorMsg.innerHTML = "Prénom Valide";                            //notifier à l'utilisateur + envoyer les données à la variable newContact
      newContact.push(inputFirstName.value);
    return true;
  } else {
                                                                              //si la valeur n'est pas valide, 
    firstNameErrorMsg.innerHTML = "Prénom non Valide";                        //le notifier à l'utilisateur et ne pas envoyer les données à la variable newContact
  }
}
//Evènement = modification de lastName
lastName.addEventListener('change', function () {
  validLastName(this)
});

const validLastName = function (inputLastName) {
  //creation regExp pour la validation du champ lastName
  let lastNameRegExp = new RegExp(
    '^[A-Z][a-zA-Z]+$', 'g'
  )
  let testLastName = lastNameRegExp.test(inputLastName.value);
  let lastNameErrorMsg = inputLastName.nextElementSibling;
  if (testLastName === true) {
    //si la valeur est valide, notifier à l'utilisateur et envoyer les données à la variable newContact
    lastNameErrorMsg.innerHTML = 'Nom Valide';
      newContact.push(inputLastName.value);
    return true;
  } else {
    //si la valeur n'est pas valide, notifier à l'utilisateur et ne pas envoyer les données à la variable newContact
    lastNameErrorMsg.innerHTML = 'Nom Non Valide';
  }
}
//Evènement = la modification de l'adresse.
address.addEventListener('change', function () {
  validAddress(this)
});
const validAddress = function (inputAddress) {
  //Création regExp pour la validation du champ adresse
  let addressRegExp = new RegExp(
    '^[0-9]{1,5}( [-a-zA-Zàâäéèêëïîôöùûüç ]+)+$', 'g'
  )
  let testAddress = addressRegExp.test(inputAddress.value);
  let addressErrorMsg = inputAddress.nextElementSibling;
  if (testAddress === true) {
    //si la valeur est valide et notifier à l'utilisateur et envoyer les données à la variable newContact
    addressErrorMsg.innerHTML = 'Adresse Valide';
      newContact.push(inputAddress.value);
    return true;
  } else {
    //si la valeur n'est pas valide => notifier à l'utilisateur et ne pas envoyer les données à la variable newContact
    addressErrorMsg.innerHTML = 'Adresse Non Valide';
  }
}
//Evènement = la modification de city
city.addEventListener('change', function () {
  validCity(this)
});

const validCity = function (inputCity) {
  //création regExp pour la validation du champ city
  let cityRegExp = new RegExp(
    '^[A-Z][a-zA-Z]+$', 'g'
  )
  let testCity = cityRegExp.test(inputCity.value);
  let cityErrorMsg = inputCity.nextElementSibling;
  if (testCity === true) {
    //si la valeur est valide, notifier à l'utilisateur + envoyer les données à la variable newContact
    cityErrorMsg.innerHTML = 'Ville Valide';
      newContact.push(inputCity.value);
    return true;
  } else {
    //si la valeur n'est pas valide, notifier à l'utilisateur et ne pas envoyer les données à la variable newContact
    cityErrorMsg.innerHTML = 'Ville Non Valide';
  }
}

email.addEventListener('change', function () {   //Evènement sur la modification de mail
  validEmail(this)
});
const validEmail = function (inputEmail) {
  //Création regExp pour la validation du champ email
  let emailRegExp = new RegExp(
    '^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g'
  )
  let testEmail = emailRegExp.test(inputEmail.value);
  let emailErrorMsg = inputEmail.nextElementSibling;
  if (testEmail === true) {                     //si la valeur est valide 
                                                // notifier à l'utilisateur et envoyer les données à la variable newContact
    
    emailErrorMsg.innerHTML = 'Email Valide';
      newContact.push(inputEmail.value);
    return true;
  } else {                                      //si la valeur n'est pas valide 
                                                // notifier à l'utilisateur et ne pas envoyer les données à la variable newContact
  
    emailErrorMsg.innerHTML = 'Email Non Valide';
  }
}
//////////////////////////////////////////////////////Creation de la variable newContact///////
let newContact = [];
// selection du bouton "commander" dans le DOM
let orderBtn = document.querySelector("#order");
// évènement au clic sur le bouton commander
orderBtn.addEventListener("click", (event) => {
  // prévenir le comportement par défaut du bouton (rechargement de la page)
  event.preventDefault();
  // si va variable newContact contient bien des données (vérifiées au préalable)
  if (
    (newContact[0] !== undefined) &                    // déféni si le contact numero[..] n'est pas 'vide' 
    (newContact[1] !== undefined) &
    (newContact[2] !== undefined) &
    (newContact[3] !== undefined) &
    (newContact[4] !== undefined)
  ) {
    // création de l'objet contact à partir de la variable newContact
    const contact = {
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      address: document.getElementById("address").value,
      city: document.getElementById("city").value,
      email: document.getElementById("email").value
    };
    // création de la variable contenant les id des produits commandés
    let products = [];
    for ( product of panier) {
      products.push(product.id);
    }
    // fetch url envoi des données au serveur 
    const promise01 = fetch(`http://localhost:3000/api/products/order`, {
      method: "POST",
      // envoi de l'objet contact et de la variable products en "POST"
      body: JSON.stringify({
        contact,
        products
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    promise01.then(async (data) => {
      try {
        const contenu = await data.json();
        // puis récupérer dans la réponse le numéro de commande "orderId"
        orderId = contenu.orderId;
        
        // constitution de l'objet "order" contenant les données contact products et l'orderId
        const order = {
          contact: contenu.contact,
          products: contenu.products,
          orderId: contenu.orderId
        }
        // envoi au localStorage des données 
        localStorage.setItem("order", JSON.stringify(order));
        localStorage.setItem("orderId", JSON.stringify(orderId));
        // redirection de l'utilisateur vers la page confirmation.html
        window.location.href = `./confirmation.html`;
       
      } catch (e) {}
    });

  } else {
    // sinon notification à l'utilisateur qu'une information est manquante dans le formulaire ou qu'une information est erronée. 
    alert("Attention, il y a une erreur dans le remplissage du formulaire ou une information est manquante");
  }


}) 
