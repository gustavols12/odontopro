'use client';
import Link from 'next/link';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { LogIn, Menu } from 'lucide-react';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { handleRegister } from '../_actions/login';

export function Header() {
  const navItems = [{ href: '#profissionais', label: 'Profissionais' }];
  const { data: session, status } = useSession();

  async function handleLogin() {
    await handleRegister('github');
  }

  const NavLinks = () => (
    <>
      {navItems.map((item) => (
        <Button
          onClick={() => setIsOpen(false)}
          key={item.href}
          asChild
          className="bg-transparent hover:bg-transparent text-black shadow-none"
        >
          <Link href={item.href} className="text-base">
            {item.label}
          </Link>
        </Button>
      ))}

      {status === 'loading' ? (
        <></>
      ) : session ? (
        <Link
          href="/dashboard"
          className="flex items-center justify-center gap-2 bg-zinc-900 text-white py-1 rounded-md px-4"
        >
          Acessar clinica
        </Link>
      ) : (
        <Button onClick={handleLogin}>
          <LogIn />
          Portal da clinica
        </Button>
      )}
    </>
  );

  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="fixed top-0 right-0 left-0 z-[999] py-4 px-6 bg-white">
      <div className="container mx-auto flex items-center justify-between ">
        <Link href="/" className="text-zinc-900 font-bold text-3xl">
          Odonto
          <span className="text-emerald-500 ">Pro</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-4">
          <NavLinks />
        </nav>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button
              className="text-black hover:bg-transparent"
              variant="ghost"
              size="icon"
            >
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>

          <SheetContent
            side="right"
            className="w-[240px] sm:w-[300px] z-[9999]"
          >
            <SheetTitle></SheetTitle>
            <SheetHeader></SheetHeader>
            <SheetDescription className="px-2 py-2">
              Veja nossos links
            </SheetDescription>

            <nav className="flex flex-col space-y-2 ">
              <NavLinks />
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
