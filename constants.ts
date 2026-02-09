
import { Service, GalleryImage, ContactInfo } from './types';

export const DEFAULT_SERVICES: Service[] = [
  {
    id: '1',
    name: 'Signature Silk Press',
    description: 'A non-chemical service that starts with a deep conditioning treatment, followed by a professional blow-dry and flat iron for a silky, mirror-like finish on natural hair.',
    price: '25,000 RWF',
    category: 'Hair',
    imageUrl: 'https://images.unsplash.com/photo-1620331311520-246422fd82f9?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '2',
    name: 'Knotless Goddess Braids',
    description: 'Pain-free, lightweight, and incredibly natural-looking braids. This protective style includes a wash and blow-dry. Extensions provided in various lengths.',
    price: '45,000 RWF',
    category: 'Hair',
    imageUrl: 'https://images.unsplash.com/photo-1632765854612-9b02b6ec2b15?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '3',
    name: 'Luxe Gel Manicure',
    description: 'Precision cuticle work and nail shaping followed by premium long-wear gel polish. Includes a relaxing hand massage with organic essential oils.',
    price: '15,000 RWF',
    category: 'Nails',
    imageUrl: 'https://images.unsplash.com/photo-1604654894610-df490982570d?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '4',
    name: 'Polygel Sculpted Extensions',
    description: 'The perfect hybrid between acrylic and gel. Lightweight, strong, and flexible. Finished with high-shine top coat and personalized nail art.',
    price: '35,000 RWF',
    category: 'Nails',
    imageUrl: 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '5',
    name: 'HD Editorial Makeup',
    description: 'Full-glam application using high-definition techniques. Perfect for weddings, red-carpet events, or professional photoshoots. Includes premium lash application.',
    price: '60,000 RWF',
    category: 'Beauty',
    imageUrl: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '6',
    name: 'Deep Cleansing HydraFacial',
    description: 'A multi-step treatment that cleanses, exfoliates, and extracts impurities while replenishing vital nutrients including antioxidants, peptides, and hyaluronic acid.',
    price: '55,000 RWF',
    category: 'Beauty',
    imageUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=800'
  }
];

export const DEFAULT_GALLERY: GalleryImage[] = [
  { id: 'g1', url: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=800', title: 'Luxury Hair Treatment', category: 'Hair' },
  { id: 'g2', url: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=800', title: 'Chic Interior Lounge', category: 'Interior' },
  { id: 'g3', url: 'https://images.unsplash.com/photo-1600232943169-3fe41d6f4cf2?auto=format&fit=crop&q=80&w=800', title: 'Bridal Perfection', category: 'Beauty' },
  { id: 'g4', url: 'https://images.unsplash.com/photo-1610992015732-2449b0c26670?auto=format&fit=crop&q=80&w=800', title: 'Artistic Nail Design', category: 'Nails' },
  { id: 'g5', url: 'https://images.unsplash.com/photo-1595475253545-0675239326e0?auto=format&fit=crop&q=80&w=800', title: 'Professional Braiding', category: 'Hair' },
  { id: 'g6', url: 'https://images.unsplash.com/photo-1512496011981-d6b0e2a57ee5?auto=format&fit=crop&q=80&w=800', title: 'Event Glow', category: 'Beauty' }
];

export const DEFAULT_CONTACT: ContactInfo = {
  phone: '+250 788 345 678',
  email: 'info@kezaglamhub.com',
  whatsapp: '+250788345678',
  address: 'Floor 2, Kigali Heights, KG 7 Ave, Kigali, Rwanda',
  mapsEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3987.5036423985557!2d30.091176575773173!3d-1.9517173980306132!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca69f64f509e5%3A0x63346f916ba5869a!2sKigali%20Heights!5e0!3m2!1sen!2srw!4v1711200000000!5m2!1sen!2srw',
  aboutText: 'Keza Glam Hub is Kigali\'s premier luxury beauty destination. We specialize in contemporary African beauty artistry, combining international standards with local soul. Our mission is to provide an oasis of elegance where every woman can discover her most glamorous self through world-class hair, nail, and skin therapies.'
};

export const ADMIN_CREDENTIALS = {
  email: 'admin@kezaglamhub.com',
  password: 'password123'
};
