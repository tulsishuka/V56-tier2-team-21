import { useAuth } from "@/context/AuthContext";
import githubLogo from '../assets/github-logo.svg';

export function GithubSignInButton() {
    const { signInWithGithub, signOut, githubUser } = useAuth();

    return (
        githubUser ? (
            <div className="fixed top-4 right-4 flex items-center justify-center gap-2 w-fit">
                {githubUser.photoURL && (
                    <img
                        src={githubUser.photoURL}
                        alt={githubUser.displayName || "User"}
                        className="h-8 w-8 rounded-full object-cover"
                    />
                )}
                <span className="text-sm font-medium">{githubUser.displayName}</span>
                <button
                    onClick={signOut}
                    className="rounded-md bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
                >
                    Sign Out
                </button>
            </div>
        ) : (
            <div className="flex items-center justify-center h-[30vh]">
                <div
                    onClick={signInWithGithub}
                    className="flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-md transition hover:bg-gray-50 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer w-fit"
                >
                    <img src={githubLogo} className="h-5 w-5" />
                    Sign in with Github
                </div>
            </div>
        )
    );
}