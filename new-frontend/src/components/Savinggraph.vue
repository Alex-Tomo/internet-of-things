<template>
  <div>
    <pie-chart prefix="£" loading="Buffering..." :colors="['#4BC0C0', '#FF6384', '#FF9F40', '#36A2EB']" :data="graphName"></pie-chart>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data(){
    return{
      graphName: []
    }
  },
   async mounted(){
       var amountofUsers = 0
       var graphName = []
      await axios.get("https://pig-e-bank-api.eu.ngrok.io/contribution").then(resp => {amountofUsers = resp.data.length});
         for(var x = 0; x < amountofUsers; x++){
     await axios.get("https://pig-e-bank-api.eu.ngrok.io/contribution").then(resp => {graphName.push([resp.data[x].Name, resp.data[x].saved])});
  }
  this.graphName = graphName
}
}

</script>

<style>

</style>