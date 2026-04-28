
export interface Service {
  id: string;
  name: string;
  description: string;
  price?: string;
  category: string;
  imageUrl?: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  title: string;
  category: string;
}

export interface ContactInfo {
  phone: string;
  email: string;
  whatsapp: string;
  address: string;
  mapsEmbed: string;
  aboutText: string;
}

export interface Booking {
  id: string;
  name: string;
  phone: string;
  serviceId: string;
  serviceName: string;
  date: string;
  time: string;
  notes?: string;
  createdAt: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

export type AppState = {
  services: Service[];
  gallery: GalleryImage[];
  contact: ContactInfo;
  bookings: Booking[];
};
