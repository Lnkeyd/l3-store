import './icons';
import Router from './router';
import { cartService } from './services/cart.service';
import { userService } from './services/user.service';

async function initApp() {
  cartService.init();
  await userService.init()
  new Router()
}

initApp()

setTimeout(() => {
  document.body.classList.add('is__ready');
}, 250);
