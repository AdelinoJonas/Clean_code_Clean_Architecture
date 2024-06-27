<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';

  const name = ref("");
  const email = ref("");
  const document = ref("");
  const passengerId = ref("");

  async function createPassenger () {
    const input = {
      name: name.value,
      email: email.value,
      document: document.value
    };
    const response = await axios.post("http://localhost:3000/passengers", input);
    const output = response.data.passenger_id;
    passengerId.value = output;
    console.log(passengerId.value);
  }
</script>

<template>
  <form id="createPassenger" class="passenger-register">
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
      <input id="document" class="passenger-document" v-model="document" placeholder="Digite seu CPF"/>
    </div>
    <button class="create-passenger-button" @click="createPassenger()">Create Passenger</button>
    <div class="passenger-id">{{passengerId}}</div>
  </form>
</template>

<style scoped>

</style>