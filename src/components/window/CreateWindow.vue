<template>
  <div class="windows-create pt-3">
      <form>
          <div class="form-group row">
              <label  class="col-sm-3 col-form-label" style="text-aligh:left">Window Name</label>
              <div class="col-sm-9">
              <input type="text" v-model="windowName" class="form-control-plaintext" placeholder="Window 9">
              </div>
          </div>
          <div class="form-group row">
              <label  class="col-sm-3 col-form-label">Window Status</label>
              <div class="col-sm-9">
                <div class="form-control col-sm-9"  >
                  <select  v-model="windowStatus" name="status" style="width:100%">
                    <option selected value="CLOSE">CLOSE</option>
                    <option value="OPEN">OPEN</option>
                  </select>
                </div>
              </div>
          </div>
          <div class="form-group row">
              <label for="inputPassword" class="col-sm-3 col-form-label">Room</label>
              <div class="col-sm-9">
                      <div class="form-control col-sm-9">
                          <select v-model="selectedRoom" name="rooms"  style="width:100%"   >
                              <template v-for="room in rooms" >
                                  <option :value="room" :key="room.id" >{{room.name}}</option>
                              </template>
                          </select>
                      </div>
              </div>
          </div>
          <div class="form-group row" style="margin-top : 2rem">
              <button type="button" class="btn btn-primary col-sm-2 offset-md-4 " @click="createWindow">Create</button>
              <button type="reset" class="btn btn-danger col-sm-2 offset-md-1" >Reset</button>
          </div>
      </form>    
   </div>
</template>


<script>
import axios from 'axios';
import apiService from '../../service/apiService.js';
export default {
  name: "CreateWindow",
  data: function () {
    return {
      selectedRoom:{},
      selectedBuilding:{},
      name:"",
      rooms:[],
      windowStatus:""
    }
  },
  created:  function() {
    apiService.get("/api/room").then(res=>{
        this.rooms=res.data;
    }).catch(error => {
        console.log(error)
        myToast.text("Error !!!").goAway(1000);
    });
  },
  methods: {
     createWindow() {
       if(!this.windowName || !this.windowStatus || !this.selectedRoom.id || this.selectedRoom.id === undefined){
          this.$toasted.show("Please fill the form correctly !!", { 
              icon : {
              name : 'error_outline'
              }, 
              theme: "toasted-primary", 
              position: "top-right", 
              duration : 5000
          });
          return;
        }
        let window = {
          'name': this.windowName,
          'roomId':this.selectedRoom.id,
          'windowStatus': this.windowStatus
        };
        apiService.post("/api/window", window).then(res=>{
            this.$emit('window-created', res.data);
                this.$toasted.show("Window successfully created !!", { 
                    icon : {
                    name : 'check'
                    }, 
                    theme: "toasted-primary", 
                    position: "top-right", 
                    duration : 5000
                });
          }).catch(error => {
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
  }
}
</script>

<style scoped>
.window-new {
  text-align: left;
}
</style>