<template>
  <div>
      <template >
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
      heaters: [],
      isLoading:false
    }
  },
  created:  function() {
    this.isLoading=true;
    
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
    } else{
      apiService.get("/api/heater").then(res=>{
        this.heaters=res.data;
         let context=this;
        setTimeout(function(){ 
           context.isLoading=false;
            myToast.text("Done !!!",{
              icon:"check"
            }).goAway(1000);
        }, 2000);
      }).catch(error => {
        console.log(error)
         context.isLoading=false;
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
