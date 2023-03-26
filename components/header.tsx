import Link from "next/link";

export const Header = () => (
  <header>
    <nav>
      <ul>
        <li>
          <Link href="#">README.md</Link>
        </li>
        <li>
          <Link href="#">Showcase</Link>
        </li>
        <li>
          <Link href="#">Last commits</Link>
        </li>
      </ul>
    </nav>
  </header>
);
