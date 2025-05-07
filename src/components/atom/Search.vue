<template>
    <div>
        <form class="w-48">
            <label for="default-search"
                class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div class="relative">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg class="w-6 h-6 text-white" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                </div>
                <input type="search" id="default-search"
                    class="block w-full p-3 ps-16 text-lg text-white border border-gray-300 rounded-sm bg-gray-50 focus:ring-white focus:border-white dark:bg-[#212121] dark:border-white dark:placeholder-white dark:text-white dark:focus:ring-white dark:focus:border-white"
                    placeholder="絞込み検索" required />
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: "Search"
};
</script>