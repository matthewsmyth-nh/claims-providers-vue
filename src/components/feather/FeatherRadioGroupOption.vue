<template>
    <div class="mx-4 cursor-pointer rounded-md">
        <RadioGroupOption v-slot="{ checked }" :value="value" class="flex">
            <FeatherButton :class="checked ? 'bg-primary' : ''" class="rounded-full h-6 w-6 border-primary border-2 focus:outline-none mr-2 flex justify-center" >
            </FeatherButton>
            <div class="rounded-md ">{{value}}</div>
        </RadioGroupOption>
    </div>
</template>

<script>
import {RadioGroupOption} from '@headlessui/vue';
import { useRippleEffect } from '@/use/useRippleEffect';
import FeatherButton from '@/components/feather/FeatherButton.vue';

export default{
    props: ['value'],
    components : {
        RadioGroupOption,
        FeatherButton
    },
      setup() {
    const { el } = useRippleEffect();
    return { el };
  },

}
</script>