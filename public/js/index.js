const closeBtn = document.querySelector('.registration_exit');
const createAccount = document.querySelector('.login_btn--create');
const registration = document.querySelector('.registration');
const page = document.querySelector('.page_container');
const registrationForm = document.querySelector('.registration_form');
const loginForm = document.querySelector('.login_form');
const url = 'http://localhost:3000';
// const url = 'https://finance-app-szturc.herokuapp.com';
const msgError = document.querySelector('.registration_error');
const inputs = [...document.querySelectorAll('.registration_form input')];
const btnLogin = document.querySelector('.login_btn');
const loginError = document.querySelector('.login__error');
const loginInputs = [...document.querySelectorAll('.login_input')];


createAccount.addEventListener('click', (e) => {
    registration.classList.add('registration--show');
    page.classList.add('page_container--blur');
});

closeBtn.addEventListener('click', () => {
    registration.classList.remove('registration--show');
    page.classList.remove('page_container--blur');
});


inputs.forEach(input => {
    input.addEventListener('input', () => msgError.textContent = "")
})




registrationForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const dataForm = new FormData(registrationForm);
    const value = Object.fromEntries(dataForm.entries());

    const data = await fetch(`${url}/user`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(value)
    });
    const response = await data.json();

    if(response.error){
        msgError.textContent = "Niepoprawne dane";
        return;
    }

    console.log(response);
});

btnLogin.addEventListener('click', async (e) => {
    e.preventDefault();

    const dataForm = new FormData(loginForm);
    const value = Object.fromEntries(dataForm.entries());

    console.log(value)

    try {
        const data = await fetch(`${url}/user/login`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(value)
        });

        if(!data.ok) throw new Error('Invalid data')

        const response = await data.json();

        window.localStorage.setItem('token', response.token);

        console.log('Udało ci się zalogować')


        // window.location.href = `user.html`;
    } catch (error) {
        console.log(error)
        loginError.textContent = 'Niepoprawne dane';
        loginError.classList.remove('login__error--hidden');
    }
})

loginInputs.forEach(input => {
    input.addEventListener('input', () => {
        loginError.textContent = '';
        loginError.classList.add('login__error--hidden');
    })
})