<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';

const name = ref("");
const email = ref("");
const document = ref("");
const passengerId = ref("");

async function createPassenger() {
  const input = {
    name: name.value,
    email: email.value,
    document: document.value
  };
  try {
    const response = await axios.post("http://localhost:3000/passengers", input);
    passengerId.value = response.data.passenger_id;
  } catch (error) {
    console.error("Erro ao cadastrar passageiro:", error);
  }
}
</script>

<template>
  <form id="createPassenger" class="register">
    <div class="field">
      <label for="name" class="label">Name:</label>
      <input id="name" class="passenger-name" v-model="name" placeholder="Digite seu nome"/>
    </div>
    <div class="field">
      <label for="email" class="label">Email:</label>
      <input id="email" class="passenger-email" v-model="email" placeholder="Digite seu e-mail"/>
    </div>
    <div class="field">
      <label for="document" class="label">Document:</label>
      <input id="document" class="passenger-document" v-model="document" placeholder="Digite o documento"/>
    </div>
    <button class="create-button" @click.prevent="createPassenger">Cadastrar Passageiro</button>
    <div class="id">ID do Passageiro: {{ passengerId }}</div>
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
  }
</style>