<template>
    <div class="pt-6 pb-6">
        <div class="max-w-xl mx-auto">
            <div class="grid grid-cols-2 bg-blue-400 rounded-t-lg font-semibold text-xl py-1">       
                <h1 class="col-span-1 ml-6">Claim Number</h1><h2 class="col-span-1 mx-auto">Patient Hash</h2>
            </div>
        <ul class="overflow-y-auto max-h-96 rounded-md bg-blue-300 bg-opacity-30 shadow-2xl"> 
            <div class="my-2" v-for="c in claims" :key="c.node.id">
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
</template>

<script>
export default{
name: 'ProviderList',
  data: function(){
    return{
      claims: []
    }
  },
      created: function () {
      this.getClaims();
  },
    methods:{
     getClaims: function(){
        fetch('http://localhost:3000/graphql',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept' : '*/*',
            },
          body: JSON.stringify({ query: '{allClaims(first: 100) { edges { node {claimNumber patientHash healthPlan id}}}}'}),
        })
        .then(res => res.json())
        .then(json => this.claims = json.data.allClaims.edges);
    }
  }
}
</script>