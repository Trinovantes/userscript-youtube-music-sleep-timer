<script lang="ts" setup>
import { watch } from 'vue'
import { useTimerStore } from '../store/useTimerStore.ts'
import SleepTimerCancelBtn from './SleepTimerCancelBtn.vue'
import SleepTimerCountdown from './SleepTimerCountdown.vue'
import SleepTimerTimeSelector from './SleepTimerTimeSelector.vue'
import { findDelayedElement } from '../utils/findDelayedElement.ts'
import { useNotificationWatcher } from './useNotificationWatcher.ts'

const { hasActiveToast } = useNotificationWatcher()

const clickPauseBtn = async () => {
    console.groupCollapsed(__NAME__, 'clickPauseBtn')

    const btn = await findDelayedElement('yt-icon-button#play-pause-button button')
    console.info(btn)
    btn.click()

    console.groupEnd()
}

const timerStore = useTimerStore()
watch(() => timerStore.currentState, async (newState) => {
    if (newState !== 'DONE') {
        return
    }

    await clickPauseBtn()
    timerStore.finishTimer()
})
</script>

<template>
    <div
        class="sleep-timer flex-hgap"
        :style="{
            bottom: hasActiveToast ? '160px' : '100px'
        }"
    >
        <div class="flex-hgap">
            <SleepTimerCountdown />
            <SleepTimerCancelBtn />
        </div>
        <div class="flex-vgap">
            <SleepTimerTimeSelector
                submit-btn-label="Start Timer"
                :disabled="!(timerStore.currentState === 'INACTIVE')"
                @submit="timerStore.startTimer"
            />
            <SleepTimerTimeSelector
                submit-btn-label="Add Time"
                :disabled="!(timerStore.currentState === 'ACTIVE')"
                @submit="timerStore.extendTimer"
            />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.sleep-timer{
    position: fixed;
    bottom: 100px;
    left: 20px;
    z-index: 9999;

    background: #222;
    padding: 20px;
    align-items: center;
}
</style>
