<template>
  <FeatherButton
    class="btn-text rounded-full px-1 py-1"
    tabindex="-1"
    type="Button"
    :aria-label="[isDark ? 'Enable Light Mode' : 'Enable Dark Mode']"
  >
    <svg
      v-if="isDark"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      height="24"
      viewBox="0 0 24 24"
      width="24"
    >
      <path
        d="M9.27,4.49c-1.63,7.54,3.75,12.41,7.66,13.8C15.54,19.38,13.81,20,12,20c-4.41,0-8-3.59-8-8C4,8.55,6.2,5.6,9.27,4.49 M11.99,2.01C6.4,2.01,2,6.54,2,12c0,5.52,4.48,10,10,10c3.71,0,6.93-2.02,8.66-5.02c-7.51-0.25-12.09-8.43-8.32-14.97 C12.22,2.01,12.11,2.01,11.99,2.01L11.99,2.01z"
      />
    </svg>
    <svg v-else xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24" viewBox="0 0 24 24" width="24">
      <path
        d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.79zM1 10.5h3v2H1zM11 .55h2V3.5h-2zm8.04 2.495l1.408 1.407-1.79 1.79-1.407-1.408zm-1.8 15.115l1.79 1.8 1.41-1.41-1.8-1.79zM20 10.5h3v2h-3zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm-1 4h2v2.95h-2zm-7.45-.96l1.41 1.41 1.79-1.8-1.41-1.41z"
      />
    </svg>
  </FeatherButton>
</template>

<script>
import FeatherButton from '@/components/feather/FeatherButton.vue';
export default {
  name: 'ColorSchemeToggleButton',
  components: {
    FeatherButton,
  },
  props: {
    isDark: Boolean,
    toggleDark: Function,
  },
};
</script>