
import tmplHeader from './header.ejs';
 
export default async () => {
    const strHeader = tmplHeader();
    document.getElementById('app').insertAdjacentHTML("beforebegin", strHeader);
    onRender();
}

function onRender(){
    const path = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        if (link.getAttribute('href') === path) {
            link.classList.add('active');
        }
    });
}