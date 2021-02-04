const closeBtn = document.querySelector('.registration_exit');
const createAccount = document.querySelector('.login_btn--create');
const page = document.querySelector('.page_container');
const registration = document.querySelector('.registration');


const btnOperations = () => {
    createAccount.addEventListener('click', (e) => {
        registration.classList.add('registration--show');
        page.classList.add('page_container--blur');
    });

    closeBtn.addEventListener('click', () => {
        registration.classList.remove('registration--show');
        page.classList.remove('page_container--blur');
    });
};

export default btnOperations;