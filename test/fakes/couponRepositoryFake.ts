import ICouponRepository from "../../src/application/repository/iCouponRepository";


export default class CouponRepositoryFake implements ICouponRepository{
    get(id: String): Promise<any> {
        throw new Error("Method not implemented.");
    }
}