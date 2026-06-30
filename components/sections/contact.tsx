"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Terminal, Send, Mail, Phone, MapPin, Github, Linkedin, ShieldCheck } from "lucide-react";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";
import { generateEmailTemplate } from "@/lib/email-template";

import { usePortfolio } from "@/context/portfolio-context";

export const ContactSection: React.FC = () => {
  const { portfolioData } = usePortfolio();
  const { profile, socials } = portfolioData;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const emailContent = generateEmailTemplate(
        formData.name,
        formData.email,
        formData.message
      );

      await emailjs.send(
        "service_zn89i2o",
        "template_j7fpxet",
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
          html_content: emailContent,
        },
        "4OnEACCR69rG1JSpv"
      );

      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section id="contact" className="py-24 px-6 bg-bg relative">
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00d4ff02_1px,transparent_1px),linear-gradient(to_bottom,#00d4ff02_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Title */}
        <div className="mb-12 font-mono text-center md:text-left">
          <div className="text-cyan text-sm mb-2 font-semibold tracking-wider flex items-center justify-center md:justify-start gap-2">
            <Terminal className="h-4 w-4" />
            <span>echo $CONTACT_ENDPOINT</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Establish Connection
          </h2>
          <p className="text-slate mt-2 text-sm md:text-base font-sans">
            // Submit the prompt script below to dispatch an email payload directly to my inbox.
          </p>
        </div>

        {/* Contact Container */}
        <div className="grid md:grid-cols-5 gap-8 items-stretch font-mono">

          {/* Left Column: System Config Info */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-2 bg-[#0D1117] border border-cyan/10 rounded-lg p-6 flex flex-col justify-between hover:border-cyan/20 transition-colors"
          >
            <div>
              <div className="text-slate/40 text-[10px] mb-4 select-none">
                # LOCAL HOST DIAGNOSTICS
              </div>
              <div className="space-y-4 text-xs md:text-sm">
                <div>
                  <span className="text-purple-400">const</span> <span className="text-blue-400">host</span> = <span className="text-green">"{profile.name.toLowerCase().replace(/[^a-z0-9]/g, "")}.site"</span>;
                </div>
                <div>
                  <span className="text-purple-400">const</span> <span className="text-blue-400">status</span> = <span className="text-green">"listening_for_inquiries"</span>;
                </div>

                <div className="pt-4 border-t border-cyan/5 space-y-3">
                  <div className="flex items-start gap-2">
                    <span className="text-slate/50">email:</span>
                    <a href={`mailto:${profile.email}`} className="text-white hover:text-cyan transition-colors truncate">
                      "{profile.email}"
                    </a>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-slate/50">phone:</span>
                    <a href={`tel:${profile.phone.replace(/[^0-9+]/g, "")}`} className="text-white hover:text-cyan transition-colors">
                      "{profile.phone}"
                    </a>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-slate/50">loc:</span>
                    <span className="text-white">"{profile.location}"</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links & Resume */}
            <div className="mt-8 pt-6 border-t border-cyan/5 space-y-4">
              <div className="text-xs text-slate/50"># NETWORKING ENDPOINTS</div>
              <div className="flex gap-4">
                <a
                  href={socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded border border-cyan/15 bg-bg text-slate hover:text-cyan hover:border-cyan/35 transition-all duration-300"
                >
                  <Github className="h-4 w-4" />
                </a>
                <a
                  href={socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded border border-cyan/15 bg-bg text-slate hover:text-cyan hover:border-cyan/35 transition-all duration-300"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Terminal Form UI */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-3 bg-[#0D1117] border border-cyan/15 rounded-lg overflow-hidden scanlines shadow-2xl flex flex-col"
          >
            {/* Terminal Tab bar */}
            <div className="px-4 py-2 bg-[#161B22] border-b border-cyan/10 flex items-center justify-between text-xs text-slate/50 select-none">
              <div className="flex space-x-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]/80" />
              </div>
              <span>send_message.sh</span>
              <span className="w-4" />
            </div>

            {/* Terminal Body Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6 flex-grow flex flex-col justify-between">
              <div className="space-y-4">
                {/* Name Input */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-cyan text-xs md:text-sm font-mono flex items-center gap-1.5">
                    <span>$</span>
                    <span>name:</span>
                  </label>
                  <div className="relative flex items-center bg-[#0a0e14] border border-cyan/10 focus-within:border-cyan/30 rounded px-3 py-2 transition-all">
                    <span className="text-slate/40 text-xs mr-2 font-mono select-none">[</span>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="your_name"
                      className="w-full bg-transparent outline-none text-white text-xs md:text-sm placeholder:text-slate/20"
                    />
                    <span className="text-slate/40 text-xs ml-2 font-mono select-none">]</span>
                  </div>
                </div>

                {/* Email Input */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-cyan text-xs md:text-sm font-mono flex items-center gap-1.5">
                    <span>$</span>
                    <span>email:</span>
                  </label>
                  <div className="relative flex items-center bg-[#0a0e14] border border-cyan/10 focus-within:border-cyan/30 rounded px-3 py-2 transition-all">
                    <span className="text-slate/40 text-xs mr-2 font-mono select-none">[</span>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your_email@domain.com"
                      className="w-full bg-transparent outline-none text-white text-xs md:text-sm placeholder:text-slate/20"
                    />
                    <span className="text-slate/40 text-xs ml-2 font-mono select-none">]</span>
                  </div>
                </div>

                {/* Message Textarea */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="text-cyan text-xs md:text-sm font-mono flex items-center gap-1.5">
                    <span>$</span>
                    <span>message:</span>
                  </label>
                  <div className="relative flex items-start bg-[#0a0e14] border border-cyan/10 focus-within:border-cyan/30 rounded px-3 py-2 transition-all">
                    <span className="text-slate/40 text-xs mr-2 mt-0.5 font-mono select-none">[</span>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="write_message_body..."
                      rows={4}
                      className="w-full bg-transparent outline-none text-white text-xs md:text-sm placeholder:text-slate/20 resize-none min-h-[90px]"
                    />
                    <span className="text-slate/40 text-xs ml-2 mt-auto mb-0.5 font-mono select-none">]</span>
                  </div>
                </div>
              </div>

              {/* Submit Action */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2 rounded bg-green/5 border border-green/20 text-green hover:bg-green hover:text-[#080B10] shadow-[0_0_12px_rgba(0,255,136,0.03)] focus:shadow-[0_0_15px_rgba(0,255,136,0.12)] transition-all duration-300 flex items-center justify-center gap-2 text-xs md:text-sm mt-4 select-none"
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin rounded-full h-3.5 w-3.5 border-2 border-[#080B10] border-t-transparent" />
                    <span>Executing script...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-3.5 w-3.5" />
                    <span>./send_message.sh --payload=form_data</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;