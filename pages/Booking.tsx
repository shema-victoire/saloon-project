
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Service, ContactInfo } from '../types';
import { CheckCircle2, MessageSquare, Send } from 'lucide-react';

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call to send email
    console.log("Booking data sent to Gmail:", formData);
    setSubmitted(true);
    // In a real production app, you would use EmailJS or a backend API here.
  };

  const handleWhatsAppBooking = () => {
    const selectedService = services.find(s => s.id === formData.serviceId)?.name || 'a service';
    const message = `Hello Keza Glam Hub, I would like to book ${selectedService} on ${formData.date || '[date]'} at ${formData.time || '[time]'}. My name is ${formData.name || '[name]'}.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${contact.whatsapp.replace('+', '')}?text=${encodedMessage}`, '_blank');
  };

  if (submitted) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center py-24 bg-[#FDFBF7] animate-in zoom-in duration-300">
        <div className="bg-white p-12 shadow-2xl shadow-stone-200/50 text-center max-w-lg mx-auto">
          <CheckCircle2 className="mx-auto mb-6 text-green-500" size={64} />
          <h2 className="text-3xl font-serif text-stone-900 mb-4">Appointment Requested</h2>
          <p className="text-stone-500 mb-8">
            Thank you, {formData.name}. We have received your request for {services.find(s => s.id === formData.serviceId)?.name}. Our team will contact you shortly via {formData.phone} to confirm.
          </p>
          <button 
            onClick={() => setSubmitted(false)}
            className="w-full py-4 bg-stone-900 text-white font-bold uppercase tracking-widest text-sm hover:bg-stone-800 transition-colors"
          >
            New Booking
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FDFBF7] min-h-screen py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-16">
          <span className="text-stone-500 uppercase tracking-[0.4em] text-xs mb-4 block">Reservation</span>
          <h1 className="text-4xl md:text-6xl font-serif text-stone-900 mb-8">Book Appointment</h1>
          <p className="text-stone-500 max-w-2xl mx-auto leading-relaxed">
            Choose your preferred method of booking. We recommend booking at least 48 hours in advance for the best availability.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Option A: Form */}
          <div className="bg-white p-8 md:p-12 shadow-sm border border-stone-100">
            <h2 className="text-2xl font-serif mb-8 text-stone-900 flex items-center">
              <Send className="mr-3" size={24} /> Online Request
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs uppercase tracking-widest font-bold text-stone-500 mb-2">Full Name</label>
                <input 
                  type="text" name="name" required value={formData.name} onChange={handleChange}
                  className="w-full bg-stone-50 border-stone-200 border-b p-4 focus:outline-none focus:border-stone-900 transition-colors"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest font-bold text-stone-500 mb-2">Phone Number</label>
                <input 
                  type="tel" name="phone" required value={formData.phone} onChange={handleChange}
                  className="w-full bg-stone-50 border-stone-200 border-b p-4 focus:outline-none focus:border-stone-900 transition-colors"
                  placeholder="+250..."
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest font-bold text-stone-500 mb-2">Selected Service</label>
                <select 
                  name="serviceId" required value={formData.serviceId} onChange={handleChange}
                  className="w-full bg-stone-50 border-stone-200 border-b p-4 focus:outline-none focus:border-stone-900 transition-colors appearance-none"
                >
                  <option value="">Select a Service</option>
                  {services.map(s => <option key={s.id} value={s.id}>{s.name} ({s.price})</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-widest font-bold text-stone-500 mb-2">Preferred Date</label>
                  <input 
                    type="date" name="date" required value={formData.date} onChange={handleChange}
                    className="w-full bg-stone-50 border-stone-200 border-b p-4 focus:outline-none focus:border-stone-900 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest font-bold text-stone-500 mb-2">Preferred Time</label>
                  <input 
                    type="time" name="time" required value={formData.time} onChange={handleChange}
                    className="w-full bg-stone-50 border-stone-200 border-b p-4 focus:outline-none focus:border-stone-900 transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest font-bold text-stone-500 mb-2">Notes (Optional)</label>
                <textarea 
                  name="notes" value={formData.notes} onChange={handleChange} rows={3}
                  className="w-full bg-stone-50 border-stone-200 border-b p-4 focus:outline-none focus:border-stone-900 transition-colors"
                  placeholder="Special requests or questions..."
                ></textarea>
              </div>
              <button 
                type="submit"
                className="w-full py-4 bg-stone-900 text-white font-bold uppercase tracking-widest text-sm hover:bg-stone-800 transition-colors shadow-lg shadow-stone-200"
              >
                Send Request
              </button>
            </form>
          </div>

          {/* Option B: WhatsApp */}
          <div className="space-y-8">
            <div className="bg-stone-900 text-white p-8 md:p-12 shadow-xl">
              <h2 className="text-2xl font-serif mb-6 flex items-center">
                <MessageSquare className="mr-3" size={24} /> Instant Booking
              </h2>
              <p className="text-stone-400 mb-8 leading-relaxed">
                Prefer a quicker response? Chat with us directly on WhatsApp to check availability and book instantly.
              </p>
              <button 
                onClick={handleWhatsAppBooking}
                className="w-full py-4 bg-[#25D366] text-white font-bold uppercase tracking-widest text-sm hover:bg-[#20bd5a] transition-all flex items-center justify-center"
              >
                <MessageSquare className="mr-2" size={20} /> Chat on WhatsApp
              </button>
            </div>

            <div className="bg-white p-8 border border-stone-100 space-y-4">
              <h3 className="text-lg font-serif text-stone-900">Salon Policy</h3>
              <ul className="text-sm text-stone-500 space-y-2 list-disc pl-5">
                <li>Please arrive 10 minutes prior to your appointment.</li>
                <li>Cancellations require at least 24 hours notice.</li>
                <li>Group bookings (3+ people) require a 30% deposit.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
