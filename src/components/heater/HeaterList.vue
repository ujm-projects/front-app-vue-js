<template>
  <div>
      <template >
        <div class="windows-list pt-3">
          <heater-list-item 
            v-for="heater in heaters"
            :heater="heater"
            :key="heater.id"  
            @heater-updated="updateHeater"
            @heater-deleted="deleteHeater"
          >
          </heater-list-item>
        </div>
      </template>
  </div>
</template>
<script>
import {API_HOST} from '../../config';
import HeaterListItem from './HeatersListItem';
import apiService from '../../service/apiService.js';
export default {
  components: {
    HeaterListItem
  },
  name: 'HeaterList',
  data: function() {
    return {
      /* Initialize windows with an empty array, while waiting for actual data to be retrieved from the API */
      heaters: []
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
      apiService.get(`/api/heater/byRoom/${roomId}`).then(res=>{
        this.heaters=res.data;
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
      apiService.get("/api/heater").then(res=>{
        this.heaters=res.data;
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
    updateHeater(heater) {
      let index = this.heaters.findIndex(window => window.id === heater.id);
      this.heaters.splice(index, 1, heater);
    },
    deleteHeater(heater) {
      let index = this.heaters.findIndex(window => window.id === heater.id);
      this.heaters.splice(index, 1);
    },
  },

}
</script>
