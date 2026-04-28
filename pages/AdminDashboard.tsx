
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
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    onLogout();
    navigate('/');
  };

  const showSaveSuccess = () => {
    setSaveStatus(true);
    setTimeout(() => setSaveStatus(false), 3000);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Optional: Size check for Firestore limits (1MB per doc)
    if (file.size > 800000) {
      alert("Image is too large. Please select a file smaller than 800KB for signature quality.");
      return;
    }

    setUploading(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev: any) => ({ ...prev, [field]: reader.result as string }));
      setUploading(false);
    };
    reader.onerror = () => {
      alert("Failed to read file.");
      setUploading(false);
    };
    reader.readAsDataURL(file);
  };

  // SERVICES CRUD
  const handleServiceAdd = async () => {
    const newService: Service = {
      id: Date.now().toString(),
      name: formData.name || 'New Service',
      description: formData.description || '',
      price: formData.price || '',
      category: formData.category || 'General',
      imageUrl: formData.imageUrl || 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=800'
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
    <div className="min-h-screen bg-[#050505] flex flex-col md:flex-row text-slate-300">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-72 bg-brand-black border-r border-white/5 flex-shrink-0 z-20">
        <div className="p-10 border-b border-white/5">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-2 h-2 bg-brand-pink animate-pulse rounded-full"></div>
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-slate-500">Secure Console</span>
          </div>
          <h1 className="text-2xl font-serif tracking-tighter font-black text-white">KEZA <span className="text-brand-pink font-light italic">CMS</span></h1>
        </div>
        <nav className="p-6 space-y-4">
          {[
            { id: 'bookings', label: 'Client Bookings', icon: LayoutIcon },
            { id: 'services', label: 'Service Catalog', icon: Briefcase },
            { id: 'gallery', label: 'Brand Gallery', icon: ImageIcon },
            { id: 'contact', label: 'Hub Intelligence', icon: Phone },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id as any); setIsAdding(false); setEditingId(null); }}
              className={`w-full flex items-center px-6 py-4 text-[10px] uppercase tracking-[0.2em] font-bold transition-all rounded-sm ${
                activeTab === tab.id 
                  ? 'bg-brand-pink text-white shadow-[0_0_20px_-5px_rgba(255,43,133,0.4)]' 
                  : 'text-slate-500 hover:text-white hover:bg-white/5'
              }`}
            >
              <tab.icon size={16} className="mr-4" />
              {tab.label}
            </button>
          ))}
          <div className="pt-10">
            <button 
              onClick={handleLogoutClick}
              className="w-full flex items-center px-6 py-4 text-[10px] uppercase tracking-[0.2em] font-bold text-red-500/60 hover:text-red-500 hover:bg-red-500/10 transition-all rounded-sm"
            >
              <LogOut size={16} className="mr-4" />
              Terminate Session
            </button>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-8 md:p-16 overflow-y-auto max-h-screen">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 pb-10 border-b border-white/5 space-y-6 md:space-y-0">
          <div className="space-y-2">
            <span className="text-brand-pink text-[9px] uppercase tracking-[0.4em] font-bold">Management</span>
            <h2 className="text-4xl font-serif text-white italic capitalize">{activeTab}</h2>
          </div>
          <div className="flex items-center space-x-8">
            {saveStatus && (
              <div className="flex items-center text-brand-pink font-bold text-[10px] uppercase tracking-widest animate-in fade-in slide-in-from-top-4">
                <Check size={16} className="mr-2" /> Data Synchronized
              </div>
            )}
            {activeTab !== 'contact' && activeTab !== 'bookings' && !isAdding && !editingId && (
              <button 
                onClick={() => setIsAdding(true)}
                className="btn-brand !py-3 !px-8"
              >
                <Plus size={16} className="mr-2" /> Create New
              </button>
            )}
          </div>
        </header>

        {/* Dynamic Content area */}
        <div className="animate-in fade-in duration-500">
          
          {/* Bookings Tab */}
          {activeTab === 'bookings' && (
            <div className="space-y-8">
              {state.bookings.length === 0 ? (
                <div className="bg-white/[0.02] p-24 text-center border border-white/5 italic text-slate-600 rounded-sm">
                  Waiting for client requests...
                </div>
              ) : (
                <div className="bg-white/[0.02] border border-white/10 overflow-hidden backdrop-blur-sm rounded-sm">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-white/[0.01] border-b border-white/10">
                      <tr>
                        <th className="p-6 text-[9px] uppercase tracking-[0.3em] font-black text-slate-500">Principal</th>
                        <th className="p-6 text-[9px] uppercase tracking-[0.3em] font-black text-slate-500">Treatment</th>
                        <th className="p-6 text-[9px] uppercase tracking-[0.3em] font-black text-slate-500">Schedule</th>
                        <th className="p-6 text-[9px] uppercase tracking-[0.3em] font-black text-slate-500">Status</th>
                        <th className="p-6 text-[9px] uppercase tracking-[0.3em] font-black text-slate-500 text-right">Records</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {state.bookings.map((booking) => (
                        <tr key={booking.id} className="hover:bg-white/[0.03] transition-all group">
                          <td className="p-6">
                            <div className="font-serif text-white text-lg group-hover:text-brand-pink transition-colors">{booking.name}</div>
                            <div className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mt-1">{booking.phone}</div>
                          </td>
                          <td className="p-6">
                            <div className="text-sm font-light text-slate-400 italic">“{booking.serviceName}”</div>
                          </td>
                          <td className="p-6">
                            <div className="text-[10px] text-white uppercase tracking-widest font-bold font-mono">{booking.date}</div>
                            <div className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">{booking.time}</div>
                          </td>
                          <td className="p-6">
                            <select 
                              value={booking.status}
                              onChange={(e) => handleBookingStatusUpdate(booking.id, e.target.value as any)}
                              className={`text-[9px] uppercase tracking-widest font-black px-4 py-2 border rounded-none focus:outline-none transition-all cursor-pointer ${
                                booking.status === 'confirmed' ? 'bg-brand-pink/10 text-brand-pink border-brand-pink/30' : 
                                booking.status === 'cancelled' ? 'bg-red-500/10 text-red-500 border-red-500/30' : 
                                'bg-slate-500/10 text-slate-400 border-white/10'
                              }`}
                            >
                              <option value="pending" className="bg-brand-black">Awaiting Confirmation</option>
                              <option value="confirmed" className="bg-brand-black">Confirmed</option>
                              <option value="cancelled" className="bg-brand-black">Cancelled</option>
                            </select>
                          </td>
                          <td className="p-6 text-right">
                            <button 
                              onClick={() => handleBookingDelete(booking.id)}
                              className="p-3 text-slate-600 hover:text-red-500 transition-all rounded-full hover:bg-red-500/10"
                              title="Archive Record"
                            >
                              <Trash2 size={16} />
                            </button>
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
            <div className="bg-white/[0.02] p-12 md:p-16 border border-white/5 mb-16 max-w-4xl backdrop-blur-xl">
              <h3 className="text-3xl font-serif text-white mb-12 italic">{editingId ? 'Edit Performance' : 'Define New Service'}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="col-span-2">
                  <label className="text-[9px] uppercase tracking-[0.3em] font-bold text-slate-500 mb-4 block">Service Identity</label>
                  <input 
                    type="text" 
                    defaultValue={editingId ? state.services.find(s => s.id === editingId)?.name : ''}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-transparent border-white/10 border-b pb-4 focus:outline-none focus:border-brand-pink transition-all text-white placeholder-white/10 font-light"
                    placeholder="E.g. Signature Silk Press"
                  />
                </div>
                <div className="col-span-2">
                  <label className="text-[9px] uppercase tracking-[0.3em] font-bold text-slate-500 mb-4 block">Manifesto / Description</label>
                  <textarea 
                    defaultValue={editingId ? state.services.find(s => s.id === editingId)?.description : ''}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full bg-transparent border-white/10 border-b pb-4 focus:outline-none focus:border-brand-pink transition-all text-white placeholder-white/10 font-light resize-none"
                    rows={2}
                  />
                </div>
                <div>
                  <label className="text-[9px] uppercase tracking-[0.3em] font-bold text-slate-500 mb-4 block">Investment (Price)</label>
                  <input 
                    type="text" 
                    defaultValue={editingId ? state.services.find(s => s.id === editingId)?.price : ''}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    className="w-full bg-transparent border-white/10 border-b pb-4 focus:outline-none focus:border-brand-pink transition-all text-white placeholder-white/10 font-light"
                  />
                </div>
                <div>
                  <label className="text-[9px] uppercase tracking-[0.3em] font-bold text-slate-500 mb-4 block">Service Tier (Category)</label>
                  <input 
                    type="text" 
                    defaultValue={editingId ? state.services.find(s => s.id === editingId)?.category : ''}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full bg-transparent border-white/10 border-b pb-4 focus:outline-none focus:border-brand-pink transition-all text-white placeholder-white/10 font-light"
                  />
                </div>
                <div className="col-span-2">
                  <label className="text-[9px] uppercase tracking-[0.3em] font-bold text-slate-500 mb-4 block">Visual Selection (Local Upload or URL)</label>
                  <div className="flex flex-col md:flex-row gap-6 items-start">
                    <div className="flex-grow w-full">
                      <input 
                        type="text" 
                        value={formData.imageUrl || (editingId ? state.services.find(s => s.id === editingId)?.imageUrl : '')}
                        onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                        className="w-full bg-transparent border-white/10 border-b pb-4 focus:outline-none focus:border-brand-pink transition-all text-white placeholder-white/10 font-light mb-2"
                        placeholder="Paste image URL..."
                      />
                    </div>
                    <div className="flex-shrink-0">
                      <label className="btn-brand !py-3 !px-6 cursor-pointer inline-block">
                        {uploading ? 'Processing...' : 'Upload Image'}
                        <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, 'imageUrl')} />
                      </label>
                    </div>
                  </div>
                  {formData.imageUrl && (
                    <div className="mt-6 w-32 h-32 border border-white/10 overflow-hidden">
                      <img src={formData.imageUrl} className="w-full h-full object-cover" alt="Preview" />
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-16 flex space-x-8">
                <button 
                  onClick={editingId ? () => handleServiceUpdate(editingId) : handleServiceAdd}
                  className="btn-brand !px-12"
                >
                  Confirm Evolution
                </button>
                <button 
                  onClick={() => { setIsAdding(false); setEditingId(null); setFormData({}); }}
                  className="px-12 py-4 border border-white/10 text-slate-500 text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-white/5 transition-all"
                >
                  Discard
                </button>
              </div>
            </div>
          )}

          {/* Add Gallery Item Form */}
          {isAdding && activeTab === 'gallery' && (
            <div className="bg-white/[0.02] p-12 md:p-16 border border-white/5 mb-16 max-w-4xl backdrop-blur-xl">
              <h3 className="text-3xl font-serif text-white mb-12 italic">Capture New Moment</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="col-span-2">
                  <label className="text-[9px] uppercase tracking-[0.3em] font-bold text-slate-500 mb-4 block">Image Narrative (Title)</label>
                  <input 
                    type="text" 
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full bg-transparent border-white/10 border-b pb-4 focus:outline-none focus:border-brand-pink transition-all text-white placeholder-white/10 font-light"
                    placeholder="E.g. Signature Bridal Glow"
                  />
                </div>
                <div>
                  <label className="text-[9px] uppercase tracking-[0.3em] font-bold text-slate-500 mb-4 block">Aesthetic Category</label>
                  <input 
                    type="text" 
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full bg-transparent border-white/10 border-b pb-4 focus:outline-none focus:border-brand-pink transition-all text-white placeholder-white/10 font-light"
                    placeholder="E.g. Hair Artistry"
                  />
                </div>
                <div className="col-span-2">
                  <label className="text-[9px] uppercase tracking-[0.3em] font-bold text-slate-500 mb-4 block">Visual Selection (Local Upload or URL)</label>
                  <div className="flex flex-col md:flex-row gap-6 items-start">
                    <div className="flex-grow w-full">
                      <input 
                        type="text" 
                        value={formData.url || ''}
                        onChange={(e) => setFormData({...formData, url: e.target.value})}
                        className="w-full bg-transparent border-white/10 border-b pb-4 focus:outline-none focus:border-brand-pink transition-all text-white placeholder-white/10 font-light mb-2"
                        placeholder="Paste image URL..."
                      />
                    </div>
                    <div className="flex-shrink-0">
                      <label className="btn-brand !py-3 !px-6 cursor-pointer inline-block">
                        {uploading ? 'Processing...' : 'Upload Local Image'}
                        <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, 'url')} />
                      </label>
                    </div>
                  </div>
                  {formData.url && (
                    <div className="mt-6 w-32 h-32 border border-white/10 overflow-hidden">
                      <img src={formData.url} className="w-full h-full object-cover" alt="Preview" />
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-16 flex space-x-8">
                <button 
                  onClick={handleGalleryAdd}
                  className="btn-brand !px-12"
                >
                  Induct into Gallery
                </button>
                <button 
                  onClick={() => { setIsAdding(false); setFormData({}); }}
                  className="px-12 py-4 border border-white/10 text-slate-500 text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-white/5 transition-all"
                >
                  Discard
                </button>
              </div>
            </div>
          )}

          {/* Contact Tab */}
          {activeTab === 'contact' && (
            <div className="bg-white/[0.02] p-12 md:p-16 border border-white/5 max-w-5xl backdrop-blur-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="col-span-2">
                  <label className="text-[9px] uppercase tracking-[0.3em] font-bold text-slate-500 mb-4 block">Brand Bio</label>
                  <textarea 
                    defaultValue={state.contact.aboutText}
                    onChange={(e) => setFormData({...formData, aboutText: e.target.value})}
                    className="w-full bg-transparent border-white/10 border-b pb-4 focus:outline-none focus:border-brand-pink transition-all text-white font-light leading-loose"
                    rows={4}
                  />
                </div>
                <div>
                  <label className="text-[9px] uppercase tracking-[0.3em] font-bold text-slate-500 mb-4 block">Liaison Phone</label>
                  <input 
                    type="text" 
                    defaultValue={state.contact.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-transparent border-white/10 border-b pb-4 focus:outline-none focus:border-brand-pink transition-all text-white"
                  />
                </div>
                <div>
                  <label className="text-[9px] uppercase tracking-[0.3em] font-bold text-slate-500 mb-4 block">WhatsApp Liaison (+)</label>
                  <input 
                    type="text" 
                    defaultValue={state.contact.whatsapp}
                    onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                    className="w-full bg-transparent border-white/10 border-b pb-4 focus:outline-none focus:border-brand-pink transition-all text-white"
                  />
                </div>
                <div>
                  <label className="text-[9px] uppercase tracking-[0.3em] font-bold text-slate-500 mb-4 block">Official Email</label>
                  <input 
                    type="text" 
                    defaultValue={state.contact.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-transparent border-white/10 border-b pb-4 focus:outline-none focus:border-brand-pink transition-all text-white"
                  />
                </div>
                <div>
                  <label className="text-[9px] uppercase tracking-[0.3em] font-bold text-slate-500 mb-4 block">Global Address</label>
                  <input 
                    type="text" 
                    defaultValue={state.contact.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className="w-full bg-transparent border-white/10 border-b pb-4 focus:outline-none focus:border-brand-pink transition-all text-white"
                  />
                </div>
                <div className="col-span-2">
                  <label className="text-[9px] uppercase tracking-[0.3em] font-bold text-slate-500 mb-4 block">Maps Intelligence (Embed URL)</label>
                  <input 
                    type="text" 
                    defaultValue={state.contact.mapsEmbed}
                    onChange={(e) => setFormData({...formData, mapsEmbed: e.target.value})}
                    className="w-full bg-transparent border-white/10 border-b pb-4 focus:outline-none focus:border-brand-pink transition-all text-white font-mono text-xs"
                  />
                </div>
              </div>
              <button 
                onClick={handleContactUpdate}
                className="mt-16 btn-brand !px-16"
              >
                Update Strategic Intel
              </button>
            </div>
          )}

          {/* List Display (only if not adding/editing) */}
          {!isAdding && !editingId && activeTab === 'services' && (
            <div className="grid grid-cols-1 gap-6">
              {state.services.map(s => (
                <div key={s.id} className="bg-white/[0.02] p-8 border border-white/5 flex items-center justify-between group hover:bg-white/[0.04] transition-all">
                  <div className="flex items-center space-x-10">
                    <div className="w-24 h-24 bg-brand-black overflow-hidden flex-shrink-0 border border-white/10">
                      <img src={s.imageUrl} alt={s.name} className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700" />
                    </div>
                    <div>
                      <h4 className="font-serif text-2xl text-white italic transition-colors group-hover:text-brand-pink">{s.name}</h4>
                      <div className="flex items-center space-x-6 text-[9px] uppercase tracking-[0.3em] font-bold text-slate-500 mt-3">
                        <span className="text-brand-pink">{s.category}</span>
                        <span className="opacity-20 text-white">|</span>
                        <span>{s.price}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-4 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                    <button 
                      onClick={() => { setEditingId(s.id); setFormData(s); }}
                      className="p-4 bg-white/5 text-white hover:text-brand-pink transition-all rounded-full"
                    >
                      <Edit size={20} />
                    </button>
                    <button 
                      onClick={() => handleServiceDelete(s.id)}
                      className="p-4 bg-white/5 text-white hover:text-red-500 transition-all rounded-full"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!isAdding && activeTab === 'gallery' && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {state.gallery.map(g => (
                <div key={g.id} className="relative aspect-square group overflow-hidden bg-brand-black border border-white/5">
                  <img src={g.url} alt={g.title} className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000" />
                  <div className="absolute inset-0 bg-brand-black/80 opacity-0 group-hover:opacity-100 transition-all flex flex-col items-center justify-center space-y-6">
                    <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-white px-6 text-center">{g.title}</span>
                    <button 
                      onClick={() => handleGalleryDelete(g.id)}
                      className="p-4 bg-red-600/20 text-red-500 rounded-full hover:bg-red-600 hover:text-white transition-all shadow-xl"
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
