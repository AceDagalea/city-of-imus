"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { CONTACT } from "@/lib/constants";
import { STRINGS } from "@/lib/i18n";

const MAP_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15458.59370753627!2d120.90208883955074!3d14.389741800000023!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397d31670229361%3A0x92deb97a2f2bb219!2sNew%20Imus%20City%20Hall!5e0!3m2!1sen!2sus!4v1658285201747!5m2!1sen!2sus";

export default function SocialMap() {
  const { language } = useLanguage();

  return (
    <section id="map" className="bg-white py-16" aria-labelledby="stay-connected-heading">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <motion.h2
          id="stay-connected-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 font-heading text-3xl font-bold text-tenant-navy"
        >
          {STRINGS.stayConnected[language]}
        </motion.h2>

        <div className="grid gap-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="mb-4 font-heading text-xl font-semibold text-tenant-navy">
              {STRINGS.findUs[language]}
            </h3>
            <div className="overflow-hidden rounded-xl shadow-lg">
              <iframe
                src={MAP_EMBED_URL}
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="City of Imus City Hall location on Google Maps"
                className="w-full"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="mb-4 font-heading text-xl font-semibold text-tenant-navy">
              Facebook
            </h3>
            <div className="overflow-hidden rounded-xl shadow-lg">
              <iframe
                src={`https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(CONTACT.facebook)}&tabs=timeline&width=500&height=400&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true`}
                width="100%"
                height="400"
                style={{ border: "none", overflow: "hidden" }}
                scrolling="no"
                frameBorder="0"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                title="City of Imus Facebook page"
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
