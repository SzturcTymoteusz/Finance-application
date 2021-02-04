const btnLogin = document.querySelector('.login_btn');
const loginForm = document.querySelector('.login_form');
const loginError = document.querySelector('.login__error');
const loginInputs = [...document.querySelectorAll('.login_input')];


const loginFormHandling = () => {

    btnLogin.addEventListener('click', async (e) => {
        e.preventDefault();

        const dataForm = new FormData(loginForm);
        const value = Object.fromEntries(dataForm.entries());

        try {
            const data = await fetch(`${window.location.href}user/login`, {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(value)
            });

            if(!data.ok) throw new Error('Invalid data')

            const response = await data.json();

            window.sessionStorage.setItem('token', JSON.stringify(response.token));
            window.sessionStorage.setItem('user', JSON.stringify(response.user));

            loginForm.reset();


            window.location.href = `user.html`;

        } catch (error) {
            console.log(error)
            loginError.textContent = 'Niepoprawne dane';
            loginError.classList.remove('login__error--hidden');
        }
    });

    loginInputs.forEach(input => {
        input.addEventListener('input', () => {
            loginError.textContent = '';
            loginError.classList.add('login__error--hidden');
        })
    });
};

export default loginFormHandling;

