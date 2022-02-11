// récupération des informations de commande 
const orderId = JSON.parse(localStorage.getItem("orderId"));
const order = JSON.parse(localStorage.getItem("order"));                // affichage dans la console des informations de commande (contenant contact products et l'orderId) 
    
       
const orderNumber = document.getElementById("orderId");                 // récupération dans le DOM de la partie HTML 
orderNumber.innerHTML += `${orderId}`;                                  //à modifier pour afficher le numéro de commande. 
                                                                        // Une fois le message affiché,
              
localStorage.clear();                                                   //le localStorage est vidé de ses données.  