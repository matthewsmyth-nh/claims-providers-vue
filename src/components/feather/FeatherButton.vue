
<template>
  <component :is="tag">
    <slot />
     <div class="feather-ripple" ref="el" />
  </component>
</template>

<script>
import { useRippleEffect } from '@/use/useRippleEffect';

export default {
  name: 'FeatherButton',
  props: {
    tag: {
      type: String,
      default: 'button',
    },
  },
  setup() {
        const { el } = useRippleEffect();
    return { el };
  },
};
</script>