<template>
    <Menu as="div" class="relative inline-block text-left">
        <div>
            <MenuButton
                class="cursor-pointer inline-flex w-full flex-col items-start gap-1 rounded-sm bg-[#212121] px-6 py-1.5 text-white shadow-xs ring-inset">
                <span class="text-xs text-gray-400">{{ label }}</span>
                <div class="flex w-full justify-between items-center">
                    <span class="text-lg">{{ selectedLabel }}</span>
                    <ChevronDownIcon class="size-5 text-gray-400" aria-hidden="true" />
                </div>
            </MenuButton>
        </div>
        <transition enter-active-class="transition-all duration-150 ease-[cubic-bezier(0.16,1,0.3,1)]"
            enter-from-class="opacity-0 translate-y-2 scale-[0.97] blur-[1px]"
            enter-to-class="opacity-100 translate-y-0 scale-100 blur-0"
            leave-active-class="transition-all duration-200 ease-[cubic-bezier(0.7,0,0.84,0)]"
            leave-from-class="opacity-100 translate-y-0 scale-100 blur-0"
            leave-to-class="opacity-0 translate-y-2 scale-[0.97] blur-[1px]">
            <MenuItems
                class="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-[#212121] shadow-2xl shadow-black ring-1 ring-black/5 focus:outline-none">
                <div class="max-h-72 overflow-y-auto">
                    <MenuItem v-for="item in dataTransfer" :key="item" v-slot="{ active }"
                        @click="selectSelectedData(item)">
                    <span :class="[active ? 'bg-gray-100 text-black' : 'text-white', 'block px-4 py-2 text-sm']">
                        {{ item }}
                    </span>
                    </MenuItem>
                </div>
            </MenuItems>
        </transition>
    </Menu>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'

const props = defineProps({
    dataTransfer: {
        type: Array,
        required: true
    },
    modelValue: String,
    label: String,
})

const emit = defineEmits(['update:modelValue'])

const tempArray = ref([])

// Update tempArray whenever dataTransfer or modelValue changes
watch(
    [() => props.dataTransfer, () => props.modelValue],
    ([data, selected]) => {
        if (Array.isArray(data)) {
            const trimmed = selected?.trim()
            tempArray.value = data.filter(item => item !== trimmed)
        }
    },
    { immediate: true }
)

const selectedLabel = computed(() => props.modelValue)

function selectSelectedData(value) {
    emit('update:modelValue', value)
}
</script>
