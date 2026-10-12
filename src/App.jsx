import React, { useEffect, useState } from 'react';
import { Heart, ArrowDown, ArrowUpRight, Sparkles, Mail, Flower2, Stars } from 'lucide-react';

const memories = [
  {
    image: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=900&q=85',
    alt: 'Golden sunset over a quiet landscape',
    
  },
  {
    image: 'https://images.unsplash.com/photo-1511988617509-a57c8a288659?auto=format&fit=crop&w=900&q=85',
    alt: 'Friends laughing together',

  },
  {
    image: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=900&q=85',
    alt: 'Peaceful mountain lake',
  }
];

const reasons = [
  ['Your kindness', 'You notice the little things, and that says so much about you.'],
  ['Your laugh', 'It has a way of making an ordinary day feel lighter.'],
  ['Your honesty', 'I can be myself around you, and I never take that for granted.'],
  ['cup of tea with you','the best tea i ever had']
];

export default function App() {
  const [letterOpen, setLetterOpen] = useState(false);
  const [wishMade, setWishMade] = useState(false);
  const [candleLit, setCandleLit] = useState(true);
  const [photoUrls, setPhotoUrls] = useState(() => memories.map(({ image }) => image));
  const [heroPhotoUrl, setHeroPhotoUrl] = useState('https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1000&q=85');

  useEffect(() => {
    fetch('/api/images')
      .then((response) => response.ok ? response.json() : Promise.reject(new Error('Could not load saved photos.')))
      .then((savedPhotos) => {
        setPhotoUrls((current) => current.map((url, index) => savedPhotos[index] ? `/api/images/${savedPhotos[index]}` : url));
        if (savedPhotos[3]) setHeroPhotoUrl(`/api/images/${savedPhotos[3]}`);
      })
      .catch(() => {});
  }, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <main>
      <nav className="nav">
        <a className="brand" href="#home" aria-label="Back to top"><Heart size={17} fill="currentColor" /></a>
        <div className="nav-links">
          <a href="#home">Home</a><a href="#letter">Letter</a><a href="#memories">Memories</a><a href="#wish">A wish</a>
        </div>
        <span className="nav-note">MADE WITH CARE</span>
      </nav>

      <section className="hero section-wrap" id="home">
        <div className="hero-copy reveal">
          <p className="eyebrow"><span /> 14-10-2026 <span /></p>
          <h1>Happy birthday,<br /><em>Biscuit 🍪.</em></h1>
          <p className="hero-sub">For the person who makes the little things feel like a lot.</p>
          <button className="pill-button" onClick={() => scrollTo('letter')}>Open your birthday note <ArrowUpRight size={16} /></button>
          <p className="scroll-hint"><ArrowDown size={14} /> TAKE YOUR TIME</p>
        </div>
        <div className="hero-art">
          <div className="sun-shape" />
          <div className="hero-photo">
            <img src={heroPhotoUrl} alt="Soft pink flowers in natural light" />
          </div>
          <div className="photo-tag"><span>for you, always</span><Heart size={15} /></div>
          <div className="tiny-note">a small reminder<br />that you are loved</div>
        </div>
      </section>

      <section className="intro-strip">
        <p>Not a grand gesture. Just a little corner of the internet, made with you in mind.</p>
        <span>✳</span>
      </section>

      <section className="letter-section section-wrap" id="letter">
        <div className="section-heading">
          <p className="eyebrow">01 / A FEW WORDS</p>
          <h2>A letter, <em>just for you.</em></h2>
          <p>Some things are better said slowly.</p>
        </div>
        <article className={`letter-card ${letterOpen ? 'letter-open' : ''}`}>
          <div className="letter-top"><Mail size={20} /><span>A LITTLE NOTE</span><span className="letter-date">ON YOUR DAY</span></div>
          <p className="salutation">Hey, you.</p>
          <div className="letter-body">
            <p>Happy birthday to someone who brings a little more warmth into my world just by being herself.</p>
            <p>I hope this next year gives you reasons to laugh until your cheeks hurt, the courage to try the things you've been dreaming about, and the kind of peace that lets you breathe a little easier.</p>
            <p>Thank you for the conversations, the small moments, and all the parts of you that make you <em>you</em>. I hope you never feel like you have to be anything other than that.</p>
            {letterOpen && <div className="extra-letter">
              <p>And on the days when life feels a bit too loud, I hope you remember how much goodness you bring into the world without even trying.</p>
              <p>Today is yours. Make a wish, eat the cake, take too many pictures, and let yourself be celebrated.</p>
            </div>}
          </div>
          <button className="text-button" aria-expanded={letterOpen} onClick={() => setLetterOpen(!letterOpen)}>{letterOpen ? 'That’s all for now' : 'There’s a little more'} <span>{letterOpen ? '−' : '+'}</span></button>
          <div className="letter-signoff">With lots of love, <span>♡</span></div>
          <Flower2 className="letter-flower" size={68} strokeWidth={1} />
        </article>
      </section>

      <section className="memories-section" id="memories">
        <div className="section-wrap">
          <div className="section-heading centered">
            <h2>My little <em>world.</em></h2>
          </div>
          <div className="memory-grid">
            {memories.map((memory, index) => (
              <figure className={`memory memory-${index + 1}`} key={memory.caption}>
                <div className="memory-image"><img src={photoUrls[index]} alt={memory.alt} loading="lazy" /></div>
                <figcaption><span>0{index + 1}</span>{memory.caption}</figcaption>
              </figure>
            ))}
          </div>
          <p className="replace-note"><Sparkles size={14} /></p>
        </div>
      </section>

      <section className="reasons-section section-wrap">
        <div className="section-heading">
          <p className="eyebrow">03 / THE LITTLE THINGS</p>
          <h2>Things I <em>appreciate.</em></h2>
          <p>Not a complete list. Not even close.</p>
        </div>
        <div className="reason-list">
          {reasons.map(([title, description], index) => (
            <article className="reason" key={title}>
              <span className="reason-number">0{index + 1}</span>
              <div><h3>{title}</h3><p>{description}</p></div>
              <Heart size={17} strokeWidth={1.3} />
            </article>
          ))}
        </div>
      </section>

      <section className="wish-section" id="wish">
        <div className="wish-inner">
          <p className="eyebrow">04 / ONE LAST THING</p>
          <h2>Make a <em>little wish.</em></h2>
          <p className="wish-sub">Take a breath, think of something lovely, and tap the candle.</p>
          <button className={`candle-button ${!candleLit ? 'is-out' : ''}`} onClick={() => { setCandleLit(false); setWishMade(true); }} aria-label="Blow out the birthday candle">
            <span className="cake-emoji">🎂</span>
            <span className="candle">{candleLit && <span className="flame" />}</span>
            <span className="cake-base" />
          </button>
          <p className="tap-hint">{wishMade ? 'A little wish has been sent your way.' : 'TAP THE CANDLE TO MAKE YOUR WISH'}</p>
          {wishMade && <div className="wish-reveal"><Stars size={18} /><p>I hope the year ahead is gentle with you, generous to you, and full of things that make you feel alive.</p><span>Happy birthday, lovely human.</span></div>}
        </div>
      </section>

      <footer className="footer">
        <div className="footer-flower"><Flower2 size={28} strokeWidth={1.2} /></div>
        <p className="eyebrow">UNTIL THE NEXT LITTLE MOMENT</p>
        <h2>Here's to more <em>beautiful chapters.</em></h2>
        <p className="footer-copy">Thank you for being exactly who you are.</p>
        <div className="footer-bottom"><span>MADE WITH CARE, JUST FOR YOU</span><Heart size={14} fill="currentColor" /><a href="#home">BACK TO TOP ↑</a></div>
      </footer>
    </main>
  );
}
