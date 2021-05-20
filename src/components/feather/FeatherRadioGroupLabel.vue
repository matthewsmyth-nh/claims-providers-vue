<template>
    <slot />
    <RadioGroupLabel>{{value}}</RadioGroupLabel>
</template>

<script> 
import {RadioGroupLabel} from '@headlessui/vue';
export default {
    props: ['value'],
  components : {
      RadioGroupLabel
  }
}
</script>