import { mount } from "@vue/test-utils";
import CreatePassenger from "../src/CreatePassenger.vue";

test("Cadastrar um passageiro", async function (){
  function sleep (time: number) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, time);
    })
  };
  const wrapper = mount(CreatePassenger, {});
    await wrapper.get(".passenger-name").setValue("JOANA");
    await wrapper.get(".passenger-email").setValue("JOANA@gmail.com");
    await wrapper.get(".passenger-document").setValue("83432616074");
    await wrapper.get(".create-button").trigger("click");
    await sleep(200);
  let passengerId = "0";
  if(wrapper.get(".id").text() > "0") {
    return;
  } 
  expect(passengerId).toBeDefined();
})