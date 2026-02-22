import { onBeforeUnmount, onMounted, ref } from 'vue'

export function useNotificationWatcher() {
    const hasActiveToast = ref(false)
    const updateToastState = () => {
        const containers = document.querySelectorAll('yt-notification-action-renderer#notification')
        let foundToast = false

        for (const container of containers) {
            for (const child of container.children) {
                foundToast ||= child.checkVisibility()
            }
        }

        hasActiveToast.value = foundToast
    }

    let intervalId: number | null = null
    onMounted(() => {
        intervalId = window.setInterval(updateToastState, 1000)
    })
    onBeforeUnmount(() => {
        if (intervalId === null) {
            return
        }

        clearInterval(intervalId)
    })

    return {
        hasActiveToast,
    }
}
