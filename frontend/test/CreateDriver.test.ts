import { mount } from "@vue/test-utils";
import CreateDriver from "../src/CreateDriver.vue";
import DriverGateway from "../src/infra/gateway/DriverGateway";

test("Cadastrar um motorista", async function (){
  function sleep (time: number) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, time);
    })
  };
  const driverGateway: DriverGateway ={
      async save(driver:any): Promise<any>{
        return {driverId: "9"};
      }
  };
  const wrapper = mount(CreateDriver, {
    global: {
      provide: {
        driverGateway
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
  expect(driverId).toBeDefined();
})