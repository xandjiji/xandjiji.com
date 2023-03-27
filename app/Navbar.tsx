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
        <p className="code text-xs opacity-75 mb-4">
          xandjiji / {currentRoute.children}
        </p>
      )}

      <nav>
        <ul className="flex gap-4 items-center">
          {navItems.map((linkProps) => (
            <li key={linkProps.href}>
              <Link
                {...linkProps}
                className={clsx(
                  currentRoute?.href === linkProps.href
                    ? "font-bold underline-offset-8 decoration-2 hover:text-orange-300 text-orange-400"
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
