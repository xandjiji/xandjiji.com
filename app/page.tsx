import clsx from "clsx";

const Strong = ({ className, ...props }: JSX.IntrinsicElements["strong"]) => (
  <strong className={clsx(className, "text-accent font-mono")} {...props} />
);

export default function Home() {
  return (
    <main className="text-sm text-onBackgroundVariant">
      <p>
        A creator first, software engineer second. Mostly focused on web
        development.
      </p>

      <ul className="my-6 list-disc grid gap-1 marker: list-inside marker:bg-onBackground">
        <li>
          Love <Strong>React.js</Strong> and everything that orbits around it
        </li>

        <li>
          Currently working at{" "}
          <a
            href="https://www.ifood.com.br/"
            target="_blank"
            rel="noreferrer noopener"
            className="decoration-accent"
          >
            <Strong>iFood</Strong>
          </a>
        </li>

        <li>
          Built{" "}
          <a
            href="https://www.exevopan.com/"
            target="_blank"
            rel="noreferrer noopener"
            className="decoration-accent"
          >
            <Strong>Exevo Pan</Strong>
          </a>
          , completely solo
        </li>

        <li>
          Creating my first game:{" "}
          <a
            href="https://bestiaryarena.com/"
            target="_blank"
            rel="noreferrer noopener"
            className="decoration-accent"
          >
            <Strong>Bestiary Arena</Strong>
          </a>
        </li>
      </ul>

      <blockquote className="backticks italic px-3 py-2">
        {'"'}the man who thinks he can and the man who thinks he can{"'"}t are
        both correct{'"'}
      </blockquote>
    </main>
  );
}
