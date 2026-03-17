import { useEffect, useRef, useState } from 'react'

// R2 CDN Base
const CDN = 'https://pub-ff9788cd4f1f494db0491a197025a94c.r2.dev/dos-pueblos/kogevinas'

// Image component with lazy loading
function Img({ src, alt = '', className = '', style = {} }) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={{ width: '100%', height: '100%', objectFit: 'cover', ...style }}
      loading="lazy"
    />
  )
}

// Scroll reveal hook
function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        el.style.opacity = '1'
        el.style.transform = 'translateY(0)'
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease'
        obs.disconnect()
      }
    }, { threshold: 0.12 })
    el.style.opacity = '0'
    el.style.transform = 'translateY(28px)'
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

function Section({ children }) {
  const ref = useReveal()
  return <div ref={ref}>{children}</div>
}

// ─────────────────────────────────────────────────────────────────────────────
// INTERACTIVE TIMELINE COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
const TIMELINE_EVENTS = [
  {
    year: '10,000+ BCE',
    title: 'Chumash Stewardship',
    desc: 'Continuous Indigenous stewardship at Mikiw and Kuyamu villages. Twin villages flourish on the coastal bluffs, sustained by the abundance of Naples Reef.',
    icon: '🏺',
    era: 'indigenous'
  },
  {
    year: '1542',
    title: 'First European Contact',
    desc: 'Juan Rodríguez Cabrillo anchors offshore on October 16. Chumash paddle out in tomol canoes to trade fish and chia flour for textiles and Venetian beads.',
    icon: '⛵',
    era: 'contact'
  },
  {
    year: '1842',
    title: 'Mexican Land Grant',
    desc: 'Governor Juan Alvarado awards Irish immigrant doctor Nicolas A. Den the 15,535-acre Rancho Dos Pueblos land grant during the Mexican rancho era.',
    icon: '📜',
    era: 'rancho'
  },
  {
    year: '1943–1977',
    title: 'Orchid Empire',
    desc: "Signal Oil's Sam Mosher develops the world's largest orchid farm on-site. Casa Grande hosts President Harry Truman. The ranch becomes a storied California landmark.",
    icon: '🌺',
    era: 'orchid'
  },
  {
    year: '2021–2022',
    title: 'Parcels Reassembled',
    desc: 'Roger Himovitz reassembles the fragmented 219-acre coastal property across 18 legal parcels for over $40M, including the Cultured Abalone Farm.',
    icon: '🗺',
    era: 'modern'
  },
  {
    year: 'Nov 2024',
    title: 'Marine Sanctuary',
    desc: 'NOAA designates the Chumash Heritage National Marine Sanctuary — the first Indigenous-nominated marine sanctuary in U.S. history. Dos Pueblos sits at its southern boundary.',
    icon: '🌊',
    era: 'sanctuary'
  },
  {
    year: '2026',
    title: 'Escrow Status',
    desc: 'Property under contract at $62M to Northern Chumash Tribal Council. A regenerative conservation acquisition structure is being developed.',
    icon: '🔑',
    era: 'present'
  },
]

function Timeline() {
  const [activeIdx, setActiveIdx] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  
  // Auto-advance when not hovered
  useEffect(() => {
    if (isHovered) return
    const timer = setInterval(() => {
      setActiveIdx(i => (i + 1) % TIMELINE_EVENTS.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [isHovered])
  
  const active = TIMELINE_EVENTS[activeIdx]
  
  return (
    <div 
      className="timeline-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Progress line */}
      <div className="timeline-track">
        <div 
          className="timeline-progress" 
          style={{ width: `${(activeIdx / (TIMELINE_EVENTS.length - 1)) * 100}%` }}
        />
        {TIMELINE_EVENTS.map((evt, i) => (
          <button
            key={evt.year}
            className={`timeline-node ${i === activeIdx ? 'active' : ''} ${i < activeIdx ? 'past' : ''}`}
            style={{ left: `${(i / (TIMELINE_EVENTS.length - 1)) * 100}%` }}
            onClick={() => setActiveIdx(i)}
            aria-label={evt.year}
          >
            <span className="node-icon">{evt.icon}</span>
            <span className="node-year">{evt.year}</span>
          </button>
        ))}
      </div>
      
      {/* Active event detail */}
      <div className="timeline-detail" key={activeIdx}>
        <div className="timeline-era">{active.era.toUpperCase()}</div>
        <h3 className="timeline-title">{active.title}</h3>
        <p className="timeline-desc">{active.desc}</p>
      </div>
      
      {/* Nav arrows */}
      <div className="timeline-nav">
        <button 
          onClick={() => setActiveIdx(i => Math.max(0, i - 1))}
          disabled={activeIdx === 0}
          aria-label="Previous"
        >
          ←
        </button>
        <span className="timeline-counter">{activeIdx + 1} / {TIMELINE_EVENTS.length}</span>
        <button 
          onClick={() => setActiveIdx(i => Math.min(TIMELINE_EVENTS.length - 1, i + 1))}
          disabled={activeIdx === TIMELINE_EVENTS.length - 1}
          aria-label="Next"
        >
          →
        </button>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN APP
// ─────────────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <>
      {/* ── NAV ── */}
      <nav>
        <a className="nav-logo" href="#top">Dos Pueblos Ranch</a>
        <ul className="nav-links">
          <li><a href="#timeline">Timeline</a></li>
          <li><a href="#story">The Place</a></li>
          <li><a href="#assets">Living Assets</a></li>
          <li><a href="#sanctuary">Sanctuary</a></li>
          <li><a href="#structure">The Structure</a></li>
          <li><a href="#deal">The Deal</a></li>
        </ul>
      </nav>

      {/* ── HERO with background image ── */}
      <section className="hero" id="top" style={{
        backgroundImage: `
          linear-gradient(to bottom, rgba(14,28,43,0.3) 0%, rgba(14,28,43,0.5) 40%, rgba(14,28,43,0.92) 100%),
          url(${CDN}/property_landscape/DP-Ranch-0045.jpg)
        `,
        backgroundSize: 'cover',
        backgroundPosition: 'center 30%'
      }}>
        <div className="reveal reveal-1">
          <div className="hero-eyebrow">Gaviota Coast · Santa Barbara County, California · 34.4°N 119.9°W</div>
        </div>
        <div className="reveal reveal-2">
          <h1 className="hero-title">
            Where <em>California</em><br />was born.
          </h1>
        </div>
        <div className="reveal reveal-3">
          <p className="hero-sub">
            219 acres. Two ancient Chumash villages. A working abalone farm. The southern boundary
            of America's newest national marine sanctuary. A once-in-a-generation opportunity
            to structure a regenerative conservation acquisition that holds the gains where they are grown.
          </p>
        </div>
        <div className="reveal reveal-4">
          <div className="hero-stats">
            {[
              ['219', 'Acres · 18 legal parcels'],
              ['2,000+', 'Feet of ocean frontage'],
              ['4,543', 'Sq mi · Chumash Heritage NMS'],
              ['1542', 'Year of first contact · Mikiw & Kuyamu'],
              ['$133M', 'Highest & best use appraisal'],
            ].map(([v, l]) => (
              <div key={l}>
                <span className="hero-stat-val">{v}</span>
                <span className="hero-stat-lbl">{l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMELINE SECTION ── */}
      <section className="timeline-bg" id="timeline">
        <div className="section-inner">
          <Section>
            <div className="eyebrow">History of Place</div>
            <h2 className="section-title" style={{ marginBottom: 48 }}>
              10,000 years of<br /><em>continuous stewardship.</em>
            </h2>
            <Timeline />
          </Section>
        </div>
      </section>

      <div className="divider" />

      {/* ── STORY OF PLACE ── */}
      <section className="story-bg" id="story">
        <div className="section-inner">
          <Section>
            <div className="story-grid">
              <div>
                <div className="eyebrow">The Story of Place</div>
                <h2 className="section-title">
                  Two villages.<br /><em>One living system.</em>
                </h2>
                <p className="body-text">
                  On October 16, 1542, explorer Juan Rodríguez Cabrillo anchored offshore and
                  encountered two Chumash villages — <strong>Mikiw</strong> ("place of the mussels")
                  on the western bluff and <strong>Kuyamu</strong> on the eastern bluff — separated
                  by Dos Pueblos Creek. Chumash paddled out in canoes to trade fish and chia sage
                  flour for textiles and Venetian beads.
                </p>
                <p className="body-text">
                  This was the first documented European-Chumash contact on the California mainland.
                  The Northern Chumash Tribal Council calls it <strong>"where California was born."</strong>
                  The Spanish name "Dos Pueblos" — Two Villages — is the oldest surviving place name
                  in the Goleta area.
                </p>
                <p className="body-text">
                  The land passed through the Spanish mission system, the Mexican rancho era (a
                  15,535-acre grant to Irish immigrant doctor Nicolas A. Den in 1842), Signal Oil,
                  and a German watchmaker-inventor named Rudi Schulte who grew it back to 12,500 acres.
                  Today, 219 coastal acres — reassembled by Roger and Robin Himovitz across 18 legal
                  parcels — await their next chapter.
                </p>
                <blockquote className="pullquote">
                  "The land is not a real estate asset. It is a living system with millennia of
                  ecological and cultural memory."
                </blockquote>
              </div>
              <div>
                <div style={{ height: 420, borderRadius: 4, overflow: 'hidden', marginBottom: 8 }}>
                  <Img src={`${CDN}/property_landscape/DP-Ranch-0027.jpg`} alt="Coastal bluffs at golden hour" />
                </div>
                <div style={{ height: 200, borderRadius: 4, overflow: 'hidden' }}>
                  <Img src={`${CDN}/property_landscape/DP-Ranch-0040.jpg`} alt="Creek and coastal landscape" />
                </div>
              </div>
            </div>
          </Section>
        </div>
      </section>

      <div className="divider" />

      {/* ── PHOTO GALLERY STRIP ── */}
      <section style={{ padding: '48px 0', background: 'var(--navy2)' }}>
        <div className="gallery-scroll">
          {[
            `${CDN}/property_landscape/DP-Ranch-0010.jpg`,
            `${CDN}/ranch_house/Ranch-House-0002.jpg`,
            `${CDN}/property_landscape/DP-Ranch-0029.jpg`,
            `${CDN}/barns_events/7-Barn.png`,
            `${CDN}/property_landscape/DP-Ranch-0022.jpg`,
            `${CDN}/abalone_farm/Aquaculture.jpeg`,
          ].map((src, i) => (
            <div key={i} className="gallery-item">
              <Img src={src} alt={`Gallery image ${i + 1}`} />
            </div>
          ))}
        </div>
      </section>

      <div className="divider" />

      {/* ── LIVING ASSETS ── */}
      <section className="assets-bg" id="assets">
        <div className="section-inner">
          <Section>
            <div className="eyebrow">The Property</div>
            <h2 className="section-title">
              Living assets that<br /><em>cannot be replicated.</em>
            </h2>
            <p className="body-text" style={{ maxWidth: 680 }}>
              California's strict coastal development regulations make these assets effectively
              irreplaceable. The Cultured Abalone Farm alone — with its endangered species
              partnerships, ESA-listed captive breeding program, and Seafood Watch "Best Choice"
              rating — has no parallel anywhere on the West Coast.
            </p>
          </Section>
          <div className="asset-grid">
            {[
              {
                icon: '🐚', name: 'The Cultured Abalone Farm',
                desc: 'Established 1989. ~1M abalone/year. Closed-loop seawater from the Santa Barbara Channel. Endangered white abalone captive breeding for NOAA. Featured on PBS Hope in the Water. Partners: UC Davis Bodega Marine Lab, The Bay Foundation.',
                tag: 'Est. 1989 · PBS Featured · NOAA Partner',
                img: `${CDN}/abalone_farm/aquaculture-harvest.png`
              },
              {
                icon: '🦔', name: 'Purple Sea Urchin Ranching',
                desc: 'Removes starving "zombie urchins" from kelp barrens, fattens them onshore, produces commercial-grade uni ("Purple Hotchis") while actively restoring Santa Barbara Channel kelp forests. Partnership with commercial divers Stephanie Mutz and Harry Liquornik.',
                tag: 'Kelp Restoration · Commercial Uni',
                img: `${CDN}/abalone_farm/Aquaculture.jpeg`
              },
              {
                icon: '🌊', name: '2,000+ Ft Ocean Frontage',
                desc: 'Private blufftop access to a secluded beach. Year-round Dos Pueblos Creek estuary and tidal zone. One of the last 76-mile stretches of undeveloped California coastline. Direct adjacency to Naples Reef, a premier Southern California dive site.',
                tag: 'Coastal · Private Beach · Estuary',
                img: `${CDN}/property_landscape/DP-Ranch-0045.jpg`
              },
              {
                icon: '🏛', name: 'Casa Grande',
                desc: "1920s Mediterranean mansion built by Signal Oil's Sam Mosher. 5BD/7BA. Hosted President Harry Truman. Eligible for California Historic Register designation. Proven film and event location — Love Island USA Season 4, 2022.",
                tag: '1920s · Historic · Film Location',
                img: `${CDN}/ranch_house/Ranch-House-0002.jpg`
              },
              {
                icon: '🥑', name: 'Agricultural Orchards',
                desc: '30 acres of avocado orchards and 25 acres of cherimoya trees — among the only commercial cherimoya operations in the continental U.S. Active revenue-generating operation. Commercial harvest rights unaffected by conservation structures.',
                tag: '30 Ac Avocado · 25 Ac Cherimoya',
                img: `${CDN}/agriculture/cherimoya.jpeg`
              },
              {
                icon: '🗺', name: '18 Legal Parcels',
                desc: 'Tracing partly to an 1887 paper subdivision validated by the California Supreme Court in Morehart v. County of Santa Barbara (1994). Creates significant "highest and best use" appraisal delta for conservation easement optimization — a $133M HBU supports a $62M acquisition.',
                tag: '18 Parcels · $133M HBU · §170(h)',
                img: `${CDN}/misc/Dos-Pueblos-Lables-6.png`
              },
            ].map(({ icon, name, desc, tag, img }) => (
              <div className="asset-card" key={name}>
                <div className="asset-img">
                  <Img src={img} alt={name} />
                </div>
                <span className="asset-icon">{icon}</span>
                <div className="asset-name">{name}</div>
                <div className="asset-desc">{desc}</div>
                <span className="asset-tag">{tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── SANCTUARY ── */}
      <section className="sanctuary-bg" id="sanctuary">
        <div className="section-inner">
          <Section>
            <div className="sanctuary-grid">
              <div>
                <div className="eyebrow">The Marine Sanctuary</div>
                <h2 className="section-title">
                  The land where<br /><em>the sanctuary begins.</em>
                </h2>
                <p className="body-text">
                  On November 30, 2024, NOAA designated the <strong>Chumash Heritage National Marine
                  Sanctuary</strong> — the first Indigenous-nominated marine sanctuary in U.S. history,
                  the first new ocean sanctuary in over 30 years, and the 17th national marine sanctuary.
                  The decade-long campaign was driven by the Northern Chumash Tribal Council,
                  guided to completion by Chairwoman <strong>Violet Sage Walker</strong> after
                  her father Fred Collins passed in 2021.
                </p>
                <p className="body-text">
                  The sanctuary's southern boundary terminates at Naples — immediately adjacent to
                  Dos Pueblos Ranch. The property is the terrestrial anchor point for a protected
                  marine ecosystem extending 60 miles offshore to depths of 11,580 feet. This is
                  not coincidence. It reflects the Chumash understanding that land and sea are
                  one living system.
                </p>
                <p className="body-text">
                  The sanctuary's governance structure includes an Indigenous Collaborative Co-Stewardship
                  Framework — with the Santa Ynez Band of Chumash Indians (the only federally recognized
                  Chumash tribe) as a designated co-steward. Any regenerative acquisition of Dos
                  Pueblos must be designed as a complement to this marine governance, not a
                  parallel structure.
                </p>
              </div>
              <div>
                <div style={{ marginBottom: 32 }}>
                  {[
                    ['4,543', 'Square miles of protected ocean'],
                    ['116', 'Miles of Central California coastline'],
                    ['1st', 'Indigenous-nominated US marine sanctuary'],
                    ['30+', 'Years since last new ocean sanctuary'],
                    ['17th', 'National marine sanctuary in the US'],
                  ].map(([v, l]) => (
                    <div key={l} style={{ marginBottom: 24 }}>
                      <div className="sanctuary-stat">{v}</div>
                      <div className="sanctuary-stat-label">{l}</div>
                    </div>
                  ))}
                </div>
                <div style={{ height: 200, borderRadius: 4, overflow: 'hidden' }}>
                  <Img src={`${CDN}/tidepools/Tidepooling.jpg`} alt="Tidepools at Dos Pueblos" />
                </div>
              </div>
            </div>
          </Section>
        </div>
      </section>

      <div className="divider" />

      {/* ── THE STRUCTURE ── */}
      <section className="structure-bg" id="structure">
        <div className="section-inner">
          <Section>
            <div className="eyebrow">The Approach · Place Regenerative Trust</div>
            <h2 className="section-title">
              The Triple Play:<br /><em>three entities, one mission.</em>
            </h2>
            <p className="body-text" style={{ maxWidth: 680 }}>
              Developed by RDC and the Regenesis Group under the Place Regenerative Trust framework,
              the Triple Play structure binds three interlocking legal entities under a single set of
              regenerative covenants — creating a vehicle that is investable, conserved, and
              tribally co-managed simultaneously.
            </p>
          </Section>
          <div className="triple-play">
            <div className="tp-card pbc">
              <span className="tp-num">Act I</span>
              <div className="tp-name">Dos Pueblos<br />Public Benefit Corp</div>
              <div className="tp-role">Revenue Engine · For-Profit</div>
              <p className="tp-desc">
                Holds operating leases from the Stewardship Trust. Runs the abalone farm,
                eco-lodge (under AEO), film ranch, agricultural operations, and educational
                programming. Raises investor capital. PRT-bound: all activity must advance
                Five Capitals outcomes. Investable. Mission-constrained.
              </p>
              <div style={{ marginTop: 16 }}>
                {['Abalone Farm Revenue', 'Eco-Lodge / Glamping', 'Film & Events', 'Carbon Credits', 'Community Capital Raise'].map(t => (
                  <div key={t} style={{ fontSize: 11, color: 'var(--mist)', borderBottom: '1px solid rgba(201,168,76,0.1)', padding: '6px 0' }}>{t}</div>
                ))}
              </div>
            </div>
            <div className="tp-card trust">
              <span className="tp-num">Act II</span>
              <div className="tp-name">Dos Pueblos<br />Stewardship Trust</div>
              <div className="tp-role">Land Sovereign · 501(c)(3)</div>
              <p className="tp-desc">
                Holds fee title to the land in perpetuity. Issues covenant lease to the PBC.
                Grants a perpetual conservation easement to the Land Trust for Santa Barbara
                County. Governs through Five Capitals annual reporting and readiness gates.
                Receives 5% of gross PBC revenue — the PRT Covenant — for conservation
                and cultural programs.
              </p>
              <div style={{ marginTop: 16 }}>
                {['Holds Fee Title', 'Conservation Easement → LTSBC', '5% PRT Covenant on Gross Revenue', 'Readiness Gate Authority', 'Funded at Close from Community Raise'].map(t => (
                  <div key={t} style={{ fontSize: 11, color: 'var(--mist)', borderBottom: '1px solid rgba(41,122,111,0.15)', padding: '6px 0' }}>{t}</div>
                ))}
              </div>
            </div>
            <div className="tp-card commons">
              <span className="tp-num">Act III</span>
              <div className="tp-name">Chumash<br />Cultural Commons</div>
              <div className="tp-role">Multi-Tribal Co-Management</div>
              <p className="tp-desc">
                Irrevocable access to Mikiw and Kuyamu village sites. Cultural authority over
                the 1542 contact zone and Dos Pueblos Creek ceremonial interface. Multiple
                Chumash entities participate as co-stewards. Governance rights run with the
                land — they cannot be subordinated to any financial tier, ever.
              </p>
              <div style={{ marginTop: 16 }}>
                {['Mikiw & Kuyamu Village Sites', 'Marine Interface Access', 'TEK Integration', 'Tribal Veto on Cultural Decisions', 'Revenue Share: Chumash Kitchen, NOAA Grants'].map(t => (
                  <div key={t} style={{ fontSize: 11, color: 'var(--mist)', borderBottom: '1px solid rgba(138,126,200,0.12)', padding: '6px 0' }}>{t}</div>
                ))}
              </div>
            </div>
          </div>
          <div className="covenant-row">
            <div className="covenant-title">PRT Covenants — Run With the Land · Non-Waivable</div>
            <div className="covenants">
              {[
                'Five Capitals Annual Reporting',
                'Readiness Gates for All Expansion',
                'Chumash Priority Access — Irrevocable',
                'Marine Sanctuary Alignment Required',
                '5% Gross Revenue to Stewardship Trust',
                'No Extraction Without Regeneration',
                'Cultural Capital Triggers Covenant Review',
              ].map(c => <span key={c} className="cov-item">{c}</span>)}
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── FIVE CAPITALS ── */}
      <section className="capitals-bg">
        <div className="section-inner narrow">
          <Section>
            <div className="eyebrow">Regenesis Group · Five Capitals Framework</div>
            <h2 className="section-title">
              Financial metrics alone<br /><em>are insufficient.</em>
            </h2>
            <p className="body-text">
              The Five Capitals framework — developed by Bill Reed and the Regenesis Group — asserts
              that no single measure, including financial return, can capture the full value of a
              living system. All five capitals must be tracked, reported, and held in the PRT
              covenant structure. Degrading any capital to optimize another triggers
              a covenant review.
            </p>
          </Section>
          <div className="cap-grid">
            {[
              { icon: '🌿', name: 'Natural', desc: 'Ecology, soil, water, biodiversity, marine habitat, kelp, abalone, Dos Pueblos Creek watershed' },
              { icon: '🤝', name: 'Social', desc: 'Community access, education programs, public tours, Dos Pueblos Institute legacy, 8,300+ childhood hours in nature' },
              { icon: '🏺', name: 'Cultural', desc: 'Chumash heritage, Mikiw & Kuyamu living culture, TEK, ceremonial zones, sanctuary co-stewardship' },
              { icon: '🏗', name: 'Built', desc: 'Casa Grande, abalone farm infrastructure, orchards, residences, coastal trail, marine research potential' },
              { icon: '📈', name: 'Financial', desc: 'Operating NOI, conservation easement tax optimization, investor returns, PRT covenant revenue, community capital' },
            ].map(({ icon, name, desc }) => (
              <div className="cap-card" key={name}>
                <span className="cap-icon">{icon}</span>
                <div className="cap-name">{name}</div>
                <div className="cap-desc">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── TEAM ── */}
      <section className="team-bg" id="team">
        <div className="section-inner">
          <Section>
            <div className="eyebrow">The Team</div>
            <h2 className="section-title">
              Financial engineering<br /><em>meets ecological literacy.</em>
            </h2>
          </Section>
          <div className="team-grid">
            {[
              {
                icon: '⚙️', name: 'Dave Ladouceur',
                title: 'Principal · Regenerative Development Corp',
                bio: 'Founder-architect of the Triple Play structure and Place Regenerative Trust framework. 30+ years in technology including the Space Shuttle program. CEO of Life AI and Issho Homes. Designed the conservation finance architecture underpinning this acquisition.',
                tag: 'RDC · The Place Fund · Issho Homes',
              },
              {
                icon: '🌿', name: 'Bill Reed, AIA LEED',
                title: 'Principal · Regenesis Group',
                bio: 'Founding board member of the US Green Building Council. Co-founder of the LEED rating system. Co-author of the ANSI Integrative Process Standard. 200+ regenerative projects across six continents. Creator of the Story of Place methodology applied to this acquisition.',
                tag: 'Regenesis · ANSI IP v3.0 · Story of Place',
              },
              {
                icon: '🐚', name: 'Devin Spencer, MSc',
                title: 'General Manager · The Cultured Abalone Farm',
                bio: 'Marine scientist, UCSB Bren School. Manages all abalone production and endangered species partnerships. Leads the purple sea urchin ranching and kelp restoration programs. Primary operational partner for any acquisition team.',
                tag: 'UCSB Bren · NOAA Partner · MSc Marine Science',
              },
              {
                icon: '🏺', name: 'Violet Sage Walker',
                title: 'Chairwoman · Northern Chumash Tribal Council',
                bio: '2025 TIME100 Climate List. Led the decade-long campaign for the Chumash Heritage National Marine Sanctuary. Peter Douglas Coastal Stewardship Award, October 2025. Under contract to acquire Dos Pueblos Ranch at $62M as of September 2025.',
                tag: 'NCTC · TIME100 · CHNMS Campaign Lead',
              },
              {
                icon: '🌍', name: 'Earth Elders',
                title: 'Global Indigenous Alliance · Cultural Partners',
                bio: 'A planetary network of Indigenous Elders founded by Mindahi Bastida (Otomi-Toltec), working across 52 biocultural regions. Council of 13 Earth Elders as Guardians of Mother Earth. Aligned with the regenerative conservation vision for Dos Pueblos.',
                tag: 'theearthelders.org · 52 Biocultural Regions',
              },
              {
                icon: '🔬', name: 'Tribal Trust Foundation',
                title: 'Indigenous Cultural Partners',
                bio: 'Founded 1996 in Santa Barbara. Supports Indigenous-led projects through grantmaking, storytelling, and fiscal sponsorship. Active Chumash supporters — led effort to recognize Indigenous People\'s Day in Santa Barbara. Board President Janis Salin also serves on the Land Trust for SB County board.',
                tag: 'tribaltrustfoundation.org · SB County',
              },
            ].map(({ icon, name, title, bio, tag }) => (
              <div className="team-card" key={name}>
                <div className="team-img-ph">{icon}</div>
                <div className="team-name">{name}</div>
                <div className="team-title">{title}</div>
                <div className="team-bio">{bio}</div>
                <span className="asset-tag" style={{ marginTop: 14 }}>{tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── DEAL SNAPSHOT ── */}
      <section className="deal-bg" id="deal">
        <div className="section-inner">
          <Section>
            <div className="eyebrow">The Deal · Conservation Finance</div>
            <h2 className="section-title">
              The numbers behind<br /><em>a permanent conservation legacy.</em>
            </h2>
            <p className="body-text" style={{ maxWidth: 680 }}>
              The Triple Play structure is designed to make a $62M acquisition achievable
              through stacked conservation finance — IRC §170(h) conservation easement deductions,
              community capital, seller finance, and a tiered waterfall that serves every stakeholder.
              The financial model is live and interactive.
            </p>
          </Section>
          <div className="deal-grid">
            {[
              { val: '$62M', label: 'Contract Price', note: 'NCTC Sept 2025 · 1.5yr escrow' },
              { val: '$133M', label: 'HBU Appraisal', note: 'Highest & best use · AEO-enabled' },
              { val: '$71M', label: 'Easement Value', note: 'HBU minus purchase price' },
              { val: '~$21M', label: 'Effective Net Cost', note: 'After §170(h) tax optimization at 37%' },
              { val: '12%', label: 'Target Blended IRR', note: 'Tax savings credited first · Yrs 1–7' },
              { val: '$3M', label: 'Annual Carry Cost', note: 'Current ownership expense' },
              { val: '200', label: 'Community Members', note: '$50K/unit · 1.67× preferred return' },
              { val: '9', label: 'Waterfall Tiers', note: 'Income Trust → Community → RDC promote' },
            ].map(({ val, label, note }) => (
              <div className="deal-card" key={label}>
                <div className="deal-val">{val}</div>
                <div className="deal-label">{label}</div>
                <div className="deal-note">{note}</div>
              </div>
            ))}
          </div>
          <div className="cta-row">
            <a className="cta-primary" href="https://dp-phased-model.vercel.app" target="_blank" rel="noopener noreferrer">
              Open Financial Model →
            </a>
            <a className="cta-secondary" href="mailto:dave@regendevcorp.com">
              Request Full Briefing
            </a>
          </div>
          <div style={{ marginTop: 56, padding: '24px', border: '1px solid rgba(201,168,76,0.12)', fontSize: 11, color: 'var(--mist)', lineHeight: 1.8, fontFamily: 'var(--mono)', letterSpacing: '0.03em' }}>
            DRAFT — CONFIDENTIAL — © 2026 Regenerative Development Corp &amp; Regenesis Group. Not investment advice.
            All figures illustrative. The Triple Play structure and PRT covenant framework are proprietary intellectual
            property of RDC. The financial model is a working tool — numbers update as deal parameters evolve.
            Life before Profits.
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer>
        <div className="footer-left">
          Dos Pueblos Ranch.<br />
          <em>A Place Regenerative Trust acquisition.</em>
        </div>
        <div className="footer-right">
          RDC × Regenesis Group<br />
          The Place Fund · A Lane<br />
          Gaviota Coast, California<br />
          © 2026 · Life before Profits.
        </div>
      </footer>
    </>
  )
}
