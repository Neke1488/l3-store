import { genUUID } from "../utils/helpers";

class Metrika {
    async eventRoute() {
        this.sendEvent({
            type: 'route',
            payload: {
                url: window.location.pathname,
            },
            timestamp: Date.now(),
        })
    }

    async cartEventView(productProperties: any, secretKey: string) {
        this.sendEvent({
            type: productProperties.log ? 'cartPreView' : 'viewCart',
            payload: {
                ...productProperties, secretKey: secretKey
            },
            timestamp: Date.now(),
        })
    }

    async cartAdd(productProperties: any) {
        this.sendEvent({
            type: 'addToCart',
            payload: {
                ...productProperties
            },
            timestamp: Date.now(),
        })
    }

    async shopEvent(productList: any) {
        const idOrder = genUUID();
        const productsAllPrice = productList.reduce((acc: any, product: any) => (acc += product.salePriceU), 0);
        const idProduct = productList.map((product: any) => product.id);

        this.sendEvent({
            type: 'purchase',
            payload: {
                orderId: idOrder,
                totalPrice: productsAllPrice,
                productIds: idProduct
            },
            timestamp: Date.now(),
        })
    }
    
    private checkStatus(res: any) {
        if (res.ok) return res.json()
        return Promise.reject(res.status)
    }
    private async sendEvent(payload: any) {
        fetch('/api/sendEvent', {
            method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            body: JSON.stringify(payload),
        })
        .then(res => this.checkStatus(res));
    }
}

export const metrikaService = new Metrika();