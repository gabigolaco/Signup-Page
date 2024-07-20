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
            input.style.border = '1px solid red'; 
            allValid = false;
            console.log('Input Inválido');
        } else {
            input.style.border = '1px solid green';
            console.log('Input Válido');
        }
    });
}

function checaridade() {
    let dataAtual = new Date();
    let dataSelecionada = new Date(inputdate.value);
    let idade = dataAtual.getFullYear() - dataSelecionada.getFullYear();

    if (idade >= 18) {
        inputdate.style.border = '1px solid green'; 
        console.log('Maior de idade');
        idadevalida = true; 
    } else {
        inputdate.style.border = '1px solid red'; 
        console.log('Menor de idade');
        idadevalida = false;
    }
}

const chave = 'Lx$8pQ!nB#vR7Yw0%aZk9Jm4xF6t3';

function xor(texto, chave) {
    let resultado = '';
    const key = CryptoJS.enc.Utf8.parse(chave); // Convert chave to WordArray
    for (let i = 0; i < texto.length; i++) {
        let byte = texto.charCodeAt(i);
        resultado += String.fromCharCode(byte ^ chave.charCodeAt(i % chave.length));
    }   
    return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(resultado)); // Encode result
}

function registrar(event) {
    
    checkInputs(); 
    checaridade();

    if (!allValid || !idadevalida) {
        console.log('Formulário não Enviado');
        alert('Formulário não enviado');
        event.preventDefault(); // Impede o envio do formulário se qualquer verificação falhar
    } else {

        let dataAtual = new Date();
        let dataSelecionada = new Date(inputdate.value);
        let idade = dataAtual.getFullYear() - dataSelecionada.getFullYear();
        console.log('Formulário Enviado');
        alert('Formulário enviado');


        localStorage.setItem('firstname', firstnameinput.value)
        localStorage.setItem('lastname',  lastnameinput.value)
        localStorage.setItem('email',        emailinput.value)
        localStorage.setItem('password', passwordinput.value)
        localStorage.setItem('age', idade)

        document.cookie = `name=${encodeURIComponent(xor(firstnameinput.value))}; expires=Fri, 31 Dec 2024 23:59:59 GMT; path=/; Secure; HttpOnly`
        document.cookie = `lastname=${encodeURIComponent(xor(lastnameinput.value))}; expires=Fri, 31 Dec 2024 23:59:59 GMT; path=/; Secure; HttpOnly`
        document.cookie = `email=${encodeURIComponent(xor(emailinput.value))}; expires=Fri, 31 Dec 2024 23:59:59 GMT; path=/; Secure; HttpOnly`
        document.cookie = `password=${encodeURIComponent(xor(passwordinput.value))}; expires=Fri, 31 Dec 2024 23:59:59 GMT; path=/; Secure; HttpOnly`
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
