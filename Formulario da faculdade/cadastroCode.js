const form = document.getElementById("form")
const username = document.getElementById("username")
const email = document.getElementById("email")
const password = document.getElementById("password")
const passwordConfirmation = document.getElementById("password-confirmation")
const cpf = document.getElementById("cpf")
const data = document.getElementById("data")

form.addEventListener('submit', (e)=>{
    e.preventDefault() //para a página não recarregar e tirar os valores dos inputs

    // Executa outras validações e/ou redireciona para outra página
    checkInputs()
    
})

function checkInputs(){ //verificando os inputs
    const usernameValue = username.value
    const emailValue = email.value
    const passwordValue = password.value
    const passwordConfirmationValue = passwordConfirmation.value
    const specialCharRegex = /[-@!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/;
    const numberRegex = /\d/;
    const cpfValue = cpf.value
    const dataValue = data.value

    // Recupera os usuários cadastrados no localStorage
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || []

    // Verifica se o CPF já está cadastrado
    const usuarioExistente = usuarios.find(usuario => usuario.cpf === cpfValue)
    const usuarioExistentePassword = usuarios.find(usuarios => usuarios.password === passwordValue)

    if(usernameValue === ''){
        setErrorFor(username, "O nome de usuário é obrigatório.")
    }else if(username.value.length<=2){
        setErrorFor(username, "O nome de usuário deve conter no minimo 3 caracteres.")
    }else{  
        setSuccessFor(username)
    }

    if(cpfValue ===""){
        setErrorFor(cpf, "O cpf é obrigatório")
    }else if(cpfValue.length != 11){
        setErrorFor(cpf, "O cpf precisa conter 11 digítos")
    }else{
        setSuccessFor(cpf)
    }

    if(emailValue=== ""){
        setErrorFor(email,"O email é obrigatório.")
    }else if(!checkEmail(emailValue)){
        setErrorFor(email,"Insira um email válido.")
    }else{
        setSuccessFor(email)
    }

    if(dataValue===""){
        setErrorFor(data,"A data de nascimento é obrigatória")
    }else{
        setSuccessFor(data)
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

    if(passwordConfirmationValue===""){
        setErrorFor(passwordConfirmation, 'A confirmação da senha é obrigatório.')
    }else if(passwordConfirmationValue!=passwordValue){
        setErrorFor(passwordConfirmation, "As senhas não conferem.")
    }else if(passwordConfirmationValue.length < 7){
        setErrorFor(passwordConfirmation)
    }else if(!specialCharRegex.test(passwordConfirmation.value) && !numberRegex.test(passwordConfirmation.value)){
        setErrorFor(passwordConfirmation)
    }else if(!specialCharRegex.test(passwordConfirmation.value)){
        setErrorFor(passwordConfirmation)
    }else if(!numberRegex.test(passwordConfirmation.value)){
        setErrorFor(passwordConfirmation)
    }else{
        setSuccessFor(passwordConfirmation)
    }

    if(username===""){
        setErrorFor(username)
        return
    }else if(username.value.length<=2){
        setErrorFor(username, "O nome de usuário deve conter no minimo 3 caracteres.")
        return
    }else if(cpfValue ===""){
        setErrorFor(cpf, "O cpf é obrigatório")
        return
    }else if(cpfValue.length != 11){
        setErrorFor(cpf, "O cpf precisa conter 11 digítos")
        return
    }else if(emailValue=== ""){
        setErrorFor(email,"O email é obrigatório.")
        return
    }else if(!checkEmail(emailValue)){
        setErrorFor(email,"Insira um email válido.")
        return
    }else if(dataValue===""){
        setErrorFor(data,"A data de nascimento é obrigatória")
        return
    }else if(passwordValue===""){
        setErrorFor(password,"A senha é obrigatória.")
        return
    }else if(passwordValue.length < 7){
        setErrorFor(password,"A senha deve ter no minímo 8 caracteres.")
        return
    }else if(!specialCharRegex.test(password.value) && !numberRegex.test(password.value)){
        setErrorFor(password,'A senha deve ter no minímo um caractere especial e um número.')
        return
    }else if(!specialCharRegex.test(password.value)){
        setErrorFor(password,"A senha tem que ter no minímo um caractere especial.")
        return
    }else if(!numberRegex.test(password.value)){
        setErrorFor(password,"A senha tem que ter no minímo um número.")
        return
    }else if(passwordConfirmationValue===""){
        setErrorFor(passwordConfirmation, 'A confirmação da senha é obrigatório.')
        return
    }else if(passwordConfirmationValue!=passwordValue){
        setErrorFor(passwordConfirmation, "As senhas não conferem.")
        return
    }else if(passwordConfirmationValue.length < 7){
        setErrorFor(passwordConfirmation)
        return
    }else if(!specialCharRegex.test(passwordConfirmation.value) && !numberRegex.test(passwordConfirmation.value)){
        setErrorFor(passwordConfirmation)
        return
    }else if(!specialCharRegex.test(passwordConfirmation.value)){
        setErrorFor(passwordConfirmation)
        return
    }else if(!numberRegex.test(passwordConfirmation.value)){
        setErrorFor(passwordConfirmation)
        return
    }else if(usuarioExistente){
        // Mostra uma mensagem de erro
        setErrorFor(username)
        setErrorFor(cpf)
        setErrorFor(email)
        setErrorFor(data)
        setErrorFor(password)
        setErrorFor(passwordConfirmation)
        alert("Usuário já cadastrado.")
    } else {
        // Adiciona o novo usuário à lista e armazena no localStorage
        const novoUsuario = {cpf: cpfValue}
        usuarios.push(novoUsuario)
        localStorage.setItem("usuarios", JSON.stringify(usuarios))
    }

    if(usuarioExistentePassword){
        setErrorFor(password)
    }else{
        const novaSenha = {password: passwordValue}
        usuarios.push(novaSenha)
        localStorage.setItem("usuarios", JSON.stringify(usuarios))
    }

    const formControls = form.querySelectorAll(".form-control")

    const formIsValid = [...formControls].every((formControl) => {
      return formControl.className === "form-control success"
    })

    if (formIsValid) {  
      //quando o formulario for valido ira para a pagina de login
      setTimeout(() => {
        alert("Cadastro completo!")
        window.location.href = "loginPage.html";
    }, 1000); 
}
}

function setErrorFor(input, message){
    const formControl = input.parentElement
    const small = formControl.querySelector('small')

    small.innerText=message //Adiciona a mensagem de erro

    formControl.className = 'form-control error' // Adiciona a classe de erro
}

function setSuccessFor(input){
    const formControl = input.parentElement
    
    formControl.className = 'form-control success' // Adicionar a classe de sucesso

    var paragraph = document.getElementById("meuParagrafo"); // seleciona o elemento do parágrafo
    paragraph.style.display = "none"; // altera a propriedade "display" do parágrafo para "none"
}
/*Sobre a função checkEmail:
*1. Deve haver pelo menos um caractere antes do "@"
*2. Deve haver pelo menos um caractere entre o "@" e o primeiro ponto
*3. Deve haver pelo menos um caractere entre o último ponto e o final do domínio
*4. O domínio deve ter pelo menos duas letras
*5. O e-mail não deve conter caracteres especiais, exceto os permitidos (pontos, traços e sublinhados)
*/
function checkEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
}

//u
