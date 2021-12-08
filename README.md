# projet-ajax-avec-api-fetch

// plan du projet 
// On souhaite mettre à disposition de l'administrateur de notre site une page lui permettant de récupérer l'ensemble des adresses françaises correspondant à sa recherche.
// 1 on  Déclare une constante url contenant l'adresse https://api-adresse.data.gouv.fr/search
// 2 Une première promesse demandera à l'utilisateur son nom : s'il répond admin, la promesse sera résolue, sinon elle sera rejet   
// 3Une seconde promesse demandera à l'utilisateur combien font 6 x 7 : s'il répond 42, la promesse sera résolue, sinon elle sera rejetée
//4  Si elles sont toutes les deux validées, un message indiquant que l'utilisateur peut accéder à l'application sera affiché en console,   // 5  La fonction manageResearch est déclenchée lorsque l'on appuie sur le bouton "Rechercher".
// 6 sinon un message indiquant "Accès refusé" sera affiché.
//  7 on verifie l'identité de l'utilisateur à l'aide de la fonction checkUsurname pour valider la premiere promesse
// 8  Au sein d'une nouvelle fonction appelée searchAddress, initialisez votre URL en définissant un nouvel objet de type URLSearchParam. Celui-ci contiendra une propriété q dont la valeur correspondra à la valeur de l'input #address
 // 9 on cree la fonction checkIfsbot pour vérifier et  valider la deuxième promesse 
//  10 À l'aide de l'API Fetch, appelez l'URL que vous avez construite au sein de la fonction searchAddress et appelez la fonction dont vous disposez en cas de succès.
// 11 on  traite l'affichage des erreurs en les affichant en console.

const url = new URL('https://api-adresse.data.gouv.fr/search')
function askUsername() {
  return prompt('Quel est votre nom d\'utilisateur ?')
}   
function askMathOperation() {
  return prompt('Combien font 6 x 7')
}   
function success() {
  console.log('Vous pouvez accéder à l\'application')
  searchAddress()
}
function error() {
  console.log('Accès refusé')
}
function checkUsername() {
  return new Promise((resolve, reject) => {
    let username = askUsername()
    if ('admin' === username) {
      resolve()
    } else {
      reject()
    }
  })
}
function checkIfIsBot() {
  return new Promise((resolve, reject) => {
    let result = askMathOperation()
    if (42 === parseInt(result)) {
      resolve()
    } else {
      reject()
    }
  })
}
function manageResearch () {
  Promise.all([checkUsername(), checkIfIsBot()]).then(success, error)
}
function searchAddress() {
  let params = {q: document.getElementById("address").value}
  url.search = new URLSearchParams(params).toString();
  fetch(url)

    .then((response) => {
        if(response.ok){
            return response.json()
        } else {
            console.error("Erreur réponse : " + response.status)
        }
    })
    .then((data) => {
      fillResults(data)
    })
    .catch((error) => console.error(error)) //Traitement de l'erreur dans l'appel
}
function fillResults(data) {
  let list = document.getElementById('results')
  list.innerHTML = ''
  if(undefined !== data.features) {
    data.features.forEach(function(element) {
      let li = document.createElement('li')
      li.appendChild(document.createTextNode(element.properties.label))
      list.appendChild(li)
    });
  }
}
