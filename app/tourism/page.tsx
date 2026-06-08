"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Calendar, Users, Palette } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import { useLanguage } from "@/context/LanguageContext";
import { LANDMARKS, SITE_URL } from "@/lib/constants";

const TOURISM_SECTIONS = [
  {
    id: "visiting",
    icon: MapPin,
    title: { en: "Visiting Imus", fil: "Pagbisita sa Imus" },
    content: {
      en: "Imus, a landlocked city in Cavite, blends old and new — more intimate than grand. Known for its rich culture, history, people, and culinary heritage. Tara, let's explore Imus!",
      fil: "Ang Imus, isang landlocked na lungsod sa Cavite, ay pinagsasama ang luma at bago. Kilala sa mayamang kultura, kasaysayan, mga tao, at culinary heritage.",
    },
  },
  {
    id: "events",
    icon: Calendar,
    title: { en: "Cultural & Historical Events", fil: "Kultural at Makasaysayang Kaganapan" },
    content: {
      en: "Celebrate the Battle of Imus commemoration, city festivals, and cultural programs that honor our heritage as the Flag Capital of the Philippines.",
      fil: "Ipagdiwang ang Battle of Imus, mga festival ng lungsod, at cultural programs na nagpaparangal sa ating pamana bilang Flag Capital of the Philippines.",
    },
  },
  {
    id: "heroes",
    icon: Users,
    title: { en: "Heroes of Imus", fil: "Mga Bayani ng Imus" },
    content: {
      en: "Learn about the brave revolutionaries who fought in the Battle of Imus in 1891 — a pivotal moment in the Philippine Revolution against Spanish colonial rule.",
      fil: "Alamin ang tungkol sa mga matatapang na rebolusyonaryo na lumaban sa Labanan ng Imus noong 1891.",
    },
  },
  {
    id: "notable",
    icon: Users,
    title: { en: "Notable Imuseños", fil: "Mga Kilalang Imuseño" },
    content: {
      en: "Discover the athletes, artists, leaders, and community builders who proudly represent the City of Imus on the national and international stage.",
      fil: "Tuklasin ang mga atleta, artista, lider, at community builders na ipinagmamalaki ang Lungsod ng Imus.",
    },
  },
];

export default function TourismPage() {
  const { language } = useLanguage();

  return (
    <>
      <PageHeader
        title={language === "fil" ? "Turismo sa Imus" : "Tourism in Imus"}
        subtitle={
          language === "fil"
            ? "Flag Capital of the Philippines — kung saan ang kasaysayan at modernong buhay ay magkasamang umuunlad."
            : "Flag Capital of the Philippines — where history and modern life thrive together."
        }
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: language === "fil" ? "Turismo" : "Tourism" },
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        {TOURISM_SECTIONS.map((section) => {
          const Icon = section.icon;
          return (
            <section key={section.id} id={section.id} className="mb-12 scroll-mt-28">
              <div className="flex items-center gap-3 mb-4">
                <Icon className="h-6 w-6 text-imus-red" />
                <h2 className="font-heading text-2xl font-bold text-imus-navy">
                  {section.title[language]}
                </h2>
              </div>
              <p className="max-w-3xl leading-relaxed text-gray-700">
                {section.content[language]}
              </p>
            </section>
          );
        })}

        {/* Landmarks */}
        <section className="mb-12">
          <h2 className="mb-6 font-heading text-2xl font-bold text-imus-navy">
            {language === "fil" ? "Mga Dapat Bisitahin" : "Places to Visit"}
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {LANDMARKS.map((landmark) => (
              <div key={landmark.title.en} className="overflow-hidden rounded-xl bg-white shadow-md">
                <div className="relative h-48">
                  <Image
                    src={landmark.image}
                    alt={landmark.title[language]}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    loading="lazy"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-imus-navy">{landmark.title[language]}</h3>
                  <p className="mt-1 flex items-center gap-1 text-sm text-gray-500">
                    <MapPin className="h-4 w-4" />
                    {landmark.address}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Artist Registry */}
        <section className="rounded-xl bg-imus-navy p-8 text-white">
          <div className="flex items-start gap-4">
            <Palette className="h-8 w-8 shrink-0 text-imus-green" />
            <div>
              <h2 className="font-heading text-xl font-bold">
                {language === "fil"
                  ? "Imus City Tourism Artist Registry"
                  : "Imus City Tourism Artist Registry"}
              </h2>
              <p className="mt-2 text-white/80">
                {language === "fil"
                  ? "Bukas sa mga established at emerging artists na nakatira o aktibong gumagawa ng sining sa Imus. Pinamamahalaan ng City of Imus Culture and the Arts Council (CICAC)."
                  : "Open to established and emerging artists who live or actively create in Imus. Managed by the City of Imus Culture and the Arts Council (CICAC)."}
              </p>
              <a
                href={`${SITE_URL}/tourism`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block rounded-full bg-imus-green px-6 py-2 text-sm font-semibold text-imus-navy hover:bg-imus-greenDark"
              >
                {language === "fil" ? "Magparehistro" : "Register Here"}
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
