<template>
    <RadioGroupLabel class="sr-only"><slot /></RadioGroupLabel>
</template>

<script> 
import {RadioGroupLabel} from '@headlessui/vue';
export default {
  components : {
      RadioGroupLabel
  }
}
</script>