const username = document.getElementById("username")
const password = document.getElementById("password")

form.addEventListener('submit', (e)=>{
    e.preventDefault()
    checkInputs()
})

function logar(){
    localStorage.setItem("username", document.querySelector("#username").value)
    localStorage.setItem("password", document.querySelector("#password").value)
}

function checkInputs(){
    const storedData = localStorage.getItem('userData');
    const usernameValue = username.value
    const passwordValue = password.value
    const specialCharRegex = /[-@!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/;
    const numberRegex = /\d/;
    
    if(usernameValue === ''){
        setErrorFor(username, "O nome de usuário é obrigatório.")
    }else if(username.value.length<=2){
        setErrorFor(username, "O nome de usuário deve conter no minimo 3 caracteres.")
    }else{  
        setSuccessFor(username)
    }

    if(passwordValue===""){
        setErrorFor(password,"A senha é obrigatória.")
    }else if(passwordValue.length < 7){
        setErrorFor(password,"A senha deve ter no minímo 8 caracteres.")
    }else if(!specialCharRegex.test(password.value) && !numberRegex.test(password.value)){
        setErrorFor(password,'A senha deve ter no minímo um caractere especial e um número.')
    }else if(!specialCharRegex.test(password.value)){
        setErrorFor(password,"A senha tem que ter no minímo um caractere especial.")
    }else if(!numberRegex.test(password.value)){
        setErrorFor(password,"A senha tem que ter no minímo um número.")
    }else{
        setSuccessFor(password)
    }

    const formControls = form.querySelectorAll(".form-control")

    const formIsValid = [...formControls].every((formControl) => {
        return formControl.className === "form-control success"
      })
      if (formIsValid) {
        //quando o formulario for valido ira para a landing page
        setTimeout(() => {
            alert("Login completo!")
            window.location.href = "landingPage.html";
          }, 1000); 
      }else{     
        alert("erro")
      }
      
  }
  function setErrorFor(input, message){
    const formControl = input.parentElement
    const small = formControl.querySelector('small')

    small.innerText=message
    formControl.className = 'form-control error'
}  
function setSuccessFor(input){
    const formControl = input.parentElement
    
    formControl.className = 'form-control success'
    var paragraph = document.getElementById("meuParagrafo");
    paragraph.style.display = "none";}
