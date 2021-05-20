<template>
    <div class="pt-6 pb-6">
        <div class="max-w-xl mx-auto">
            <div class="grid grid-cols-2 palette-primary-variant rounded-t-lg font-semibold text-xl py-1">       
                <h1 class="col-span-1 ml-6">Claim Number</h1><h1 class="col-span-1 mx-auto">Patient Hash</h1>
            </div>
        <ul class="overflow-y-auto max-h-96 rounded-b-md palette-primary shadow-24"> 
            <div class="my-2" v-for="c in claims.slice(startIndex, endIndex)" :key="c.node.id">
                <div class="grid grid-flow-col text-lg">
                    <div class="pl-2">
                        <p1>{{c.node.claimNumber}}</p1>
                    </div>
                    <div  class="text-lg text-right pr-12">
                        <p2>{{c.node.patientHash}}</p2>
                    </div>
                </div>
            </div>
        </ul>
        </div>
    </div>
        <div class="pb-2">
      <Pagination :lastNumber="lastPageNumber" />
    </div>
</template>

<script>
import Pagination from './Pagination'

export default{
name: 'ProviderList',
  data: function(){
    return{
      claims: [],
      startIndex : 0,
      endIndex : 25,
      numberOfRows : 250,
      lastPageNumber : 0
    }
  },
   components :{
    Pagination
  },
      created: function () {
      this.getClaims();
      this.calculateLastPageNumber();
  },
    methods:{
     getClaims: function(){
        fetch('http://localhost:3000/graphql',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept' : '*/*',
            },
          body: JSON.stringify({ query: '{allClaims(first: 250) { edges { node {claimNumber patientHash healthPlan id}}}}'}),
        })
        .then(res => res.json())
        .then(json => this.claims = json.data.allClaims.edges);
    },
        changePageTo(pageNumber){
        this.endIndex = pageNumber * 25;
        this.startIndex = this.endIndex - 25;
    },
      calculateLastPageNumber(){
        this.lastPageNumber = this.numberOfRows/this.endIndex;
      }
  }
}
</script>