<template>
    <div class="flex justify-center mx-auto my-6 max-w-md">
        <RadioGroup class="flex" v-model="inputVal">
            <slot />
        </RadioGroup>
    </div>
</template>

<script>
//import { ref } from 'vue'
import {RadioGroup} from '@headlessui/vue';

export default{
    props:['modelValue'],
    components : {
        RadioGroup
    },
    computed: {
    inputVal: {
      get() {
        return this.modelValue;
      },
      set(val) {
        this.$emit('input', val);
      }
    }
  }
}
</script>