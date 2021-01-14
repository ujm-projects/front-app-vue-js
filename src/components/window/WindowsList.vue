<template>
  <div>
    <ul class="nav nav-tabs">
        <li class="nav-item">
          <a class="nav-link " :class="{active: !isCreateWindow, disabled:!isCreateWindow}" aria-current="page" href="#" @click="onCreateWindow">Windows</a>
        </li>
        <li class="nav-item">
          <a class="nav-link " :class="{active: isCreateWindow, disabled:isCreateWindow}" href="#" tabindex="-1" aria-disabled="true"
          @click="onCreateWindow">Create-Window</a>
        </li>
      </ul>
      <template v-if="!isCreateWindow">
        <div class="windows-list pt-3">
          <windows-list-item 
            v-for="window in windows"
            :window="window"
            :key="window.id"  
            @window-updated="updateWindow"
            @window-deleted="deleteWindow"
          >
          </windows-list-item>
        </div>
      </template>
       <template v-if="isCreateWindow">
          <create-window></create-window>
      </template>
  </div>


</template>


<script>
import {API_HOST} from '../../config';
import WindowsListItem from './WindowsListItem';
import apiService from '../../service/apiService.js';
import CreateWindow from './CreateWindow.vue';
export default {
  components: {
    WindowsListItem,
    CreateWindow
  },
  name: 'WindowsList',
  data: function() {
    return {
      /* Initialize windows with an empty array, while waiting for actual data to be retrieved from the API */
      windows: [],
      isCreateWindow:false
    }
  },
  created:  function() {
    let roomId=this.$route.params.roomId;
    let myToast = this.$toasted.show("Loading data..Please wait !!", { 
            icon : {
             name : 'hourglass_bottom'
            }, 
            theme: "toasted-primary", 
            position: "top-right", 
            duration : 5000
        });
    if(roomId) {
      apiService.get(`/api/window/byRoom/${roomId}`).then(res=>{
        this.windows=res.data;
        setTimeout(function(){ 
            myToast.text("Done !!!",{
              icon:"check"
            }).goAway(1000);
        }, 1000);
      }).catch(error => {
        console.log(error)
        myToast.text("Error !!!").goAway(1000);
      });
    } else{
      apiService.get("/api/window").then(res=>{
        this.windows=res.data;
        setTimeout(function(){ 
            myToast.text("Done !!!",{
              icon:"check"
            }).goAway(1000);
        }, 1000);
      }).catch(error => {
        console.log(error)
        myToast.text("Error !!!").goAway(1000);
      });
    }  
    
  },
  methods: {
    updateWindow(newWindow) {
      let index = this.windows.findIndex(window => window.id === newWindow.id);
      this.windows.splice(index, 1, newWindow);
    },
    deleteWindow(removeWindow) {
      let index = this.windows.findIndex(window => window.id === removeWindow.id);
      this.windows.splice(index, 1);
    },
    onCreateWindow(){
      this.isCreateWindow=!this.isCreateWindow
    }
  },
  // created:function(){
    // let myToast = this.$toasted.show("Loading..Please wait !!", { 
    //         icon : {
    //          name : 'hourglass_bottom'
    //         }, 
    //         theme: "toasted-primary", 
    //         position: "top-right", 
    //         duration : 5000
    //     });
        
    //  let myToast = this.$toasted.show(
    //   'hello there, i am a toast !!', {
    //     icon : {
    //         name : 'check',
    //         after : true
    //     }
    //   });
      // myToast.text("Changing the text !!!").goAway(1500);
  // }
}
</script>
