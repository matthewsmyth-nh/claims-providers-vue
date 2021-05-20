<template>
    <div class="flex justify-center mx-auto my-6 max-w-md">
        <RadioGroup class="flex" v-model="plan">
            <slot />
        </RadioGroup>
    </div>
</template>

<script>
import { ref } from 'vue'
import {RadioGroup} from '@headlessui/vue';

export default{
    components : {
        RadioGroup
    },
      setup() {
    const plan = ref('Startup')

    return { plan }
  },
}


</script>