<template>
    <div class="element text-white">
        <!-- Modal -->
        <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div class="bg-white rounded-lg shadow-xl w-full max-w-lg text-black">
                <!-- Header -->
                <div class="flex items-center justify-between p-4 border-b">
                    <h2 class="text-lg font-semibold">
                        New Message
                    </h2>

                    <button @click="close" class="text-gray-500 hover:text-black text-xl">
                        ×
                    </button>
                </div>

                <!-- Body -->
                <div class="p-4 space-y-4">
                    <div>
                        <label class="block mb-1 font-medium">
                            Recipient
                        </label>

                        <input type="text"
                            class="w-full border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>

                    <div>
                        <label class="block mb-1 font-medium">
                            Message
                        </label>

                        <textarea rows="4"
                            class="w-full border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                    </div>
                </div>

                <!-- Footer -->
                <div class="flex justify-end gap-2 p-4 border-t">
                    <button @click="close" class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
                        Close
                    </button>

                    <button class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                        Send
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    showModal: Boolean
})

const emit = defineEmits(['update:showModal'])

const close = () => {
    emit('update:showModal', false)
}
</script>