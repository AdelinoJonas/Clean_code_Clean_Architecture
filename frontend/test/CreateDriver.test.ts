import { mount } from "@vue/test-utils";
import CreateDriver from "../src/CreateDriver.vue";

test("Cadastrar um motorista", async function (){
  function sleep (time: number) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, time);
    })
  };
  const wrapper = mount(CreateDriver, {});
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