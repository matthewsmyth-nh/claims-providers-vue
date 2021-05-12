<template>
  <header class="palette-secondary elevation-4 p-4 sticky top-0 z-fixed">
    <div class="flex items-center m-auto max-w-7xl">
      <slot />
    </div>
  </header>
</template>

<script>
export default {
  name: 'FeatherAppBar',
};
</script>