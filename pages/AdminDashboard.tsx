
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppState, Service, GalleryImage } from '../types';
import { cmsService } from '../services/cmsService';
import { Plus, Edit, Trash2, LogOut, Image as ImageIcon, Briefcase, Phone, Layout as LayoutIcon, Check } from 'lucide-react';

interface AdminDashboardProps {
  state: AppState;
  onUpdate: () => void;
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ state, onUpdate, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'services' | 'gallery' | 'contact' | 'bookings'>('bookings');
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>({});
  const [saveStatus, setSaveStatus] = useState(false);
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    onLogout();
    navigate('/');
  };

  const showSaveSuccess = () => {
    setSaveStatus(true);
    setTimeout(() => setSaveStatus(false), 3000);
  };

  // SERVICES CRUD
  const handleServiceAdd = async () => {
    const newService: Service = {
      id: Date.now().toString(),
      name: formData.name || 'New Service',
      description: formData.description || '',
      price: formData.price || '',
      category: formData.category || 'General',
      imageUrl: formData.imageUrl || 'https://picsum.photos/800/600'
    };
    await cmsService.updateService(newService);
    setIsAdding(false);
    setFormData({});
    showSaveSuccess();
  };

  const handleServiceDelete = async (id: string) => {
    if (window.confirm("Delete this service?")) {
      await cmsService.deleteService(id);
      showSaveSuccess();
    }
  };

  const handleServiceUpdate = async (id: string) => {
    const existing = state.services.find(s => s.id === id);
    if (existing) {
      await cmsService.updateService({ ...existing, ...formData });
      setEditingId(null);
      setFormData({});
      showSaveSuccess();
    }
  };

  // GALLERY CRUD
  const handleGalleryAdd = async () => {
    const newItem: GalleryImage = {
      id: Date.now().toString(),
      url: formData.url || 'https://picsum.photos/800/800',
      title: formData.title || 'Gallery Image',
      category: formData.category || 'General'
    };
    await cmsService.updateGalleryImage(newItem);
    setIsAdding(false);
    setFormData({});
    showSaveSuccess();
  };

  const handleGalleryDelete = async (id: string) => {
    if (window.confirm("Delete this gallery image?")) {
      await cmsService.deleteGalleryImage(id);
      showSaveSuccess();
    }
  };

  // CONTACT UPDATE
  const handleContactUpdate = async () => {
    await cmsService.updateContact({ ...state.contact, ...formData });
    setFormData({});
    showSaveSuccess();
  };

  // BOOKINGS CRUD
  const handleBookingDelete = async (id: string) => {
    if (window.confirm("Delete this booking record?")) {
      await cmsService.deleteBooking(id);
      showSaveSuccess();
    }
  };

  const handleBookingStatusUpdate = async (id: string, status: 'confirmed' | 'cancelled' | 'pending') => {
    await cmsService.updateBookingStatus(id, status);
    showSaveSuccess();
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-stone-900 text-white flex-shrink-0">
        <div className="p-8 border-b border-stone-800">
          <h1 className="text-lg font-serif tracking-widest font-bold">ADMIN PANEL</h1>
        </div>
        <nav className="p-4 space-y-2">
          {[
            { id: 'bookings', label: 'Bookings', icon: LayoutIcon },
            { id: 'services', label: 'Services', icon: Briefcase },
            { id: 'gallery', label: 'Gallery', icon: ImageIcon },
            { id: 'contact', label: 'Contact & Info', icon: Phone },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id as any); setIsAdding(false); setEditingId(null); }}
              className={`w-full flex items-center px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === tab.id ? 'bg-stone-800 text-white' : 'text-stone-400 hover:text-white hover:bg-stone-800/50'
              }`}
            >
              <tab.icon size={18} className="mr-3" />
              {tab.label}
            </button>
          ))}
          <button 
            onClick={handleLogoutClick}
            className="w-full flex items-center px-4 py-3 text-sm font-medium text-red-400 hover:bg-red-900/10 transition-colors mt-8"
          >
            <LogOut size={18} className="mr-3" />
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-6 md:p-12 overflow-y-auto max-h-screen">
        <header className="flex justify-between items-center mb-10 pb-6 border-b border-stone-200">
          <h2 className="text-3xl font-serif text-stone-900 capitalize">{activeTab} Management</h2>
          {saveStatus && (
            <div className="flex items-center text-green-600 font-bold text-sm animate-in fade-in slide-in-from-top-2">
              <Check size={18} className="mr-1" /> Changes Saved
            </div>
          )}
          {activeTab !== 'contact' && activeTab !== 'bookings' && !isAdding && !editingId && (
            <button 
              onClick={() => setIsAdding(true)}
              className="px-6 py-2.5 bg-stone-900 text-white text-xs uppercase tracking-widest font-bold hover:bg-stone-800 transition-colors flex items-center"
            >
              <Plus size={16} className="mr-2" /> Add New
            </button>
          )}
        </header>

        {/* Dynamic Forms / Lists */}
        <div className="animate-in fade-in duration-300">
          
          {/* Bookings Tab */}
          {activeTab === 'bookings' && (
            <div className="space-y-6">
              {state.bookings.length === 0 ? (
                <div className="bg-white p-12 text-center border border-stone-100 italic text-stone-400">
                  No bookings matching your criteria.
                </div>
              ) : (
                <div className="bg-white shadow-sm border border-stone-200 overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-stone-50 border-b border-stone-200">
                      <tr>
                        <th className="p-4 text-[10px] uppercase tracking-widest font-bold text-stone-400">Client</th>
                        <th className="p-4 text-[10px] uppercase tracking-widest font-bold text-stone-400">Service</th>
                        <th className="p-4 text-[10px] uppercase tracking-widest font-bold text-stone-400">Date/Time</th>
                        <th className="p-4 text-[10px] uppercase tracking-widest font-bold text-stone-400">Status</th>
                        <th className="p-4 text-[10px] uppercase tracking-widest font-bold text-stone-400 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {state.bookings.map((booking) => (
                        <tr key={booking.id} className="hover:bg-stone-50/50 transition-colors">
                          <td className="p-4">
                            <div className="font-serif text-stone-900">{booking.name}</div>
                            <div className="text-xs text-stone-500">{booking.phone}</div>
                          </td>
                          <td className="p-4">
                            <div className="text-sm text-stone-700">{booking.serviceName}</div>
                          </td>
                          <td className="p-4">
                            <div className="text-sm text-stone-700">{booking.date}</div>
                            <div className="text-xs text-stone-500">{booking.time}</div>
                          </td>
                          <td className="p-4">
                            <select 
                              value={booking.status}
                              onChange={(e) => handleBookingStatusUpdate(booking.id, e.target.value as any)}
                              className={`text-[10px] uppercase tracking-tighter font-bold px-2 py-1 border rounded focus:outline-none ${
                                booking.status === 'confirmed' ? 'bg-green-50 text-green-700 border-green-200' : 
                                booking.status === 'cancelled' ? 'bg-red-50 text-red-700 border-red-200' : 
                                'bg-yellow-50 text-yellow-700 border-yellow-200'
                              }`}
                            >
                              <option value="pending">Pending</option>
                              <option value="confirmed">Confirmed</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </td>
                          <td className="p-4 text-right">
                            <div className="flex justify-end space-x-2">
                              <button 
                                onClick={() => handleBookingDelete(booking.id)}
                                className="p-2 text-stone-400 hover:text-red-600 transition-colors"
                                title="Delete Record"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Add/Edit Service Form */}
          {(isAdding || editingId) && activeTab === 'services' && (
            <div className="bg-white p-8 shadow-sm border border-stone-200 mb-10 max-w-2xl">
              <h3 className="text-xl font-serif mb-6">{editingId ? 'Edit Service' : 'Add New Service'}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-stone-400 mb-2 block">Service Name</label>
                  <input 
                    type="text" 
                    defaultValue={editingId ? state.services.find(s => s.id === editingId)?.name : ''}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full p-3 bg-stone-50 border border-stone-100 text-sm"
                  />
                </div>
                <div className="col-span-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-stone-400 mb-2 block">Description</label>
                  <textarea 
                    defaultValue={editingId ? state.services.find(s => s.id === editingId)?.description : ''}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full p-3 bg-stone-50 border border-stone-100 text-sm"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-widest font-bold text-stone-400 mb-2 block">Price (e.g. 10,000 RWF)</label>
                  <input 
                    type="text" 
                    defaultValue={editingId ? state.services.find(s => s.id === editingId)?.price : ''}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    className="w-full p-3 bg-stone-50 border border-stone-100 text-sm"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-widest font-bold text-stone-400 mb-2 block">Category</label>
                  <input 
                    type="text" 
                    defaultValue={editingId ? state.services.find(s => s.id === editingId)?.category : ''}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full p-3 bg-stone-50 border border-stone-100 text-sm"
                  />
                </div>
                <div className="col-span-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-stone-400 mb-2 block">Image URL</label>
                  <input 
                    type="text" 
                    defaultValue={editingId ? state.services.find(s => s.id === editingId)?.imageUrl : ''}
                    onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                    className="w-full p-3 bg-stone-50 border border-stone-100 text-sm"
                    placeholder="https://..."
                  />
                </div>
              </div>
              <div className="mt-8 flex space-x-4">
                <button 
                  onClick={editingId ? () => handleServiceUpdate(editingId) : handleServiceAdd}
                  className="px-8 py-3 bg-stone-900 text-white text-xs uppercase tracking-widest font-bold"
                >
                  Save Changes
                </button>
                <button 
                  onClick={() => { setIsAdding(false); setEditingId(null); setFormData({}); }}
                  className="px-8 py-3 bg-stone-100 text-stone-500 text-xs uppercase tracking-widest font-bold"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Add Gallery Item Form */}
          {isAdding && activeTab === 'gallery' && (
            <div className="bg-white p-8 shadow-sm border border-stone-200 mb-10 max-w-2xl">
              <h3 className="text-xl font-serif mb-6">Add New Gallery Image</h3>
              <div className="space-y-6">
                <div>
                  <label className="text-[10px] uppercase tracking-widest font-bold text-stone-400 mb-2 block">Image Title</label>
                  <input 
                    type="text" 
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full p-3 bg-stone-50 border border-stone-100 text-sm"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-widest font-bold text-stone-400 mb-2 block">Category</label>
                  <input 
                    type="text" 
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full p-3 bg-stone-50 border border-stone-100 text-sm"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-widest font-bold text-stone-400 mb-2 block">Image URL</label>
                  <input 
                    type="text" 
                    onChange={(e) => setFormData({...formData, url: e.target.value})}
                    className="w-full p-3 bg-stone-50 border border-stone-100 text-sm"
                    placeholder="https://..."
                  />
                </div>
              </div>
              <div className="mt-8 flex space-x-4">
                <button 
                  onClick={handleGalleryAdd}
                  className="px-8 py-3 bg-stone-900 text-white text-xs uppercase tracking-widest font-bold"
                >
                  Add to Gallery
                </button>
                <button 
                  onClick={() => { setIsAdding(false); setFormData({}); }}
                  className="px-8 py-3 bg-stone-100 text-stone-500 text-xs uppercase tracking-widest font-bold"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Contact Tab */}
          {activeTab === 'contact' && (
            <div className="bg-white p-8 shadow-sm border border-stone-200 max-w-4xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="col-span-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-stone-400 mb-2 block">About Text</label>
                  <textarea 
                    defaultValue={state.contact.aboutText}
                    onChange={(e) => setFormData({...formData, aboutText: e.target.value})}
                    className="w-full p-4 bg-stone-50 border border-stone-100 text-sm"
                    rows={4}
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-widest font-bold text-stone-400 mb-2 block">Phone Number</label>
                  <input 
                    type="text" 
                    defaultValue={state.contact.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full p-3 bg-stone-50 border border-stone-100 text-sm"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-widest font-bold text-stone-400 mb-2 block">WhatsApp Number (incl. +)</label>
                  <input 
                    type="text" 
                    defaultValue={state.contact.whatsapp}
                    onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                    className="w-full p-3 bg-stone-50 border border-stone-100 text-sm"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-widest font-bold text-stone-400 mb-2 block">Email Address</label>
                  <input 
                    type="text" 
                    defaultValue={state.contact.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full p-3 bg-stone-50 border border-stone-100 text-sm"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-widest font-bold text-stone-400 mb-2 block">Address</label>
                  <input 
                    type="text" 
                    defaultValue={state.contact.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className="w-full p-3 bg-stone-50 border border-stone-100 text-sm"
                  />
                </div>
                <div className="col-span-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-stone-400 mb-2 block">Google Maps Embed URL</label>
                  <input 
                    type="text" 
                    defaultValue={state.contact.mapsEmbed}
                    onChange={(e) => setFormData({...formData, mapsEmbed: e.target.value})}
                    className="w-full p-3 bg-stone-50 border border-stone-100 text-xs"
                  />
                </div>
              </div>
              <button 
                onClick={handleContactUpdate}
                className="mt-10 px-10 py-4 bg-stone-900 text-white text-xs uppercase tracking-widest font-bold hover:bg-stone-800 transition-colors"
              >
                Update Contact Info
              </button>
            </div>
          )}

          {/* List Display (only if not adding/editing) */}
          {!isAdding && !editingId && activeTab === 'services' && (
            <div className="grid grid-cols-1 gap-4">
              {state.services.map(s => (
                <div key={s.id} className="bg-white p-6 shadow-sm border border-stone-200 flex items-center justify-between group">
                  <div className="flex items-center space-x-6">
                    <div className="w-16 h-16 bg-stone-100 overflow-hidden flex-shrink-0">
                      <img src={s.imageUrl} alt={s.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-serif text-lg text-stone-900">{s.name}</h4>
                      <div className="flex space-x-4 text-xs text-stone-400 uppercase tracking-widest mt-1">
                        <span>{s.category}</span>
                        <span>•</span>
                        <span>{s.price}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => { setEditingId(s.id); setFormData(s); }}
                      className="p-2 text-stone-400 hover:text-stone-900 hover:bg-stone-100 transition-colors"
                    >
                      <Edit size={20} />
                    </button>
                    <button 
                      onClick={() => handleServiceDelete(s.id)}
                      className="p-2 text-stone-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!isAdding && activeTab === 'gallery' && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {state.gallery.map(g => (
                <div key={g.id} className="relative aspect-square group overflow-hidden bg-stone-100">
                  <img src={g.url} alt={g.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-stone-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-4">
                    <button 
                      onClick={() => handleGalleryDelete(g.id)}
                      className="p-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
