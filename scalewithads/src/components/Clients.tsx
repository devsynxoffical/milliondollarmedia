import Image from "next/image";

const clients = [
  {
    name: "Aref Jomah",
    title: "7-Figure Agency Scaling Coach",
    badge: "Two Comma Club Winner",
    photo: "/media/clients/client-aref.jpg",
  },
  {
    name: "Tim Burd",
    title: "9-Figure Agency Owner",
    badge: "101K Community",
    photo: "/media/clients/client-tim-burd.webp",
  },
  {
    name: "Pierce Grimes",
    title: "7-Figure Agency Owner",
    badge: "Two Comma Club Winner",
    photo: "/media/clients/client-pierce.webp",
  },
  {
    name: "Officer Baker",
    title: "Hollywood Creator & Producer",
    badge: "1.5M Audience",
    photo: "/media/clients/client-officer-baker.jpg",
  },
  {
    name: "Jesse Rogers",
    title: "Online Trading Mastermind",
    badge: "537K Subscribers",
    photo: "/media/clients/client-jesse.webp",
  },
  {
    name: "Darrell Stern",
    title: "Webinar Scaling Specialist",
    badge: "19K Followers",
    photo: "/media/clients/client-darrell.jpg",
  },
];

export function Clients() {
  return (
    <section id="clients" className="section-shell bg-white border-b border-zinc-200/60">
      <div className="mx-auto max-w-[1240px]">
        {/* Section Header — Matching Reference Image ("The room. In the wild.") */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
          <div className="pill-badge mb-3">
            <span className="dot-accent" />
            <span>SCALE WITH ADS COMMUNITY</span>
          </div>
          <h2 className="display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-950 tracking-tight">
            The room. In the wild.
          </h2>
          <p className="mt-3 text-base text-zinc-600">
            Real founders, 7 &amp; 8-figure agency owners, and high-ticket operators scaling using the exact same acquisition system.
          </p>
        </div>

        {/* Photo Card Grid — Matching reference layout */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {clients.map((client) => (
            <div
              key={client.name}
              className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-900 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={client.photo}
                  alt={client.name}
                  fill
                  className="object-cover object-top transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-zinc-900 backdrop-blur-md shadow-xs">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                    {client.badge}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-lg font-bold tracking-tight">{client.name}</h3>
                  <p className="text-xs text-white/80 font-medium">{client.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

