import { favouritesService } from '../../services/favourites.service';
import html from './favourites.tpl.html';
import { Component } from '../component';
import { ProductList } from '../productList/productList';

class Favourites extends Component {
  productList: ProductList;

  constructor(props: any) {
    super(props);

    this.productList = new ProductList();
    this.productList.attach(this.view.favourites);
  }

  async render() {
    const products = await favouritesService.get()
    this.productList.update(products);
  }

}

export const favouritesComp = new Favourites(html);
