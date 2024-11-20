const header = document.querySelector('.textbox-header');
const content = document.querySelector('.content');

header.addEventListener('click', () => {
    content.classList.toggle('hidden');
    content.classList.toggle('expanded');
});
