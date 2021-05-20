<template>
<FeatherAppBar >
<div class="grid grid-cols-2 ml-12">
    <div class="text-warning text-overline">
      Quadris
    </div>
    <div class="flex justify-end">
      <MenuDropdown :dataSet="dataSet" :otherDataSet="otherDataSet" />
      <div class="px-4">
      <ColorSchemeToggleButton :is-dark="isDark" @click="toggleDark" />
      </div>
    </div>
</div> 
</FeatherAppBar>
  <div class="elevation-4" v-show="!displayProviders">
    <ClaimsList />
  </div>
  <div class="elevation-4" v-show="displayProviders">
    <ProviderList/>
  </div>
  <div class= "mx-auto max-w-md py-4">
    <HeadlessRadioGroup />
  </div>
  <div>
  <FeatherRadioGroup>
      <FeatherRadioGroupLabel></FeatherRadioGroupLabel>
      <FeatherRadioGroupOption value="Startup"/>
      <FeatherRadioGroupOption value="Business"/>
      <FeatherRadioGroupOption value="Enterprise"/>
  </FeatherRadioGroup>
  </div>
</template>

<script>
 import { ref } from 'vue'
import { useDark, useToggle } from '@vueuse/core';

import ProviderList from './components/ProviderList.vue';
import ClaimsList from './components/ClaimsList.vue';
import MenuDropdown from './components/MenuDropdown.vue';
import FeatherAppBar from './components/feather/FeatherAppBar.vue';
import ColorSchemeToggleButton from '@/components/ColorSchemeToggleButton.vue';
import HeadlessRadioGroup from './components/HeadlessRadioGroup.vue';
import FeatherRadioGroup from './components/feather/FeatherRadioGroup.vue';
import FeatherRadioGroupOption from './components/feather/FeatherRadioGroupOption.vue';
import FeatherRadioGroupLabel from './components/feather/FeatherRadioGroupLabel.vue';
//import FeatherButton from './components/feather/FeatherButton.vue';

export default {
  name: 'App',
  data : function(){
    return {
      displayProviders : true,
      dataSet : "Providers",
      otherDataSet: "Claims",
      startup : 7,
      providers: []
    }
  },
  components: {
    ColorSchemeToggleButton,
    ProviderList,
    ClaimsList,
    MenuDropdown,
    FeatherAppBar,
    HeadlessRadioGroup,
    FeatherRadioGroup,
    FeatherRadioGroupOption,
    FeatherRadioGroupLabel,
  },
  methods: {
        toggleData(){
          var temp = this.dataSet;
          this.dataSet = this.otherDataSet;
          this.otherDataSet = temp;
          this.displayProviders = !this.displayProviders;

          //useToggle(this.displayProviders);
      }
  },
    setup() {
    const isDark = useDark();
    const toggleDark = useToggle(isDark);

    const plan = ref('Startup')

    return {
      isDark,
      toggleDark,
      plan
    }; 
  },
}
</script>
