import { ViewTemplate } from '../../utils/viewTemplate';
import { View } from '../../utils/view';
import html from './productList.tpl.html';
import { ProductData } from 'types';
import { Product } from '../product/product';
import { analyticsService } from '../../services/analytics.service';

export class ProductList {
  view: View;
  products: ProductData[];

  constructor() {
    this.products = [];
    this.view = new ViewTemplate(html).cloneView();
  }

  attach($root: HTMLElement) {
    $root.innerHTML = '';
    $root.appendChild(this.view.root);
  }

  update(products: ProductData[]) {
    this.products = products;
    this.render();
  }

  render() {
    this.view.root.innerHTML = '';

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // 2.	Просмотр товара в списке товаров (попадание карточек во вьюпорт)
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-id');
            const product = this.products.find((product) => Number(id) === product.id);

            product &&
              analyticsService.dispatchViewCard(
                // Если в свойствах товара есть не пустое поле log, то тип должен быть viewCardPromo.
                Object.keys(product.log).length > 0 ? 'viewCardPromo' : 'viewCard',
                product
              );
          }
        });
      },
      { threshold: 1 }
    );

    this.products.forEach((product) => {
      const productComp = new Product(product);
      productComp.render();
      productComp.attach(this.view.root);

      observer.observe(productComp.view.root);
    });
  }
}
