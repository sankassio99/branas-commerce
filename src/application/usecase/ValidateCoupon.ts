import ICouponRepository from "../repository/iCouponRepository";

export default class ValidateCoupon {
	
    /**
     *
     */
    constructor(readonly couponRepository: ICouponRepository) {
        
    }

    execute(input: string) {
		throw new Error("Method not implemented.");
	}
}