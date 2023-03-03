
export default interface ICouponRepository {
    get(id : String): Promise<any>;
}