import { showHome } from "./home.js";
import { checkUserNav } from "./util.js";

const section = document.getElementById('registerView');
const form = section.querySelector('form');
form.addEventListener('submit', onSubmit);
section.remove();

export function showRegister() {
    document.querySelector('main').replaceChildren(section);
}

async function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(form);
    const email = formData.get('email').trim();
    const password = formData.get('password').trim();
    const repass = formData.get('repass').trim();

    try {
        if(email == '' || password == ''){
            throw new Error('All fields are required!');
        }
        if(password !== repass){
            throw new Error('Password don\'t match!');
        }

        const response = await fetch('http://localhost:3030/users/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        if(response.ok == false){
            const error = await response.json();
            throw new Error(error.message);
        }

        const { accessToken, _id } = await response.json();
        const userData = {
            email,
            accessToken,
            id: _id
        }
        sessionStorage.setItem('userData', JSON.stringify(userData));
        checkUserNav();
        showHome();
        
    } catch (err) {
        alert(err.message)
    }
}