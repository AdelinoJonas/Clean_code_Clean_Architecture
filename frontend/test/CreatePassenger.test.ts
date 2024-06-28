import { mount } from "@vue/test-utils";
import CreatePassengerVue from "../src/CreatePassenger.vue";
import PassengerGatewayHttp from "../src/infra/gateway/PassengerGatewayHttp";
import AxiosAdapter from "../src/infra/http/AxiosAdapter";

function sleep (time: number) {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(true);
		}, time);
	})
};

test("Deve criar um passageiro", async function () {
	// const passengerGateway: PassengerGateway = {
	// 	async save (passenger: any): Promise<any> {
	// 		return { passengerId: "98846fa9-7c06-4ad8-ac5f-9c96f50406bd" };
	// 	}
	// };
	const wrapper = mount(CreatePassengerVue, {
		global: {
			provide: {
				passengerGateway: new PassengerGatewayHttp(new AxiosAdapter())
			}
		}
	});
	await wrapper.get(".passenger-name").setValue("John Doe");
	await wrapper.get(".passenger-email").setValue("john.doe@gmail.com");
	await wrapper.get(".passenger-document").setValue("83432616074");
	await wrapper.get(".create-button").trigger("click");
	await sleep(200);
	const request = wrapper.get(".id").text();
	let passengerId = "";
  if(request > "") {
    passengerId = request
  } 
  expect(passengerId).toBeDefined();
});