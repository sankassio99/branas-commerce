import ICouponRepository from "../../src/application/repository/iCouponRepository";
import data from "../../src/infra/data/data";


export default class CouponRepositoryFake implements ICouponRepository{
    async get(id: String): Promise<any> {
        const coupon = data.jsonCoupons.find((element) => element.id == id);
        if(!coupon){
            throw new Error(`Coupon not found`);
        }
        return coupon;
    }
}