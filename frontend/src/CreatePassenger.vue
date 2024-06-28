<script setup lang="ts">
	import { inject, ref } from 'vue';
	import PassengerGateway from './infra/gateway/PassengerGateway';
	import Passenger from './domain/Passenger';

	const passenger = ref(new Passenger());
	const passengerId = ref("");

	const passengerGateway = inject("passengerGateway") as PassengerGateway;

	async function createPassenger () {
    let createdPassengerId = await passengerGateway.save(passenger.value);
    passengerId.value = createdPassengerId;
	}
</script>

<template>
<form id="createPassenger" class="register">
    <div class="field">
      <label for="name" class="label">Name:</label>
      <input id="name" class="passenger-name" v-model="passenger.name" placeholder="Digite seu nome"/>
    </div>
    <div class="field">
      <label for="email" class="label">Email:</label>
      <input id="email" class="passenger-email" v-model="passenger.email" placeholder="Digite seu e-mail"/>
    </div>
    <div class="field">
      <label for="document" class="label">Document:</label>
      <input id="document" class="passenger-document" v-model="passenger.document" placeholder="Digite o documento"/>
    </div>
    <button class="create-button" @click.prevent="createPassenger">Cadastrar Passageiro</button>
    <div class="id">{{ passengerId }}</div>
  </form>
</template>

<style scoped>
  .register {
    width: 400px;
    margin: auto;
    padding: 20px;
    background: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 5px;
  }

  .field {
    margin-bottom: 15px;
  }

  .label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
  }

  .passenger-name,
  .passenger-email,
  .passenger-document {
    width: calc(100% - 10px);
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 3px;
  }

  .create-button {
    display: block;
    width: 100%;
    padding: 10px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    font-size: 16px;
  }

  .create-button:hover {
    background-color: #45a049;
  }

  .id {
    margin-top: 10px;
    font-size: 18px;
    text-align: center;
  }
</style>