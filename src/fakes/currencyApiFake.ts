import ICurrencyGateway from "../application/gateway/iCurrencyGateway";

export default class CurrencyApiFake implements ICurrencyGateway {
    constructor() {
    }

    getCurrencies(): Promise<any> {
        throw new Error("Method not implemented.");
    }
    getCurreny(currency: string): number {
        if(currency == "USD") return 3;

        return 1;
    }

}