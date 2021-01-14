

<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light padding">
        <a class="navbar-brand" href="#">VUE-JS</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
            <a class="nav-item nav-link" activehref="#"><router-link to="room">Room</router-link></a>
            <a class="nav-item nav-link" href="#">
            <router-link to="window">Window</router-link>
            </a>
            <a class="nav-item nav-link " href="#">
              <router-link to="heater">heater</router-link>
            </a>
            </div>
        </div>
    </nav>
</template>


<script>
export default {
  name: 'NavMenu'
}
</script>
<style lang="scss" scoped>
.padding {
  
  margin-left: 10rem;
  margin-right: 10rem;
}

</style>