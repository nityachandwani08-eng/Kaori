import { motion } from 'motion/react';
import Reveal from '../components/Reveal';
import Magnetic from '../components/Magnetic';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("There was an error sending your message. Please try again.");

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");

    const formData = new FormData(event.currentTarget);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
      // GitHub Pages is a static host, so we simulate the API call and use a mailto link
      setTimeout(() => {
        const mailtoLink = `mailto:atelier@kaori.com?subject=${encodeURIComponent(String(object.subject) || 'Inquiry')}&body=${encodeURIComponent(`From: ${object.firstName} ${object.lastName}\nEmail: ${object.email}\n\n${object.message}`)}`;
        window.location.href = mailtoLink;
        setStatus("success");
      }, 1000);
    } catch (error) {
      setErrorMessage("There was an error sending your message. Please try again.");
      setStatus("error");
    }
  };

  return (
    <div className="bg-kaori-teal text-white pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-20">
        
        {/* Left Side: Contact Information */}
        <div className="flex flex-col justify-center">
          <Reveal>
            <span className="text-[10px] uppercase tracking-[0.6em] mb-6 block font-bold text-kaori-mint/70">
              Reach Out
            </span>
            <h1 className="text-5xl md:text-7xl font-light tracking-tighter leading-none mb-10">
              LET'S <br />
              <span className="italic font-serif text-kaori-mint">CONNECT.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-white/60 font-light text-lg uppercase tracking-wider leading-relaxed mb-16 max-w-md">
              Whether you have inquiries about our archival collection, private viewing appointments, or bespoke requests, our atelier is ready to assist you.
            </p>
          </Reveal>

          <div className="flex flex-col gap-10">
            <Reveal delay={0.3}>
              <div className="flex items-start gap-6 group cursor-pointer">
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center shrink-0 group-hover:bg-white group-hover:text-kaori-teal transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-40 mb-2">Email Address</h4>
                  <p className="font-serif italic text-xl">atelier@kaori.com</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.4}>
              <div className="flex items-start gap-6 group cursor-pointer">
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center shrink-0 group-hover:bg-white group-hover:text-kaori-teal transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-40 mb-2">Phone Number</h4>
                  <p className="font-serif italic text-xl">+81 (0) 467 12 3456</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.5}>
              <div className="flex items-start gap-6 group cursor-pointer">
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center shrink-0 group-hover:bg-white group-hover:text-kaori-teal transition-colors">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-40 mb-2">Headquarters</h4>
                  <p className="font-serif italic text-lg leading-relaxed max-w-[200px]">
                    12-4 Hase, Kamakura<br/>
                    Kanagawa, Japan
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="relative">
          <Reveal delay={0.4}>
            <div className="glass-card p-10 md:p-14 bg-white/5 relative z-10">
              <h3 className="font-serif italic text-3xl mb-10 text-kaori-mint">Send a Message</h3>
              
              <form className="flex flex-col gap-8" onSubmit={onSubmit}>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="flex flex-col gap-3">
                    <label className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-60">First Name</label>
                    <input 
                      type="text" 
                      name="firstName"
                      required
                      className="bg-transparent border-b border-white/20 pb-3 outline-none focus:border-kaori-mint transition-colors font-light placeholder:text-white/20"
                      placeholder="Jane"
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <label className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-60">Last Name</label>
                    <input 
                      type="text" 
                      name="lastName"
                      required
                      className="bg-transparent border-b border-white/20 pb-3 outline-none focus:border-kaori-mint transition-colors font-light placeholder:text-white/20"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <label className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-60">Email Address</label>
                  <input 
                    type="email" 
                    name="email"
                    required
                    className="bg-transparent border-b border-white/20 pb-3 outline-none focus:border-kaori-mint transition-colors font-light placeholder:text-white/20"
                    placeholder="jane@example.com"
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <label className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-60">Subject</label>
                  <input 
                    type="text" 
                    name="subject"
                    required
                    className="bg-transparent border-b border-white/20 pb-3 outline-none focus:border-kaori-mint transition-colors font-light placeholder:text-white/20"
                    placeholder="How can we help?"
                  />
                </div>

                <div className="flex flex-col gap-3 mb-4">
                  <label className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-60">Message</label>
                  <textarea 
                    rows={4}
                    name="message"
                    required
                    className="bg-transparent border-b border-white/20 pb-3 outline-none focus:border-kaori-mint transition-colors font-light placeholder:text-white/20 resize-none no-scrollbar"
                    placeholder="Write your message here..."
                  />
                </div>

                <Magnetic strength={0.2}>
                  <button 
                    type="submit"
                    disabled={status === 'submitting' || status === 'success'}
                    className="flex items-center justify-between w-full p-6 border border-white/20 hover:bg-white hover:text-kaori-teal transition-all duration-500 group disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="text-[10px] uppercase tracking-[0.4em] font-bold">
                      {status === 'submitting' ? 'Submitting...' : status === 'success' ? 'Message Sent' : 'Submit Form'}
                    </span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </button>
                </Magnetic>
                
                {status === 'success' && (
                  <p className="text-kaori-mint text-sm text-center">Thank you for your message. We'll be in touch soon.</p>
                )}
                {status === 'error' && (
                  <p className="text-red-400 text-sm text-center">{errorMessage}</p>
                )}
              </form>
            </div>
            
            {/* Decorative background element behind form */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-kaori-mint/10 via-transparent to-transparent z-0 pointer-events-none" />
          </Reveal>
        </div>

      </div>
    </div>
  );
}
