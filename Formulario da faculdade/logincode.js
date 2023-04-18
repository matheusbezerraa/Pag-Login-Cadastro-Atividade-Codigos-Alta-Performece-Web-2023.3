const username = document.getElementById("username")
const password = document.getElementById("password")

form.addEventListener('submit', (e)=>{
    e.preventDefault()
    checkInputs()
})

function checkInputs(){
    const usernameValue = username.value
    const passwordValue = password.value
    const numberRegex = /\d/
    const specialCharRegex = /[-@!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/;
    
    if(usernameValue === ''){
        setErrorFor(username, "O nome de usuário é obrigatório.")
    }else{
        setSuccessFor(username)
    }

    if(passwordValue===""){
        setErrorFor(password,"A senha é obrigatória.")
    }else{
        setSuccessFor(password)
    }

    const formControls = form.querySelectorAll(".form-control")

    const formIsValid = [...formControls].every((formControl) => {
        return formControl.className === "form-control success"
      })
      if (formIsValid) {  
        //quando o formulario for valido ira para a pagina da landing page
        setTimeout(() => {
          alert("Login completo!")
          window.location.href = "landingPage.html";
        }, 1000); 
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