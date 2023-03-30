/* eslint-disable @next/next/no-img-element */

type ItemProps = {
  name: string;
  description: string;
  imageSrc: string;
  tags: string[];
  links?: { children: string; href: string }[];
};

const Item = ({ name, description, imageSrc, tags, links = [] }: ItemProps) => (
  <article className="grid gap-4">
    <h3 className="text-2xl leading-none font-bold tracking-wide">{name}</h3>

    <div className="flex gap-8 justify-between w-full items-center">
      <p className="text-onBackgroundVariant text-sm text-justify">
        {description}
      </p>

      <img
        src={imageSrc}
        alt={name}
        width={60}
        height={60}
        className="shrink-0"
        style={{ imageRendering: "pixelated" }}
      />
    </div>

    {tags.length > 0 && (
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <div key={tag} className="backticks text-xs">
            {tag}
          </div>
        ))}
      </div>
    )}

    {links.length > 0 && (
      <ul className="flex gap-2">
        {links.map((linkProps) => (
          <a
            key={linkProps.href}
            {...linkProps}
            className="text-xs"
            target="_blank"
          />
        ))}
      </ul>
    )}
  </article>
);

export default function Showcase() {
  return (
    <main className="grid gap-12">
      <Item
        name="Exevo Pan"
        description="Started as a small toy app, Exevo Pan eventually became a huge website that provides tools, content and paid services for Tibia (MMORPG) players"
        imageSrc="/exevopan.png"
        tags={[
          "nextjs",
          "design systems",
          "web scraping",
          "fullstack",
          "business",
        ]}
        links={[
          { children: "website", href: "https://www.exevopan.com" },
          { children: "github", href: "https://github.com/xandjiji/exevo-pan" },
        ]}
      />
      <Item
        name="Stardew Helper"
        description="A companion app for Stardew Valley players. It's fully loaded with tons of information about the game, with a much better UX than using a Wiki. Built while learning React"
        imageSrc="/stardew.png"
        tags={["reactjs", "pwa", "ui/ux"]}
        links={[
          {
            children: "website",
            href: "https://xandjiji.github.io/stardew-helper/",
          },
          {
            children: "github",
            href: "https://github.com/xandjiji/stardew-helper",
          },
        ]}
      />
      <Item
        name="Pokemon Trainer Card Generator"
        description="Played around with some technologies until I've glued everything together into this fun Twitter bot"
        imageSrc="/pokehash.png"
        tags={["nodejs", "twitter api", "image manipulation"]}
        links={[
          {
            children: "twitter",
            href: "https://twitter.com/PokeTrainerCard",
          },
          {
            children: "github",
            href: "https://github.com/xandjiji/stardew-helperhttps://github.com/xandjiji/Pokemon-Trainer-Card-Generator",
          },
        ]}
      />
    </main>
  );
}
