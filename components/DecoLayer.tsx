type PageKey = "index" | "services" | "about" | "contact" | "book";

const decoByPage: Record<PageKey, React.ReactNode> = {
  index: (
    <>
      <span className="deco deco--shape deco--shape-2"></span>
      <span className="deco deco--shape deco--shape-3"></span>
    </>
  ),
  services: (
    <>
      <span className="deco deco--scissors">✂</span>
      <span className="deco deco--pole"></span>
      <span className="deco deco--razor">🪒</span>
      <span className="deco deco--shape deco--shape-1"></span>
      <span className="deco deco--shape deco--shape-2"></span>
    </>
  ),
  about: (
    <>
      <span className="deco deco--scissors">✂</span>
      <span className="deco deco--clipper">⚡</span>
      <span className="deco deco--shape deco--shape-2"></span>
      <span className="deco deco--shape deco--shape-3"></span>
    </>
  ),
  contact: (
    <>
      <span className="deco deco--razor">🪒</span>
      <span className="deco deco--pole"></span>
      <span className="deco deco--shape deco--shape-1"></span>
      <span className="deco deco--shape deco--shape-3"></span>
    </>
  ),
  book: (
    <>
      <span className="deco deco--scissors">✂</span>
      <span className="deco deco--shape deco--shape-1"></span>
      <span className="deco deco--shape deco--shape-2"></span>
    </>
  ),
};

export function pathnameToPageKey(pathname: string): PageKey {
  if (pathname === "/services") return "services";
  if (pathname === "/about") return "about";
  if (pathname === "/contact") return "contact";
  if (pathname === "/book") return "book";
  return "index";
}

export default function DecoLayer({ page }: { page: PageKey }) {
  return (
    <div className="deco-layer" aria-hidden="true">
      {decoByPage[page]}
    </div>
  );
}
