import localforage from 'localforage';
import { ProductData } from 'types';

const BD = '__wb-favorites';

class FavoritesService {
  init() {
    this._updCounters();
  }

  async addProduct(product: ProductData) {
    const products = await this.get();
    await this.set([...products, product]);
  }

  async removeProduct(product: ProductData) {
    const products = await this.get();
    await this.set(products.filter(({ id }) => id !== product.id));
  }

  async get(): Promise<ProductData[]> {
    return (await localforage.getItem(BD)) || [];
  }

  async set(data: ProductData[]) {
    await localforage.setItem(BD, data);
    this._updCounters();
  }

  async isInFavorites(product: ProductData) {
    const products = await this.get();
    return products.some(({ id }) => id === product.id);
  }

  private async _updCounters() {
    const products = await this.get();
    const count = products.length >= 10 ? '9+' : products.length;
    const buttonFav = document.querySelector('.favorites');
    
    if (!count) {
        //@ts-ignore
        buttonFav.style.display = 'none';
    } else {
        //@ts-ignore
        buttonFav.style.display = 'block';
    }
    
    //@ts-ignore
    document.querySelectorAll('.js__favs-counter').forEach(($el: HTMLElement) => ($el.innerText = String(count || '')));
  }
}

export const favoriteService = new FavoritesService();
