export default interface ICurrencyGateway {
    getCurrencies(): Promise<any>;
    getCurreny(currency : string) : number ;
}