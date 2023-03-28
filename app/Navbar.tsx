"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";

const navItems: {
  href: `/${string}`;
  children: string;
}[] = [
  { href: "/", children: "README.md" },
  { href: "/showcase", children: "showcase" },
  { href: "/commits", children: "commits" },
];

const Navbar = () => {
  const pathname = usePathname();

  const currentRoute = navItems.find(({ href }) => href === pathname);

  return (
    <>
      {!!currentRoute && (
        <p className="font-mono text-xs text-onBackgroundVariant mb-4">
          xandjiji / {currentRoute.children}
        </p>
      )}

      <nav>
        <ul className="flex gap-4 overflow-auto items-center sm:max-w-none max-w-[calc(100vw-40px)] -mb-3 pb-3">
          {navItems.map((linkProps) => (
            <li key={linkProps.href}>
              <Link
                {...linkProps}
                className={clsx(
                  "text-2xl",
                  currentRoute?.href === linkProps.href
                    ? "font-bold underline-offset-8 decoration-2 hover:text-accent text-accent"
                    : "no-underline"
                )}
              />
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
