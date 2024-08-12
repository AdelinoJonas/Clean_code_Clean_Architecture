<script setup lang="ts">
	import { inject, ref } from 'vue';
	import PassengerGateway from './infra/gateway/PassengerGateway';
	import {PassengerBuilder} from './domain/Passenger';

	const passengerBuilder = ref(new PassengerBuilder());
	const passenger = ref();
  const error = ref("");

	const passengerGateway = inject("passengerGateway") as PassengerGateway;

  async function createPassenger () {
    try {	
      passenger.value = passengerBuilder.value.build();
      let createdPassengerId = await passengerGateway.create(passenger.value);
      passenger.value.passengerId = createdPassengerId;
    } catch (e:any) {
      error.value = e.message;
    }
  }
</script>  

<template>
  <form id="createPassenger" class="register">
    <p class="title">SIGN UP PASSENGER</p>
    <div class="field">
      <label for="name" class="label">Name:</label>
      <input id="name" class="passenger-name" v-model="passengerBuilder.name" placeholder="Digite seu nome"/>
    </div>
    <div class="field">
      <label for="email" class="label">Email:</label>
      <input id="email" class="passenger-email" v-model="passengerBuilder.email" placeholder="Digite seu e-mail"/>
    </div>
    <div class="field">
      <label for="document" class="label">Document:</label>
      <input id="document" class="passenger-document" v-model="passengerBuilder.document" placeholder="Digite o documento"/>
    </div>
    <button class="create-button" @click.prevent="createPassenger">Cadastrar Passageiro</button>
    <div v-if="passenger">
      <div class="id">{{ passenger.passengerId }}</div>
    </div>
  </form>
  <div class="error" v-if="error">{{ error }}</div>
</template>

<style scoped>
  .register {
    width: 400px;
    margin: auto;
    padding: 20px;
    background: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-family: sans-serif;
  }

  .title {
    font-size: 1.5rem;
    text-align: center;
    text-decoration: 3px underline;
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
