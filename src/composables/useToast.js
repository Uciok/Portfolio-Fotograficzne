import { ref } from "vue";

const toasts = ref([]);
let toastId = 0;

export const useToast = () => {
  const addToast = (message, type = "success", duration = 3000) => {
    const id = toastId++;
    toasts.value.push({
      id,
      message,
      type, // success, error, info
    });
    Ō;
    setTimeout(() => {
      removeToast(id);
    }, duration);
  };

  const removeToast = (id) => {
    const index = toasts.value.findIndex((t) => t.id === id);
    if (index > -1) {
      toasts.value.splice(index, 1);
    }
  };

  const success = (message) => addToast(message, "success");
  const error = (message) => addToast(message, "error");
  const info = (message) => addToast(message, "info");

  return {
    toasts,
    success,
    error,
    info,
    removeToast,
  };
};
export default useToast;
