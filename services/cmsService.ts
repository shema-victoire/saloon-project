import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  addDoc, 
  query, 
  orderBy, 
  serverTimestamp,
  getDocFromServer,
  onSnapshot
} from 'firebase/firestore';
import { db, auth } from '../lib/firebase';
import { Service, GalleryImage, ContactInfo, AppState, Booking } from '../types';
import { DEFAULT_SERVICES, DEFAULT_GALLERY, DEFAULT_CONTACT } from '../constants';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export const cmsService = {
  // Test connection as required
  testConnection: async () => {
    try {
      await getDocFromServer(doc(db, 'test', 'connection'));
    } catch (error) {
      if(error instanceof Error && error.message.includes('the client is offline')) {
        console.error("Please check your Firebase configuration.");
      }
    }
  },

  // Services
  getServices: async (): Promise<Service[]> => {
    const path = 'services';
    try {
      const q = query(collection(db, path), orderBy('name', 'asc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ ...doc.data() } as Service));
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, path);
      return [];
    }
  },

  updateService: async (service: Service) => {
    const path = `services/${service.id}`;
    try {
      await setDoc(doc(db, 'services', service.id), service);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
    }
  },

  deleteService: async (id: string) => {
    const path = `services/${id}`;
    try {
      await deleteDoc(doc(db, 'services', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, path);
    }
  },

  // Gallery
  getGallery: async (): Promise<GalleryImage[]> => {
    const path = 'gallery';
    try {
      const snapshot = await getDocs(collection(db, path));
      return snapshot.docs.map(doc => ({ ...doc.data() } as GalleryImage));
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, path);
      return [];
    }
  },

  updateGalleryImage: async (image: GalleryImage) => {
    const path = `gallery/${image.id}`;
    try {
      await setDoc(doc(db, 'gallery', image.id), image);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
    }
  },

  deleteGalleryImage: async (id: string) => {
    const path = `gallery/${id}`;
    try {
      await deleteDoc(doc(db, 'gallery', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, path);
    }
  },

  // Contact
  getContact: async (): Promise<ContactInfo | null> => {
    const path = 'contact/info';
    try {
      const snapshot = await getDoc(doc(db, 'contact', 'info'));
      return snapshot.exists() ? snapshot.data() as ContactInfo : null;
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, path);
      return null;
    }
  },

  updateContact: async (contact: ContactInfo) => {
    const path = 'contact/info';
    try {
      await setDoc(doc(db, 'contact', 'info'), contact);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
    }
  },

  // Bookings
  addBooking: async (booking: Omit<Booking, 'createdAt'>) => {
    const path = 'bookings';
    try {
      const bookingData = {
        ...booking,
        createdAt: serverTimestamp()
      };
      await setDoc(doc(db, 'bookings', booking.id), bookingData);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
    }
  },

  getBookings: async (): Promise<Booking[]> => {
    const path = 'bookings';
    try {
      const q = query(collection(db, path), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          ...data,
          createdAt: data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString()
        } as Booking;
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, path);
      return [];
    }
  },

  updateBookingStatus: async (id: string, status: Booking['status']) => {
    const path = `bookings/${id}`;
    try {
      await updateDoc(doc(db, 'bookings', id), { status });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, path);
    }
  },

  deleteBooking: async (id: string) => {
    const path = `bookings/${id}`;
    try {
      await deleteDoc(doc(db, 'bookings', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, path);
    }
  },

  // Real-time listener for AppState
  subscribeToAppState: (onUpdate: (state: Partial<AppState>) => void) => {
    const unsubServices = onSnapshot(collection(db, 'services'), (snapshot) => {
      onUpdate({ services: snapshot.docs.map(d => d.data() as Service) });
    }, (error) => handleFirestoreError(error, OperationType.LIST, 'services'));

    const unsubGallery = onSnapshot(collection(db, 'gallery'), (snapshot) => {
      onUpdate({ gallery: snapshot.docs.map(d => d.data() as GalleryImage) });
    }, (error) => handleFirestoreError(error, OperationType.LIST, 'gallery'));

    const unsubContact = onSnapshot(doc(db, 'contact', 'info'), (snapshot) => {
      if (snapshot.exists()) {
        onUpdate({ contact: snapshot.data() as ContactInfo });
      }
    }, (error) => handleFirestoreError(error, OperationType.GET, 'contact/info'));

    return () => {
      unsubServices();
      unsubGallery();
      unsubContact();
    };
  },

  // Private listener for Admin Bookings
  subscribeToBookings: (onUpdate: (bookings: Booking[]) => void) => {
    const unsubBookings = onSnapshot(query(collection(db, 'bookings'), orderBy('createdAt', 'desc')), (snapshot) => {
      onUpdate(
        snapshot.docs.map(d => {
          const data = d.data();
          return {
            ...data,
            createdAt: data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString()
          } as Booking;
        }) 
      );
    }, (error) => handleFirestoreError(error, OperationType.LIST, 'bookings'));

    return unsubBookings;
  },

  // Seed data if empty
  seedData: async () => {
    try {
      const services = await cmsService.getServices();
      if (services.length === 0) {
        for (const s of DEFAULT_SERVICES) {
          await cmsService.updateService(s);
        }
      }

      const gallery = await cmsService.getGallery();
      if (gallery.length === 0) {
        for (const g of DEFAULT_GALLERY) {
          await cmsService.updateGalleryImage(g);
        }
      }

      const contact = await cmsService.getContact();
      if (!contact) {
        await cmsService.updateContact(DEFAULT_CONTACT);
      }
    } catch (error) {
      console.error("Seeding failed", error);
    }
  }
};
