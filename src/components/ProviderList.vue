<template>
    <div class="pt-6 pb-6">
        <div class="max-w-xl mx-auto">
            <div class="grid grid-cols-2 rounded-t-lg text-xl py-1 palette-primary-variant">       
                <h1 class="col-span-1 ml-6">Provider</h1><h1 class="col-span-1 mx-auto">Total Claims</h1>
            </div>
        <ul class="overflow-y-auto max-h-96 rounded-b-md palette-primary shadow-24"> 
            <div class="my-2" v-for="p in providers.slice(startIndex, endIndex)" :key="p.node.id">
                <div class="grid grid-flow-col text-lg">
                    <div class="pl-2">
                        <p1>{{p.node.name}}</p1>
                    </div>
                    <div  class="text-right pr-20 text-lg">
                        <p2>{{p.node.claimsByProviderId.totalCount}}</p2>
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
      providers: [],
      startIndex : 0,
      endIndex : 25,
      numberOfRows : 575,
      lastPageNumber : 0
    }
  },
  components :{
    Pagination
  },
      created: function () {
      this.getProviders();
      this.calculateLastPageNumber();
  },
    methods:{
     getProviders: function(){
        fetch('http://localhost:3000/graphql',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept' : '*/*',
            },
          body: JSON.stringify({ query: '{allProviders(first: 575) { edges { node { id name claimsByProviderId {totalCount}}}}}'}),
        })
        .then(res => res.json())
        .then(json => this.providers = json.data.allProviders.edges);
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