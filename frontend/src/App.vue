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
  }
</script>

<template>
  <form class="passenger-register">
    <div class="field">
      <label for="" class="label">Name:</label>
      <input class="passenger-name" v-model="name"/>
    </div>
    <div class="field">
      <label for="" class="label">Email:</label>
      <input class="passenger-email" v-model="email"/>
    </div>
    <div class="field">
      <label for="" class="label">Document:</label>
      <input class="passenger-document" v-model="document"/>
    </div>
    <button class="create-passenger-button" @click="createPassenger()">Create Passenger</button>
    <div class="passenger-id">{{passengerId}}</div>
  </form>
</template>

<style scoped>

</style>
