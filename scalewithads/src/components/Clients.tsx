import Image from "next/image";

const clients = [
  {
    name: "Darrell Stern",
    title: "Webinar Scaling Coach",
    badge: "19K Followers",
    photo: "/media/clients/client-darrell.jpg",
  },
  {
    name: "Pierce Grimes",
    title: "7-Figure Agency Owner",
    badge: "Two Comma Club Winner",
    photo: "/media/clients/client-pierce.webp",
  },
  {
    name: "Officer Baker",
    title: "Hollywood Celebrity",
    badge: "1.5M Followers",
    photo: "/media/clients/client-officer-baker.jpg",
  },
  {
    name: "Jesse Rogers · Casper SMC",
    title: "Online Trading Coach",
    badge: "537K Subscribers",
    photo: "/media/clients/client-jesse.webp",
  },
  {
    name: "Tim Burd",
    title: "9-Figure Agency Owner",
    badge: "101K Followers",
    photo: "/media/clients/client-tim-burd.webp",
  },
  {
    name: "Dr. Amy",
    title: "Cancer Researcher",
    badge: "259K Subscribers",
    photo: "/media/clients/client-dr-amy.webp",
  },
  {
    name: "Travis Stephenson",
    title: "9-Figure Agency Owner",
    badge: "114K Followers",
    photo: "/media/clients/client-travis.webp",
  },
  {
    name: "Dr. Bea Kinderaerztin",
    title: "Pediatrician",
    badge: "144K Followers",
    photo: "/media/clients/client-dr-bea.jpg",
  },
  {
    name: "Steven Juergensen",
    title: "Founder @ Vedgenutrition",
    badge: "87K Followers",
    photo: "/media/clients/client-steven.jpg",
  },
  {
    name: "Rafael Cintron",
    title: "E-commerce Coach",
    badge: "55.7K Subscribers",
    photo: "/media/clients/client-rafael.jpg",
  },
  {
    name: "Sarah Grace Fitness",
    title: "NPC Figure Competitor",
    badge: "94K Followers",
    photo: "/media/clients/client-sarah.jpg",
  },
  {
    name: "Mark Shay",
    title: "Agency Owner & Coach",
    badge: "29.8K Followers",
    photo: "/media/clients/client-mark.jpg",
  },
  {
    name: "Jared Van Yperen",
    title: "Founder @ Vintage Muscle",
    badge: "21K Followers",
    photo: "/media/clients/client-jared.jpg",
  },
  {
    name: "M Mahdi Syed",
    title: "Business Scaling Coach",
    badge: "Two Comma Club Winner",
    photo: "/media/clients/client-mahdi.jpg",
  },
  {
    name: "Aref Jomah",
    title: "7-Figure Agency Scaling Coach",
    badge: "Two Comma Club Winner",
    photo: "/media/clients/client-aref.jpg",
  },
  {
    name: "Jimmy Rutkowsky",
    title: "7-Figure Agency Owner",
    badge: "7.2K Followers",
    photo: "/media/clients/client-jimmy.webp",
  },
  {
    name: "Marie Grace Berg",
    title: "Agency Owner",
    badge: "7K Followers",
    photo: "/media/clients/client-marie.jpg",
  },
];

export function Clients() {
  return (
    <section id="clients" className="section-shell bg-[var(--surface-2)]">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="eyebrow-accent">Clients & proof</p>
            <h2 className="display mt-3 text-[clamp(2rem,4vw,3.2rem)] text-[var(--ink)]">
              Trusted by creators,
              <br />
              coaches & operators.
            </h2>
          </div>
          <p className="max-w-xl text-[var(--muted)]">
            From high-ticket coaches to 9-figure agency owners — the same ads
            system, scaled across countless verticals. These are the operators
            behind the campaigns, the walkthroughs, and the dashboards you see
            here.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {clients.map((client) => (
            <div
              key={client.name}
              className="card group relative flex flex-col items-center overflow-hidden bg-white px-4 py-7 text-center transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_60px_-20px_rgba(237,28,36,0.25)]"
            >
              <div className="pointer-events-none absolute -top-12 left-1/2 h-28 w-28 -translate-x-1/2 rounded-full bg-[var(--accent)]/20 opacity-0 blur-2xl transition duration-500 group-hover:opacity-100" />
              <div className="relative h-16 w-16 overflow-hidden rounded-full ring-2 ring-[var(--line)] transition duration-300 group-hover:scale-105 group-hover:ring-[var(--accent)] md:h-20 md:w-20">
                <Image
                  src={client.photo}
                  alt={client.name}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-110"
                  sizes="80px"
                />
              </div>
              <p className="display mt-4 text-sm text-[var(--ink)]">
                {client.name}
              </p>
              <p className="mt-1 text-xs text-[var(--muted)]">{client.title}</p>
              <span className="chip mt-3 bg-[var(--accent-soft)] text-[var(--accent)] transition duration-300 group-hover:bg-[var(--accent)] group-hover:text-white">
                {client.badge}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
