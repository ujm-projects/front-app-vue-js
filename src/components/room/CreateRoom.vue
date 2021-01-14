<template>
  <div >
    <form>
        <div class="form-group row">
            <label for="staticEmail" class="col-sm-3 col-form-label" style="text-aligh:left">Room Name</label>
            <div class="col-sm-9">
            <input type="text" v-model="roomName" class="form-control-plaintext" placeholder="Room 6">
            </div>
        </div>
        <div class="form-group row">
            <label for="inputPassword" class="col-sm-3 col-form-label">Target Temp</label>
            <div class="col-sm-9">
            <input type="number" v-model="tTemp" class="form-control"  placeholder="22.2">
            </div>
        </div>
        <div class="form-group row">
            <label for="inputPassword" class="col-sm-3 col-form-label">Floor</label>
            <div class="col-sm-9">
            <input type="number" v-model="floor" class="form-control"  placeholder="2">
            </div>
        </div>
        <div class="form-group row">
            <label for="inputPassword" class="col-sm-3 col-form-label">Building</label>
            <div class="col-sm-9">
                    <div class="form-control col-sm-9">
                         <select v-model="selected" name="cars" id="cars" style="width:100%"   >
                             <template v-for="building in buildings" >
                                <option :value="building" :key="building.id" >{{building.name}}</option>
                             </template>
                           
                        </select>
                    </div>
            </div>
        </div>
        <div class="form-group row" style="margin-top : 2rem">
            <button type="button" class="btn btn-primary col-sm-2 offset-md-4 " @click="create">Create</button>
            <button type="reset" class="btn btn-danger col-sm-2 offset-md-1" >Reset</button>
        </div>
    </form>
  </div>
</template>


<script>
import apiService from '../../service/apiService.js';
import VSelectBox from 'v-select-box'
export default {
  components: {
      VSelectBox
  },
  name: 'CreateRoom',
  data: function() {
    return {
        buildings:[],
        selected: {},
        floor:0,
        roomName:"",
        tTemp:0,

    }
  },
  created:  function() {
    apiService.get("/api/building").then(res=>{
        this.buildings=res.data;
    }).catch(error => {
        console.log(error)
        myToast.text("Error !!!").goAway(1000);
    });
  },
  methods: {
      create(){
          if(!this.roomName && !this.tTemp && !this.floor && !this.selected){
            this.$toasted.show("Please fill the form correctly !!", { 
                icon : {
                name : 'error_outline'
                }, 
                theme: "toasted-primary", 
                position: "top-right", 
                duration : 5000
            });
          }
          let room={name:this.roomName, floor:this.floor, targetTemperature:this.tTemp, buildingId:this.selected.id}
          apiService.post("/api/building", room).then(res=>{
                this.$toasted.show("Room successfully created !!", { 
                    icon : {
                    name : 'check'
                    }, 
                    theme: "toasted-primary", 
                    position: "top-right", 
                    duration : 5000
                });
            }).catch(error => {
                    debugger
                console.log(error)
                this.$toasted.show(`Error !! : ${error}`, { 
                    icon : {
                    name : 'error_outline'
                    }, 
                    theme: "toasted-primary", 
                    position: "top-right", 
                    duration : 5000
                });
            });
      }
  },
}
</script>
