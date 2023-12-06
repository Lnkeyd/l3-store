import { Component } from '../component';
import html from './catalog.tpl.html';

import { ProductList } from '../productList/productList';
import { userService } from '../../services/user.service';

class Catalog extends Component {
  productList: ProductList;

  constructor(props: any) {
    super(props);

    this.productList = new ProductList();
    this.productList.attach(this.view.products);
  }

  render() {
   fetch('/api/getProducts', {
      headers: {
        'x-userid': userService.userId || ''
      }
    }).then(response => response.json()).then(products => this.productList.update(products))
  }
}

export const catalogComp = new Catalog(html);
