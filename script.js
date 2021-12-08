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
