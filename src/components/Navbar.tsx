import { auth } from '@/auth';
import { Logout } from '@/utils/authActions';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/Button';
import { Session } from 'next-auth';
import { BadgePlus, LogOut } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

async function Navbar() {
	const session: Session | null = await auth();

	// console.log("session", session);
	// console.log("session id", session?.id);

	return (
		<header className="px-5 py-3 bg-white font-work-sans shadow-sm">
			<nav className="flex justify-between items-center">
				<Link href="/">
					<Image src="/logo.png" alt="Logo" width={144} height={30} />
				</Link>

				<div className="text-black flex gap-5 items-center">
					{session && session?.user ? (
						<>
							<Link href="/startup/create">
								<span className="max-sm:hidden">create</span>
								<BadgePlus className="size-6 sm:hidden curser-pointer" />
							</Link>

							<form action={Logout}>
								<button type="submit" className="max-sm:hidden">
									Logout
								</button>
								<LogOut className="size-6 sm:hidden curser-pointer" />
							</form>

							<Link href={`/user/${session?.id}`}>
								<Avatar className="size-10">
									<AvatarImage src={session?.user?.image || ''} alt="profile" />
									<AvatarFallback>DM</AvatarFallback>
								</Avatar>
							</Link>
						</>
					) : (
						<>
							{/* <form
                action={async () => {
                  "use server";
                  await signIn("github");
                }}
              >
                <button type="submit">Login</button>
              </form> */}

							<Button>
								<span>Login</span>
							</Button>
						</>
					)}
				</div>
			</nav>
		</header>
	);
}

export default Navbar;
