<template>
    <Menu as="div" class="relative inline-block text-left">
        <div>
            <MenuButton
                class="cursor-pointer inline-flex w-full flex-col items-start gap-1 rounded-sm bg-[#212121] p-2 text-white shadow-xs ring-1 ring-white ring-inset hover:bg-gray-900">
                <div class="flex w-full justify-between items-center">
                    <span class="text-lg font-semibold">{{ selectedOption }}</span>
                    <ChevronDownIcon class="size-6 text-gray-400" aria-hidden="true" />
                </div>
            </MenuButton>
        </div>

        <transition enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95">
            <MenuItems
                class="absolute right-2 z-10 mt-4 left-2  origin-top-right rounded-sm bg-[#212121] shadow-2xl shadow-black ring-1 ring-black/5 focus:outline-hidden">
                <div class="py-1">
                    <MenuItem v-for="option in options" :key="option.url" v-slot="{ active }">
                    <button @click="selectOption(option.label, option.url)"
                        :class="[active ? 'bg-gray-100 text-black' : 'text-white', 'block w-full px-3 py-2 text-left text-md']">
                        {{ option.label }}
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
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { options } from '../constant/NavMenue'

const STORAGE_KEY = 'selectedDropdownOption'
const selectedOption = ref(localStorage.getItem(STORAGE_KEY) || 'リアルタイム中間在庫画面')

const router = useRouter()

function selectOption(label, route) {
    selectedOption.value = label
    router.push(route)
}

// Persist selection in localStorage
watch(selectedOption, (newVal) => {
    localStorage.setItem(STORAGE_KEY, newVal)
})
</script>