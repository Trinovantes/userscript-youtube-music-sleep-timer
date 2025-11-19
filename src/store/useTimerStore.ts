import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { MAX_SLEEP_TIMER_HOURS } from '../Constants.ts'
import { formatTimeNum } from '../utils/formatTimeNum.ts'

type TimerState =
    | 'INACTIVE'
    | 'ACTIVE'
    | 'DONE'

export const useTimerStore = defineStore('TimerStore', () => {
    const currentState = ref<TimerState>('INACTIVE')
    const durationSec = ref<number>(0)
    const durationLabel = computed<string>(() => {
        let seconds = durationSec.value

        const hours = Math.floor(seconds / 3600)
        seconds -= hours * 3600

        const minutes = Math.floor(seconds / 60)
        seconds -= minutes * 60

        return `${formatTimeNum(hours)}:${formatTimeNum(minutes)}:${formatTimeNum(seconds)}`
    })

    const startTimer = (minutes: number) => {
        if (currentState.value !== 'INACTIVE') {
            throw new Error(`Invalid state:${currentState.value}`)
        }

        console.info(__NAME__, 'startTimer', durationSec.value)
        currentState.value = 'ACTIVE'
        durationSec.value = minutes * 60
    }

    const extendTimer = (minutes: number) => {
        if (currentState.value !== 'ACTIVE') {
            throw new Error(`Invalid state:${currentState.value}`)
        }

        const newDurationSec = durationSec.value + (minutes * 60)
        if ((newDurationSec / 3600) > MAX_SLEEP_TIMER_HOURS) {
            console.warn(`Failed to extendTimer newDurationSec:${newDurationSec}`)
            return
        }

        console.info(__NAME__, 'extendTimer', durationSec.value)
        durationSec.value = newDurationSec
    }

    const cancelTimer = () => {
        if (currentState.value !== 'ACTIVE') {
            throw new Error(`Invalid state:${currentState.value}`)
        }

        console.info(__NAME__, 'cancelTimer', durationSec.value)
        currentState.value = 'INACTIVE'
        durationSec.value = 0
    }

    const finishTimer = () => {
        if (currentState.value !== 'DONE') {
            throw new Error(`Invalid state:${currentState.value}`)
        }

        console.info(__NAME__, 'finishTimer', durationSec.value)
        currentState.value = 'INACTIVE'
        durationSec.value = 0
    }

    let lastMs = Date.now()
    setInterval(() => {
        const nowMs = Date.now()
        const deltaMs = nowMs - lastMs
        lastMs = nowMs

        if (currentState.value !== 'ACTIVE') {
            return
        }

        durationSec.value -= (deltaMs / 1000)
        if (durationSec.value <= 0) {
            currentState.value = 'DONE'
            durationSec.value = 0
        }
    }, 1000)

    return {
        currentState,
        durationLabel,
        startTimer,
        extendTimer,
        cancelTimer,
        finishTimer,
    }
})
