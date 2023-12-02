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
            // Достаём id товара из атрибута href HTML-элемента (a)
            const id = entry.target.getAttribute('href')?.replace(/[^0-9]/g, '');

            Promise.all([
              // Достаём product по id
              fetch(`/api/getProduct?id=${id}`).then((res) => res.json()),
              // Достаём secretKey товара
              fetch(`/api/getProductSecretKey?id=${id}`).then((res) => res.json())
            ]).then((data) =>
              // data[0] - product, data[1] - secretKey
              analyticsService.dispatchViewCard(
                // Если в свойствах товара есть не пустое поле log, то тип должен быть viewCardPromo.
                Object.keys(data[0].log).length > 0 ? 'viewCardPromo' : 'viewCard',
                {
                  // payload: всеСвойстваТовара + secretKey товара
                  ...data[0],
                  secretKey: data[1]
                }
              )
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
