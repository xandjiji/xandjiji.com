import Image from "next/image";

type ItemProps = {
  name: string;
  description: string;
  imageSrc: string;
  tags: string[];
};

const Item = ({ name, description, imageSrc, tags }: ItemProps) => (
  <div>
    <h3 className="text-2xl leading-none font-bold tracking-wide">{name}</h3>

    <div className="flex gap-4 justify-between w-full items-center my-4">
      <p className="text-onBackgroundVariant text-sm">{description}</p>

      <Image
        src={imageSrc}
        alt={name}
        width={60}
        height={60}
        unoptimized
        className="shrink-0"
      />
    </div>

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
      />
      <Item
        name="Exevo Pan"
        description="A better experience for the Char Bazaar"
        imageSrc="/exevopan.png"
        tags={[
          "design systems",
          "web scraping",
          "fullstack",
          "business",
          "ui/ux",
        ]}
      />
    </main>
  );
}
