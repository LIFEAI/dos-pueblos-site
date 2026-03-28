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
// ENHANCED TIMELINE WITH MODAL POPUPS
// ─────────────────────────────────────────────────────────────────────────────
const TIMELINE_EVENTS = [
  {
    year: 'Deep Time',
    shortYear: '10,000+',
    title: 'Mikiw & Kuyamu',
    subtitle: 'Chumash Stewardship',
    icon: '🏺',
    era: 'indigenous',
    color: '#8a7ec8',
    summary: 'Twin villages flourish on the coastal bluffs for over 10,000 years.',
    details: [
      'Mikiw ("place of the mussels") on the western bluff; Kuyamu on the eastern bluff',
      'Tomol plank canoes launched from beach coves to fish Naples Reef',
      'Harvested red abalone, tule reeds, and chia sage — a complete coastal economy',
      'Trickling stream of natural asphaltum (tar) used for waterproofing canoes and baskets',
      'Healthy tidepools and estuary supported a thriving marine ecosystem',
      'One of the most significant Chumash archaeological sites on the Gaviota Coast'
    ]
  },
  {
    year: '1542',
    shortYear: '1542',
    title: 'Cabrillo Fleet',
    subtitle: 'First European Contact',
    icon: '⛵',
    era: 'contact',
    color: '#c9a84c',
    summary: 'Juan Rodríguez Cabrillo anchors offshore — the first documented European-Chumash contact.',
    details: [
      'October 16, 1542: Three Spanish ships anchor in the kelp beds off Dos Pueblos',
      'Chumash paddle out in tomol canoes to trade fish and chia flour',
      'Received in exchange: textiles, iron tools, and Venetian glass beads',
      'Cabrillo\'s log documents "two large villages" — Dos Pueblos',
      'This encounter predates the Pilgrims by 78 years, Jamestown by 65 years',
      'The Northern Chumash Tribal Council calls this site "where California was born"'
    ]
  },
  {
    year: '1842',
    shortYear: '1842',
    title: 'Den Land Grant',
    subtitle: 'Rancho Era Begins',
    icon: '📜',
    era: 'rancho',
    color: '#9e4a2a',
    summary: 'Governor Alvarado awards 15,535 acres to Dr. Nicolas A. Den.',
    details: [
      'Mexican Governor Juan Alvarado grants Rancho Dos Pueblos to Irish immigrant Dr. Nicolas A. Den',
      'The grant encompasses 15,535 acres — the original extent of the ranch',
      'Den builds the first ranch house and introduces cattle ranching',
      'The name "Dos Pueblos" preserves the memory of the two Chumash villages',
      'This is the oldest surviving place name in the Goleta area',
      'Over the next century, the ranch is subdivided through inheritance and sale'
    ]
  },
  {
    year: '1943–1977',
    shortYear: '1943',
    title: 'Orchid Empire',
    subtitle: 'Signal Oil Era',
    icon: '🌺',
    era: 'orchid',
    color: '#4a7a60',
    summary: 'Sam Mosher builds the world\'s largest orchid farm. Casa Grande hosts President Truman.',
    details: [
      'Signal Oil magnate Sam Mosher acquires the property and builds Casa Grande',
      'Develops the world\'s largest commercial orchid operation on-site',
      'The 1920s Mediterranean mansion hosts President Harry Truman',
      'Property becomes a storied California landmark and celebrity retreat',
      'Mosher\'s stewardship preserves the coastal bluffs from development',
      'After his death, the property begins a slow fragmentation into separate parcels'
    ]
  },
  {
    year: '1989',
    shortYear: '1989',
    title: 'Blue Economy Pioneer',
    subtitle: 'The Cultured Abalone Farm',
    icon: '🐚',
    era: 'aquaculture',
    color: '#297a6f',
    summary: 'The Cultured Abalone Farm is established — sustainable aquaculture begins.',
    details: [
      'The Cultured Abalone Farm is founded on the coastal terrace',
      'Closed-loop seawater system draws directly from the Santa Barbara Channel',
      'Produces ~1 million red abalone per year — Seafood Watch "Best Choice" rating',
      'Partners with NOAA for endangered white abalone captive breeding',
      'Featured on PBS "Hope in the Water" documentary series',
      'Today: the only facility of its kind on the California coast'
    ]
  },
  {
    year: '2021–22',
    shortYear: '2021',
    title: 'Reassembly',
    subtitle: 'Himovitz Acquisition',
    icon: '🗺',
    era: 'modern',
    color: '#c9a84c',
    summary: 'Roger & Robin Himovitz reassemble the fragmented 219-acre coastal property.',
    details: [
      'Santa Barbara developer Roger Himovitz identifies the opportunity',
      'Over 18 months, negotiates and closes multiple separate transactions',
      'Reassembles 219 acres across multiple legal parcels',
      'Acquisition includes the Cultured Abalone Farm and Casa Grande',
      'Total investment exceeds $40 million all-in',
      'Vision: create a lasting conservation legacy, not a development play'
    ]
  },
  {
    year: 'Nov 2024',
    shortYear: '2024',
    title: 'Marine Sanctuary',
    subtitle: 'Chumash Heritage NMS',
    icon: '🌊',
    era: 'sanctuary',
    color: '#297a6f',
    summary: 'NOAA designates the Chumash Heritage National Marine Sanctuary.',
    details: [
      'November 30, 2024: NOAA formally designates the Chumash Heritage NMS',
      'First Indigenous-nominated marine sanctuary in U.S. history',
      'First new national marine sanctuary in over 30 years',
      '4,543 square miles of protected ocean — 116 miles of coastline',
      'Southern boundary terminates at Naples — adjacent to Dos Pueblos Ranch',
      'Led by Chairwoman Violet Sage Walker, completing her father Fred Collins\' vision'
    ]
  },
  {
    year: '2026+',
    shortYear: '2026',
    title: 'Biocultural Commons',
    subtitle: 'Regenerative Land-Back',
    icon: '🌿',
    era: 'future',
    color: '#8a7ec8',
    summary: 'A regenerative conservation acquisition structure is being developed.',
    details: [
      'Multi-tribal co-management with Indigenous leaders and Chumash allies',
      'Applied Traditional Ecological Knowledge (TEK) integrated into operations',
      'Revenue Engine: sustainable hospitality, regenerative agriculture, biodiversity credits',
      'Stewardship Trust holds Planetary Regenerative Trust covenants in perpetuity',
      'Current owners Roger & Robin Himovitz consulting with Earth Elders',
      'Goal: prove that conservation, culture, and commerce can align'
    ]
  },
]

function Timeline() {
  const [activeIdx, setActiveIdx] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  
  // Auto-advance when not hovered and modal closed
  useEffect(() => {
    if (isHovered || modalOpen) return
    const timer = setInterval(() => {
      setActiveIdx(i => (i + 1) % TIMELINE_EVENTS.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [isHovered, modalOpen])
  
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
            style={{ 
              left: `${(i / (TIMELINE_EVENTS.length - 1)) * 100}%`,
              '--node-color': evt.color 
            }}
            onClick={() => setActiveIdx(i)}
            aria-label={evt.year}
          >
            <span className="node-icon">{evt.icon}</span>
            <span className="node-year">{evt.shortYear}</span>
          </button>
        ))}
      </div>
      
      {/* Active event detail card */}
      <div className="timeline-detail" key={activeIdx}>
        <div className="timeline-era" style={{ color: active.color }}>{active.era.toUpperCase()}</div>
        <h3 className="timeline-title">{active.title}</h3>
        <div className="timeline-subtitle">{active.subtitle}</div>
        <p className="timeline-desc">{active.summary}</p>
        <button 
          className="timeline-more"
          onClick={() => setModalOpen(true)}
          style={{ borderColor: active.color, color: active.color }}
        >
          Learn More →
        </button>
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
      
      {/* Modal overlay */}
      {modalOpen && (
        <div className="timeline-modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="timeline-modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setModalOpen(false)}>×</button>
            <div className="modal-icon" style={{ background: active.color }}>{active.icon}</div>
            <div className="modal-era" style={{ color: active.color }}>{active.era.toUpperCase()}</div>
            <h3 className="modal-title">{active.title}</h3>
            <div className="modal-subtitle">{active.subtitle} · {active.year}</div>
            <ul className="modal-details">
              {active.details.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN APP — Stakeholder-first ordering
// ─────────────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <>
      {/* ── NAV ── */}
      <nav>
        <a className="nav-logo" href="#top">Dos Pueblos Ranch</a>
        <ul className="nav-links">
          <li><a href="#living-system">The Living System</a></li>
          <li><a href="#timeline">Timeline</a></li>
          <li><a href="#stakeholders">Stakeholders</a></li>
          <li><a href="#structure">The Structure</a></li>
          <li><a href="#approach">The Approach</a></li>
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
            219 acres at the edge of the Chumash Heritage National Marine Sanctuary. 
            Two ancient villages. A working abalone farm. Kelp forests and Naples Reef. 
            A once-in-a-generation opportunity to prove that conservation, culture, and 
            commerce can align.
          </p>
        </div>
        <div className="reveal reveal-4">
          <div className="hero-stats">
            {[
              ['219', 'Coastal Acres'],
              ['10,000+', 'Years of Stewardship'],
              ['4,543', 'Sq Mi Marine Sanctuary'],
              ['1542', 'First Contact'],
            ].map(([v, l]) => (
              <div key={l}>
                <span className="hero-stat-val">{v}</span>
                <span className="hero-stat-lbl">{l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE LIVING SYSTEM — Nature First ── */}
      <section className="living-system-bg" id="living-system">
        <div className="section-inner">
          <Section>
            <div className="eyebrow">The Living System</div>
            <h2 className="section-title">
              Nature is the<br /><em>primary stakeholder.</em>
            </h2>
            <p className="body-text" style={{ maxWidth: 720 }}>
              Before deal structures. Before capital stacks. Before any human arrangement — 
              there is the living system itself. Dos Pueblos Creek. Naples Reef. Kelp forests. 
              Abalone. Sea urchins. Migrating whales. The estuary that breathes with the tides. 
              Any regenerative acquisition must begin by recognizing that this place is not 
              an asset to be optimized. It is a living system with millennia of ecological 
              and cultural memory.
            </p>
          </Section>
          <div className="nature-grid">
            {[
              {
                title: 'Dos Pueblos Creek',
                desc: 'A year-round coastal creek flowing from the Santa Ynez Mountains to the Pacific. The estuary supports steelhead trout, tidewater goby, and dozens of migratory bird species.',
                img: `${CDN}/property_landscape/DP-Ranch-0040.jpg`
              },
              {
                title: 'Naples Reef',
                desc: 'One of the premier dive sites in Southern California. A kelp forest ecosystem supporting over 500 species. Home to giant sea bass, leopard sharks, and recovering abalone populations.',
                img: `${CDN}/property_landscape/DP-Ranch-0045.jpg`
              },
              {
                title: 'Coastal Bluffs',
                desc: 'Undeveloped blufftop habitat along 2,000+ feet of ocean frontage. One of the last stretches of the 76-mile Gaviota Coast not permanently altered by development.',
                img: `${CDN}/property_landscape/DP-Ranch-0027.jpg`
              },
              {
                title: 'Marine Interface',
                desc: 'Tidepools, sandy beach coves, and the rocky intertidal zone. The boundary where land and sea meet — where Chumash harvested abalone and launched tomol canoes for millennia.',
                img: `${CDN}/tidepools/Tidepooling.jpg`
              },
            ].map(({ title, desc, img }) => (
              <div className="nature-card" key={title}>
                <div className="nature-img"><Img src={img} alt={title} /></div>
                <h4 className="nature-title">{title}</h4>
                <p className="nature-desc">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── TIMELINE SECTION ── */}
      <section className="timeline-bg" id="timeline">
        <div className="section-inner">
          <Section>
            <div className="eyebrow">A Journey of Regeneration</div>
            <h2 className="section-title" style={{ marginBottom: 48 }}>
              10,000 years of<br /><em>continuous presence.</em>
            </h2>
            <Timeline />
          </Section>
        </div>
      </section>

      <div className="divider" />

      {/* ── STAKEHOLDERS ── */}
      <section className="stakeholders-bg" id="stakeholders">
        <div className="section-inner">
          <Section>
            <div className="eyebrow">The Stakeholders</div>
            <h2 className="section-title">
              Every voice at<br /><em>the table matters.</em>
            </h2>
            <p className="body-text" style={{ maxWidth: 680 }}>
              A regenerative acquisition is not a transaction between a buyer and a seller. 
              It is a reweaving of relationships — between land and people, between past and 
              future, between those who hold title and those who hold memory.
            </p>
          </Section>
          <div className="stakeholder-grid">
            {[
              {
                icon: '🏺',
                name: 'Chumash Heritage',
                role: 'Cultural Continuity',
                desc: 'Mikiw and Kuyamu villages have been continuously significant to Chumash people for over 10,000 years. Multiple Chumash entities — including the Northern Chumash Tribal Council, Santa Ynez Band, Barbareño/Ventureño descendants, and Kuyamu Park Association — hold living connection to this place.',
                color: '#8a7ec8'
              },
              {
                icon: '🌊',
                name: 'The Marine Sanctuary',
                role: 'Ecological Alignment',
                desc: 'The Chumash Heritage National Marine Sanctuary — the first Indigenous-nominated sanctuary in U.S. history — terminates at Naples, adjacent to Dos Pueblos. Any acquisition structure must complement marine governance, not compete with it.',
                color: '#297a6f'
              },
              {
                icon: '👨‍👩‍👧‍👦',
                name: 'Community',
                role: 'Educational Legacy',
                desc: 'The Dos Pueblos Institute operated on-site for years, providing outdoor education to Santa Barbara County schoolchildren. Over 8,300 childhood hours were spent in nature here. The community has a stake in continued public access and education.',
                color: '#4a7a60'
              },
              {
                icon: '🏠',
                name: 'Current Owners',
                role: 'Conservation Sponsors',
                desc: 'Roger and Robin Himovitz reassembled this fragmented property not for development, but to create a conservation legacy. They are active participants in the regenerative vision — consulting with Earth Elders and Chumash allies on the path forward.',
                color: '#c9a84c'
              },
              {
                icon: '🐚',
                name: 'The Abalone Farm',
                role: 'Blue Economy Anchor',
                desc: 'The Cultured Abalone Farm has operated here since 1989. General Manager Devin Spencer leads endangered species partnerships with NOAA. The farm is a working model of sustainable aquaculture — and a key revenue anchor for any structure.',
                color: '#9e4a2a'
              },
              {
                icon: '🌍',
                name: 'Indigenous Allies',
                role: 'Planetary Alignment',
                desc: 'Earth Elders, Tribal Trust Foundation, and other Indigenous-led organizations are engaged as cultural partners. This is not a single-tribe transaction — it is a multi-stakeholder alignment rooted in Traditional Ecological Knowledge.',
                color: '#8a7ec8'
              },
            ].map(({ icon, name, role, desc, color }) => (
              <div className="stakeholder-card" key={name}>
                <div className="stakeholder-icon" style={{ background: color }}>{icon}</div>
                <div className="stakeholder-name">{name}</div>
                <div className="stakeholder-role">{role}</div>
                <p className="stakeholder-desc">{desc}</p>
              </div>
            ))}
          </div>
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
            `${CDN}/property_landscape/DP-Ranch-0047.jpg`,
            `${CDN}/education_outdoor/Regernative.png`,
          ].map((src, i) => (
            <div key={i} className="gallery-item">
              <Img src={src} alt={`Gallery image ${i + 1}`} />
            </div>
          ))}
        </div>
      </section>

      <div className="divider" />

      {/* ── THE STRUCTURE ── */}
      <section className="structure-bg" id="structure">
        <div className="section-inner">
          <Section>
            <div className="eyebrow">The Structure · Planetary Regenerative Trust</div>
            <h2 className="section-title">
              Three entities.<br /><em>One living covenant.</em>
            </h2>
            <p className="body-text" style={{ maxWidth: 680 }}>
              The Triple Play structure binds three interlocking legal entities under 
              Planetary Regenerative Trust covenants — creating a vehicle that is investable, 
              conserved, and tribally co-managed simultaneously. No single entity can 
              act without the others. The land is protected in perpetuity.
            </p>
          </Section>
          <div className="triple-play">
            <div className="tp-card pbc">
              <span className="tp-num">Revenue</span>
              <div className="tp-name">Public Benefit<br />Corporation</div>
              <div className="tp-role">Operating Entity · For-Profit</div>
              <p className="tp-desc">
                Runs the abalone farm, sustainable hospitality, regenerative agriculture, 
                and educational programming. Raises community capital. All activity 
                must advance Five Capitals outcomes.
              </p>
              <div style={{ marginTop: 16 }}>
                {['Sustainable Aquaculture', 'Regenerative Hospitality', 'Carbon & Biodiversity Credits', 'Community Capital'].map(t => (
                  <div key={t} style={{ fontSize: 11, color: 'var(--mist)', borderBottom: '1px solid rgba(201,168,76,0.1)', padding: '6px 0' }}>{t}</div>
                ))}
              </div>
            </div>
            <div className="tp-card trust">
              <span className="tp-num">Stewardship</span>
              <div className="tp-name">Stewardship<br />Trust</div>
              <div className="tp-role">Land Sovereign · 501(c)(3)</div>
              <p className="tp-desc">
                Holds fee title to the land in perpetuity. Issues covenant lease 
                to the PBC. Governs through Five Capitals reporting and readiness 
                gates. Receives a percentage of gross revenue for conservation.
              </p>
              <div style={{ marginTop: 16 }}>
                {['Fee Title in Perpetuity', 'Conservation Easement', 'Five Capitals Governance', 'Readiness Gate Authority'].map(t => (
                  <div key={t} style={{ fontSize: 11, color: 'var(--mist)', borderBottom: '1px solid rgba(41,122,111,0.15)', padding: '6px 0' }}>{t}</div>
                ))}
              </div>
            </div>
            <div className="tp-card commons">
              <span className="tp-num">Culture</span>
              <div className="tp-name">Cultural<br />Commons</div>
              <div className="tp-role">Multi-Tribal Co-Management</div>
              <p className="tp-desc">
                Irrevocable access to Mikiw and Kuyamu village sites. Cultural 
                authority over the 1542 contact zone. Governance rights run with 
                the land — they cannot be subordinated to any financial tier.
              </p>
              <div style={{ marginTop: 16 }}>
                {['Mikiw & Kuyamu Access', 'TEK Integration', 'Tribal Veto on Cultural Decisions', 'Revenue Share'].map(t => (
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
                'Readiness Gates for Expansion',
                'Chumash Priority Access',
                'Marine Sanctuary Alignment',
                'No Extraction Without Regeneration',
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
              The Five Capitals framework asserts that no single measure can capture 
              the full value of a living system. All five must be tracked, reported, 
              and held in covenant. Degrading any capital to optimize another 
              triggers a covenant review.
            </p>
          </Section>
          <div className="cap-grid">
            {[
              { icon: '🌿', name: 'Natural', desc: 'Ecology, soil, water, biodiversity, marine habitat, kelp forests, Dos Pueblos Creek watershed' },
              { icon: '🤝', name: 'Social', desc: 'Community access, education programs, public benefit, childhood hours in nature' },
              { icon: '🏺', name: 'Cultural', desc: 'Chumash heritage, living culture, Traditional Ecological Knowledge, ceremonial zones' },
              { icon: '🏗', name: 'Built', desc: 'Casa Grande, abalone farm infrastructure, orchards, coastal trail, marine research' },
              { icon: '📈', name: 'Financial', desc: 'Operating sustainability, conservation finance, community investment, equitable returns' },
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

      {/* ── THE APPROACH — Softer Deal Language ── */}
      <section className="deal-bg" id="approach">
        <div className="section-inner">
          <Section>
            <div className="eyebrow">The Approach · Conservation Finance</div>
            <h2 className="section-title">
              A structure designed for<br /><em>permanent conservation.</em>
            </h2>
            <p className="body-text" style={{ maxWidth: 680 }}>
              The Triple Play structure uses stacked conservation finance tools — 
              conservation easements, community capital, seller participation, and 
              tiered revenue waterfalls — to make a significant coastal acquisition 
              achievable while ensuring permanent protection. The financial model 
              is live and interactive.
            </p>
          </Section>
          <div className="approach-grid">
            {[
              { 
                icon: '🌲', 
                title: 'Conservation Easement', 
                desc: 'A perpetual easement donated to the Land Trust for Santa Barbara County creates substantial tax benefits while permanently protecting the land from development.'
              },
              { 
                icon: '👥', 
                title: 'Community Capital', 
                desc: 'A community capital raise allows aligned investors to participate at accessible entry points, with preferred returns structured before any sponsor promote.'
              },
              { 
                icon: '🤝', 
                title: 'Seller Participation', 
                desc: 'The current owners participate in the structure as conservation sponsors — aligned with legacy outcomes rather than purely transactional exit.'
              },
              { 
                icon: '💧', 
                title: 'Revenue Waterfall', 
                desc: 'A multi-tier waterfall ensures that conservation, cultural, and community stakeholders are served before any financial sponsor receives promote.'
              },
              { 
                icon: '🌊', 
                title: 'Blue Economy Anchor', 
                desc: 'The Cultured Abalone Farm provides baseline operating revenue from day one — a proven sustainable business with 35+ years of operational history.'
              },
              { 
                icon: '📊', 
                title: 'Interactive Model', 
                desc: 'The financial model is a living tool — assumptions are transparent, scenarios are explorable, and sensitivity analysis is built in.'
              },
            ].map(({ icon, title, desc }) => (
              <div className="approach-card" key={title}>
                <span className="approach-icon">{icon}</span>
                <h4 className="approach-title">{title}</h4>
                <p className="approach-desc">{desc}</p>
              </div>
            ))}
          </div>
          <div className="cta-row">
            <a className="cta-primary" href="https://dos-pueblos-model.dev.place.fund" target="_blank" rel="noopener noreferrer">
              Explore the Financial Model →
            </a>
            <a className="cta-secondary" href="mailto:dave@regendevcorp.com">
              Request a Conversation
            </a>
          </div>
          <div style={{ marginTop: 56, padding: '24px', border: '1px solid rgba(201,168,76,0.12)', fontSize: 11, color: 'var(--mist)', lineHeight: 1.8, fontFamily: 'var(--mono)', letterSpacing: '0.03em' }}>
            DRAFT — CONFIDENTIAL — © 2026 Regenerative Development Corp &amp; Regenesis Group. Not investment advice.
            All figures illustrative. The Triple Play structure and PRT covenant framework are proprietary intellectual
            property of RDC. Life before Profits.
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer>
        <div className="footer-left">
          Dos Pueblos Ranch.<br />
          <em>A Planetary Regenerative Trust acquisition.</em>
        </div>
        <div className="footer-right">
          RDC × Regenesis Group<br />
          The Place Fund<br />
          Gaviota Coast, California<br />
          © 2026 · Life before Profits.
        </div>
      </footer>
    </>
  )
}
