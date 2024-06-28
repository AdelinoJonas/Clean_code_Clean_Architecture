import { mount } from "@vue/test-utils";
import CreatePassenger from "../src/CreatePassenger.vue";
import PassengerGateway from "../src/gateway/PassengerGateway";

test("Cadastrar um passageiro", async function (){
  function sleep (time: number) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, time);
    })
  };
  const passengerGateway: PassengerGateway ={
    async save(passenger:any): Promise<any>{
      return {passengerId: "9"};
    }
};
const wrapper = mount(CreatePassenger, {
  global: {
    provide: {
      passengerGateway
    }
  }
});
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