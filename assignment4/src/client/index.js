import 'bootstrap';
import Navigo from 'navigo';
import './scss/styles.scss';
import './img/Image.jpg';

import HeaderComponent from './app/components/header/header.js';
import FooterComponent from './app/components/footer/footer.js';
import HomeComponent from './app/pages/home/home.js';
import AboutComponent from './app/pages/about/about.js';
import AddComponent from './app/pages/add/add.js';
import ContactComponent from './app/pages/contact/contact.js';
import ListComponent from './app/pages/list/list.js';

const renderContent = async (component) => {
    await component();
};

window.addEventListener('load', () => {
    HeaderComponent();
    FooterComponent();
});

const router = new Navigo('/');

router
.on('/',HomeComponent)
.on('/about',AboutComponent)
.on('/add',AddComponent)
.on('/contact',ContactComponent)
.on('/list',ListComponent)
.resolve();

document.addEventListener('click',event => {
if(event.target.attributes['route']) {
    event.preventDefault();
    router.navigate(event.target.attributes['route'].value);
}
});
  

