const btnOpenExpenses = [...document.querySelectorAll('.content__option')][0];
const btnOpenEditProfile = [...document.querySelectorAll('.content__option')][1];
const windowExpenses = document.querySelector('.expenses');
const windowEditProfile = document.querySelector('.edit-profile');


btnOpenExpenses.addEventListener('click', () => {
    windowExpenses.classList.remove('expense--hidden');
    windowEditProfile.classList.add('edit-profile--hidden');
});

btnOpenEditProfile.addEventListener('click', () => {
    windowExpenses.classList.add('expense--hidden');
    windowEditProfile.classList.remove('edit-profile--hidden');
})
// console.log(windowExpenses);
// console.log(windowEditProfile);
