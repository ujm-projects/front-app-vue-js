<template>
  <div class="windows-list pt-3">
      <room-list-item 
      v-for="room in rooms"
      :room="room"
      :key="room.id"  
    >
    </room-list-item>
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
      rooms: []
    }
  },
  created:  function() {
    let myToast = this.$toasted.show("Loading data..Please wait !!", { 
            icon : {
             name : 'hourglass_bottom'
            }, 
            theme: "toasted-primary", 
            position: "top-right", 
            duration : 5000
        });
     apiService.get("/api/room").then(res=>{
      this.rooms=res.data;
     setTimeout(function(){ 
        myToast.text("Done !!!",{
          icon:"check"
        }).goAway(1000);
     }, 1000);
    }).catch(error => {
      console.log(error)
       myToast.text("Error !!!").goAway(1000);
    });

  },
  methods: {
  },
}
</script>
