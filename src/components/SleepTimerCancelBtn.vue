<script lang="ts" setup>
import { useTimerStore } from '../store/useTimerStore.ts'

const timerStore = useTimerStore()
</script>

<template>
    <button
        :disabled="!(timerStore.currentState === 'ACTIVE')"
        @click="timerStore.cancelTimer"
    >
        Cancel
    </button>
</template>

<style lang="scss" scoped>
button{
    border-radius: 4px;
    padding: 4px 8px;
}
</style>
