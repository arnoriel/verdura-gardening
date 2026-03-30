import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  Leaf,
  Star,
  ArrowRight,
  Check,
  ChevronDown,
  Menu,
  X,
  Sprout,
  Droplets,
  Sun,
  Wind,
  Award,
  Users,
  MapPin,
  Mail,
  Phone,
  Instagram,
  Twitter,
  Youtube,
  Quote,
  Flower2,
  TreePine,
  Scissors,
  Shovel,
  Heart,
} from 'lucide-react';

// ─── Types ───────────────────────────────────────────────────────────────────

interface Service {
  icon: React.ReactNode;
  title: string;
  desc: string;
  tag: string;
  color: string;
}

interface Plant {
  name: string;
  latin: string;
  price: number;
  img: string;
  tag: string;
  rating: number;
}

interface Testimonial {
  name: string;
  location: string;
  text: string;
  rating: number;
  avatar: string;
}

interface PricingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  popular: boolean;
  cta: string;
}

interface FaqItem {
  q: string;
  a: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const services: Service[] = [
  {
    icon: <Leaf size={22} />,
    title: 'Landscape Design',
    desc: 'Bespoke outdoor spaces crafted with ecological intelligence and artistic vision for lasting beauty.',
    tag: 'Design',
    color: 'bg-sage-100 text-sage-700',
  },
  {
    icon: <Sprout size={22} />,
    title: 'Plant Consultation',
    desc: 'Expert botanical advice tailored to your microclimate, soil, and aesthetic aspirations.',
    tag: 'Consulting',
    color: 'bg-earth-100 text-earth-700',
  },
  {
    icon: <Droplets size={22} />,
    title: 'Irrigation Systems',
    desc: 'Smart water management solutions that conserve resources while nourishing every root.',
    tag: 'Technology',
    color: 'bg-blue-50 text-blue-700',
  },
  {
    icon: <Scissors size={22} />,
    title: 'Seasonal Maintenance',
    desc: 'Year-round care programmes keeping your garden vibrant through every season.',
    tag: 'Care',
    color: 'bg-sage-100 text-sage-700',
  },
  {
    icon: <TreePine size={22} />,
    title: 'Tree Surgery',
    desc: 'Professional arborist services preserving the health and form of your mature specimens.',
    tag: 'Specialist',
    color: 'bg-earth-100 text-earth-700',
  },
  {
    icon: <Shovel size={22} />,
    title: 'Soil Restoration',
    desc: 'Regenerative techniques revitalising depleted soil into a thriving, living ecosystem.',
    tag: 'Ecology',
    color: 'bg-amber-50 text-amber-700',
  },
];

const plants: Plant[] = [
  {
    name: 'Japanese Acer',
    latin: 'Acer palmatum',
    price: 149,
    img: 'https://images.unsplash.com/photo-1592150621744-aca64f48394a?w=600&auto=format&fit=crop&q=80',
    tag: 'Rare',
    rating: 4.9,
  },
  {
    name: 'Bird of Paradise',
    latin: 'Strelitzia reginae',
    price: 89,
    img: 'https://images.unsplash.com/photo-1604762512526-b7fc76bf41f5?w=600&auto=format&fit=crop&q=80',
    tag: 'Exotic',
    rating: 4.8,
  },
  {
    name: 'Monstera Deliciosa',
    latin: 'Monstera deliciosa',
    price: 65,
    img: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=600&auto=format&fit=crop&q=80',
    tag: 'Bestseller',
    rating: 4.9,
  },
  {
    name: 'Olive Tree',
    latin: 'Olea europaea',
    price: 220,
    img: 'https://images.unsplash.com/photo-1611048267451-e6ed903d4a38?w=600&auto=format&fit=crop&q=80',
    tag: 'Statement',
    rating: 4.7,
  },
];

const testimonials: Testimonial[] = [
  {
    name: 'Charlotte Ashford',
    location: 'Kensington, London',
    text: 'Verdura transformed our neglected courtyard into a sanctuary I never want to leave. The attention to detail is extraordinary — every plant, every stone feels intentional.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
  },
  {
    name: 'Marcus van der Berg',
    location: 'Amsterdam, Netherlands',
    text: 'The team\'s ecological approach resonates deeply with my values. My garden now supports pollinators and birds I\'ve never seen before. Truly remarkable work.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
  },
  {
    name: 'Yuki Nakamura',
    location: 'Tokyo, Japan',
    text: 'I wanted a garden that honoured Japanese aesthetics while working with our European climate. Verdura understood precisely what I envisioned and exceeded every expectation.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=80',
  },
];

const pricingPlans: PricingPlan[] = [
  {
    name: 'Seedling',
    price: '£299',
    period: '/month',
    description: 'Perfect for garden enthusiasts starting their journey.',
    features: [
      'Monthly maintenance visit',
      'Plant health assessment',
      'Seasonal planting guide',
      'Email support',
      'Online garden journal',
    ],
    popular: false,
    cta: 'Start Growing',
  },
  {
    name: 'Flourish',
    price: '£699',
    period: '/month',
    description: 'Our most loved plan for discerning garden owners.',
    features: [
      'Bi-weekly maintenance visits',
      'Custom design consultation',
      'Irrigation management',
      'Priority phone support',
      'Plant replacement guarantee',
      'Seasonal refresh included',
    ],
    popular: true,
    cta: 'Most Popular',
  },
  {
    name: 'Estate',
    price: '£1,499',
    period: '/month',
    description: 'Comprehensive care for expansive and prestigious properties.',
    features: [
      'Weekly dedicated team',
      'Full landscape redesign',
      'Smart irrigation system',
      'Dedicated garden manager',
      'Unlimited plant sourcing',
      'Event garden preparation',
      'Annual photobook included',
    ],
    popular: false,
    cta: 'Contact Us',
  },
];

const faqs: FaqItem[] = [
  {
    q: 'How do I begin working with Verdura?',
    a: 'Begin with a complimentary consultation where we visit your space, understand your vision, and present a tailored proposal within 5 working days. No commitment required.',
  },
  {
    q: 'Do you work with small gardens and balconies?',
    a: 'Absolutely. We believe every space, however compact, deserves thoughtful design. Some of our most celebrated projects are intimate urban gardens and roof terraces.',
  },
  {
    q: 'Are your plants sourced sustainably?',
    a: 'Yes. We partner exclusively with certified sustainable nurseries, prioritise locally propagated species, and never source plants from wild habitats.',
  },
  {
    q: 'What areas do you serve?',
    a: 'We currently operate across the UK, Netherlands, France, and Germany, with select international projects available for our Estate clients.',
  },
  {
    q: 'Can I maintain my garden myself between visits?',
    a: 'We encourage it! Every client receives a personalised care calendar and ongoing guidance so you feel confident nurturing your garden independently.',
  },
];

const stats = [
  { value: '2,4k+', label: 'Gardens Transformed', icon: <Leaf size={20} /> },
  { value: '98%', label: 'Client Satisfaction', icon: <Heart size={20} /> },
  { value: '15', label: 'Years of Excellence', icon: <Award size={20} /> },
  { value: '40+', label: 'Expert Gardeners', icon: <Users size={20} /> },
];

// ─── Utility Components ────────────────────────────────────────────────────────

const useInView = (threshold = 0.15) => {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
};

const SectionReveal = ({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const { ref, inView } = useInView();
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ─── Navbar ───────────────────────────────────────────────────────────────────

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = ['Services', 'Plants', 'Our Work', 'Pricing', 'About', 'Contact'];

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-cream/95 backdrop-blur-md shadow-sm border-b border-forest/5' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-18 flex items-center justify-between py-4">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-forest rounded-full flex items-center justify-center group-hover:bg-sage-600 transition-colors duration-300">
              <Leaf size={16} className="text-cream" />
            </div>
            <span className="font-display font-bold text-xl text-forest tracking-tight">VERDURA</span>
          </a>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(' ', '-')}`}
                className="text-sm font-medium text-forest/70 hover:text-forest transition-colors duration-200 animated-underline"
              >
                {link}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a href="#contact" className="btn-outline text-sm py-2.5 px-6">
              Free Consult
            </a>
            <a href="#pricing" className="btn-primary text-sm py-2.5 px-6">
              <span>Get Started</span>
              <ArrowRight size={14} />
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full hover:bg-sage-100 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-cream lg:hidden flex flex-col pt-20 px-8"
          >
            <div className="flex flex-col gap-6 mt-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link}
                  href={`#${link.toLowerCase().replace(' ', '-')}`}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="font-display text-3xl font-semibold text-forest hover:text-sage-600 transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {link}
                </motion.a>
              ))}
            </div>
            <div className="mt-auto mb-12 flex flex-col gap-4">
              <a href="#contact" className="btn-outline w-full justify-center" onClick={() => setMenuOpen(false)}>
                Free Consultation
              </a>
              <a href="#pricing" className="btn-primary w-full justify-center" onClick={() => setMenuOpen(false)}>
                <span>Get Started</span>
                <ArrowRight size={14} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// ─── Hero ─────────────────────────────────────────────────────────────────────

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 600], [0, -80]);
  const y2 = useTransform(scrollY, [0, 600], [0, -120]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-cream pt-20">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          style={{ y: y1 }}
          className="absolute -top-20 -right-32 w-[600px] h-[600px] rounded-full bg-sage-100/60 blur-3xl"
        />
        <motion.div
          style={{ y: y2 }}
          className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-earth-100/50 blur-3xl"
        />
        {/* Decorative leaves */}
        <motion.div
          animate={{ rotate: [0, 5, 0], y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-32 left-[8%] opacity-15"
        >
          <Leaf size={80} className="text-sage-600" strokeWidth={1} />
        </motion.div>
        <motion.div
          animate={{ rotate: [0, -4, 0], y: [0, 8, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute bottom-40 right-[10%] opacity-10"
        >
          <Flower2 size={100} className="text-earth-500" strokeWidth={1} />
        </motion.div>
        <motion.div
          animate={{ rotate: [0, 3, 0], y: [0, -6, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute top-1/2 left-[3%] opacity-8"
        >
          <TreePine size={60} className="text-sage-700" strokeWidth={1} />
        </motion.div>
      </div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 text-center"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 mb-8"
        >
          <span className="badge bg-sage-100 text-sage-700">
            <Sprout size={12} />
            <span>Premium Garden Studio</span>
          </span>
          <span className="badge bg-earth-100 text-earth-700">
            <Star size={12} fill="currentColor" />
            <span>5.0 Rated</span>
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="hero-title text-forest mb-6"
        >
          Where Nature
          <br />
          <em className="text-gradient not-italic">Becomes Art</em>
          <br />
          <span className="text-forest/85">in Your Garden</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="text-forest/60 text-lg lg:text-xl max-w-2xl mx-auto mb-12 leading-relaxed font-light"
        >
          We design, cultivate, and maintain extraordinary gardens that breathe life into every space.
          From intimate terraces to sweeping estates — your green sanctuary awaits.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <a href="#contact" className="btn-primary text-base px-8 py-4 w-full sm:w-auto justify-center">
            <span>Book Free Consultation</span>
            <ArrowRight size={16} />
          </a>
          <a href="#services" className="btn-outline text-base px-8 py-4 w-full sm:w-auto justify-center">
            Explore Services
          </a>
        </motion.div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-forest/50"
        >
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {[
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&auto=format&fit=crop&q=80',
                'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&auto=format&fit=crop&q=80',
                'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&auto=format&fit=crop&q=80',
              ].map((src, i) => (
                <img
                  key={i}
                  src={src}
                  className="w-8 h-8 rounded-full border-2 border-cream object-cover"
                  alt="Client"
                />
              ))}
            </div>
            <span>2,4k+ happy gardens</span>
          </div>
          <div className="flex items-center gap-1.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
            ))}
            <span>5.0 from 840+ reviews</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Hero Image Strip */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
        className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-8 mt-16"
      >
        <div className="grid grid-cols-12 gap-4 h-72 lg:h-96">
          <div className="col-span-5 rounded-3xl overflow-hidden img-overlay">
            <img
              src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&auto=format&fit=crop&q=80"
              alt="Beautiful garden"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 z-10 badge bg-white/90 text-forest backdrop-blur-sm text-xs">
              <MapPin size={10} /> Chelsea Garden
            </div>
          </div>
          <div className="col-span-4 flex flex-col gap-4">
            <div className="flex-1 rounded-3xl overflow-hidden img-overlay">
              <img
                src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600&auto=format&fit=crop&q=80"
                alt="Garden close up"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 rounded-3xl overflow-hidden img-overlay">
              <img
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop&q=80"
                alt="Garden tools"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="col-span-3 rounded-3xl overflow-hidden img-overlay">
            <img
              src="https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=600&auto=format&fit=crop&q=80"
              alt="Lush plants"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-1 text-forest/30 cursor-pointer"
          onClick={() => document.getElementById('marquee')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <span className="text-xs font-mono tracking-widest uppercase">Scroll</span>
          <ChevronDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
};

// ─── Marquee ──────────────────────────────────────────────────────────────────

const MarqueeSection = () => {
  const items = ['Landscape Design', '🌿', 'Rare Plants', '✦', 'Sustainable Gardens', '🌱', 'Expert Care', '✦', 'Bespoke Spaces', '🍃', 'Award Winning', '✦'];
  const doubled = [...items, ...items];

  return (
    <div id="marquee" className="py-6 bg-forest overflow-hidden">
      <div className="marquee-track gap-8 flex">
        {doubled.map((item, i) => (
          <span key={i} className="text-cream/70 text-sm font-mono tracking-widest uppercase whitespace-nowrap px-4">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

// ─── Stats ────────────────────────────────────────────────────────────────────

const Stats = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, i) => (
            <SectionReveal key={i} delay={i * 0.1}>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-sage-50 text-sage-600 mb-4">
                  {stat.icon}
                </div>
                <div className="counter-number mb-1">{stat.value}</div>
                <p className="text-forest/50 text-sm font-medium">{stat.label}</p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Services ────────────────────────────────────────────────────────────────

const Services = () => {
  return (
    <section id="services" className="py-28 bg-cream">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <SectionReveal className="max-w-xl mb-16">
          <span className="badge bg-sage-100 text-sage-700 mb-5 inline-flex">
            <Leaf size={11} /> What We Offer
          </span>
          <h2 className="section-title text-forest mb-4">
            Complete Garden
            <br />
            <em className="text-gradient not-italic">Care & Design</em>
          </h2>
          <p className="text-forest/55 text-base lg:text-lg leading-relaxed">
            From first consultation to ongoing stewardship — we provide end-to-end garden services rooted in ecological wisdom.
          </p>
        </SectionReveal>

        {/* Service grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <SectionReveal key={i} delay={i * 0.08}>
              <div className="card-organic p-8 group cursor-pointer">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl ${s.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {s.icon}
                </div>
                <span className={`badge text-xs mb-3 ${s.color}`}>{s.tag}</span>
                <h3 className="font-display font-semibold text-xl text-forest mb-3">{s.title}</h3>
                <p className="text-forest/55 text-sm leading-relaxed">{s.desc}</p>
                <div className="mt-6 flex items-center gap-2 text-sage-600 text-sm font-medium group-hover:gap-3 transition-all duration-300">
                  <span>Learn more</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Plants Shop ──────────────────────────────────────────────────────────────

const PlantsShop = () => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="plants" className="py-28 bg-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <SectionReveal className="max-w-lg">
            <span className="badge bg-earth-100 text-earth-700 mb-5 inline-flex">
              <Flower2 size={11} /> Our Plant Collection
            </span>
            <h2 className="section-title text-forest mb-4">
              Rare & Curated
              <br />
              <em className="text-gradient not-italic">Botanicals</em>
            </h2>
            <p className="text-forest/55 text-base leading-relaxed">
              Every plant in our collection is hand-selected for quality, health, and character.
              Sourced from the world's finest nurseries.
            </p>
          </SectionReveal>
          <SectionReveal delay={0.2}>
            <a href="#contact" className="btn-primary shrink-0">
              <span>Browse Full Collection</span>
              <ArrowRight size={14} />
            </a>
          </SectionReveal>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {plants.map((p, i) => (
            <SectionReveal key={i} delay={i * 0.1}>
              <div
                className="card-organic overflow-visible group cursor-pointer"
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                <div className="relative overflow-hidden rounded-2xl mx-3 mt-3 aspect-square">
                  <img
                    src={p.img}
                    alt={p.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="badge bg-white/90 text-forest text-xs backdrop-blur-sm py-1 px-3">
                      {p.tag}
                    </span>
                  </div>
                  <motion.div
                    animate={{ opacity: hovered === i ? 1 : 0, y: hovered === i ? 0 : 10 }}
                    transition={{ duration: 0.25 }}
                    className="absolute inset-x-3 bottom-3"
                  >
                    <button className="w-full btn-primary py-2.5 text-sm justify-center">
                      Add to Order
                    </button>
                  </motion.div>
                </div>
                <div className="px-4 py-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-display font-semibold text-forest text-lg leading-tight">{p.name}</h3>
                      <p className="text-forest/40 text-xs font-mono italic mt-0.5">{p.latin}</p>
                    </div>
                    <span className="font-display font-bold text-xl text-sage-600">£{p.price}</span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-3">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} size={12} className="text-amber-400 fill-amber-400" />
                    ))}
                    <span className="text-forest/40 text-xs ml-1">{p.rating}</span>
                  </div>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Our Work / Portfolio ──────────────────────────────────────────────────────

const OurWork = () => {
  const portfolioItems = [
    {
      img: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=900&auto=format&fit=crop&q=80',
      title: 'The Walled Garden',
      location: 'Oxfordshire, UK',
      type: 'Landscape Design',
      span: 'col-span-12 lg:col-span-7',
      height: 'h-80 lg:h-[480px]',
    },
    {
      img: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=600&auto=format&fit=crop&q=80',
      title: 'Urban Terrace',
      location: 'Amsterdam, NL',
      type: 'Balcony Garden',
      span: 'col-span-12 lg:col-span-5',
      height: 'h-80 lg:h-[480px]',
    },
    {
      img: 'https://images.unsplash.com/photo-1599598425947-5202edd56bdb?w=600&auto=format&fit=crop&q=80',
      title: 'Herb Paradise',
      location: 'Provence, FR',
      type: 'Kitchen Garden',
      span: 'col-span-12 lg:col-span-5',
      height: 'h-72 lg:h-96',
    },
    {
      img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&auto=format&fit=crop&q=80',
      title: 'Estate Grounds',
      location: 'Surrey, UK',
      type: 'Full Estate',
      span: 'col-span-12 lg:col-span-7',
      height: 'h-72 lg:h-96',
    },
  ];

  return (
    <section id="our-work" className="py-28 bg-cream">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <SectionReveal>
            <span className="badge bg-forest text-cream mb-5 inline-flex">
              <Award size={11} /> Portfolio
            </span>
            <h2 className="section-title text-forest">
              Spaces We've
              <br />
              <em className="text-gradient not-italic">Brought to Life</em>
            </h2>
          </SectionReveal>
          <SectionReveal delay={0.2} className="text-forest/55 max-w-xs">
            <p className="text-sm leading-relaxed">Each project tells a story of collaboration between our team's expertise and the client's vision.</p>
          </SectionReveal>
        </div>

        <div className="grid grid-cols-12 gap-4 lg:gap-6">
          {portfolioItems.map((item, i) => (
            <SectionReveal key={i} delay={i * 0.1} className={item.span}>
              <div className={`relative overflow-hidden rounded-3xl img-overlay group cursor-pointer ${item.height}`}>
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="badge bg-white/20 text-white backdrop-blur-sm text-xs mb-2">{item.type}</span>
                  <h3 className="font-display text-white text-xl font-semibold">{item.title}</h3>
                  <p className="text-white/70 text-sm flex items-center gap-1.5 mt-1">
                    <MapPin size={12} /> {item.location}
                  </p>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Process ──────────────────────────────────────────────────────────────────

const Process = () => {
  const steps = [
    { n: '01', title: 'Discovery', desc: 'We visit your space, listen deeply to your vision, and assess the ecological conditions.', icon: <Sun size={18} /> },
    { n: '02', title: 'Design', desc: 'Our designers craft a bespoke plan with plant palettes, layouts, and material selections.', icon: <Leaf size={18} /> },
    { n: '03', title: 'Installation', desc: 'Our skilled team transforms the design into reality with meticulous care and craft.', icon: <Shovel size={18} /> },
    { n: '04', title: 'Nurture', desc: 'Ongoing maintenance and seasonal care ensures your garden thrives year after year.', icon: <Droplets size={18} /> },
  ];

  return (
    <section className="py-28 bg-forest overflow-hidden relative">
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 rounded-full border border-cream/30" />
        <div className="absolute bottom-20 left-20 w-64 h-64 rounded-full border border-cream/20" />
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
        <SectionReveal className="text-center mb-20">
          <span className="badge bg-cream/10 text-cream/70 mb-5 inline-flex border border-cream/20">
            <Wind size={11} /> How It Works
          </span>
          <h2 className="section-title text-cream">
            Four Steps to Your
            <br />
            <em className="not-italic" style={{ color: '#8da86a' }}>Dream Garden</em>
          </h2>
        </SectionReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((s, i) => (
            <SectionReveal key={i} delay={i * 0.12}>
              <div className="relative">
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-px border-t border-dashed border-cream/15 z-0" />
                )}
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="font-mono text-sage-400 text-xs">{s.n}</span>
                    <div className="w-10 h-10 rounded-xl bg-cream/10 flex items-center justify-center text-cream/70">
                      {s.icon}
                    </div>
                  </div>
                  <h3 className="font-display text-cream text-xl font-semibold mb-3">{s.title}</h3>
                  <p className="text-cream/45 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>

        <SectionReveal delay={0.5} className="mt-20 text-center">
          <a href="#contact" className="btn-primary bg-sage-500 text-cream border-sage-500 hover:bg-sage-400 inline-flex">
            <span>Start Your Journey</span>
            <ArrowRight size={14} />
          </a>
        </SectionReveal>
      </div>
    </section>
  );
};

// ─── Testimonials ─────────────────────────────────────────────────────────────

const Testimonials = () => {
  return (
    <section className="py-28 bg-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <SectionReveal className="text-center mb-16 max-w-2xl mx-auto">
          <span className="badge bg-amber-50 text-amber-700 mb-5 inline-flex">
            <Star size={11} fill="currentColor" /> Client Stories
          </span>
          <h2 className="section-title text-forest">
            Gardens That Changed
            <br />
            <em className="text-gradient not-italic">How People Live</em>
          </h2>
        </SectionReveal>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <SectionReveal key={i} delay={i * 0.12}>
              <div className="testimonial-card h-full flex flex-col">
                <Quote size={28} className="text-sage-200 mb-4 flex-shrink-0" />
                <p className="text-forest/70 text-sm leading-relaxed flex-1 mb-6 italic">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-forest text-sm">{t.name}</p>
                    <p className="text-forest/40 text-xs flex items-center gap-1">
                      <MapPin size={10} /> {t.location}
                    </p>
                  </div>
                  <div className="ml-auto flex gap-0.5">
                    {[...Array(t.rating)].map((_, j) => (
                      <Star key={j} size={12} className="text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Pricing ──────────────────────────────────────────────────────────────────

const Pricing = () => {
  return (
    <section id="pricing" className="py-28 bg-cream">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <SectionReveal className="text-center mb-16 max-w-2xl mx-auto">
          <span className="badge bg-sage-100 text-sage-700 mb-5 inline-flex">
            <Sprout size={11} /> Investment Plans
          </span>
          <h2 className="section-title text-forest mb-4">
            Simple, Transparent
            <br />
            <em className="text-gradient not-italic">Garden Pricing</em>
          </h2>
          <p className="text-forest/55 text-base">
            No hidden fees, no surprise charges. Choose the level of care that matches your garden and ambitions.
          </p>
        </SectionReveal>

        <div className="grid md:grid-cols-3 gap-6 items-center">
          {pricingPlans.map((plan, i) => (
            <SectionReveal key={i} delay={i * 0.12}>
              <div
                className={`rounded-3xl p-8 border transition-all duration-300 hover-lift ${
                  plan.popular
                    ? 'pricing-popular border-transparent'
                    : 'bg-white border-forest/8 hover:border-sage-300'
                }`}
              >
                {plan.popular && (
                  <div className="mb-4">
                    <span className="badge bg-sage-400 text-cream text-xs">
                      <Star size={10} fill="currentColor" /> Most Popular
                    </span>
                  </div>
                )}
                <p className={`text-xs font-mono uppercase tracking-widest mb-2 ${plan.popular ? 'text-cream/50' : 'text-forest/40'}`}>
                  {plan.name}
                </p>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className={`font-display text-5xl font-bold ${plan.popular ? 'text-cream' : 'text-forest'}`}>
                    {plan.price}
                  </span>
                  <span className={`text-sm ${plan.popular ? 'text-cream/50' : 'text-forest/40'}`}>{plan.period}</span>
                </div>
                <p className={`text-sm mb-8 ${plan.popular ? 'text-cream/60' : 'text-forest/50'}`}>
                  {plan.description}
                </p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f, j) => (
                    <li key={j} className={`flex items-start gap-2.5 text-sm ${plan.popular ? 'text-cream/80' : 'text-forest/65'}`}>
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${plan.popular ? 'bg-cream/15' : 'bg-sage-100'}`}>
                        <Check size={11} className={plan.popular ? 'text-cream' : 'text-sage-600'} />
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3.5 rounded-xl font-medium text-sm transition-all duration-300 ${
                    plan.popular
                      ? 'bg-cream text-forest hover:bg-sage-50'
                      : 'bg-forest text-cream hover:bg-sage-700'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            </SectionReveal>
          ))}
        </div>

        <SectionReveal delay={0.4} className="text-center mt-10 text-forest/40 text-sm">
          All plans include a complimentary 30-minute consultation. Cancel or pause anytime.
        </SectionReveal>
      </div>
    </section>
  );
};

// ─── About / Mission ──────────────────────────────────────────────────────────

const About = () => {
  return (
    <section id="about" className="py-28 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Images */}
          <SectionReveal>
            <div className="relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1589923158776-cb4485d99fd6?w=800&auto=format&fit=crop&q=80"
                  alt="Our team"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating card */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-5 shadow-xl border border-sage-100 max-w-[200px]"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-sage-100 flex items-center justify-center">
                    <Leaf size={14} className="text-sage-600" />
                  </div>
                  <span className="font-semibold text-forest text-sm">Certified</span>
                </div>
                <p className="text-forest/50 text-xs leading-relaxed">RHS Level 3 qualified botanists & landscape architects</p>
              </motion.div>
              {/* Stats card */}
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -top-6 -left-6 bg-sage-600 rounded-2xl p-5 shadow-xl max-w-[180px]"
              >
                <p className="text-cream/70 text-xs mb-1">Est.</p>
                <p className="font-display text-cream text-3xl font-bold">2009</p>
                <p className="text-cream/60 text-xs mt-1">London, UK</p>
              </motion.div>
            </div>
          </SectionReveal>

          {/* Text */}
          <div>
            <SectionReveal>
              <span className="badge bg-sage-100 text-sage-700 mb-6 inline-flex">
                <Heart size={11} /> Our Mission
              </span>
              <h2 className="section-title text-forest mb-6">
                Rooted in Nature,
                <br />
                <em className="text-gradient not-italic">Driven by Beauty</em>
              </h2>
            </SectionReveal>
            <SectionReveal delay={0.1}>
              <p className="text-forest/60 text-base leading-relaxed mb-6">
                Founded in 2009 by master gardener Eleanor Hartley, Verdura began as a mission to reconnect urban dwellers with the restorative power of nature. Today, we are Europe's premier garden design studio with a team of 40+ passionate horticulturalists.
              </p>
              <p className="text-forest/60 text-base leading-relaxed mb-10">
                We believe every garden should be a living ecosystem — not just beautiful, but teeming with life, supporting pollinators, enriching soil, and providing sanctuary for its owners and local wildlife alike.
              </p>
            </SectionReveal>
            <SectionReveal delay={0.2}>
              <div className="grid grid-cols-2 gap-6 mb-10">
                {[
                  { label: 'RHS Accredited', icon: <Award size={16} /> },
                  { label: '100% Organic', icon: <Leaf size={16} /> },
                  { label: 'Carbon Neutral', icon: <Wind size={16} /> },
                  { label: 'Wildlife Friendly', icon: <Sprout size={16} /> },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-sage-50 flex items-center justify-center text-sage-600 flex-shrink-0">
                      {item.icon}
                    </div>
                    <span className="text-forest/70 text-sm font-medium">{item.label}</span>
                  </div>
                ))}
              </div>
            </SectionReveal>
            <SectionReveal delay={0.3}>
              <a href="#contact" className="btn-primary">
                <span>Meet Our Team</span>
                <ArrowRight size={14} />
              </a>
            </SectionReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── FAQ ─────────────────────────────────────────────────────────────────────

const FAQ = () => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-28 bg-cream">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <SectionReveal className="text-center mb-16">
          <span className="badge bg-sage-100 text-sage-700 mb-5 inline-flex">
            <Leaf size={11} /> FAQ
          </span>
          <h2 className="section-title text-forest">
            Questions About
            <br />
            <em className="text-gradient not-italic">Your Garden</em>
          </h2>
        </SectionReveal>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <SectionReveal key={i} delay={i * 0.06}>
              <div
                className={`bg-white rounded-2xl overflow-hidden border transition-all duration-300 ${
                  open === i ? 'border-sage-200 shadow-sm' : 'border-transparent'
                }`}
              >
                <button
                  className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left"
                  onClick={() => setOpen(open === i ? null : i)}
                >
                  <span className="font-semibold text-forest text-base">{faq.q}</span>
                  <motion.div
                    animate={{ rotate: open === i ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0 w-8 h-8 rounded-full bg-sage-50 flex items-center justify-center"
                  >
                    <ChevronDown size={16} className="text-sage-600" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <p className="px-6 pb-5 text-forest/55 text-sm leading-relaxed">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Contact / CTA ────────────────────────────────────────────────────────────

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-28 bg-forest relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(141, 168, 106, 0.4) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(187, 150, 105, 0.3) 0%, transparent 40%)',
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div>
            <SectionReveal>
              <span className="badge bg-cream/10 text-cream/70 border border-cream/20 mb-6 inline-flex">
                <Mail size={11} /> Get In Touch
              </span>
              <h2 className="section-title text-cream mb-6">
                Ready to Grow
                <br />
                <em className="not-italic" style={{ color: '#8da86a' }}>Your Garden?</em>
              </h2>
              <p className="text-cream/50 text-base leading-relaxed mb-10">
                Book your complimentary 45-minute consultation. We'll visit your space, discuss your vision, and outline a bespoke plan — with no obligation.
              </p>
            </SectionReveal>

            <SectionReveal delay={0.1}>
              <div className="space-y-5">
                {[
                  { icon: <Phone size={16} />, label: 'Phone', value: '+44 20 7946 0378' },
                  { icon: <Mail size={16} />, label: 'Email', value: 'hello@verdura.studio' },
                  { icon: <MapPin size={16} />, label: 'Studio', value: '12 Garden Row, Chelsea, London' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-cream/8 flex items-center justify-center text-cream/50 flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-cream/30 text-xs mb-0.5">{item.label}</p>
                      <p className="text-cream/80 text-sm">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </SectionReveal>

            <SectionReveal delay={0.2} className="mt-10">
              <div className="flex items-center gap-4">
                {[
                  { icon: <Instagram size={18} />, label: 'Instagram' },
                  { icon: <Twitter size={18} />, label: 'Twitter' },
                  { icon: <Youtube size={18} />, label: 'YouTube' },
                ].map((s, i) => (
                  <button key={i} aria-label={s.label} className="w-10 h-10 rounded-full bg-cream/8 flex items-center justify-center text-cream/50 hover:bg-cream/15 hover:text-cream/80 transition-all duration-200">
                    {s.icon}
                  </button>
                ))}
              </div>
            </SectionReveal>
          </div>

          {/* Right - Form */}
          <SectionReveal delay={0.2}>
            <div className="bg-cream rounded-3xl p-8 lg:p-10">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 rounded-full bg-sage-100 flex items-center justify-center mx-auto mb-4">
                    <Leaf size={28} className="text-sage-600" />
                  </div>
                  <h3 className="font-display text-forest text-2xl font-semibold mb-2">Wonderful!</h3>
                  <p className="text-forest/55 text-sm">We've received your message and will be in touch within 24 hours to schedule your free consultation.</p>
                </motion.div>
              ) : (
                <>
                  <h3 className="font-display text-forest text-2xl font-semibold mb-2">Book Free Consultation</h3>
                  <p className="text-forest/50 text-sm mb-8">No commitment required. We'll come to you.</p>
                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-forest/60 text-xs font-medium mb-1.5">First Name</label>
                        <input type="text" className="input-field" placeholder="Eleanor" required />
                      </div>
                      <div>
                        <label className="block text-forest/60 text-xs font-medium mb-1.5">Last Name</label>
                        <input type="text" className="input-field" placeholder="Hartley" required />
                      </div>
                    </div>
                    <div>
                      <label className="block text-forest/60 text-xs font-medium mb-1.5">Email</label>
                      <input type="email" className="input-field" placeholder="you@example.com" required />
                    </div>
                    <div>
                      <label className="block text-forest/60 text-xs font-medium mb-1.5">Garden Type</label>
                      <select className="input-field" defaultValue="">
                        <option value="" disabled>Select your garden type</option>
                        <option>Private Garden</option>
                        <option>Rooftop / Terrace</option>
                        <option>Estate / Large Property</option>
                        <option>Commercial / Office</option>
                        <option>Balcony</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-forest/60 text-xs font-medium mb-1.5">Tell us about your vision</label>
                      <textarea
                        className="input-field resize-none"
                        rows={4}
                        placeholder="Describe your garden space and what you're hoping to achieve..."
                      />
                    </div>
                    <button type="submit" className="btn-primary w-full justify-center py-4">
                      <span>Book My Free Consultation</span>
                      <ArrowRight size={15} />
                    </button>
                    <p className="text-center text-forest/35 text-xs mt-2">
                      By submitting, you agree to our privacy policy. We never share your details.
                    </p>
                  </form>
                </>
              )}
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
};

// ─── Footer ───────────────────────────────────────────────────────────────────

const Footer = () => {
  const links: Record<string, string[]> = {
    Services: ['Landscape Design', 'Plant Consultation', 'Irrigation', 'Maintenance', 'Tree Surgery'],
    Company: ['About Us', 'Our Team', 'Careers', 'Press', 'Contact'],
    Resources: ['Garden Blog', 'Plant Guide', 'Seasonal Tips', 'Videos', 'Podcast'],
    Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Sitemap'],
  };

  return (
    <footer className="bg-forest pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 pb-12 border-b border-cream/10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-sage-600 rounded-full flex items-center justify-center">
                <Leaf size={14} className="text-cream" />
              </div>
              <span className="font-display text-cream font-bold text-lg tracking-tight">VERDURA</span>
            </div>
            <p className="text-cream/35 text-xs leading-relaxed mb-6">
              Europe's premier garden design studio. Growing extraordinary spaces since 2009.
            </p>
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-cream/8 flex items-center justify-center cursor-pointer hover:bg-cream/15 transition-colors">
                <Instagram size={14} className="text-cream/50" />
              </div>
              <div className="w-8 h-8 rounded-full bg-cream/8 flex items-center justify-center cursor-pointer hover:bg-cream/15 transition-colors">
                <Twitter size={14} className="text-cream/50" />
              </div>
              <div className="w-8 h-8 rounded-full bg-cream/8 flex items-center justify-center cursor-pointer hover:bg-cream/15 transition-colors">
                <Youtube size={14} className="text-cream/50" />
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([cat, items]) => (
            <div key={cat}>
              <p className="text-cream/30 text-xs font-mono uppercase tracking-widest mb-4">{cat}</p>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-cream/50 text-xs hover:text-cream/80 transition-colors animated-underline">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-cream/25 text-xs">© 2025 Verdura Garden Studio. All rights reserved.</p>
          <p className="text-cream/25 text-xs flex items-center gap-1.5">
            Grown with <Heart size={10} className="text-sage-400 fill-sage-400" /> in Chelsea, London
          </p>
        </div>
      </div>
    </footer>
  );
};

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <MarqueeSection />
        <Stats />
        <Services />
        <PlantsShop />
        <OurWork />
        <Process />
        <Testimonials />
        <Pricing />
        <About />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}