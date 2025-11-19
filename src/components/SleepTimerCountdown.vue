<script lang="ts" setup>
import { useTimerStore } from '../store/useTimerStore.ts'

const timerStore = useTimerStore()
</script>

<template>
    <div class="countdown">
        {{ timerStore.durationLabel }}
    </div>
</template>

<style lang="scss" scoped>
.countdown{
    color: white;
    font-size: 48px;
    font-weight: bold;
    font-family: monospace;

    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
