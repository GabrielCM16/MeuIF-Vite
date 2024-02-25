import { getAuth, onAuthStateChanged, User } from 'firebase/auth';

export async function getLoggedUserUID(): Promise<string | null> {
    const auth = getAuth();
    
    return new Promise<string | null>((resolve, reject) => {
        onAuthStateChanged(auth, (user: User | null) => {
            if (user) {
                resolve(user.uid);
            } else {
                resolve(null);
            }
        }, (error) => {
            reject(error);
        });
    });
}
