"use client"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'
import { CREATE_PROMPT_LINK, HOME_LINK, PROFILE_LINK } from "@/routes/Route"
import useToggleDropdown from "@/hooks/useToggleDropdown"

type NavbarProps = {
    google: {
        id: String,
        name: String,
        type: String,
        signinUrl: String,
        callbackUrl: String
    }
}

export default function Navbar() {
    const { data: session } = useSession();
    const [providers, setProviders] = useState<NavbarProps | null>(null);
    const [isOpen, handleToggleDropdown] = useToggleDropdown(false);

    useEffect(() => {
        const fetchProviders = async () => {
            const res = await getProviders();
            setProviders(res);
        }
        if (!providers) {
            fetchProviders();
        }
    }, [providers])

    return (
        <nav className="w-full top-0 flex-between mb-16 py-3 px-20 backdrop-blur-sm z-50">
            <Link href={HOME_LINK} className="flex gap-2 flex-center">
                <Image src='/assets/images/logo.svg' alt="Iprompt Logo" width={30} height={30} className="object-content" />
                <p className="logo_text">Iprompt</p>
            </Link>

            {/* Desktop Navigation */}
            <div className="sm:flex hidden">
                {
                    session?.user
                        ? <div className="flex gap-3 md:gap-5">
                            <Link href={CREATE_PROMPT_LINK} className="black_btn">Create Prompt</Link>
                            <button type="button" onClick={() => signOut({ callbackUrl: process.env.NEXTAUTH_URL })} className="outline_btn">Sign Out</button>
                            <Link href={PROFILE_LINK}>
                                <Image src={session?.user.image || ''} alt="Profile" width={37} height={37} className="rounded-full" />
                            </Link>
                        </div>
                        : <>
                            {
                                providers &&
                                Object.values(providers).map(provider => (
                                    <button type="button" key={`${provider.name}`} onClick={() => signIn(`${provider.id}`)} className="black_btn">
                                        Sign In
                                    </button>
                                ))
                            }
                        </>
                }
            </div>

            {/* Mobile Navigation */}
            <div className="sm:hidden flex relative">
                {
                    session?.user
                        ? <div className="flex">
                            <Image src={session?.user.image || ''} alt="Profile" width={37} height={37} className="rounded-full" onClick={() => handleToggleDropdown()} />
                            {
                                isOpen &&
                                <div className="dropdown">
                                    <Link href={PROFILE_LINK} className="dropdown_link" onClick={() => handleToggleDropdown()}>
                                        My Profile
                                    </Link>
                                    <Link href={CREATE_PROMPT_LINK} className="dropdown_link" onClick={() => handleToggleDropdown()}>
                                        Create Prompt
                                    </Link>
                                    <button type="button" className="w-full mt-5 black_btn"
                                        onClick={() => {
                                            handleToggleDropdown()
                                            signOut({ callbackUrl: process.env.NEXTAUTH_URL })
                                        }}>
                                        Sign Out
                                    </button>
                                </div>
                            }
                        </div>
                        : <>
                            {
                                providers &&
                                Object.values(providers).map(provider => (
                                    <button type="button" key={`${provider.name}`} onClick={() => signIn(`${provider.id}`)} className="black_btn">
                                        Sign In
                                    </button>
                                ))
                            }
                        </>
                }

            </div>
        </nav>
    )
}
