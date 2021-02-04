const registration = document.querySelector('.registration');
const registrationForm = document.querySelector('.registration_form');
const msgError = document.querySelector('.registration_error');
const inputs = [...document.querySelectorAll('.registration_form input')];
const page = document.querySelector('.page_container');

const url = 'http://localhost:3000';
// const url = 'https://finance-app-szturc.herokuapp.com';


const registrationFormHandling = () => {
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

        window.sessionStorage.setItem('token', JSON.stringify(response.token));
        window.sessionStorage.setItem('user', JSON.stringify(response.user));

        registrationForm.reset();
        registration.classList.remove('registration--show');
        page.classList.remove('page_container--blur');


        window.location.href = `user.html`;
    });

    inputs.forEach(input => {
        input.addEventListener('input', () => msgError.textContent = "")
    })
};

export default registrationFormHandling;