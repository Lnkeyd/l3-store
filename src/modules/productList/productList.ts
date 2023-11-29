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

    this.products.forEach((product) => {
      const productComp = new Product(product);
      productComp.render();
      productComp.attach(this.view.root);

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            // 2.	Просмотр товара в списке товаров (попадание карточек во вьюпорт)
            if (entry.isIntersecting) {
              
              // Достаём secretKey товара
              fetch(`/api/getProductSecretKey?id=${productComp.product.id}`)
              .then((res) => res.json())
              .then((secretKey) => {
                // Если в свойствах товара есть не пустое поле log, то тип должен быть viewCardPromo.
                analyticsService.dispatchViewCard(Object.keys(productComp.product.log).length > 0 ? 'viewCardPromo' : 'viewCard', {
                  // payload: всеСвойстваТовара + secretKey товара
                  ...productComp.product,
                  secretKey 
                });
              });

            }
          });
        },
        { threshold: 1 }
      );

      observer.observe(productComp.view.root);
    });
  }
}
