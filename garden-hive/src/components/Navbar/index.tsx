import Link from "next/link";

export default function Navbar() {
    return (
        <header className="sticky top-0 z-50 w-full">
            <div className="bg-gray-900 py-8 text-white">
                <div className="container mx-auto px-5">
                    <nav className="flex flex-row items-center justify-between text-base font-medium leading-relaxed">
                        <div>Menu 1</div>
                        <div>Menu 2</div>
                        <div>
                            <Link href="/sign-up">Sign Up</Link>{" "}
                        </div>
                        <div>Login</div>
                    </nav>
                </div>
            </div>
        </header>
    );
}
