<template>
    <div>
      <ul class="nav nav-tabs">
        <li class="nav-item">
          <a class="nav-link " :class="{active: !isCreateRoom, disabled:!isCreateRoom}" aria-current="page" href="#" @click="onCreateRoom">Rooms</a>
        </li>
        <li class="nav-item">
          <a class="nav-link " :class="{active: isCreateRoom, disabled:isCreateRoom}" href="#" tabindex="-1" aria-disabled="true"
          @click="onCreateRoom">Create-Room</a>
        </li>
      </ul>
      <template v-if="!isCreateRoom">
       
        <div class="windows-list pt-3" v-if="isLoading" >
          <div class="window border border-secondary rounded p-2 mb-2 expanded" >
            <div class="top-row d-flex ">
            
                <div class="spinner-grow text-center" style="width: 3rem; height: 3rem;" role="status">
                  <span class="sr-only"></span>
                </div>
          
            </div>
           </div>
        </div>

        <div class="windows-list pt-3" v-if="!isLoading">
            <room-list-item 
              v-for="room in rooms"
              :room="room"
              :key="room.id"  
              @heater-switch="heaterSwitch"
              @window-switch="windowSwitch"
            >
            </room-list-item>
        </div>
      </template>
      <template v-if="isCreateRoom">
          <create-room></create-room>
      </template>
    </div>
</template>


<script>
import RoomListItem from './RoomsListItem';
import CreateRoom from './CreateRoom';
import apiService from '../../service/apiService.js';
export default {
  components: {
    RoomListItem,
    CreateRoom
  },
  name: 'RoomList',
  data: function() {
    return {
      rooms: [],
      isCreateRoom:false,
      isLoading:false
    }
  },
  created:  function() {
    this.isLoading=true;
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
      let context=this;
      setTimeout(function(){
        context.isLoading=false; 
          myToast.text("Done !!!",{
            icon:"check"
          }).goAway(1000);
        
      }, 2000);
    }).catch(error => {
      this.isLoading=false; 
      console.log(error)
       myToast.text("Error !!!").goAway(1000);
    });

  },
  methods: {
    windowSwitch(event) {
      let a=event.status?1:0
      apiService.put(`/api/room/${event.data.id}/switchWindows?status=${event.status?1:0}`,null).then(res=>{
        let index = this.rooms.findIndex(room => room.id === res.data.id);
        this.rooms.splice(index, 1, res.data);
      }).catch(error => {
        console.log(error)
      });
    }, 
    heaterSwitch(event) {
      apiService.put(`/api/room/${event.data.id}/switchHeaters?status=${event.status?1:0}`, null ).then(res=>{
        let index = this.rooms.findIndex(room => room.id === res.data.id);
        this.rooms.splice(index, 1, res.data);
      }).catch(error => {
        console.log(error)
      });
    },
    onCreateRoom(){
      this.isCreateRoom=!this.isCreateRoom
    }
  },
}
</script>
