<template>
<div>
 Room List Item
</div>

</template>

<script>
import axios from 'axios';
import {API_HOST} from '../../config';

export default {
  name: 'RoomListComponent',
  props: ['room'],
  data: function() {
  },
  methods: {
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
