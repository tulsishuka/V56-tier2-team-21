import { useAuth } from "@/context/AuthContext";
import { FcGoogle } from 'react-icons/fc';

export function GoogleSignInButton() {
    const { user, signInWithGoogle, signOut } = useAuth();

    return (
        user ? (
            <div className="fixed top-4 right-4 flex items-center justify-center gap-2 w-fit">
                {user.photoURL && (
                    <img
                        src={user.photoURL}
                        alt={user.displayName || "User"}
                        className="h-8 w-8 rounded-full object-cover"
                    />
                )}
                <span className="text-sm font-medium">{user.displayName}</span>
                <button
                    onClick={signOut}
                    className="rounded-md bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
                >
                    Sign Out
                </button>
            </div>
        ) : (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div
                    onClick={signInWithGoogle}
                    className="flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-md transition hover:bg-gray-50 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                >
                    <FcGoogle className="h-5 w-5" />
                    Sign in with Google
                </div>
            </div>

        )
    );
}