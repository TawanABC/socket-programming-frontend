"use client";

import {
	Home01Icon,
	// PaintBoardIcon,
	Settings01Icon,
	Chatting01Icon,
} from "hugeicons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
	{ name: "Home", href: "/home", icon: Home01Icon },
	{ name: "Chat", href: "/chat", icon: Chatting01Icon },
	{ name: "Settings", href: "/home/setting", icon: Settings01Icon },
];

export default function NavLinks() {
	const pathname = usePathname();

	return (
		<>
			{links.map((link) => {
				const LinkIcon = link.icon;
				return (
					<Link
						key={link.name}
						href={link.href}
						prefetch={true}
						className={clsx(
							"flex h-[64px] items-center justify-center gap-2 p-3 text-sm font-medium hover:bg-secondary hover:text-accent md:flex-none md:justify-start md:px-3 md:py-2",
							{
								"bg-[#e0e0e0] text-accent":
									pathname === link.href,
							},
						)}
					>
						<LinkIcon className="w-6" />
						<p className="hidden md:block">{link.name}</p>
					</Link>
				);
			})}
		</>
	);
}
