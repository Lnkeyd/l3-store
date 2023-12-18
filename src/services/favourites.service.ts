import localforage from 'localforage';
import { ProductData } from 'types';

const FAV_DB = '__wb-favourites';

class FavouritesService {
  async init() {
    const favArray: ProductData[] | null = await localforage.getItem(FAV_DB)
    if (!favArray?.length) {
      this._removeHeaderLink()
    }
  }

  async get(): Promise<ProductData[]> {
    return (await localforage.getItem(FAV_DB)) || [];
  }

  async set(data: ProductData[]) {
    await localforage.setItem(FAV_DB, data);
  }

  async addProduct(product: ProductData) {
    let products = await this.get();
    await this.set(products = [...products, product]);

    // Ссылка должна появляться только при наличии избранных товаров.
    if (products.length === 1) {
      this._addHeaderLink()
    }
  }

  async removeProduct(product: ProductData) {
    let products = await this.get();
    await this.set(products = products.filter(({ id }) => id !== product.id));
    // Ссылка убирается, если нет избранных товаров.
    if (!products.length) {
      this._removeHeaderLink()
    }
  }

  async isInFavourites(product: ProductData) {
    const products = await this.get();
    return products.some(({ id }) => id === product.id);
  }

  async toggleFavourites(product: ProductData) {
    if (await this.isInFavourites(product)) {
        await this.removeProduct(product)
    } else {
        await this.addProduct(product)
    }
  }

  private _removeHeaderLink() {
    document.querySelector('.favourites')?.classList.add('fav-hidden')
  }

  private _addHeaderLink() {
    document.querySelector('.favourites')?.classList.remove('fav-hidden')
  }
}

export const favouritesService = new FavouritesService();
