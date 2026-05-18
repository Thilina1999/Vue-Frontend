<template>
    <div class="element text-white">
        <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-white/30">
            <div class="bg-black rounded-lg shadow-2xl w-full max-w-xl text-white">

                <!-- Header -->
                <div class="flex items-center p-6 pb-2 gap-2">
                    <ContactPerson />
                    <h1 class="text-lg">行の追加</h1>
                </div>

                <!-- Body -->
                <div class="p-6 space-y-2">

                    <div class="grid grid-cols-2 items-center gap-4 pb-4 flex-wrap">
                        <Input_Field class="w-full" text="設備グループID" input="text" v-model="formData.設備グループID" />

                        <Input_Field class="w-full" text="設備グループ名称" input="text" v-model="formData.設備グループ名称" />
                    </div>

                    <div class="grid grid-cols-2 items-center gap-4 pb-4 flex-wrap">
                        <Input_Field class="w-full" text="在庫管理グループID" input="text" v-model="formData.在庫管理グループID" />

                        <Input_Field class="w-full" text="在庫管理グループ名称" input="text" v-model="formData.在庫管理グループ名称" />
                    </div>

                    <div class="grid grid-cols-3 items-center gap-4 flex-wrap">
                        <Input_Field class="w-full" text="設備機番" input="text" v-model="formData.設備機番" />

                        <Input_Field class="w-full" text="基準在庫日数" input="number" v-model="formData.基準在庫日数" />

                        <Input_Field class="w-full" text="基準在庫管理幅" input="number" v-model="formData.基準在庫管理幅" />
                    </div>

                </div>

                <!-- Footer -->
                <div class="flex justify-end gap-4 p-6 pb-7">
                    <button @click="close" class="px-8 py-2 bg-gray-300 rounded hover:bg-gray-400">
                        Close
                    </button>

                    <button class="px-8 py-2 bg-blue-400 text-white rounded hover:bg-blue-500" @click="handleClick">
                        追加
                    </button>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup>
import Input_Field from '../atom/Input_Field.vue'
import ContactPerson from '../../../public/assets/ContactPerson.vue'

defineProps({
    showModal: Boolean,
    formData: Object,
    handleClick: {
        type: Function,
        required: true,
    },
})

const emit = defineEmits(['update:showModal'])

const close = () => {
    emit('update:showModal', false)
}
</script>