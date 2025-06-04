<template>
    <div class="element">
        <br />
        <Title title="ヘルプ" />
        <div class="pt-10">
            <Title title="&middot; お問い合わせ先" />
            <Title_Text class="text-lg block pl-5" :text="`所属：${contact_information.所属}`" />
            <Title_Text class="text-lg block pl-5" :text="`氏名：${contact_information.氏名}`" />
            <Title_Text class="text-lg block pl-5" :text="`メールアドレス：${contact_information.メールアドレス}`" />
            <Title_Text class="text-lg block pl-5" :text="`電話番号：${contact_information.電話番号}`" />
        </div>
        <div class="pt-10">
            <Title title="&middot; 資料" />
            <Title_Text class="text-lg block pl-5" :text="`資料名：${materials.資料名}`" />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Title from '../atom/Title.vue';
import Title_Text from '../atom/Title_Text.vue';
import { loadConfig } from '../../utils/config';

const contact_information = ref({
    所属: "N/A",
    氏名: "N/A",
    メールアドレス: "N/A",
    電話番号: "N/A"
})

const materials = ref({
    資料名: 'N/A'
})

onMounted(() => {
    loadConfig("お問い合わせ先").then(res => {
        contact_information.value = {
            メールアドレス: res?.メールアドレス || "N/A",
            所属: res?.所属 || "N/A",
            氏名: res?.氏名 || "N/A",
            電話番号: res?.電話番号 || "N/A"
        };
    }).catch(err => {
        console.error(err)
    })
    loadConfig("資料").then(res => {
        materials.value = {
            資料名: res?.資料名 || 'N/A'
        }
    }).catch(err => {
        console.error(err)
    })
})
</script>