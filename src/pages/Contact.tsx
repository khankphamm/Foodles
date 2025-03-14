import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { MapPin, Mail, Phone, Clock, Send } from 'lucide-react';
import { toast } from 'sonner';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      name: '',
      email: '',
      subject: '',
      message: ''
    };

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      valid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      valid = false;
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
      valid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      valid = false;
    }

    setFormErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        
        const response = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(formData as any).toString()
        });

        if (response.ok) {
          toast.success('Your message has been sent! We will get back to you soon.');
          // Reset form
          setFormData({
            name: '',
            email: '',
            subject: '',
            message: ''
          });
        }
      } catch (error) {
        toast.error('Failed to send message. Please try again later.');
        console.error('Error:', error);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-culinary-50">
      <Navbar />

      <div className="pt-24 pb-16 px-4 md:px-6">
        <div className="container mx-auto">
          {/* Header */}
          <div className="mb-12 text-center">
            <span className="inline-block py-1 px-3 mb-3 rounded-full bg-secondary text-primary text-sm font-medium">
              Get In Touch
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-culinary-800 mb-4">
              Contact Us
            </h1>
            <p className="max-w-2xl mx-auto text-culinary-600">
              Have questions, feedback, or want to work with us? We'd love to hear from you!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm p-8">
                <h2 className="text-2xl font-serif font-bold text-culinary-800 mb-6">
                  Contact Information
                </h2>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-secondary/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin size={20} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-culinary-800 mb-1">
                        Our Location
                      </h3>
                      <p className="text-culinary-600">
                        Hoang Mai, Hanoi, Vietnam<br />
                        {/* Kitchen District<br /> */}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-secondary/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail size={20} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-culinary-800 mb-1">
                        Email Us
                      </h3>
                      <p className="text-culinary-600">
                        huukhanhpham10@gmail.com<br />
                        phamhuukhanh1303@gmail.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-secondary/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone size={20} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-culinary-800 mb-1">
                        Call Us
                      </h3>
                      <p className="text-culinary-600">
                        +84 985 026 313<br />
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-secondary/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock size={20} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-culinary-800 mb-1">
                        Working Hours
                      </h3>
                      <p className="text-culinary-600">
                        Monday - Friday: 9am - 5pm<br />
                        Saturday: 10am - 2pm<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm p-8">
                <h2 className="text-2xl font-serif font-bold text-culinary-800 mb-6">
                  Send Us a Message
                </h2>

                <form
                  name="contact"
                  method="POST"
                  data-netlify="true"
                  data-netlify-honeypot="bot-field"
                  onSubmit={handleSubmit}
                >
                  {/* Thêm trường ẩn cho Netlify */}
                  <input type="hidden" name="form-name" value="contact" />
                  <input type="hidden" name="bot-field" />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-culinary-700 font-medium mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full p-3 rounded-md border ${
                          formErrors.name ? 'border-red-500' : 'border-culinary-200'
                        } focus:outline-none focus:ring-2 focus:ring-primary/50`}
                        placeholder="Khanh Pham"
                      />
                      {formErrors.name && (
                        <p className="mt-1 text-red-500 text-sm">{formErrors.name}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-culinary-700 font-medium mb-2">
                        Your Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full p-3 rounded-md border ${formErrors.email ? 'border-red-500' : 'border-culinary-200'
                          } focus:outline-none focus:ring-2 focus:ring-primary/50`}
                        placeholder="phamhuukhanh1303@gmail.com"
                      />
                      {formErrors.email && (
                        <p className="mt-1 text-red-500 text-sm">{formErrors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="mb-6">
                    <label htmlFor="subject" className="block text-culinary-700 font-medium mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={`w-full p-3 rounded-md border ${formErrors.subject ? 'border-red-500' : 'border-culinary-200'
                        } focus:outline-none focus:ring-2 focus:ring-primary/50`}
                      placeholder="How can we help you?"
                    />
                    {formErrors.subject && (
                      <p className="mt-1 text-red-500 text-sm">{formErrors.subject}</p>
                    )}
                  </div>

                  <div className="mb-6">
                    <label htmlFor="message" className="block text-culinary-700 font-medium mb-2">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className={`w-full p-3 rounded-md border ${formErrors.message ? 'border-red-500' : 'border-culinary-200'
                        } focus:outline-none focus:ring-2 focus:ring-primary/50`}
                      placeholder="Write your message here..."
                    />
                    {formErrors.message && (
                      <p className="mt-1 text-red-500 text-sm">{formErrors.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 bg-primary text-white hover:bg-primary/90 transition-colors py-3 px-6 rounded-md font-medium"
                  >
                    <Send size={18} />
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="rounded-xl overflow-hidden shadow-sm h-96">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55416.30024268715!2d105.81704728634162!3d20.973966949133697!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ac398657c2ad%3A0xe0a5e23eaaed780!2zSG_DoG5nIE1haSwgSMOgIE7hu5lpLCBWaeG7h3QgTmFt!5e1!3m2!1svi!2s!4v1741963260149!5m2!1svi!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Culinary Magic Location"
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
