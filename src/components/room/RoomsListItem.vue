<template>
<div class="window border border-secondary rounded p-2 mb-2" :class="{expanded: isExpanded}">
    <div class="top-row d-flex" @click="toggleExpand">
      <div class="window-name fw-bold pe-3">{{room.name}}</div>
      <div class="room-name text-muted">{{room.currentTemperature}}</div>

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
       Current temp: {{room.currentTemperature}} ||
       Target temp: {{room.targetTemperature}}
      </div>
      <div class="details d-flex">
        <button type="button" class="btn btn-secondary me-2" @click="switchWindow">{{ isWindowOpen ? 'Close' : 'Open' }} window</button>
        <button type="button" class="btn btn-danger disabled">Delete window</button>
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
