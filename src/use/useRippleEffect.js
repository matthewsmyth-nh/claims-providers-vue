import { onMounted, ref, watchEffect } from 'vue';

import { applyRippleBehavior } from '@/utils/ripple';

export function useRippleEffect() {
  const el = ref();
  const boundsEl = ref();
  const inputEl = ref();
  const triggerEl = ref();

  onMounted(() => {
    watchEffect((onInvalidate) => {
      try {
        const dispose = applyRippleBehavior(el.value, {
          boundsEl: boundsEl.value,
          inputEl: inputEl.value,
          triggerEl: triggerEl.value,
        });

        onInvalidate(() => {
          dispose();
        });
      } catch (error) {
        // console.log(error);
      }
    });
  });

  return {
    // ref for element representing the ripple (typical a child div)
    el,
    // optional - ref for element defining the ripple effect bounds (if not parent)
    boundsEl,
    // optional - ref for input element associated with ripple effect (if not parent)
    inputEl,
    // optional - ref for trigger element for the ripple effect (if not input parent)
    triggerEl,
  };
}