import ICouponRepository from "../src/application/repository/iCouponRepository";
import ValidateCoupon from "../src/application/usecase/ValidateCoupon";
import CouponRepositoryFake from "../src/infra/fakes/couponRepositoryFake";


let validateCoupon: ValidateCoupon;
let couponRepository: ICouponRepository;

beforeEach(function () {
	couponRepository = new CouponRepositoryFake();
	validateCoupon = new ValidateCoupon(couponRepository);
});

test("Must validate a valid dicount coupon", async function () {
	const input = "VALE20"
	const output = await validateCoupon.execute(input);
	expect(output).toBeTruthy();
});

test.skip("Deve validar um cupom de desconto expirado", async function () {
	const input = "VALE10"
	const output = await validateCoupon.execute(input);
	expect(output).toBeFalsy();
});
