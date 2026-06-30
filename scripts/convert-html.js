const fs = require("fs");
const path = require("path");

const SRC = path.join("c:", "Users", "ABSOLUTE ELECTRONICS", "Desktop", "Grooming lounge website");
const OUT = path.join("c:", "Users", "ABSOLUTE ELECTRONICS", "Desktop", "grooming_lounge_next", "components", "pages");

const pages = [
  { file: "index.html", name: "HomePage", route: "page" },
  { file: "services.html", name: "ServicesPage", route: "services" },
  { file: "about.html", name: "AboutPage", route: "about" },
  { file: "contact.html", name: "ContactPage", route: "contact" },
  { file: "book.html", name: "BookPage", route: "book" },
];

function convertHtmlToJsx(html) {
  let jsx = html;

  jsx = jsx.replace(/<!--[\s\S]*?-->/g, "");
  jsx = jsx.replace(/\sclass=/g, " className=");
  jsx = jsx.replace(/\sfor=/g, " htmlFor=");
  jsx = jsx.replace(/\sautocomplete=/g, " autoComplete=");
  jsx = jsx.replace(/\snovalidate/g, " noValidate");
  jsx = jsx.replace(/\sfetchpriority=/g, " fetchPriority=");
  jsx = jsx.replace(/\sallowfullscreen=""/g, " allowFullScreen");
  jsx = jsx.replace(/\sdecoding=/g, " decoding=");
  jsx = jsx.replace(/\splaysinline/g, " playsInline");
  jsx = jsx.replace(/\sautoplay/g, " autoPlay");
  jsx = jsx.replace(/style="border:0;"/g, 'style={{ border: 0 }}');

  jsx = jsx.replace(/href="index\.html([^"]*)"/g, 'href="/$1"');
  jsx = jsx.replace(/href="services\.html([^"]*)"/g, 'href="/services$1"');
  jsx = jsx.replace(/href="about\.html([^"]*)"/g, 'href="/about$1"');
  jsx = jsx.replace(/href="contact\.html([^"]*)"/g, 'href="/contact$1"');
  jsx = jsx.replace(/href="book\.html([^"]*)"/g, 'href="/book$1"');

  jsx = jsx.replace(/href="\/"/g, 'href="/"');
  jsx = jsx.replace(/href="\/#"/g, 'href="/#"');

  jsx = jsx.replace(/src="(?!https?:\/\/|\/|data:)([^"]+)"/g, 'src="/$1"');
  jsx = jsx.replace(/data-lightbox="(?!\/)([^"]+)"/g, 'data-lightbox="/$1"');
  jsx = jsx.replace(/<video src="(?!\/)([^"]+)"/g, '<video src="/$1"');

  jsx = jsx.replace(/<img([^>]*?)>/g, "<img$1 />");
  jsx = jsx.replace(/<input([^>]*?)>/g, "<input$1 />");
  jsx = jsx.replace(/<br>/g, "<br />");
  jsx = jsx.replace(/<br([^>]*?)>/g, "<br$1 />");

  jsx = jsx.replace(/\shidden\b/g, " hidden={true}");
  jsx = jsx.replace(/navbar__link navbar__link--active/g, "navbar__link");
  jsx = jsx.replace(/navbar__link--cta navbar__link--active/g, "navbar__link--cta");
  jsx = jsx.replace(/navbar__link navbar__link--cta navbar__link--active/g, "navbar__link navbar__link--cta");

  return jsx.trim();
}

function extractMain(html) {
  const mainMatch = html.match(/<main>([\s\S]*?)<\/main>/);
  return mainMatch ? mainMatch[1].trim() : "";
}

function extractAfterMain(html) {
  const afterMain = html.match(/<\/main>([\s\S]*?)<footer class="footer">/);
  return afterMain ? afterMain[1].trim() : "";
}

fs.mkdirSync(OUT, { recursive: true });

for (const page of pages) {
  const html = fs.readFileSync(path.join(SRC, page.file), "utf8");
  const main = convertHtmlToJsx(extractMain(html));
  const extras = convertHtmlToJsx(extractAfterMain(html));

  const needsLink = /href="\//.test(main + extras);

  const content = `${needsLink ? 'import Link from "next/link";\n\n' : ""}export default function ${page.name}() {
  return (
    <>
      <main>
${main
  .split("\n")
  .map((line) => "        " + line)
  .join("\n")}
      </main>
${
  extras
    ? extras
        .split("\n")
        .map((line) => "      " + line)
        .join("\n")
    : ""
}
    </>
  );
}
`;

  fs.writeFileSync(path.join(OUT, `${page.name}.tsx`), content, "utf8");
  console.log("Wrote", page.name);
}
