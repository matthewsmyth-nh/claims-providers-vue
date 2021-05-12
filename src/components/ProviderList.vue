<template>
    <div class="pt-6 pb-6">
        <div class="max-w-xl mx-auto">
            <div class="grid grid-cols-2 bg-blue-400 rounded-t-lg font-bold text-xl py-1">       
                <h1 class="col-span-1 ml-6">Provider</h1><h2 class="col-span-1 mx-auto">Total Claims</h2>
            </div>
        <ul class="overflow-y-auto max-h-96 rounded-md bg-blue-300 bg-opacity-30 shadow-2xl"> 
            <div class="my-2" v-for="p in providers" :key="p.node.id">
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
</template>

<script>
export default{
name: 'ProviderList',
  data: function(){
    return{
      providers: []
    }
  },
      created: function () {
      this.getProviders();
  },
    methods:{
     getProviders: function(){
        fetch('http://localhost:3000/graphql',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept' : '*/*',
            },
          body: JSON.stringify({ query: '{allProviders(first: 100) { edges { node { id name claimsByProviderId {totalCount}}}}}'}),
        })
        .then(res => res.json())
        .then(json => this.providers = json.data.allProviders.edges);
    }
  }
}
</script>