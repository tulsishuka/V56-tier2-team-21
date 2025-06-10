import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import githubLogo from '../assets/github-logo.svg';

export function GithubSignInButton({ className }: { className?: string }) {
    const { signInWithGithub, signOut, githubUser } = useAuth();

    return (
        <div className={cn("flex items-center gap-2", className)}>
            {githubUser ? (
                <div className="flex items-center gap-2">
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
                <button
                    onClick={signInWithGithub}
                    className="flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-md transition hover:bg-gray-50 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <img src={githubLogo} className='h-5 w-5' />
                    Sign in with Github
                </button>
            )}
        </div>
    );
}