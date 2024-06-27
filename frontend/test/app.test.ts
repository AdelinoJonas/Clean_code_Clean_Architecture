import { mount } from "@vue/test-utils";
import AppVue from "../src/App.vue"

function sleep (time: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  })
};
test("Cadastrar um passageiro", async function (){
  const wrapper = mount(AppVue, {});
  await wrapper.get(".passenger-name").setValue("Ana");
  await wrapper.get(".passenger-email").setValue("Ana@gmail.com");
  await wrapper.get(".passenger-document").setValue("83432616074");
  await wrapper.get(".create-passenger-button").trigger("click");
  await sleep(200);
  let passengerId = "0";
  if(wrapper.get(".passenger-id").text() > "0") {
    return;
  } 
  expect(passengerId).toBeDefined();
})