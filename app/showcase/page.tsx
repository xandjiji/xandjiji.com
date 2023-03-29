import Image from "next/image";

type ItemProps = {
  name: string;
  description: string;
  imageSrc: string;
  tags: string[];
  links?: { children: string; href: string }[];
};

const Item = ({ name, description, imageSrc, tags, links = [] }: ItemProps) => (
  <div>
    <h3 className="text-2xl leading-none font-bold tracking-wide">{name}</h3>

    <div className="flex gap-8 justify-between w-full items-center my-4">
      <p className="text-onBackgroundVariant text-sm text-justify">
        {description}
      </p>

      <Image
        src={imageSrc}
        alt={name}
        width={60}
        height={60}
        unoptimized
        className="shrink-0"
      />
    </div>

    {links.length > 0 && (
      <ul className="mb-4 flex gap-2">
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

    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <div key={tag} className="backticks text-xs">
          {tag}
        </div>
      ))}
    </div>
  </div>
);

export default function Showcase() {
  return (
    <main className="grid gap-12">
      <Item
        name="Exevo Pan"
        description="Started as small toy app, Exevo Pan eventually became a huge website that provides tools, content and paid services for Tibia (MMORPG) players"
        imageSrc="/exevopan.png"
        tags={[
          "design systems",
          "ui/ux",
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
        description="A companion app for Stardew Valley players. Its fully loaded with tons of information about the game, with a much better UX than using a Wiki. Built while learning React"
        imageSrc="/stardew.png"
        tags={["react", "pwa", "design"]}
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
        description="Playing around with some technologies until I've glued everything together into this fun Twitter bot"
        imageSrc="/pokehash.png"
        tags={["node", "twitter api", "image manipulation"]}
        links={[
          {
            children: "website",
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
