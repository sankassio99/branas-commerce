import ICouponRepository from "../../src/application/repository/iCouponRepository";


export default class CouponRepositoryFake implements ICouponRepository{
    async get(id: String): Promise<any> {
        if("VALE20"){
            return 20;
        }
        return 1;
    }
}