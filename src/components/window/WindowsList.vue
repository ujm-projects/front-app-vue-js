<template>
  <div class="windows-list pt-3">
    <windows-list-item 
      v-for="window in windows"
      :window="window"
      :key="window.id"  
      @window-updated="updateWindow"
      @window-delete="deleteWindow"
    >
    </windows-list-item>
  </div>
</template>


<script>
import {API_HOST} from '../../config';
import WindowsListItem from './WindowsListItem';
import apiService from '../../service/apiService.js';
export default {
  components: {
    WindowsListItem
  },
  name: 'WindowsList',
  data: function() {
    return {
      /* Initialize windows with an empty array, while waiting for actual data to be retrieved from the API */
      windows: []
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
  },
  methods: {
    updateWindow(newWindow) {
      /* Find the place of window objectw ith the same Id in the array, and replace it */
      let index = this.windows.findIndex(window => window.id === newWindow.id);
      this.windows.splice(index, 1, newWindow);
    },
    deleteWindow(removeWindow) {
      let index = this.windows.findIndex(window => window.id === removeWindow.id);
      this.windows.splice(index, 1);
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
