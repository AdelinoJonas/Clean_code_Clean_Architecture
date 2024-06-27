<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';

const name = ref("");
const email = ref("");
const document = ref("");
const carPlate = ref("");
const driverId = ref("");

async function createDriver() {
  const input = {
    name: name.value,
    email: email.value,
    document: document.value,
    carPlate: carPlate.value
  };
  try {
    const response = await axios.post("http://localhost:3000/driver", input);
    driverId.value = response.data.driver_id[0];
  } catch (error) {
    console.error("Erro ao cadastrar motorista", error);
  }
}
</script>

<template>
  <form id="createDriver" class="register" @submit.prevent>
    <div class="field">
      <label for="name" class="label">Name:</label>
      <input id="name" class="driver-name" v-model="name" placeholder="Digite seu nome"/>
    </div>
    <div class="field">
      <label for="email" class="label">Email:</label>
      <input id="email" class="driver-email" v-model="email" placeholder="Digite seu e-mail"/>
    </div>
    <div class="field">
      <label for="document" class="label">Document:</label>
      <input id="document" class="driver-document" v-model="document" placeholder="Digite seu CPF"/>
    </div>
    <div class="field">
      <label for="carPlate" class="label">Car Plate:</label>
      <input id="carPlate" class="driver-carPlate" v-model="carPlate" placeholder="Digite a placa do carro"/>
    </div>
    <button type="button" class="create-button" @click="createDriver()">Create Driver</button>
    <div class="id">ID do Motorista: {{ driverId }}</div>
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

.driver-name,
.driver-email,
.driver-carPlate,
.driver-document {
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
