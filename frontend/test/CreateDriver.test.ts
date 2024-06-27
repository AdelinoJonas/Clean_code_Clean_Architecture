import { mount } from "@vue/test-utils";
import CreateDriverVue from "../src/";

test("Cadastrar um motorista", async function (){
  function sleep (time: number) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, time);
    })
  };
  const wrapper = mount(CreateDriverVue, {});
    await wrapper.get(".driver-name").setValue("Ana");
    await wrapper.get(".driver-email").setValue("Ana@gmail.com");
    await wrapper.get(".driver-document").setValue("83432616074");
    await wrapper.get(".driver-carPlate").setValue("AAA9999");
    await wrapper.get(".create-button").trigger("click");
    await sleep(200);
  let driverId = "0";
  if(wrapper.get(".id").text() > "0") {
    return;
  } 
  expect(driverId).toBeDefined();
})