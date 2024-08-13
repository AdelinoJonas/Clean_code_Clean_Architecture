<script setup lang="ts">
	import { inject, ref } from 'vue';
	import DriverGateway from '../infra/gateway/DriverGateway';
	import { DriverBuilder } from '../domain/Driver';

	const driverBuilder = ref(new DriverBuilder());
	const driver = ref<{ driverId?: string } | null>(null);
	const error = ref<string>("");

	const driverGateway = inject("driverGateway") as DriverGateway;
	async function createDriver() {
		try {
			const builtDriver = driverBuilder.value.build();
			const driverId = await driverGateway.create(builtDriver);
			driver.value = { driverId }; 
		} catch (e: any) {
			error.value = e.message;
		}
	}
</script>

<template>
  <form id="createDriver" class="register" @submit.prevent>
    <p class="title">SIGN UP DRIVER</p>
    <div class="field">
      <label for="name" class="label">Name:</label>
      <input id="name" class="driver-name" v-model="driverBuilder.name" placeholder="Digite seu nome"/>
    </div>
    <div class="field">
      <label for="email" class="label">Email:</label>
      <input id="email" class="driver-email" v-model="driverBuilder.email" placeholder="Digite seu e-mail"/>
    </div>
    <div class="field">
      <label for="document" class="label">Document:</label>
      <input id="document" class="driver-document" v-model="driverBuilder.document" placeholder="Digite seu CPF"/>
    </div>
    <div class="field">
      <label for="carPlate" class="label">Car Plate:</label>
      <input id="carPlate" class="driver-carPlate" v-model="driverBuilder.carPlate" placeholder="Digite a placa do carro"/>
    </div>
    <button type="button" class="create-button" @click="createDriver">REGISTER</button>
    <div class="id" v-if="driver && driver.driverId">{{ driver.driverId }}</div>
  </form>
  <div class="error" v-if="error">{{ error }}</div>
</template>

<style scoped>
  .register {
    width: 500px;
    height: 60%;
    margin: auto;
    padding: 20px;
    background: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 10px;
    font-family: sans-serif;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    -webkit-box-shadow: 7px 9px 16px 0px rgba(0,0,0,0.75);
    -moz-box-shadow: 7px 9px 16px 0px rgba(0,0,0,0.75);
    box-shadow: 7px 9px 16px 0px rgba(0,0,0,0.75);
  }

  .title {
    font-size: 1.5rem;
    text-align: center;
    text-decoration: 3px underline;
  }

  .field {
    width: 400px;
    margin-bottom: 15px;
  }

  .label {
    display: block;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .driver-name,
  .driver-email,
  .driver-document,
  .driver-carPlate {
    width: calc(100% - 10px);
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 3px;
  }

  .create-button {
    display: block;
    width: 60%;
    padding: 10px;
    background-color: #4CAF50;
    color: #111c15;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-size: 20px;
    font-weight: 600;
    -webkit-box-shadow: 7px 9px 16px 0px rgba(0,0,0,0.75);
    -moz-box-shadow: 7px 9px 16px 0px rgba(0,0,0,0.75);
    box-shadow: 7px 9px 16px 0px rgba(0,0,0,0.75);
  }

  .create-button:hover {
    background-color: #45a049;
  }

  .id {
    margin-top: 10px;
    font-size: 18px;
    text-align: center;
  }

  .error {
    width: 90%;
    border-radius: 10px;
    border: 3px solid rgb(185, 42, 42);
    background-color: rgb(218, 84, 84);
    color: #f2dada;
    font-size: 3rem;
    line-height: 4.5rem;
    font-weight: 500;
    text-align: center;
    position:fixed;
    margin-top: -700px;
  }
</style>