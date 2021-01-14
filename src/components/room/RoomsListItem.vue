<template>
<div class="window border border-secondary rounded p-2 mb-2" :class="{expanded: isExpanded}">
    <div class="top-row d-flex" @click="toggleExpand">
      <div class="window-name fw-bold pe-3">{{room.name}}</div>
      <div class="room-name text-muted pe-3">Current Temp:{{room.currentTemperature}}°C </div>
      <div class="room-name text-muted pe-3">Heaters On:{{room.noOfOnHeater}} </div>

      <div class="open-status ms-4" :class="{open: isWindowOpen, closed: !isWindowOpen}">
        <template v-if="isWindowOpen">
          <span class="icon">&#x2B24;</span> Open
        </template>
        <template v-else>
          <span class="icon">&#x2716;</span> Closed
        </template>
      </div>
      <div class="expand-button ms-auto">
        {{ isExpanded ? '&#9660;' : '&#9658;' }}
      </div>
    </div>
    <template v-if="isExpanded">
      <hr/>
      <div class="details d-flex">
       Current temp: {{room.currentTemperature}}°C ||
       Target temp: {{room.targetTemperature}}°C ||
       Floor : {{room.floor}} ||
       No of Heaters {ON}: {{room.noOfOnHeater}} ||
       No of Windows {OPEN}: {{room.noOfOpenWindow}} 

      </div>
      <div class="details d-flex"  style="margin-top:2rem">
        <button type="button" class="btn btn-secondary me-2" @click="switchWindow">{{ isWindowOpen ? 'Close' : 'Open' }}  All Window</button>
        <button type="button" class="btn btn-danger" @click="switchHeater">{{ isHeaterOn ? 'Off' : 'On' }} All Heaters</button>
      </div>
    </template>
  </div>
</template>

<script>
import {API_HOST} from '../../config';

export default {
  name: 'RoomListComponent',
  props: ['room'],
  data: function() {
    return{
      isExpanded:false,
      isHeaterOn:true,
      isWindowOpen:true,
    }
  },
  computed: {
    isWindowOpen: function() {
      return this.isExpanded; 
    }
  },
  methods: {
     toggleExpand() {
      this.isExpanded = !this.isExpanded;
    },
    switchWindow(){
      this.isWindowOpen=!this.isWindowOpen
      this.$emit('window-switch', {data:this.room, status:this.isWindowOpen});
    },
    switchHeater(){
      this.isHeaterOn=!this.isHeaterOn
      this.$emit('heater-switch', {data:this.room, status:this.isHeaterOn});
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
