<template>
    <div class="element text-white">
        <br />
        <div class="flex items-center space-x-4">
            <Title title="在庫管理 設定" />
        </div>
        <br />
        <div class="flex items-center space-x-4">
            <Title_Text class="text-lg" :text="`データペース: ${page_slected[2].type}`" />
            <Title_Text class="text-lg" :text="`テーブル名: ${page_slected[2].sheet}`" />
        </div>
        <br />
        <MGT_Master :editedRows="editedRows" @update:editedRows="editedRows = $event"
            :getInventoryPageData="getInventoryPageData" />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Title from '../atom/Title.vue';
import Title_Text from '../atom/Title_Text.vue';
import MGT_Master from '../organisms/MGT_Master.vue';
import { useGeneral_MGT_MasterStore } from '../../store/generalStore';
import { page_slected } from '../constant/Data';


const mgtStore = useGeneral_MGT_MasterStore()
const editedRows = ref([]);

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

</script>