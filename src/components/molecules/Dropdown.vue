<template>
    <Menu as="div" class="relative inline-block text-left">
        <div>
            <MenuButton
                class="inline-flex w-full justify-start lg:gap-x-56 md:gap-x-32 sm:gap-x-12 rounded-sm bg-[#212121]  px-4 py-2 text-md font-semibold text-white shadow-xs ring-1 ring-white ring-inset hover:bg-gray-900">
                {{ selectedOption }}
                <ChevronDownIcon class="size-5 text-white" aria-hidden="true" />
            </MenuButton>
        </div>

        <transition enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95">
            <MenuItems
                class="absolute  z-10 mt-2 w-fit origin-top-right rounded-md bg-[#212121] shadow-lg ring-1 ring-black/5 focus:outline-hidden">
                <div class="py-1">
                    <MenuItem v-slot="{ active }">
                    <button @click="selectOption('リアルタイム中間在庫画面', '/')"
                        :class="[active ? 'bg-gray-100 text-black' : 'text-white', 'block w-full px-4 py-2 text-left text-md']">
                        リアルタイム中間在庫画面
                    </button>
                    </MenuItem>

                    <MenuItem v-slot="{ active }">
                    <button @click="selectOption('リアルタイム標札ステータス', '/リアルタイム標札ステータス')"
                        :class="[active ? 'bg-gray-100 text-black' : 'text-white', 'block w-full px-4 py-2 text-left text-md']">
                        リアルタイム標札ステータス
                    </button>
                    </MenuItem>

                    <MenuItem v-slot="{ active }">
                    <button @click="selectOption('リアルタイム中間在庫余力日数', '/days-left')"
                        :class="[active ? 'bg-gray-100 text-black' : 'text-white', 'block w-full px-4 py-2 text-left text-md']">
                        リアルタイム中間在庫余力日数
                    </button>
                    </MenuItem>
                </div>
            </MenuItems>
        </transition>
    </Menu>
</template>

<script setup>
defineOptions({
    name: 'Dropdown'
})

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const selectedOption = ref('リアルタイム中間在庫画面')

const router = useRouter()

function selectOption(label, route) {
  selectedOption.value = label
  router.push(route)
}

</script>