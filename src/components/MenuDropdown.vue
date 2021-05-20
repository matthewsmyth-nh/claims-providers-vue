<template>
  <div class="w-56 text-right top-16">
    <Menu as="div" class="relative inline-block text-left">
      <div>
        <MenuButton
          class="inline-flex justify-center w-full px-4 py-2 bg-warning text-background hover:bg-warning-60 rounded-md focus:bg-opacity-20 focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-opacity-75"
        >
          {{dataSet}}
        </MenuButton>
      </div>

      <transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <MenuItems
          class="absolute right-0 w-56 mt-2 origin-top-right palette-warning bg-foreground hover:bg-foreground-50 text-background divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <div class="px-1 py-1">
            <MenuItem v-slot="{ active }">
              <button @click="toggleData()"
                :class="[
                  active ? 'bg-violet-500 text-gray-600' : 'text-gray-900',
                  'group flex rounded-md items-center w-full px-2 py-2 text-sm',
                ]"
              >
                {{otherDataSet}}
              </button>
            </MenuItem>
          </div>
        </MenuItems>
      </transition>
    </Menu>
  </div>
</template>

<script>
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'

export default {
  props : ['dataSet', 'otherDataSet'],
  components: {
    Menu,
    MenuButton,
    MenuItems,
    MenuItem
  },
  methods: {
      toggleData(){
          this.$parent.$parent.toggleData();
      }
  }
}
</script>
