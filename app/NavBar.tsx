'use client';

import Link from "next/link";
import {AiFillBug} from "react-icons/ai";
import {usePathname} from "next/navigation";
import classnames from 'classnames'
import {Avatar, Box, Container, DropdownMenu, Flex, Text} from "@radix-ui/themes";
import {useSession} from "next-auth/react";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

const NavBar = () => {
    const currentPath = usePathname();
    const { status, data : session } = useSession();
    const links = [
        {label: "Dashboard", href: "/"},
        {label: "Issues", href: "/issues"},
    ]
    return (
        <nav className={"border-b mb-5 px-5 py-3"}>
            <Container>
                <Flex justify="between">
                    <Flex align={"center"} gap={"3"}>
                        <Link href="/">
                            <AiFillBug/>
                        </Link>
                        <ul className={"flex space-x-6"}>
                            {links.map(link =>
                                <li key={link.href}>
                                    <Link className={classnames({
                                        'text-zinc-900': link.href === currentPath,
                                        'text-zinc-500': link.href !== currentPath,
                                        'hover:text-zinc-800 transition-colors': true

                                    })}
                                          href={link.href}>{link.label}</Link>
                                </li>
                            )}
                        </ul>
                    </Flex>
                    <Box>
                        { status === "loading" && <Skeleton width={"3rem"} /> }
                        { status === "authenticated" &&
                            <DropdownMenu.Root>
                                <DropdownMenu.Trigger>
                                    <Avatar className={"cursor-pointer"} size={"2"} radius={"full"} fallback="?" src={session!.user!.image!} />
                                </DropdownMenu.Trigger>
                                <DropdownMenu.Content>
                                    <DropdownMenu.Label>
                                        <Text size={"2"}>{ session?.user?.name }</Text>
                                    </DropdownMenu.Label>
                                    <DropdownMenu.Item>
                                        <Link href={"/api/auth/signout"}>Logout</Link>
                                    </DropdownMenu.Item>
                                </DropdownMenu.Content>
                            </DropdownMenu.Root>
                        }
                        { status === "unauthenticated" && <Link href={"/api/auth/signin"}>Login</Link> }
                    </Box>
                </Flex>
            </Container>
        </nav>
    )
}

export default NavBar;