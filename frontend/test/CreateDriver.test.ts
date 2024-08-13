import { mount } from "@vue/test-utils";
import CreateDriver from "../src/view/CreateDriver.vue";
import DriverGatewayHttp from "../src/infra/gateway/DriverGatewayHttp";
import AxiosAdapter from "../src/infra/http/AxiosAdapter";

function sleep(time: number) {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(true);
		}, time);
	});
}

test("Deve criar um motorista", async function () {
	const wrapper = mount(CreateDriver, {
		global: {
			provide: {
				driverGateway: new DriverGatewayHttp(new AxiosAdapter())
			}
		}
	});
	await wrapper.get(".driver-name").setValue("John Doe");
	await wrapper.get(".driver-email").setValue("john.doe@gmail.com");
	await wrapper.get(".driver-document").setValue("83432616074");
	await wrapper.get(".driver-carPlate").setValue("AAA9999");
	await wrapper.get(".create-button").trigger("click");
	await sleep(200);
	expect(wrapper.get(".id").text()).toBeDefined();
});

test("Não deve criar um motorista com nome inválido", async function () {
	const wrapper = mount(CreateDriver, {
		global: {
			provide: {
				driverGateway: new DriverGatewayHttp(new AxiosAdapter())
			}
		}
	});
	await wrapper.get(".driver-name").setValue("John");
	await wrapper.get(".driver-email").setValue("john.doe@gmail.com");
	await wrapper.get(".driver-document").setValue("83432616074");
	await wrapper.get(".driver-carPlate").setValue("AAA9999");
	await wrapper.get(".create-button").trigger("click");
	await sleep(200);
	expect(wrapper.get(".error").text()).toBe("Invalid name");
});

test("Não deve criar um motorista com email inválido", async function () {
	const wrapper = mount(CreateDriver, {
		global: {
			provide: {
				driverGateway: new DriverGatewayHttp(new AxiosAdapter())
			}
		}
	});
	await wrapper.get(".driver-name").setValue("John Doe");
	await wrapper.get(".driver-email").setValue("john.doe@gmail");
	await wrapper.get(".driver-document").setValue("83432616074");
	await wrapper.get(".driver-carPlate").setValue("AAA9999");
	await wrapper.get(".create-button").trigger("click");
	await sleep(200);
	expect(wrapper.get(".error").text()).toBe("Invalid email");
});

test("Não deve criar um motorista com document inválido", async function () {
	const wrapper = mount(CreateDriver, {
		global: {
			provide: {
				driverGateway: new DriverGatewayHttp(new AxiosAdapter())
			}
		}
	});
	await wrapper.get(".driver-name").setValue("John Doe");
	await wrapper.get(".driver-email").setValue("john.doe@gmail.com");
	await wrapper.get(".driver-document").setValue("83432616075");
	await wrapper.get(".driver-carPlate").setValue("AAA9999");
	await wrapper.get(".create-button").trigger("click");
	await sleep(200);
	expect(wrapper.get(".error").text()).toBe("Invalid cpf");
});

test("Não deve criar um motorista com car plate inválido", async function () {
	const wrapper = mount(CreateDriver, {
		global: {
			provide: {
				driverGateway: new DriverGatewayHttp(new AxiosAdapter())
			}
		}
	});
	await wrapper.get(".driver-name").setValue("John Doe");
	await wrapper.get(".driver-email").setValue("john.doe@gmail.com");
	await wrapper.get(".driver-document").setValue("83432616074");
	await wrapper.get(".driver-carPlate").setValue("AAA999");
	await wrapper.get(".create-button").trigger("click");
	await sleep(200);
	expect(wrapper.get(".error").text()).toBe("Invalid car plate");
});

test("Deve criar um motorista tendo errado o preenchimento antes", async function () {
	const wrapper = mount(CreateDriver, {
		global: {
			provide: {
				driverGateway: new DriverGatewayHttp(new AxiosAdapter())
			}
		}
	});
	await wrapper.get(".driver-name").setValue("John");
	await wrapper.get(".driver-email").setValue("john.doe@gmail.com");
	await wrapper.get(".driver-document").setValue("83432616074");
	await wrapper.get(".driver-carPlate").setValue("AAA9999");
	await wrapper.get(".create-button").trigger("click");
	expect(wrapper.get(".error").text()).toBe("Invalid name");
	await wrapper.get(".driver-name").setValue("John Doe");
	await wrapper.get(".create-button").trigger("click");
	await sleep(200);
	expect(wrapper.get(".id").text()).toBeDefined();
	expect(wrapper.get(".error").text()).toBeDefined();
});
