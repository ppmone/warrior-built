import { getAuth, signInAnonymously, signInWithCustomToken, signOut } from 'firebase/auth';

const authService = (() => {
    const auth = getAuth();

    const loginAnonymously = async () => {
        try {
            const userCredential = await signInAnonymously(auth);
            return userCredential.user;
        } catch (error) {
            console.error("Error signing in anonymously:", error);
            throw error;
        }
    };

    const loginWithCustomToken = async (token) => {
        try {
            const userCredential = await signInWithCustomToken(auth, token);
            return userCredential.user;
        } catch (error) {
            console.error("Error signing in with custom token:", error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Error signing out:", error);
            throw error;
        }
    };

    return {
        loginAnonymously,
        loginWithCustomToken,
        logout,
    };
})();

export default authService;