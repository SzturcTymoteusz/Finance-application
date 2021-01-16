const closeBtn = document.querySelector('.registration_exit');
const createAccount = document.querySelector('.login_btn--create');
const registration = document.querySelector('.registration');
const page = document.querySelector('.page_container');
const form = document.querySelector('.registration_form');
const url = 'http://localhost:3000';

createAccount.addEventListener('click', (e) => {
    registration.classList.add('registration--show');
    page.classList.add('page_container--blur');
});

closeBtn.addEventListener('click', () => {
    registration.classList.remove('registration--show');
    page.classList.remove('page_container--blur');
});

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const dataForm = new FormData(form);
    const value = Object.fromEntries(dataForm.entries());

    try {
        const data = await fetch(`${url}/user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(value)
        });
        const response = await data.json();
        console.log(response);

    } catch (error) {
        console.log(error)
    }

})