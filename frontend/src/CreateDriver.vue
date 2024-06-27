<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';

  const name = ref("");
  const email = ref("");
  const document = ref("");
  const carPlate = ref("");
  const driverId = ref("");

  async function createDriver () {
    const input = {
      name: name.value,
      email: email.value,
      document: document.value,
      carPlate: carPlate.value
    };
    const response = await axios.post("http://localhost:3000/driver", input);
    const output = response.data.driver_id[0];
    driverId.value = output;
  }
</script>

<template>
  <form id="createDriver" class="register">
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
      <input id="carPlate" class="driver-carPlate" v-model="carPlate" placeholder="Digite seu CPF"/>
    </div>
    <button class="create-button" @click="createDriver()">Create Driver</button>
    <div class="id">{{driverId.value}}</div>
  </form>
</template>

<style scoped>

</style>