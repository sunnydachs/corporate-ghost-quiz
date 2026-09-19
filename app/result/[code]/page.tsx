import type { Metadata } from "next";
import Link from "next/link";
import { getGhost, ghosts } from "@/lib/ghosts";
import { formatShareText } from "@/lib/scoring";
import { ghostCodes } from "@/lib/ghost-codes";

type PageProps = {
  params: Promise<{
    code: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return ghostCodes.map((code) => ({ code }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { code } = await params;
  const ghost = getGhost(code);

  return {
    title: `I'm ${ghost.name} (${ghost.code}) — ${ghost.title}. Take the Corporate Ghost Quiz`,
    description: ghost.short,
    openGraph: {
      title: `${ghost.name} (${ghost.code})`,
      description: ghost.short,
      images: [{ url: `/og/${ghost.code}.png`, width: 1200, height: 624, alt: ghost.name }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${ghost.name} (${ghost.code})`,
      images: [`/og/${ghost.code}.png`],
    },
  };
}

export default async function ResultPage({ params }: PageProps) {
  const { code } = await params;
  const ghost = getGhost(code);

  return (
    <main className="app-shell">
      <div className="ambient-grid" aria-hidden="true" />
      <section className="quiz-frame">
        <div className="screen result-screen">
          <div className="result-card">
            <div className="result-topline">
              <span className="result-kicker">Your corporate ghost</span>
              <span className="result-code">{ghost.code}</span>
            </div>
            <img className="result-image" src={ghost.image} alt={ghost.name} width={512} height={512} />
            <h2>{ghost.name}</h2>
            <p className="result-title">{ghost.title}</p>
            <p className="result-hook">“{ghost.short}”</p>
            <p className="result-description">{ghost.description}</p>
            <div className="result-details">
              <div>
                <span className="detail-label">Strengths</span>
                <ul>{ghost.strengths.map((strength) => <li key={strength}>{strength}</li>)}</ul>
              </div>
              <div className="detail-row">
                <span className="detail-label">Friday ritual</span>
                <p>{ghost.ritual}</p>
              </div>
              <div className="detail-row">
                <span className="detail-label">Sunday haunt</span>
                <p>{ghost.haunt}</p>
              </div>
            </div>
            <div className="share-block">
              <p className="share-line">{formatShareText(ghost.code, ghost.name, ghost.title)}</p>
            </div>
          </div>
          <div className="result-actions">
            <Link className="primary-button" href="/">Take the quiz <span aria-hidden="true">↻</span></Link>
            <button className="text-button" type="button">See all 8 types <span aria-hidden="true">↓</span></button>
          </div>
          <div className="ghost-index">
            <div className="ghost-index-heading">
              <span className="eyebrow">The full haunting</span>
              <h3>Choose your poison</h3>
            </div>
            <div className="ghost-index-grid">
              {ghosts.map((g) => (
                <Link className="ghost-index-item" key={g.code} href={`/result/${g.code}`}>
                  <img className="ghost-index-image" src={g.image} alt={g.name} width={512} height={512} loading="lazy" />
                  <div><strong>{g.code}</strong><p>{g.name}</p></div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
      <footer className="app-footer">Corporate Ghost Quiz <span>·</span> a tiny office seance</footer>
    </main>
  );
}
