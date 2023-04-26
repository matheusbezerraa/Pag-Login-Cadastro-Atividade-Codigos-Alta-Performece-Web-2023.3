const cpf = document.getElementById("cpf")
const password = document.getElementById("password")

form.addEventListener('submit', (e)=>{
    e.preventDefault()

    checkInputs()
})

function checkInputs(){

    const passwordValue = password.value
    const specialCharRegex = /[-@!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/;
    const numberRegex = /\d/;
    const cpfValue = cpf.value

    // Recupera os usuários cadastrados no localStorage
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || []

    const usuarioExistente = usuarios.find(usuario => usuario.cpf === cpfValue)

    if (usuarioExistente) {
        setSuccessFor(cpf)
    } else {
        alert("Faça o cadastro antes.")
        setErrorFor(cpf)
        setErrorFor(password)
        return 
    }
    
    if(cpfValue ===""){
        setErrorFor(cpf, "O cpf é obrigatório")
    }else if(cpfValue.length != 11){
        setErrorFor(cpf, "O cpf precisa conter 11 digítos")
    }else{
        setSuccessFor(cpf)
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

    if (usuarioExistente) {
        // Mostra uma mensagem de erro
        setSuccessFor(cpf)
    } else {
        setErrorFor(cpf,"Faça o cadastro.")
        setErrorFor(password,"Faça o cadastro antes")
        alert("Faça o cadastro antes.")
      
    }

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
