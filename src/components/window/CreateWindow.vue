<template>
  <div class="windows-create pt-3">

    <div class="row">
      <label for="name" class="col">name</label>
      <input id="name" class="col" v-model='window.name' placeholder="name"><br>
    </div>
    <div class="row">
      <label for="room_id" class="col">room id</label>
      <input id="room_id" class="col" v-model='window.room_id' placeholder="room id"><br>
    </div>
    
    <div class="row">
      <label for="status" class="col">Window Status :</label>
      <!-- <input id="status" class="col" v-model='window.status' placeholder="Window Status :"><br> -->


    <form id="status" class="col">
    <label class="checkbox-inline">
      <input type="checkbox" value="">Open
    </label>
    <label class="checkbox-inline">
      <input type="checkbox" value="">Close
    </label>

  </form>

      
      
      <br>
    </div>
    <button type="button" class="btn btn-secondary me-2" @click="createWindow">Create</button>
  </div>
</template>


<script>
import axios from 'axios';
import apiService from '../../service/apiService.js';
export default {
  name: "WindowNew",
  data: function () {
    return {
      window: {
        
        name: '',
        room_id: '',
        status: false
      }
    }
  },
  methods: {
    async createWindow() {
      let roomResponse = await axios.get(`$apiService/api/room/${this.window.room_id}`);
      let room = roomResponse.data
      let window = {
        
        'name': this.window.name,
        'room': room,
        'status': this.window.status ? 'OPEN' : 'CLOSED'
      }
      let response = await axios.post(`$apiService/api/window`, window);
      let updatedWindow = response.data;
      this.$emit('window-new', updatedWindow);
    }
  }
}
</script>

<style scoped>
.window-new {
  text-align: left;
}
</style>