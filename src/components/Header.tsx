import { GoogleSignInButton } from "./GoogleSignInButton";


export function Header() {
  return (
    <header className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold">Resource Helper</h1>
        {/* Navigation links */}
      </div>
      
      <GoogleSignInButton />
    </header>
  );
}