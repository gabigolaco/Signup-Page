const form = document.getElementById('sign-up-form'); 
const firstnameinput = document.getElementById('firstnameinput');
const lastnameinput = document.getElementById('lastnameinput');
const emailinput = document.getElementById('emailinput');
const passwordinput = document.getElementById('passwordinput');
const inputdate = document.getElementById('inputdate');
const todosOsInputs = document.querySelectorAll('.inputnormal');
let allValid = true;
let idadevalida = null;

inputdate.addEventListener('input', checaridade);

todosOsInputs.forEach(input => input.addEventListener('input', checkInputs));
form.addEventListener('submit', registrar);

function checkInputs() { // A cada input que o cara digitar, vai acionar essa ação, se ele digitar um f, essa função vai deixar allValid = true,  e vai ver as condições, se um dos inputs tiver vazio, ele vai deixar false, e se por exemplo vc preencher quase tudo e falta uma letra pra preencher, vc clica na letra, ele vai acionar a função, allValid vai ficar true e ele vai verificar se tem um input vazio, se n tiver, n acontece nada e tudo fica verde
    allValid = true 

    todosOsInputs.forEach(input => {
        if (!input.validity.valid) {
            input.style.border = '1px solid red'; // Aplica borda vermelha para inputs inválidos
            allValid = false; // Define allValid como false se qualquer input não for válido
            console.log('Input Inválido');
        } else {
            input.style.border = '1px solid green'; // Aplica borda verde para inputs válidos
            console.log('Input Válido');
        }
    });
}

function checaridade() {
    let dataAtual = new Date();
    let dataSelecionada = new Date(inputdate.value);
    let idade = dataAtual.getFullYear() - dataSelecionada.getFullYear();

    if (idade >= 18) {
        inputdate.style.border = '1px solid green'; // Aplica borda verde para idade válida
        console.log('Maior de idade');
        idadevalida = true; // Define idadevalida como true se a idade for válida
    } else {
        inputdate.style.border = '1px solid red'; // Aplica borda vermelha para idade inválida
        console.log('Menor de idade');
        idadevalida = false; // Define idadevalida como false se a idade não for válida
    }
}


function registrar(event) {
    
    checkInputs(); 
    checaridade();

    if (!allValid || !idadevalida) {
        console.log('Formulário não Enviado');
        alert('Formulário Enviado');
        event.preventDefault(); // Impede o envio do formulário se qualquer verificação falhar
    } else {

        let dataAtual = new Date();
        let dataSelecionada = new Date(inputdate.value);
        let idade = dataAtual.getFullYear() - dataSelecionada.getFullYear();
        console.log('Formulário Enviado');
        alert('Formulário Enviado');


        localStorage.setItem('firstname', firstnameinput.value)
        localStorage.setItem('lastname',  lastnameinput.value)
        localStorage.setItem('email',        emailinput.value)
        localStorage.setItem('password', passwordinput.value)
        localStorage.setItem('age', idade)

        document.cookie = `name=${firstnameinput.value}; expires=Fri, 31 Dec 2024 23:59:59 GMT; path=/; Secure; HttpOnly`
        document.cookie = `lastname=${lastnameinput.value}; expires=Fri, 31 Dec 2024 23:59:59 GMT; path=/; Secure; HttpOnly`
        document.cookie = `email=${encodeURIComponent(emailinput.value)}; expires=Fri, 31 Dec 2024 23:59:59 GMT; path=/; Secure; HttpOnly`
        document.cookie = `password=${encodeURIComponent(passwordinput.value)}; expires=Fri, 31 Dec 2024 23:59:59 GMT; path=/; Secure; HttpOnly`
        document.cookie = `age=${idade}; expires=Fri, 31 Dec 2024 23:59:59 GMT; path=/; Secure; HttpOnly`
    }
}

function updatePlaceholder() {
    if (window.innerWidth <= 1024) {
        firstnameinput.placeholder = 'First Name';
        lastnameinput.placeholder = 'Last Name';
        emailinput.placeholder = 'Email';
        passwordinput.placeholder = 'Password';
    } else {
        firstnameinput.placeholder = 'ex: John';
        lastnameinput.placeholder = 'ex: Doe';
        emailinput.placeholder = 'ex: email@domain.com';
        passwordinput.placeholder = 'ex: PizzaIsCool219!_1';
    }
}

updatePlaceholder();
window.addEventListener('resize', updatePlaceholder);
