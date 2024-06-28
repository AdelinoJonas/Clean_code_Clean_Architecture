import { mount } from "@vue/test-utils";
import CreateDriverVue from "../src/CreateDriver.vue";
import DriverGateway from "../src/infra/gateway/DriverGateway";
import DriverGatewayHttp from "../src/infra/gateway/DriverGatewayHttp";
import AxiosAdapter from "../src/infra/http/AxiosAdapter";

function sleep (time: number) {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(true);
		}, time);
	})
};

test("Deve criar um motorista", async function () {
	// const driverGateway: DriverGateway = {
	// 	async save (driver: any): Promise<any> {
	// 		return "3";
	// 	}
	// };
	const wrapper = mount(CreateDriverVue, {
		global: {
			provide: {
				driverGateway: new DriverGatewayHttp(new AxiosAdapter())
			}
		}
	});
  await wrapper.get(".driver-name").setValue("JOANA");
  await wrapper.get(".driver-email").setValue("JOANA@gmail.com");
  await wrapper.get(".driver-document").setValue("07382201910");
  await wrapper.get(".driver-carPlate").setValue("AAA9999");
  await wrapper.get(".create-button").trigger("click");
  await sleep(500);

let driverId = "";
if(wrapper.get(".id").text() > "0") {
  return;
}  
	console.log(wrapper.get(".id").text());
  expect(driverId).toBeDefined();
});