<template>
  <div class="window border border-secondary rounded p-2 mb-2" :class="{expanded: isExpanded}">
    <div class="top-row d-flex" @click="toggleExpand">
      <div class="window-name fw-bold pe-3">{{heater.name}}</div>
      <div class="room-name text-muted">{{heater.roomName}}</div>

      <div class="open-status ms-4" :class="{open: isHeaterOn, closed: !isHeaterOn}">
        <template v-if="isHeaterOn">
          <span class="icon">&#x2B24;</span> On
        </template>
        <template v-else>
          <span class="icon">&#x2716;</span> Off
        </template>
      </div>

      <div class="expand-button ms-auto">
        {{ isExpanded ? '&#9660;' : '&#9658;' }}
      </div>
    </div>
    <template v-if="isExpanded">
      <hr/>
      <div class="details d-flex">
        <button type="button" class="btn btn-secondary me-2" @click="switchHeater">{{ isHeaterOn ? 'Off' : 'On' }} heater</button>
        <button type="button" class="btn btn-danger" @click="deleteHeater">Delete heater</button>
      </div>
    </template>
  </div>
</template>

<script>
import axios from 'axios';
import {API_HOST} from '../../config';
import apiService from '../../service/apiService.js';
export default {
  name: 'HeaterListItem',
  props: ['heater'],
  data: function() {
    return {
      isExpanded: false
    }
  }, 
  computed: {
    isHeaterOn: function() {
      return this.heater.heaterStatus === 'ON'; 
    }
  },
  methods: {
    toggleExpand() {
      this.isExpanded = !this.isExpanded;
    },
 
     switchHeater() {
      apiService.put(`/api/heater/${this.heater.id}/switch?status=${this.heater.heaterStatus==="ON"?0:1}`,null).then(res=>{
      let updatedHeater = res.data;
      this.$emit('heater-updated', updatedHeater);
      }).catch(error => {
        console.log(error)
      });
    },
    async deleteHeater() {
      apiService.delete(`/api/heater/${this.heater.id}`).then(res=>{
         let updatedHeater = res.data;
        if (res.status === 200) {
            this.$emit('heater-deleted', this.heater);
        }
      }).catch(error => {
        console.log(error)
      });
    }
  }
}
</script>

<style lang="scss" scoped>

.open-status {
  .icon {
    position: relative;
  }

  &.open {
    color: #198754;
    .icon {
      font-size: 12px;
      top: -3px;
    }
  }

  &.closed {
    color: #dc3545;
  }
}

.window {
  .top-row {
    cursor: pointer;
  }
}
</style>
