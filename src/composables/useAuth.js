import { ref } from "vue";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase/config";
import { useToast } from "vue-toastification";

const user = ref(null);
const error = ref(null);
const loading = ref(false);

// Sprawdź czy user jest zalogowany
onAuthStateChanged(auth, (currentUser) => {
  user.value = currentUser;
});

export const useAuth = () => {
  const toast = useToast();

  // Rejestracja
  const signup = async (email, password) => {
    error.value = null;
    loading.value = true;

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      user.value = res.user;
      return res.user;
    } catch (err) {
      error.value = getErrorMessage(err.code);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // Logowanie
  const login = async (email, password) => {
    error.value = null;
    loading.value = true;

    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      user.value = res.user;
      return res.user;
    } catch (err) {
      error.value = getErrorMessage(err.code);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // Wylogowanie
  const logout = async () => {
    try {
      await signOut(auth);
      user.value = null;
      toast.success("Wylogowano pomyślnie");
    } catch (err) {
      error.value = "Błąd podczas wylogowywania";
      toast.error(error.value);
      throw err;
    }
  };

  // Tłumaczenie błędów Firebase
  const getErrorMessage = (code) => {
    const errors = {
      "auth/email-already-in-use": "Ten email jest już zarejestrowany",
      "auth/invalid-email": "Nieprawidłowy adres email",
      "auth/weak-password": "Hasło musi mieć min. 6 znaków",
      "auth/user-not-found": "Nie znaleziono użytkownika",
      "auth/wrong-password": "Nieprawidłowe hasło",
      "auth/invalid-credential": "Nieprawidłowy email lub hasło",
      "auth/too-many-requests": "Za dużo prób. Spróbuj później",
    };
    return errors[code] || "Wystąpił nieznany błąd";
  };

  return {
    user,
    error,
    loading,
    signup,
    login,
    logout,
  };
};
