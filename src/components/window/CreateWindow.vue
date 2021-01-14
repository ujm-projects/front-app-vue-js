<template>
  <div >
    <form>
        <div class="form-group">
            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
            <small id="emailHelp" class="form-text text-muted">USE FOR ERROR VALIDATION.</small>
        </div>
        <div class="form-group">
            <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
        </div>
        <div class="form-check">
            <input type="checkbox" class="form-check-input" id="exampleCheck1">
            <label class="form-check-label" for="exampleCheck1">Check me out</label>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>


<script>
import apiService from '../../service/apiService.js';
export default {
  components: {
  },
  name: 'CreateWindow',
  data: function() {
    return {
    }
  },
  created:  function() {
  },
  methods: {

  },
}
</script>
