<template>
<div class="grid grid-cols-2 mt-4 ml-12 palette-secondary">
    <div class="text-yellow-500 font-semibold text-secondary-60">
      Quadris
    </div>
    <div class="flex justify-end pr-12">
      <MenuDropdown :dataSet="dataSet" :otherDataSet="otherDataSet" />
    </div>
</div>
  <div v-show="displayProviders">
    <ProviderList/>
  </div>
  <div v-show="!displayProviders">
    <ClaimsList />
  </div>
</template>

<script>
import ProviderList from './components/ProviderList.vue'
import ClaimsList from './components/ClaimsList.vue'
import MenuDropdown from './components/MenuDropdown.vue'

export default {
  name: 'App',
  data : function(){
    return {
      displayProviders : true,
      dataSet : "Providers",
      otherDataSet: "Claims",
    }
  },
  components: {
    ProviderList,
    ClaimsList,
    MenuDropdown
  },
  methods: {
        toggleData(){
          var temp = this.dataSet;
          this.dataSet = this.otherDataSet;
          this.otherDataSet = temp;
          this.displayProviders = !this.displayProviders;
      }
  }
}
</script>
