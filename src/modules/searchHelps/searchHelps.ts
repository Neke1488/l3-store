import { ViewTemplate } from '../../utils/viewTemplate';
import { View } from '../../utils/view';
import html from './searchHelps.tpl.html';
import { ProductData } from 'types';

export class SearchHelps {
    view: View;
    products: ProductData[];

    constructor(html: any) {
        this.products = [];
        this.view = new ViewTemplate(html).cloneView();
    }

    attach($root: HTMLElement) {
        $root.innerHTML = '';
        $root.appendChild(this.view.root);
    }

    render() {
        this.view.example.innerHTML = 'Например, ';
        this.view.firstProduct.innerHTML = 'чехол iphone 13 pro';
        this.view.secondProduct.innerHTML = 'коляски agex';
        this.view.thirdProduct.innerHTML = 'яндекс станция 2';
    }
}

export const searchHelpsComp = new SearchHelps(html);
