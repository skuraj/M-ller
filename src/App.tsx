import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Clock, 
  Calendar, 
  Coffee, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Mail, 
  Compass, 
  Gift, 
  AlertCircle, 
  Check, 
  ExternalLink, 
  Menu, 
  X,
  Map,
  BadgePercent,
  TrendingUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Lokale Basisdaten für Müller Café & Bäckerei im EDEKA Herrsching
const BACKERY_DATA = {
  name: "Müller Café & Bäckerei",
  location: "im EDEKA Herrsching",
  address: "Seestraße 2, 82211 Herrsching am Ammersee",
  phone: "08152 3960940",
  phoneFormatted: "+4981523960940",
  hours: [
    { days: "Montag bis Samstag", time: "06:30 – 20:00 Uhr" },
    { days: "Sonntag", time: "Geschlossen" }
  ],
  googleMapsLink: "https://maps.google.com/?q=M%C3%BCller+Caf%C3%A9+%26+B%C3%A4ckerei+Seestra%C3%9Fe+2+82211+Herrsching+am+Ammersee"
};

type OrderType = 'Brötchen' | 'Brot' | 'Brezn / Laugengebäck' | 'Kuchen / Süßes' | 'Snack / belegte Ware' | 'Kaffee / Heißgetränke' | 'Sonstiges';

interface PreOrderForm {
  name: string;
  phone: string;
  email: string;
  pickupDate: string;
  pickupTime: string;
  orderType: OrderType | '';
  quantity: string;
  details: string;
}

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeGalleryTab, setActiveGalleryTab] = useState<'all' | 'bread' | 'cake' | 'snack'>('all');
  
  // Vorbestellungs-Formular-Status
  const [formData, setFormData] = useState<PreOrderForm>({
    name: '',
    phone: '',
    email: '',
    pickupDate: '',
    pickupTime: '',
    orderType: '',
    quantity: '',
    details: ''
  });
  
  const [errors, setErrors] = useState<Partial<Record<keyof PreOrderForm, string>>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // FAQ-Elemente
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof PreOrderForm]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof PreOrderForm, string>> = {};
    if (!formData.name.trim()) newErrors.name = 'Bitte geben Sie Ihren Namen an';
    if (!formData.phone.trim()) newErrors.phone = 'Eine Telefonnummer wird für Rückfragen benötigt';
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Bitte geben Sie eine gültige E-Mail-Adresse an';
    }
    if (!formData.pickupDate) newErrors.pickupDate = 'Abholdatum ist erforderlich';
    if (!formData.pickupTime) newErrors.pickupTime = 'Bitte wählen Sie eine Uhrzeit';
    if (!formData.orderType) newErrors.orderType = 'Bitte wählen Sie eine Kategorie';
    if (!formData.quantity || parseInt(formData.quantity) <= 0) {
      newErrors.quantity = 'Menge muss mindestens 1 betragen';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      // Simuliere einen edlen Ladevorgang für Premium-Anmutung
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
      }, 900);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      pickupDate: '',
      pickupTime: '',
      orderType: '',
      quantity: '',
      details: ''
    });
    setIsSubmitted(false);
    setErrors({});
  };

  const galleryItems = [
    {
      id: 1,
      category: 'bread',
      title: 'Traditionelles Handwerksbrot',
      description: 'Knusprige Kruste, saftige Krume aus Natursauerteig',
      comment: '<!-- Hier Brot- und Backwarenbild einfügen -->',
      imgPlaceholder: 'Brot & Kruste'
    },
    {
      id: 2,
      category: 'cake',
      title: 'Feine Kuchenspezialitäten',
      description: 'Klassische Rezepte, mit Liebe frisch zubereitet',
      comment: '<!-- Hier Detailaufnahme von Gebäck einfügen -->',
      imgPlaceholder: 'Kuchenträume'
    },
    {
      id: 3,
      category: 'snack',
      title: 'Herzhafte Premium-Snacks',
      description: 'Frisch belegte Ware für die perfekte Pause am Ammersee',
      comment: '<!-- Hier Frühstück / Snack Bild einfügen -->',
      imgPlaceholder: 'Snacks & Baguettes'
    },
    {
      id: 4,
      category: 'bread',
      title: 'Knusprige Brezn & Laugengeback',
      description: 'Die bayrische Seele der Bäckerei im EDEKA Herrsching',
      comment: '<!-- Hier Thekenbild einfügen -->',
      imgPlaceholder: 'Goldbraune Brezn'
    },
    {
      id: 5,
      category: 'cake',
      title: 'Saisonale Feingebäcke',
      description: 'Wechselnde Spezialitäten passend zur Jahreszeit',
      comment: '<!-- Hier saisonale Ware oder Aktionsbild einfügen -->',
      imgPlaceholder: 'Saison-Gebäck'
    },
    {
      id: 6,
      category: 'snack',
      title: 'Kaffee & Heißgetränke',
      description: 'Frisch gemahlene Premium-Bohnen im gemütlichen Ambiente',
      comment: '<!-- Hier Café-Atmosphäre einfügen -->',
      imgPlaceholder: 'Barista-Kaffee'
    }
  ];

  const filteredGallery = activeGalleryTab === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeGalleryTab);

  const faqs = [
    {
      q: "Wo genau finde ich Müller Café & Bäckerei in Herrsching?",
      a: "Wir befinden uns direkt im Eingangsbereich des modernen EDEKA Centers in der Seestraße 2, 82211 Herrsching am Ammersee. Durch diese Lage genießen Sie hervorragende Erreichbarkeit sowie zahlreiche kostenfreie Kundenparkplätze direkt vor der Haustür."
    },
    {
      q: "Wie lange im Voraus muss ich eine größere Vorbestellung anfragen?",
      a: "Um absolute Frische und Verfügbarkeit zu garantieren, bitten wir Sie, größere Bestellungen (z. B. für Feiern, Firmen oder Vereine) mindestens 24 bis 48 Stunden im Voraus über unser Online-Formular oder telefonisch anzufragen. Eine verbindliche Zusage erhalten Sie nach persönlicher Abstimmung."
    },
    {
      q: "Kann ich meine Bestellung auch am Sonntag abholen?",
      a: "Da unsere Filiale im EDEKA Herrsching am Sonntag geschlossen ist, ist eine Abholung nur im Rahmen unserer regulären Öffnungszeiten von Montag bis Samstag (06:30 bis 20:00 Uhr) möglich."
    },
    {
      q: "Wo hole ich die vorbestellten Backwaren ab?",
      a: "Sie können Ihre vorbereitete Ware direkt an unserer Haupttheke im Müller Café & Bäckerei abholen. Melden Sie sich einfach kurz bei unserem Service-Team – Ihre Bestellung steht frisch verpackt und abholbereit zur vereinbarten Uhrzeit für Sie bereit."
    },
    {
      q: "Besteht die Möglichkeit einer telefonischen Absprache für spezielle Wünsche?",
      a: "Absolut. Für ganz individuelle Wünsche oder Sonderbestellungen, die über unsere Standard-Auswahl hinausgehen, können Sie uns jederzeit während der Öffnungszeiten direkt unter 08152 3960940 erreichen."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-[#c29b63] selection:text-white bg-[#faf9f6]">
      
      {/* HEADER / NAVIGATION */}
      <header className="sticky top-0 z-40 bg-[#faf9f6]/90 backdrop-blur-md border-b border-[#e5dfd3] transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 md:h-24">
            
            {/* Logo-Bereich */}
            <a href="#start" className="flex flex-col group">
              <span className="font-serif text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-[#1a1a1a] group-hover:text-[#8e6e42] transition-colors duration-300">
                MÜLLER
              </span>
              <div className="flex items-center gap-1.5 -mt-1">
                <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-[#8e6e42] font-semibold">
                  Café & Bäckerei
                </span>
                <span className="h-1 w-1 rounded-full bg-[#8e6e42]"></span>
                <span className="font-mono text-[9px] sm:text-[10px] text-gray-500 font-medium">
                  im EDEKA Herrsching
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <a href="#uber-uns" className="text-sm font-medium text-gray-700 hover:text-[#8e6e42] transition-colors">Unser Versprechen</a>
              <a href="#impressionen" className="text-sm font-medium text-gray-700 hover:text-[#8e6e42] transition-colors">Impressionen</a>
              <a href="#vorbestellung" className="text-sm font-medium text-gray-700 hover:text-[#8e6e42] transition-colors">Online-Vorbestellung</a>
              <a href="#standort" className="text-sm font-medium text-gray-700 hover:text-[#8e6e42] transition-colors">Standort</a>
              <a href="#faq" className="text-sm font-medium text-gray-700 hover:text-[#8e6e42] transition-colors">FAQ</a>
            </nav>

            {/* Desktop Call-to-Action */}
            <div className="hidden lg:flex items-center space-x-4">
              <a 
                href={`tel:${BACKERY_DATA.phoneFormatted}`} 
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#1a1a1a] hover:text-[#8e6e42] px-4 py-2 rounded-lg border border-[#e5dfd3] hover:border-[#8e6e42] transition-all font-mono"
              >
                <Phone className="w-4 h-4 text-[#8e6e42]" />
                {BACKERY_DATA.phone}
              </a>
              <a 
                href="#vorbestellung" 
                className="inline-flex items-center justify-center text-sm font-medium text-white bg-[#8e6e42] hover:bg-[#72562f] px-5 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all font-semibold"
              >
                Jetzt vorbestellen
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden items-center space-x-3">
              <a 
                href={`tel:${BACKERY_DATA.phoneFormatted}`} 
                className="p-2 w-10 h-10 flex items-center justify-center rounded-lg border border-[#e5dfd3] text-gray-700 hover:text-[#8e6e42]"
                title="Jetzt anrufen"
              >
                <Phone className="w-5 h-5" />
              </a>
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
                className="p-2 w-10 h-10 flex items-center justify-center rounded-lg border border-[#e5dfd3] text-gray-700 hover:text-[#8e6e42]"
                aria-label="Menü öffnen"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden border-t border-[#e5dfd3] bg-[#faf9f6]"
            >
              <div className="px-4 pt-4 pb-6 space-y-3 shadow-inner">
                <a 
                  href="#uber-uns" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2.5 rounded-lg text-base font-medium text-gray-700 hover:bg-[#faf9f6] hover:text-[#8e6e42]"
                >
                  Unser Versprechen
                </a>
                <a 
                  href="#impressionen" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2.5 rounded-lg text-base font-medium text-gray-700 hover:bg-[#faf9f6] hover:text-[#8e6e42]"
                >
                  Impressionen
                </a>
                <a 
                  href="#vorbestellung" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2.5 rounded-lg text-base font-medium text-gray-700 hover:bg-[#faf9f6] hover:text-[#8e6e42]"
                >
                  Online-Vorbestellung
                </a>
                <a 
                  href="#standort" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2.5 rounded-lg text-base font-medium text-gray-700 hover:bg-[#faf9f6] hover:text-[#8e6e42]"
                >
                  Standort & Route
                </a>
                <a 
                  href="#faq" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2.5 rounded-lg text-base font-medium text-gray-700 hover:bg-[#faf9f6] hover:text-[#8e6e42]"
                >
                  FAQ
                </a>
                <div className="pt-4 border-t border-[#e5dfd3] flex flex-col space-y-3">
                  <a 
                    href={`tel:${BACKERY_DATA.phoneFormatted}`} 
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-lg border border-[#e5dfd3] font-mono text-center text-sm font-semibold"
                  >
                    <Phone className="w-4 h-4 text-[#8e6e42]" />
                    {BACKERY_DATA.phone}
                  </a>
                  <a 
                    href="#vorbestellung" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center w-full py-3 rounded-lg bg-[#8e6e42] text-white font-semibold text-center text-sm"
                  >
                    Online vorbestellen
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-grow">
        
        {/* HERO SECTION */}
        <section id="start" className="relative overflow-hidden bg-gradient-to-b from-[#f3ede0] to-[#faf9f6] pt-12 pb-20 md:py-28 lg:py-36">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              
              {/* Text Spalte */}
              <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 bg-[#8e6e42]/10 text-[#8e6e42] px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold tracking-wider uppercase">
                  <MapPin className="w-3.5 h-3.5" />
                  Premium Bäckerei in Herrsching am Ammersee
                </div>
                
                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-[1.1]">
                  Täglicher Genuss & <br />
                  <span className="text-[#8e6e42] relative inline-block">
                    echtes Backhandwerk
                    <span className="absolute bottom-1 left-0 w-full h-1 bg-[#8e6e42]/20 rounded-md"></span>
                  </span>
                </h1>
                
                <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
                  Willkommen bei Müller Café & Bäckerei <span className="font-semibold text-gray-800">im EDEKA Herrsching</span>. Erleben Sie den Unterschied unserer meisterhaft zubereiteten Brote, traumhaften Kuchen und herzhaften, täglich frisch hergestellten Snacks für Ihren Moment am See.
                </p>

                {/* Hero CTA Knöpfe */}
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                  <a 
                    href="#vorbestellung" 
                    className="w-full sm:w-auto inline-flex items-center justify-center bg-[#8e6e42] hover:bg-[#72562f] text-white px-8 py-3.5 rounded-xl font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 text-base"
                  >
                    Große Bestellung anfragen
                  </a>
                  <a 
                    href={`tel:${BACKERY_DATA.phoneFormatted}`} 
                    className="w-full sm:w-auto inline-flex items-center justify-center bg-white hover:bg-gray-50 text-gray-800 px-8 py-3.5 rounded-xl font-semibold border border-[#e5dfd3] hover:border-gray-300 shadow-sm transition-all duration-300 text-base font-mono gap-2"
                  >
                    <Phone className="w-4 h-4 text-[#8e6e42]" />
                    {BACKERY_DATA.phone}
                  </a>
                </div>

                {/* Micro-Features im Hero */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4 max-w-lg mx-auto lg:mx-0 text-left">
                  <div className="flex items-center gap-2">
                    <Check className="w-4.5 h-4.5 text-[#8e6e42] shrink-0" />
                    <span className="text-xs font-semibold text-gray-700 font-mono">Tupfengenau Ofenfrisch</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4.5 h-4.5 text-[#8e6e42] shrink-0" />
                    <span className="text-xs font-semibold text-gray-700 font-mono">Bestes Weizen & Roggen</span>
                  </div>
                  <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                    <Check className="w-4.5 h-4.5 text-[#8e6e42] shrink-0" />
                    <span className="text-xs font-semibold text-gray-700 font-mono">Kostenfreie Parkplätze</span>
                  </div>
                </div>

              </div>

              {/* Visuelle Spalte (Komposition) */}
              <div className="lg:col-span-5 relative mt-8 lg:mt-0">
                <div className="aspect-[4/5] sm:aspect-square lg:aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-tr from-[#8e6e42]/20 to-[#f3ede0] border-2 border-white shadow-xl relative group">
                  <div className="absolute inset-0 bg-neutral-900/10 mix-blend-multiply transition-opacity duration-300 group-hover:opacity-10" />
                  
                  {/* Edle Platzhalter-Grafik für Premium Backwaren */}
                  <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-8 z-10 text-white">
                    <span className="font-mono text-xs tracking-widest uppercase bg-black/40 backdrop-blur-md self-start px-3 py-1 rounded-full">
                      Müller Herrsching
                    </span>
                    <div className="space-y-2 bg-black/40 backdrop-blur-md p-4 sm:p-6 rounded-xl">
                      <p className="font-serif text-xl sm:text-2xl font-bold">Knusprige Vielfalt direkt im Genuss-Markt</p>
                      <p className="text-xs text-stone-200">Gebacken nach überlieferten Familienrezepten.</p>
                    </div>
                  </div>

                  {/* HTML-Bilder-Kommentare für den Kunden */}
                  {/* Hier Hero-Bild mit Backwaren oder Café-Atmosphäre einfügen */}
                  {/* Hier Innenaufnahme oder Theke einfügen */}
                  <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-[#8e6e42]/5 border-2 border-dashed border-[#8e6e42]/30 rounded-2xl">
                    <div className="text-center p-6 space-y-4">
                      <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mx-auto shadow-inner text-[#8e6e42]">
                        <Coffee className="w-7 h-7" />
                      </div>
                      <div>
                        <p className="text-[#8e6e42] font-semibold text-sm">Hintergrundbild Platzhalter</p>
                        <p className="text-gray-500 text-xs mt-1 font-mono">
                          &lt;!-- /public/assets/hero_images.jpg --&gt;
                        </p>
                      </div>
                    </div>
                  </div>
                  
                </div>

                {/* Ambient Card */}
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg border border-[#e5dfd3] hidden sm:flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center border border-green-200 text-green-600">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-mono font-bold text-gray-500 uppercase tracking-wider">Abholung heute</p>
                    <p className="text-sm font-semibold text-gray-800">Mo - Sa bis 20:00 Uhr offen</p>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* TRUST-BAR / SOCIAL PROOF */}
        <section className="bg-white border-y border-[#e5dfd3] relative z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[#e5dfd3] py-8">
              
              {/* Point 1 */}
              <div className="flex items-center gap-4 px-4 py-4 md:py-2">
                <div className="w-10 h-10 rounded-full bg-[#f3ede0] flex items-center justify-center text-[#8e6e42] shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-gray-400">Standort</h4>
                  <p className="text-sm font-semibold text-gray-800 mt-0.5">{BACKERY_DATA.location}</p>
                </div>
              </div>

              {/* Point 2 */}
              <div className="flex items-center gap-4 px-4 py-4 md:py-2">
                <div className="w-10 h-10 rounded-full bg-[#f3ede0] flex items-center justify-center text-[#8e6e42] shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-gray-400">Montag - Samstag</h4>
                  <p className="text-sm font-semibold text-gray-800 mt-0.5">06:30 – 20:00 Uhr durchgehend</p>
                </div>
              </div>

              {/* Point 3 */}
              <div className="flex items-center gap-4 px-4 py-4 md:py-2">
                <div className="w-10 h-10 rounded-full bg-[#f3ede0] flex items-center justify-center text-[#8e6e42] shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-gray-400">Telefonischer Service</h4>
                  <p className="text-sm font-semibold text-[#8e6e42] mt-0.5 font-mono">{BACKERY_DATA.phone}</p>
                </div>
              </div>

              {/* Point 4 */}
              <div className="flex items-center gap-4 px-4 py-4 md:py-2">
                <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600 shrink-0">
                  <BadgePercent className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-green-600">Vorbestell-Service</h4>
                  <p className="text-sm font-semibold text-gray-800 mt-0.5">Große Mengen bequem sichern</p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* UNSER VERSPRECHEN (USP) SECTION */}
        <section id="uber-uns" className="py-20 md:py-28 bg-[#faf9f6]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
              <span className="font-mono text-xs font-bold text-[#8e6e42] tracking-widest uppercase">
                Tradition & Frische im Einklang
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900">
                Warum Müller Café & Bäckerei in Herrsching begeistert
              </h2>
              <div className="w-16 h-1 bg-[#8e6e42] mx-auto rounded-full mt-4"></div>
              <p className="text-gray-600 font-light text-base sm:text-lg">
                Bei uns vereint sich handwerkliche Sorgfalt mit der Bequemlichkeit Ihres Einkaufs im beliebten EDEKA-Markt. Keine Kompromisse beim Geschmack.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* USP 1 */}
              <div className="bg-white p-8 rounded-xl border border-[#e5dfd3] shadow-sm hover:shadow-md transition-shadow duration-300 space-y-5">
                <div className="w-12 h-12 rounded-lg bg-[#f3ede0] flex items-center justify-center text-[#8e6e42]">
                  <Coffee className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-gray-900">Ofenfrische am Ammersee</h3>
                <p className="text-gray-600 text-sm font-light leading-relaxed">
                  Wir backen über den Tag verteilt mehrfach frisch für Sie. Ob morgens um 06:30 Uhr auf dem Weg zur Arbeit oder kurz vor Feierabend um 20:00 Uhr – genießen Sie erstklassige, duftende Qualität.
                </p>
              </div>

              {/* USP 2 */}
              <div className="bg-white p-8 rounded-xl border border-[#e5dfd3] shadow-sm hover:shadow-md transition-shadow duration-300 space-y-5">
                <div className="w-12 h-12 rounded-lg bg-[#f3ede0] flex items-center justify-center text-[#8e6e42]">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-gray-900">Beste handwerkliche Zutaten</h3>
                <p className="text-gray-600 text-sm font-light leading-relaxed">
                  Unsere Teige erhalten die nötige Reifezeit für hervorragende Bekömmlichkeit. Wir setzen auf ehrliches Handwerk statt chemischer Backmischungen – das schmeckt man mit jedem Bissen.
                </p>
              </div>

              {/* USP 3 */}
              <div className="bg-white p-8 rounded-xl border border-[#e5dfd3] shadow-sm hover:shadow-md transition-shadow duration-300 space-y-5">
                <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center text-[#8e6e42]">
                  <Gift className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-serif text-xl font-bold text-green-700">Großbestellungen leicht planbar</h3>
                <p className="text-gray-600 text-sm font-light leading-relaxed">
                  Planen Sie ein Event oder Frühstück im Büro in Herrsching? Nutzen Sie unsere Vorbestellungs-Sektion und holen Sie Brötchenkörbe, Brezn-Platten oder Kuchen ganz ohne Wartezeit ab.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* GALERIE / IMPRESSIONEN SECTION */}
        <section id="impressionen" className="py-20 md:py-28 bg-white border-y border-[#e5dfd3]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div className="space-y-3">
                <span className="font-mono text-xs font-bold text-[#8e6e42] tracking-widest uppercase">
                  Feinste Impressionen
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900">
                  Unser Sortiment & Café-Charakter
                </h2>
                <p className="text-gray-500 font-light max-w-xl text-sm">
                  Werfen Sie einen Blick auf unsere goldbraunen Krusten und süßen Verführungen. Alles perfekt angerichtet bei Müller im EDEKA Herrsching.
                </p>
              </div>

              {/* Galerie-Filter */}
              <div className="flex flex-wrap items-center gap-2">
                <button 
                  onClick={() => setActiveGalleryTab('all')}
                  className={`px-4 py-2 rounded-lg text-xs font-mono font-semibold transition-all duration-200 ${activeGalleryTab === 'all' ? 'bg-[#8e6e42] text-white' : 'bg-[#faf9f6] text-gray-600 hover:bg-[#f3ede0]'}`}
                >
                  Alles anzeigen
                </button>
                <button 
                  onClick={() => setActiveGalleryTab('bread')}
                  className={`px-4 py-2 rounded-lg text-xs font-mono font-semibold transition-all duration-200 ${activeGalleryTab === 'bread' ? 'bg-[#8e6e42] text-white' : 'bg-[#faf9f6] text-gray-600 hover:bg-[#f3ede0]'}`}
                >
                  Brote & Laugen
                </button>
                <button 
                  onClick={() => setActiveGalleryTab('cake')}
                  className={`px-4 py-2 rounded-lg text-xs font-mono font-semibold transition-all duration-200 ${activeGalleryTab === 'cake' ? 'bg-[#8e6e42] text-white' : 'bg-[#faf9f6] text-gray-600 hover:bg-[#f3ede0]'}`}
                >
                  Feingebäck & Kuchen
                </button>
                <button 
                  onClick={() => setActiveGalleryTab('snack')}
                  className={`px-4 py-2 rounded-lg text-xs font-mono font-semibold transition-all duration-200 ${activeGalleryTab === 'snack' ? 'bg-[#8e6e42] text-white' : 'bg-[#faf9f6] text-gray-600 hover:bg-[#f3ede0]'}`}
                >
                  Frische Snacks
                </button>
              </div>
            </div>

            {/* Galerie Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredGallery.map((item) => (
                <div key={item.id} className="group flex flex-col bg-[#faf9f6] rounded-xl overflow-hidden border border-[#e5dfd3] hover:shadow-lg transition-all duration-300">
                  <div className="aspect-[4/3] w-full bg-[#f3ede0] relative flex items-center justify-center text-gray-600 overflow-hidden">
                    
                    {/* Visual Placeholder */}
                    <div className="absolute inset-0 w-full h-full flex flex-col justify-center items-center p-4 border-b border-[#e5dfd3] bg-[#8e6e42]/5">
                      <Coffee className="w-8 h-8 text-[#8e6e42]/30 mb-2" />
                      <span className="text-xs uppercase tracking-widest font-mono font-bold text-gray-400">
                        {item.imgPlaceholder}
                      </span>
                    </div>

                    {/* HTML Comments inside UI as requested for specific image insertion */}
                    <div className="absolute bottom-2 left-2 z-10 px-2.5 py-1 rounded bg-black/60 backdrop-blur-sm">
                      <p className="text-[10px] font-mono text-stone-200 leading-none">
                        {item.comment}
                      </p>
                    </div>

                    <div className="absolute inset-0 bg-[#8e6e42]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="bg-white/90 backdrop-blur-sm text-[#8e6e42] font-mono text-xs px-4 py-2 rounded-lg font-semibold shadow-md transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        Detail ansehen
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6 space-y-2">
                    <span className="font-mono text-[10px] uppercase font-bold text-[#8e6e42] tracking-wider">
                      {item.category === 'bread' && 'Bäckerei & Handwerk'}
                      {item.category === 'cake' && 'Café & Konditorei'}
                      {item.category === 'snack' && 'Frühstück & Bistro'}
                    </span>
                    <h4 className="font-serif text-lg font-bold text-gray-900 group-hover:text-[#8e6e42] transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-xs text-gray-650 font-light leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-xs font-mono text-gray-500 italic">
                Hinweis: Echte Sortimentsbilder können vor Ort fotografiert und flexibel ausgetauscht werden.
              </p>
            </div>

          </div>
        </section>

        {/* VORBESTELLUNG SECTION (KERNFUNKTION) */}
        <section id="vorbestellung" className="py-20 md:py-28 bg-[#f3ede0] relative">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center space-y-4 mb-12">
              <span className="font-mono text-xs font-bold text-[#8e6e42] tracking-widest uppercase bg-white/60 px-4 py-1.5 rounded-full inline-block">
                Echtes Premium Vorbestellsystem
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900">
                Größere Mengen unkompliziert vorbestellen
              </h2>
              <p className="text-gray-600 font-light text-base max-w-2xl mx-auto">
                Egal ob Büromeeting, Familienbrunch, Vereinsfeier oder Sonntagsersatz für den großen Kreis: Sichern Sie sich Ihre frischen Müller Backwaren zur Wunschuhrzeit im EDEKA Herrsching.
              </p>
            </div>

            {/* Vertrauensboxen über dem Formular */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-[#e5dfd3] flex flex-col items-center text-center">
                <Check className="w-5 h-5 text-[#8e6e42] mb-1.5" />
                <span className="text-xs font-bold text-gray-800 font-serif">Größere Mengen</span>
                <span className="text-[10px] text-gray-550 mt-1">Garantierte Abnahme</span>
              </div>
              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-[#e5dfd3] flex flex-col items-center text-center">
                <Check className="w-5 h-5 text-[#8e6e42] mb-1.5" />
                <span className="text-xs font-bold text-gray-800 font-serif">Planungssicherheit</span>
                <span className="text-[10px] text-gray-550 mt-1">Frühzeitig ordern</span>
              </div>
              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-[#e5dfd3] flex flex-col items-center text-center">
                <Check className="w-5 h-5 text-[#8e6e42] mb-1.5" />
                <span className="text-xs font-bold text-gray-800 font-serif">Abholung vor Ort</span>
                <span className="text-[10px] text-gray-550 mt-1">Im EDEKA Markt</span>
              </div>
              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-[#e5dfd3] flex flex-col items-center text-center">
                <Check className="w-5 h-5 text-[#8e6e42] mb-1.5" />
                <span className="text-xs font-bold text-gray-800 font-serif">Persönliche Absprache</span>
                <span className="text-[10px] text-gray-550 mt-1">100% verlässlich</span>
              </div>
            </div>

            {/* Premium Vorbestellformular Wrapper */}
            <div className="bg-white rounded-2xl border border-[#e5dfd3] shadow-xl overflow-hidden">
              <div className="bg-[#8e6e42] px-6 py-4 flex items-center justify-between text-white">
                <div className="flex items-center gap-2">
                  <Coffee className="w-5 h-5" />
                  <span className="font-serif font-bold text-sm sm:text-base">Müller Vorbestell-Anfrage</span>
                </div>
                <span className="font-mono text-[10px] tracking-widest uppercase bg-black/25 px-2.5 py-1 rounded">
                  Herrsching
                </span>
              </div>

              {/* Formular-Anbindung an E-Mail, CRM oder Backend hier ergänzen */}
              
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form 
                    key="preorder-form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleFormSubmit} 
                    className="p-6 sm:p-10 space-y-6"
                  >
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      {/* Name */}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-mono font-bold uppercase text-gray-500">
                          Ihr vollständiger Name *
                        </label>
                        <input 
                          type="text" 
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 rounded-xl bg-[#faf9f6] border ${errors.name ? 'border-red-500' : 'border-[#e5dfd3]'} focus:outline-none focus:border-[#8e6e42] focus:ring-1 focus:ring-[#8e6e42] transition-all text-sm`} 
                          placeholder="z.B. Familie Müller"
                        />
                        {errors.name && <p className="text-[11px] text-red-500 font-mono mt-0.5">{errors.name}</p>}
                      </div>

                      {/* Telefonnummer */}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-mono font-bold uppercase text-gray-500">
                          Telefonnummer für Rückfragen *
                        </label>
                        <input 
                          type="tel" 
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 rounded-xl bg-[#faf9f6] border ${errors.phone ? 'border-red-500' : 'border-[#e5dfd3]'} focus:outline-none focus:border-[#8e6e42] focus:ring-1 focus:ring-[#8e6e42] transition-all text-sm font-mono`} 
                          placeholder="z.B. 08152 1234567"
                        />
                        {errors.phone && <p className="text-[11px] text-red-500 font-mono mt-0.5">{errors.phone}</p>}
                      </div>

                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      
                      {/* E-Mail */}
                      <div className="space-y-1.5 md:col-span-1">
                        <label className="block text-xs font-mono font-bold uppercase text-gray-500">
                          E-Mail-Adresse *
                        </label>
                        <input 
                          type="email" 
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 rounded-xl bg-[#faf9f6] border ${errors.email ? 'border-red-500' : 'border-[#e5dfd3]'} focus:outline-none focus:border-[#8e6e42] focus:ring-1 focus:ring-[#8e6e42] transition-all text-sm`} 
                          placeholder="ihre.mail@beispiel.de"
                        />
                        {errors.email && <p className="text-[11px] text-red-500 font-mono mt-0.5">{errors.email}</p>}
                      </div>

                      {/* Abholdatum */}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-mono font-bold uppercase text-gray-500">
                          Abholdatum (Mo-Sa) *
                        </label>
                        <input 
                          type="date" 
                          name="pickupDate"
                          value={formData.pickupDate}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 rounded-xl bg-[#faf9f6] border ${errors.pickupDate ? 'border-red-500' : 'border-[#e5dfd3]'} focus:outline-none focus:border-[#8e6e42] focus:ring-1 focus:ring-[#8e6e42] transition-all text-sm font-mono`} 
                        />
                        {errors.pickupDate && <p className="text-[11px] text-red-500 font-mono mt-0.5">{errors.pickupDate}</p>}
                      </div>

                      {/* Abholuhrzeit */}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-mono font-bold uppercase text-gray-500">
                          Abholuhrzeit (06:30-20:00) *
                        </label>
                        <input 
                          type="time" 
                          name="pickupTime"
                          value={formData.pickupTime}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 rounded-xl bg-[#faf9f6] border ${errors.pickupTime ? 'border-red-500' : 'border-[#e5dfd3]'} focus:outline-none focus:border-[#8e6e42] focus:ring-1 focus:ring-[#8e6e42] transition-all text-sm font-mono`} 
                        />
                        {errors.pickupTime && <p className="text-[11px] text-red-500 font-mono mt-0.5">{errors.pickupTime}</p>}
                      </div>

                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                      {/* Art der Bestellung */}
                      <div className="space-y-1.5 md:col-span-2">
                        <label className="block text-xs font-mono font-bold uppercase text-gray-500">
                          Was möchten Sie vorbestellen? *
                        </label>
                        <select 
                          name="orderType"
                          value={formData.orderType}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 rounded-xl bg-[#faf9f6] border ${errors.orderType ? 'border-red-500' : 'border-[#e5dfd3]'} focus:outline-none focus:border-[#8e6e42] focus:ring-1 focus:ring-[#8e6e42] transition-all text-sm`}
                        >
                          <option value="">Bitte wählen Sie eine Kategorie</option>
                          <option value="Brötchen">Brötchen (Semmeln, Kornbeißer etc.)</option>
                          <option value="Brot">Brot (Krustenmandel, Natursauerteig etc.)</option>
                          <option value="Brezn / Laugengebäck">Brezn / Laugengebäck</option>
                          <option value="Kuchen / Süßes">Kuchen / Feingebäck / Plunder</option>
                          <option value="Snack / belegte Ware">Herzhafte belegte Snacks</option>
                          <option value="Kaffee / Heißgetränke">Kaffee / Heißgetränke in Thermobox</option>
                          <option value="Sonstiges">Sonstiges</option>
                        </select>
                        {errors.orderType && <p className="text-[11px] text-red-500 font-mono mt-0.5">{errors.orderType}</p>}
                      </div>

                      {/* Menge */}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-mono font-bold uppercase text-gray-500">
                          Gesamtmenge (Stück) *
                        </label>
                        <input 
                          type="number" 
                          name="quantity"
                          value={formData.quantity}
                          onChange={handleInputChange}
                          min="1"
                          className={`w-full px-4 py-3 rounded-xl bg-[#faf9f6] border ${errors.quantity ? 'border-red-500' : 'border-[#e5dfd3]'} focus:outline-none focus:border-[#8e6e42] focus:ring-1 focus:ring-[#8e6e42] transition-all text-sm font-mono`} 
                          placeholder="z.B. 25"
                        />
                        {errors.quantity && <p className="text-[11px] text-red-500 font-mono mt-0.5">{errors.quantity}</p>}
                      </div>

                    </div>

                    {/* Details */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between">
                        <label className="block text-xs font-mono font-bold uppercase text-gray-500">
                          Genaue Wünsche, Produkte & Details
                        </label>
                        <span className="text-[10px] text-gray-400 font-mono">Optional</span>
                      </div>
                      <textarea 
                        name="details"
                        value={formData.details}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full px-4 py-3 rounded-xl bg-[#faf9f6] border border-[#e5dfd3] focus:outline-none focus:border-[#8e6e42] focus:ring-1 focus:ring-[#8e6e42] transition-all text-sm"
                        placeholder="Nennen Sie uns bitte Ihre genauen Produktwünsche (z.B. 10x Kaisersemmeln, 5x Mehrkornsemmeln, ...)"
                      />
                    </div>

                    {/* Submit Area */}
                    <div className="pt-4 border-t border-[#e5dfd3] flex flex-col sm:flex-row items-center justify-between gap-4">
                      <p className="text-[11px] text-gray-500 max-w-md text-center sm:text-left leading-relaxed">
                        Durch das Absenden dieser Anfrage initiieren Sie eine exklusive Reservierungsanfrage. Ein Teammitglied wird sich bei Bedarf kurz zur Festlegung und Absprache melden.
                      </p>
                      
                      <button 
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full sm:w-auto inline-flex items-center justify-center bg-[#8e6e42] hover:bg-[#72562f] text-white px-8 py-4 rounded-xl font-bold shadow-md hover:shadow-lg transition-all min-w-[200px]"
                      >
                        {isSubmitting ? 'Wird übermittelt...' : 'Vorbestellung senden'}
                      </button>
                    </div>

                  </motion.form>
                ) : (
                  <motion.div 
                    key="success-message"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-8 sm:p-12 text-center space-y-6"
                  >
                    <div className="w-16 h-16 rounded-full bg-green-50 text-green-600 flex items-center justify-center mx-auto border-2 border-green-200">
                      <Check className="w-8 h-8" />
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900">
                        Anfrage erfolgreich übermittelt!
                      </h3>
                      <p className="text-gray-600 font-light max-w-xl mx-auto text-sm">
                        Vielen Dank für Ihre Vorbestellungs-Anfrage für <strong className="text-gray-800">{formData.name}</strong>. Unser Team wird Ihre Reservierung prüfen. Bitte halten Sie Ihr Mobiltelefon für eventuelle Rückfragen bereit.
                      </p>
                    </div>

                    {/* Zusammenfassung der Reservierungsdaten */}
                    <div className="bg-[#faf9f6] p-6 rounded-xl border border-[#e5dfd3] max-w-md mx-auto text-left space-y-2">
                      <h4 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest border-b border-[#e5dfd3] pb-1.5 mb-2">Reservierungs-Daten</h4>
                      <p className="text-xs font-semibold text-gray-700">Art: <span className="text-gray-900 font-mono">{formData.orderType} ({formData.quantity} Stck.)</span></p>
                      <p className="text-xs font-semibold text-gray-700">Abholung: <span className="text-gray-900 font-mono">{formData.pickupDate} gegen {formData.pickupTime} Uhr</span></p>
                      <p className="text-xs font-semibold text-gray-700">Abholort: <span className="text-gray-900 font-serif">Müller Café & Bäckerei im EDEKA Herrsching</span></p>
                    </div>

                    <button 
                      onClick={resetForm}
                      className="px-6 py-2.5 rounded-lg border border-[#e5dfd3] hover:border-gray-300 text-xs font-mono font-bold uppercase transition-all"
                    >
                      Neue Bestellung aufgeben
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

          </div>
        </section>

        {/* STANDORT / GOOGLE MAPS SECTION */}
        <section id="standort" className="py-20 md:py-28 bg-[#faf9f6] border-b border-[#e5dfd3]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              
              {/* Infos */}
              <div className="lg:col-span-5 space-y-6">
                <span className="font-mono text-xs font-bold text-[#8e6e42] tracking-widest uppercase">
                  Beste Erreichbarkeit
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900">
                  Besuchen Sie uns am wunderschönen Ammersee
                </h2>
                
                <p className="text-gray-600 font-light text-sm sm:text-base leading-relaxed">
                  Unser Standort befindet sich verkehrsgünstig, barrierefrei und gut erreichbar direkt <span className="font-semibold text-gray-800">im modernen EDEKA Center in der Seestraße 2, Herrsching</span>. Dadurch können Sie Ihren Einkauf optimal mit frischen Premium-Zutaten unserer Bäckerei verbinden.
                </p>

                {/* Karte mit Details */}
                <div className="space-y-4 border-l-2 border-[#8e6e42] pl-4">
                  <div>
                    <h5 className="font-mono text-xs font-bold uppercase text-gray-400">Adresse</h5>
                    <p className="text-sm font-semibold text-gray-800">{BACKERY_DATA.address}</p>
                  </div>
                  <div>
                    <h5 className="font-mono text-xs font-bold uppercase text-gray-400">Parkplätze</h5>
                    <p className="text-sm font-semibold text-gray-800">Großer, kostenfreier Kundenparkplatz des EDEKA Centers.</p>
                  </div>
                  <div>
                    <h5 className="font-mono text-xs font-bold uppercase text-gray-400">Telefon</h5>
                    <p className="text-sm font-semibold text-gray-800 font-mono">{BACKERY_DATA.phone}</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <a 
                    href={BACKERY_DATA.googleMapsLink}
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center justify-center gap-2 bg-[#8e6e42] hover:bg-[#72562f] text-white px-6 py-3 rounded-lg shadow-sm font-semibold text-sm transition-all text-center"
                  >
                    <Compass className="w-4.5 h-4.5" />
                    Route öffnen (Google Maps)
                  </a>
                  <a 
                    href={`tel:${BACKERY_DATA.phoneFormatted}`} 
                    className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-850 px-6 py-3 rounded-lg border border-[#e5dfd3] font-semibold text-sm font-mono transition-all text-center"
                  >
                    <Phone className="w-4.5 h-4.5 text-[#8e6e42]" />
                    {BACKERY_DATA.phone}
                  </a>
                </div>

              </div>

              {/* Karte */}
              <div className="lg:col-span-7">
                <div className="bg-white p-2 rounded-2xl border border-[#e5dfd3] shadow-lg overflow-hidden group">
                  
                  {/* Google Maps Header & Info */}
                  <div className="px-4 py-3 border-b border-[#e5dfd3] flex items-center justify-between text-xs bg-[#faf9f6]">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="font-semibold text-gray-700 font-mono">Standort im EDEKA Herrsching</span>
                    </div>
                    <span className="text-gray-400 font-mono text-[10px]">47.997282, 11.171221</span>
                  </div>

                  {/* Interaktiver Placeholder / Iframe Prep */}
                  <div className="aspect-[16/10] bg-[#f3ede0] relative overflow-hidden flex flex-col justify-center items-center">
                    
                    {/* Maps Embed Option / Placeholder */}
                    {/* Google Maps Embed Link hier einfügen */}
                    {/* Optional: Google Maps API Key hier einfügen */}
                    {/* Optional: Custom Google Map Script hier einfügen */}
                    
                    {/* Designter Placeholder für Premiumgefühl */}
                    <div className="absolute inset-0 bg-[#eef2f3] pointer-events-none flex flex-col justify-center items-center p-8 text-center space-y-4">
                      <div className="w-12 h-12 rounded-full bg-white text-[#8e6e42] flex items-center justify-center shadow-md">
                        <Map className="w-6 h-6" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-serif text-base font-bold text-gray-900">Müller Café & Bäckerei</h4>
                        <p className="text-xs text-gray-500 max-w-xs mx-auto">Seestraße 2, im EDEKA Markt, 82211 Herrsching am Ammersee</p>
                      </div>
                      <a 
                        href={BACKERY_DATA.googleMapsLink}
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-flex items-center gap-1.5 text-xs text-[#8e6e42] font-mono font-bold hover:underline"
                      >
                        Auf externer Karte anzeigen
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    
                    {/* Simuliertes Iframe Blueprint */}
                    <iframe 
                      src="about:blank" 
                      title="Google Maps Static Representation"
                      className="w-full h-full opacity-0 absolute top-0 left-0 pointer-events-none"
                    />

                  </div>

                </div>
              </div>

            </div>
          </div>
        </section>

        {/* FAQ ACCORDION SECTION */}
        <section id="faq" className="py-20 md:py-28 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center space-y-4 mb-12">
              <span className="font-mono text-xs font-bold text-[#8e6e42] tracking-widest uppercase">
                Häufige Fragen
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
                Wissenswertes für Kunden
              </h2>
              <div className="w-12 h-0.5 bg-[#8e6e42] mx-auto rounded-full mt-2"></div>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div 
                    key={idx} 
                    className="border border-[#e5dfd3] rounded-xl overflow-hidden bg-[#faf9f6]/40 transition-colors"
                  >
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full flex items-center justify-between text-left px-5 py-4 font-serif text-sm sm:text-base font-bold text-gray-900 hover:text-[#8e6e42] transition-colors"
                    >
                      <span>{faq.q}</span>
                      {isOpen ? <ChevronUp className="w-4 h-4 shrink-0" /> : <ChevronDown className="w-4 h-4 shrink-0" />}
                    </button>
                    
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="border-t border-[#e5dfd3] bg-white text-gray-600 text-xs sm:text-sm font-light px-5 py-4 leading-relaxed"
                        >
                          {faq.a}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

          </div>
        </section>

        {/* KONTAKT INFORMATIONEN / BUSINESS CARD */}
        <section id="kontakt" className="py-20 bg-gradient-to-t from-[#f3ede0] to-[#faf9f6] border-t border-[#e5dfd3]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl border border-[#e5dfd3] shadow-lg p-6 sm:p-10 space-y-8">
              
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#8e6e42] font-semibold">Inhabergeführter Vorort-Service</span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-gray-950">Müller Café & Bäckerei</h3>
                <p className="text-xs text-gray-500">Wir freuen uns auf Ihren Besuch im EDEKA Herrsching</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                
                {/* Details list */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#8e6e42] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-gray-400">Hausanschrift</h4>
                      <p className="text-sm font-semibold text-gray-800">{BACKERY_DATA.address}</p>
                      <p className="text-xs text-gray-500 italic mt-0.5">Direkt im EDEKA Center, barrierefrei</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-[#8e6e42] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-gray-400">Telefonische Absprache</h4>
                      <a href={`tel:${BACKERY_DATA.phoneFormatted}`} className="text-sm font-semibold font-mono text-[#8e6e42] hover:underline">
                        {BACKERY_DATA.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-[#8e6e42] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-gray-400">Online-Schnittstelle</h4>
                      <p className="text-sm font-semibold text-gray-800">Nutzen Sie unser Vorbestellformular für garantierte Reservierungen.</p>
                    </div>
                  </div>
                </div>

                {/* Opening hours list */}
                <div className="bg-[#faf9f6] p-6 rounded-xl border border-[#e5dfd3] space-y-3">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-gray-400 border-b border-[#e5dfd3] pb-2">
                    Öffnungszeiten
                  </h4>
                  <div className="space-y-2">
                    {BACKERY_DATA.hours.map((h, i) => (
                      <div key={i} className="flex justify-between items-center text-xs">
                        <span className="font-semibold text-gray-700">{h.days}:</span>
                        <span className="text-[#8e6e42] font-mono font-bold">{h.time}</span>
                      </div>
                    ))}
                  </div>
                  <div className="pt-2 border-t border-[#e5dfd3] mt-2">
                    <p className="text-[10px] text-gray-500 leading-relaxed font-light">
                      * An bundeslandspezifischen Feiertagen in Bayern können veränderte Servicezeiten vorliegen.
                    </p>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="bg-neutral-900 text-neutral-400 pt-16 pb-24 md:pb-16 border-t border-neutral-800 font-light text-xs sm:text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            
            {/* Branding */}
            <div className="md:col-span-1.5 space-y-4">
              <h4 className="font-serif text-lg font-bold text-white tracking-tight">MÜLLER CAFÉ & BÄCKEREI</h4>
              <p className="text-neutral-500 leading-relaxed text-xs">
                 Ihr lokaler Partner für traditionelle Frühstückskörbe, ofenfrische Brezn, Handwerksbrot und leckere Kuchenspezialitäten im EDEKA Seestraße 2, Herrsching am Ammersee.
              </p>
              <div className="flex items-center gap-2 text-neutral-500 text-xs font-mono">
                <MapPin className="w-4 h-4 text-[#8e6e42]" />
                <span>Herrsching, Bayern</span>
              </div>
            </div>

            {/* Links */}
            <div className="space-y-4">
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-white">Schnellzugriff</h4>
              <div className="flex flex-col space-y-2">
                <a href="#uber-uns" className="hover:text-white transition-colors duration-200">Unser Versprechen</a>
                <a href="#impressionen" className="hover:text-white transition-colors duration-200">Sortiment</a>
                <a href="#vorbestellung" className="hover:text-white transition-colors duration-200">Vorbestellung</a>
                <a href="#standort" className="hover:text-white transition-colors duration-200">Adresse & Route</a>
                <a href="#faq" className="hover:text-white transition-colors duration-200">Kunden-Fragen</a>
              </div>
            </div>

            {/* Service & Hours */}
            <div className="space-y-4">
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-white">Service</h4>
              <ul className="space-y-2">
                <li>Montag - Samstag: <span className="text-[#c29b63] font-mono">06:30 – 20:00 Uhr</span></li>
                <li>Sonntag: <span className="text-neutral-500 font-mono">Geschlossen</span></li>
                <li>Telefon: <a href={`tel:${BACKERY_DATA.phoneFormatted}`} className="text-[#c29b63] hover:underline font-mono">{BACKERY_DATA.phone}</a></li>
              </ul>
            </div>

            {/* Legal / Copyright */}
            <div className="space-y-4">
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-white">Rechtliches</h4>
              <nav className="flex flex-col space-y-2 text-neutral-500">
                <span className="hover:text-white cursor-pointer transition-colors">Impressum (Vorbereitet)</span>
                <span className="hover:text-white cursor-pointer transition-colors">Datenschutz (DSGVO-konform)</span>
                <span className="hover:text-white cursor-pointer transition-colors">Allg. Geschäftsbedingungen</span>
                <span className="hover:text-white cursor-pointer transition-colors">Widerrufsrecht</span>
              </nav>
            </div>

          </div>

          {/* Bottom section */}
          <div className="pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
            <p>© {new Date().getFullYear()} Müller Bäckerei & Café im EDEKA Herrsching am Ammersee. Alle Rechte vorbehalten.</p>
            <div className="flex items-center gap-4">
              {/* Optional: Google Maps Partner Links and SEO signals */}
              <span className="font-mono text-[10px] opacity-70">Premium Local Food-Experience</span>
            </div>
          </div>

        </div>
      </footer>

      {/* MOBILE BOTTOM STICKY NAVIGATION FOR CONVERSION (md:hidden) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#faf9f6]/95 backdrop-blur-md border-t border-[#e5dfd3] shadow-lg z-55 px-4 py-3 flex items-center justify-between gap-3">
        
        {/* Call button */}
        <a 
          href={`tel:${BACKERY_DATA.phoneFormatted}`}
          className="flex-1 flex items-center justify-center gap-1.5 py-3 px-2 rounded-xl border border-[#e5dfd3] bg-white text-gray-850 font-bold font-mono text-xs text-center shadow-sm"
        >
          <Phone className="w-4 h-4 text-[#8e6e42]" />
          Anrufen
        </a>

        {/* Route button */}
        <a 
          href={BACKERY_DATA.googleMapsLink}
          target="_blank" 
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1.5 py-3 px-2 rounded-xl border border-[#e5dfd3] bg-white text-gray-850 font-bold text-xs text-center shadow-sm"
        >
          <Compass className="w-4 h-4 text-[#8e6e42]" />
          Route
        </a>

        {/* Order button CTA */}
        <a 
          href="#vorbestellung"
          className="flex-[1.5] flex items-center justify-center gap-1 py-3 px-2 rounded-xl bg-[#8e6e42] text-white font-extrabold text-xs text-center shadow-md hover:bg-[#72562f]"
        >
          <Calendar className="w-4 h-4" />
          Vorbestellen
        </a>

      </div>

    </div>
  );
}
