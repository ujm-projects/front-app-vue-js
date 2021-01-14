<template>
  <div class="windows-list pt-3">

  </div>
</template>


<script>
import RoomListItem from './RoomsListItem';
import apiService from '../../service/apiService.js';
export default {
  components: {
    RoomListItem
  },
  name: 'RoomList',
  data: function() {
    return {
      /* Initialize windows with an empty array, while waiting for actual data to be retrieved from the API */
      windows: []
    }
  },
  created:  function() {
     
  },
  methods: {
  },
}
</script>
