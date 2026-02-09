
import { Service, GalleryImage, ContactInfo, AppState } from '../types';
import { DEFAULT_SERVICES, DEFAULT_GALLERY, DEFAULT_CONTACT } from '../constants';

const STORAGE_KEY = 'keza_glam_hub_state';

export const cmsService = {
  getState: (): AppState => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse local state", e);
      }
    }
    return {
      services: DEFAULT_SERVICES,
      gallery: DEFAULT_GALLERY,
      contact: DEFAULT_CONTACT
    };
  },

  saveState: (state: AppState) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  },

  updateServices: (services: Service[]) => {
    const state = cmsService.getState();
    cmsService.saveState({ ...state, services });
  },

  updateGallery: (gallery: GalleryImage[]) => {
    const state = cmsService.getState();
    cmsService.saveState({ ...state, gallery });
  },

  updateContact: (contact: ContactInfo) => {
    const state = cmsService.getState();
    cmsService.saveState({ ...state, contact });
  }
};
