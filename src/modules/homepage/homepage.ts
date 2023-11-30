import { addElement } from '../../utils/helpers';
import { Component } from '../component';
import html from './homepage.tpl.html';

import { ProductList } from '../productList/productList';
import { SearchSuggestions } from '../searchSuggestions/searchSuggestions';

class Homepage extends Component {
  popularProducts: ProductList;
  searchSuggestions: SearchSuggestions;

  constructor(props: any) {
    super(props);

    this.popularProducts = new ProductList();
    this.searchSuggestions = new SearchSuggestions()
    console.log(this.view)

    this.popularProducts.attach(this.view.popular);
    this.searchSuggestions.attach(this.view.searchSuggestions)
  }

  render() {
    fetch('/api/getPopularProducts')
      .then((res) => res.json())
      .then((products) => {
        this.popularProducts.update(products);
      });

    this.searchSuggestions.render()

    const isSuccessOrder = new URLSearchParams(window.location.search).get('isSuccessOrder');
    if (isSuccessOrder != null) {
      const $notify = addElement(this.view.notifies, 'div', { className: 'notify' });
      addElement($notify, 'p', {
        innerText:
          'Заказ оформлен. Деньги спишутся с вашей карты, менеджер может позвонить, чтобы уточнить детали доставки'
      });
    }
  }
}

export const homepageComp = new Homepage(html);
