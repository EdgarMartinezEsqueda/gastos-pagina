import { ref, type Ref } from "vue"

export interface ToastNotification {
  id: number
  type: "success" | "error" | "info" | "warning"
  message: string
  duration: number
}

const toasts: Ref<ToastNotification[]> = ref([])
let nextId = 1

export function useToast() {
  const addToast = (
    type: ToastNotification["type"],
    message: string,
    duration = 3000
  ) => {
    const id = nextId++
    const toast: ToastNotification = { id, type, message, duration }
    
    toasts.value.push(toast)

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id)
      }, duration)
    }

    return id
  }

  const removeToast = (id: number) => {
    const index = toasts.value.findIndex((t) => t.id === id)
    if (index > -1) {
      toasts.value.splice(index, 1)
    }
  }

  const showSuccess = (message: string, duration?: number) => {
    return addToast("success", message, duration)
  }

  const showError = (message: string, duration?: number) => {
    return addToast("error", message, duration)
  }

  const showInfo = (message: string, duration?: number) => {
    return addToast("info", message, duration)
  }

  const showWarning = (message: string, duration?: number) => {
    return addToast("warning", message, duration)
  }

  const clearAllToasts = () => {
    toasts.value = []
  }

  return {
    toasts,
    showSuccess,
    showError,
    showInfo,
    showWarning,
    removeToast,
    clearAllToasts,
  }
}
