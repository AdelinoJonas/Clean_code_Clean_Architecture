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
  await wrapper.get(".driver-name").setValue("Joana Due");
  await wrapper.get(".driver-email").setValue("joana@gmail.com");
  await wrapper.get(".driver-document").setValue("07382201910");
  await wrapper.get(".driver-carPlate").setValue("AAA9999");
  await wrapper.get(".create-button").trigger("click");
  await sleep(500);
  expect(wrapper.get(".id").text()).toBeDefined();
});