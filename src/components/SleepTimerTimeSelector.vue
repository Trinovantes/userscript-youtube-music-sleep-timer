<script lang="ts" setup>
import { ref } from 'vue'

defineProps<{
    submitBtnLabel: string
    disabled?: boolean
}>()

const emit = defineEmits<{
    (e: 'submit', minutes: number): void
}>()

const options = [
    {
        label: '15 min',
        value: 15,
    },
    {
        label: '30 min',
        value: 32,
    },
    {
        label: '45 min',
        value: 45,
    },
    {
        label: '60 min',
        value: 60,
    },
    {
        label: '2 hours',
        value: 120,
    },
    {
        label: '3 hours',
        value: 180,
    },
]

const timeSelection = ref<number>(options[0].value)
const onClickSubmit = () => {
    emit('submit', timeSelection.value)
}
</script>

<template>
    <div class="time-selector">
        <select
            :disabled="disabled"
            v-model="timeSelection"
        >
            <option
                v-for="option in options"
                :key="option.value"
                :value="option.value"
            >
                {{ option.label }}
            </option>
        </select>
        <button
            :disabled="disabled"
            @click="onClickSubmit"
        >
            {{ submitBtnLabel }}
        </button>
    </div>
</template>

<style lang="scss" scoped>
.time-selector{
    display: flex;
    width: 200px;

    select{
        flex: 1;
        padding: 4px;
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
    }

    button{
        flex: 1;
        padding: 4px 8px;
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
    }
}
</style>
