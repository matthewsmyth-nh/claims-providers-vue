<template>
    <div class="pt-6 pb-6">
        <div class="max-w-xl mx-auto">
            <div class="grid grid-cols-2 rounded-t-lg text-xl py-1 palette-primary-variant">       
                <h1 class="col-span-1 ml-6">{{firstColumnTitle}}</h1><h1 class="col-span-1 mx-auto">{{secondColumnTitle}}</h1>
            </div>
        <ul class="overflow-y-auto max-h-96 rounded-b-md palette-primary shadow-24"> 
            <slot />
        </ul>
    </div>
    </div>
</template>

<script>
export default{
name: 'ProviderList',
    props: ['firstColumnTitle','secondColumnTitle']
}
</script>