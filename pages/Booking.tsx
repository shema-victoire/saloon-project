
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Service, ContactInfo, Booking as BookingType } from '../types';
import { CheckCircle2, MessageSquare, Send } from 'lucide-react';
import { cmsService } from '../services/cmsService';

interface BookingProps {
  services: Service[];
  contact: ContactInfo;
}

const Booking: React.FC<BookingProps> = ({ services, contact }) => {
  const [searchParams] = useSearchParams();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    serviceId: '',
    date: '',
    time: '',
    notes: ''
  });

  useEffect(() => {
    const serviceName = searchParams.get('service');
    if (serviceName) {
      const s = services.find(x => x.name === serviceName);
      if (s) setFormData(prev => ({ ...prev, serviceId: s.id }));
    }
  }, [searchParams, services]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create booking object
    const selectedService = services.find(s => s.id === formData.serviceId);
    
    const newBooking: Omit<BookingType, 'createdAt'> = {
      id: Date.now().toString(),
      name: formData.name,
      phone: formData.phone,
      serviceId: formData.serviceId,
      serviceName: selectedService?.name || 'Unknown Service',
      date: formData.date,
      time: formData.time,
      notes: formData.notes,
      status: 'pending'
    };

    try {
      // Save to CMS (Firestore)
      await cmsService.addBooking(newBooking as any);
      setSubmitted(true);
    } catch (error) {
      alert("Failed to submit booking. Please try again or contact us via WhatsApp.");
    }
  };

  const handleWhatsAppBooking = () => {
    const selectedService = services.find(s => s.id === formData.serviceId)?.name || 'a service';
    const message = `Hello Keza Glam Hub, I would like to book ${selectedService} on ${formData.date || '[date]'} at ${formData.time || '[time]'}. My name is ${formData.name || '[name]'}.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${contact.whatsapp.replace('+', '')}?text=${encodedMessage}`, '_blank');
  };

  if (submitted) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center py-24 bg-brand-black animate-in zoom-in duration-500 px-6">
        <div className="bg-white/[0.02] border border-white/5 p-16 text-center max-w-xl mx-auto backdrop-blur-xl">
          <div className="w-20 h-20 bg-brand-pink/20 rounded-full flex items-center justify-center mx-auto mb-10">
            <CheckCircle2 className="text-brand-pink" size={40} />
          </div>
          <h2 className="text-4xl font-serif text-white mb-6 italic">Request Received.</h2>
          <p className="text-slate-400 mb-12 font-light leading-loose">
            Thank you, {formData.name}. We have received your request for <span className="text-white font-medium">{services.find(s => s.id === formData.serviceId)?.name}</span>. Our concierge will contact you shortly via {formData.phone} to confirm your indulgence.
          </p>
          <button 
            onClick={() => setSubmitted(false)}
            className="btn-brand w-full"
          >
            New Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-brand-black min-h-screen py-32">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <header className="text-center mb-32 max-w-3xl mx-auto space-y-8">
          <span className="text-brand-pink uppercase tracking-[0.4em] text-[10px] font-bold block">Reservation</span>
          <h1 className="text-5xl md:text-7xl font-serif text-white font-light">Book <span className="italic">Artistry</span></h1>
          <p className="text-slate-400 font-light italic leading-loose">
            Secure your preferred moment. We recommend booking at least 48 hours in advance for the ultimate available experience.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
          {/* Option A: Form */}
          <div className="lg:col-span-7 bg-white/[0.02] p-10 md:p-16 border border-white/5 backdrop-blur-xl group">
            <h2 className="text-2xl font-serif mb-12 text-white flex items-center italic">
              <Send className="mr-6 text-brand-pink" size={24} /> Online Request
            </h2>
            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                  <label className="block text-[9px] uppercase tracking-[0.3em] font-bold text-slate-500 mb-4 px-1">Full Name</label>
                  <input 
                    type="text" name="name" required value={formData.name} onChange={handleChange}
                    className="w-full bg-transparent border-white/10 border-b pb-4 focus:outline-none focus:border-brand-pink transition-all text-white placeholder-white/20 font-light"
                    placeholder="E.g. Elena Wright"
                  />
                </div>
                <div>
                  <label className="block text-[9px] uppercase tracking-[0.3em] font-bold text-slate-500 mb-4 px-1">Phone Number</label>
                  <input 
                    type="tel" name="phone" required value={formData.phone} onChange={handleChange}
                    className="w-full bg-transparent border-white/10 border-b pb-4 focus:outline-none focus:border-brand-pink transition-all text-white placeholder-white/20 font-light"
                    placeholder="+250..."
                  />
                </div>
              </div>
              <div>
                <label className="block text-[9px] uppercase tracking-[0.3em] font-bold text-slate-500 mb-4 px-1">Selected Service</label>
                <select 
                  name="serviceId" required value={formData.serviceId} onChange={handleChange}
                  className="w-full bg-transparent border-white/10 border-b pb-4 focus:outline-none focus:border-brand-pink transition-all text-white appearance-none font-light cursor-pointer"
                >
                  <option value="" className="bg-brand-black">Select a Service</option>
                  {services.map(s => <option key={s.id} value={s.id} className="bg-brand-black">{s.name} — {s.price}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-10">
                <div>
                  <label className="block text-[9px] uppercase tracking-[0.3em] font-bold text-slate-500 mb-4 px-1">Preferred Date</label>
                  <input 
                    type="date" name="date" required value={formData.date} onChange={handleChange}
                    className="w-full bg-transparent border-white/10 border-b pb-4 focus:outline-none focus:border-brand-pink transition-all text-white font-light color-scheme-dark"
                    style={{ colorScheme: 'dark' }}
                  />
                </div>
                <div>
                  <label className="block text-[9px] uppercase tracking-[0.3em] font-bold text-slate-500 mb-4 px-1">Preferred Time</label>
                  <input 
                    type="time" name="time" required value={formData.time} onChange={handleChange}
                    className="w-full bg-transparent border-white/10 border-b pb-4 focus:outline-none focus:border-brand-pink transition-all text-white font-light"
                    style={{ colorScheme: 'dark' }}
                  />
                </div>
              </div>
              <div>
                <label className="block text-[9px] uppercase tracking-[0.3em] font-bold text-slate-500 mb-4 px-1">Notes (Optional)</label>
                <textarea 
                  name="notes" value={formData.notes} onChange={handleChange} rows={2}
                  className="w-full bg-transparent border-white/10 border-b pb-4 focus:outline-none focus:border-brand-pink transition-all text-white placeholder-white/20 font-light resize-none px-1"
                  placeholder="Share any special requirements or questions..."
                ></textarea>
              </div>
              <button 
                type="submit"
                className="btn-brand w-full !py-5 mt-4"
              >
                Send Online Request
              </button>
            </form>
          </div>

          {/* Option B: WhatsApp */}
          <div className="lg:col-span-5 space-y-12">
            <div className="bg-white p-12 lg:p-16 text-brand-black shadow-2xl relative overflow-hidden group">
              <div className="relative z-10">
                <h2 className="text-3xl font-serif mb-8 flex items-center italic font-black">
                  <MessageSquare className="mr-6 text-brand-pink" size={32} /> Instant Concierge
                </h2>
                <p className="text-brand-black/70 mb-12 leading-loose font-light italic">
                  For immediate confirmation or same-day inquiries, connect directly with our concierge team on WhatsApp.
                </p>
                <button 
                  onClick={handleWhatsAppBooking}
                  className="w-full py-5 bg-[#25D366] text-white font-black uppercase tracking-[0.2em] text-[10px] hover:bg-brand-black transition-all flex items-center justify-center group-hover:scale-[1.02] shadow-xl"
                >
                  Connect on WhatsApp
                </button>
              </div>
            </div>

            <div className="border border-white/5 p-10 space-y-8 bg-white/[0.01]">
              <h3 className="text-xs uppercase tracking-[0.3em] font-bold text-white border-b border-white/10 pb-4">Salon Etiquette</h3>
              <ul className="text-sm text-slate-500 space-y-6 font-light">
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-brand-pink rounded-full mt-1.5 mr-4 flex-shrink-0"></div>
                  <span>Arrival: Please grace us with your presence 10 minutes prior to your session.</span>
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-brand-pink rounded-full mt-1.5 mr-4 flex-shrink-0"></div>
                  <span>Courtesy: We request a 24-hour notice for any schedule adjustments.</span>
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-brand-pink rounded-full mt-1.5 mr-4 flex-shrink-0"></div>
                  <span>Reservations: Group sessions of 3+ require a celebratory deposit.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
