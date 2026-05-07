<template>
    <div class="element text-white">
        <br />
        <div class="flex items-center space-x-4">
            <Title title="在庫管理 設定" />
        </div>
        <br />
        <div class="flex items-center space-x-5">
            <Title_Text class="text-lg" :text="`データペース: ${page_slected[2].type}`" />
            <Title_Text class="text-lg" :text="`テーブル名: ${page_slected[2].sheet}`" />
            <Submit_button text="行の追加" :icon="Plus" />
            <Submit_button text="データ更新" :icon="Refresh" :disabled="isUpdateDisabled" :handleClick="updateData" />
            <Submit_button text="データ削除" :icon="Delete" :disabled="isDeleteDisabled" />

        </div>
        <br />
        <MGT_Master :editedRows="editedRows" @update:editedRows="editedRows = $event" :deleteRows="deleteRows"
            @update:deleteRows="deleteRows = $event" :getInventoryPageData="getInventoryPageData" :key="inventoryKey" />
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import Title from '../atom/Title.vue';
import Title_Text from '../atom/Title_Text.vue';
import MGT_Master from '../organisms/MGT_Master.vue';
import { useGeneral_MGT_MasterStore } from '../../store/generalStore';
import { page_slected } from '../constant/Data';
import Submit_button from '../atom/Submit_button.vue';

import { updateMgtMaster } from '../../service/mgt_inventory';

import Refresh from '../../../public/assets/Refresh.vue';
import Plus from '../../../public/assets/Plus.vue';
import Delete from '../../../public/assets/Delete.vue';

const mgtStore = useGeneral_MGT_MasterStore()

const editedRows = ref([]);
const deleteRows = ref([]);

const isUpdateDisabled = computed(() => editedRows.value.length === 0)
const isDeleteDisabled = computed(() => deleteRows.value.length === 0 || editedRows.value.length !== 0)

const getInventoryPageData = async (page, perPage) => {
    try {
        const res = await mgtStore.fetchPage(page, perPage, "mgt_store")
        return res
    } catch (err) {
        console.error('Error fetching paginated inventory:', err)
        return {
            data: [],
            meta: {
                page: 1,
                per_page: perPage,
                total_items: 0,
                total_pages: 1
            }
        }
    }
}

const inventoryKey = ref(0)

const refreshTable = () => {
    inventoryKey.value++
}

const updateData = async () => {
    try {
        const payload = editedRows.value
        const res = await updateMgtMaster(payload)
        if (res.status === 200) {

            editedRows.value = []
            mgtStore.clearCache();
            inventoryKey.value++
        }

    } catch (err) {
        console.error("Update failed:", err)
    }
}

</script>