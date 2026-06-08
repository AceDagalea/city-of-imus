import { SITE_URL } from "@/lib/constants";
import type { LocalizedString } from "@/lib/i18n";

export const HISTORY_HERO = {
  title: { en: "History", fil: "Kasaysayan" },
  subtitle: {
    en: "From a visita of Cavite Viejo to the Flag Capital of the Philippines.",
    fil: "Mula sa visita ng Cavite Viejo hanggang sa Flag Capital of the Philippines.",
  },
};

export const HISTORY_PARAGRAPHS = [
  {
    en: 'Imus, formerly a "visita" of Cavite Viejo (now Kawit), is one of the oldest administrative units of Cavite. Cavite Viejo was under the administration of the Jesuits until 1686, when the Recollects took over Imus. Efforts were then directed toward seeking independence from the ecclesiastical and civil administration of Cavite Viejo until Imus was wholly liberated.',
    fil: 'Ang Imus, dating "visita" ng Cavite Viejo (ngayon ay Kawit), ay isa sa pinakamatandang administratibong yunit ng Cavite. Ang Cavite Viejo ay nasa ilalim ng administrasyon ng mga Heswita hanggang 1686, nang ang mga Recollect ang humalili sa Imus. Nagsimula ang mga pagsisikap para sa kalayaan mula sa ecleciastical at civil na administrasyon ng Cavite Viejo hanggang ganap na nakalaya ang Imus.',
  },
  {
    en: "The ecclesiastical land that tied Imus to Cavite Viejo since the early part of the 17th century was covered by the Royal Order of October 30, 1776. This Royal Decree was considered the first step in the creation of the Municipality of Imus. The Recollects, not contented with the religious emancipation of Imus from Cavite Viejo, sought its eventual political separation. Imus finally became an independent municipality in 1795.",
    fil: "Ang ecleciastical land na nag-uugnay sa Imus at Cavite Viejo mula sa unang bahagi ng ika-17 siglo ay saklaw ng Royal Order noong Oktubre 30, 1776. Itinuturing ang Royal Decree na ito bilang unang hakbang sa paglikha ng Munisipalidad ng Imus. Hindi kuntento ang mga Recollect sa relihiyosong kalayaan ng Imus mula sa Cavite Viejo, at hinangad ang panghuling paghihiwalay sa pulitika. Naging independiyenteng munisipalidad ang Imus noong 1795.",
  },
] as LocalizedString[];

export const HISTORY_IMAGES = [
  {
    src: `${SITE_URL}/Media/church.png`,
    alt: {
      en: "U.S. invaders in camp at the left side of Imus Church, 1899.",
      fil: "Mga mananakop na Amerikano sa kampo sa kaliwang bahagi ng Simbahan ng Imus, 1899.",
    },
  },
  {
    src: `${SITE_URL}/Media/licerio.png`,
    alt: {
      en: "Licerio Topacio, Presidente Municipal (Mayor) of Imus, with two Filipino priests. Photo was taken in 1899.",
      fil: "Si Licerio Topacio, Presidente Municipal (Mayor) ng Imus, kasama ang dalawang paring Pilipino. Kinuha ang larawan noong 1899.",
    },
  },
] as const;

export const HISTORY_CLOSING = {
  en: "The Imus Municipal Building, situated in the heart of the pueblo, opened its doors in 1935. The new municipal building was subsequently inaugurated in 2003.\n\nCongressmen Pidi Barzaga and Crispin Remulla joined Congressman Joseph Abaya in introducing a bill that would establish the Municipality of Imus as a lone legislative district. Senators Panfilo Lacson, Richard Gordon, and Bong Revilla backed the legislation. On 22 October 2009, under Republic Act 9727, the lone district of Imus, known as the \"Third District of Cavite,\" was established.\n\nWith House Bill No. 01989, Congressman Erineo Maliksi proposed the conversion of Imus as a City on 03 August 2010, which later became Republic Act (RA) No. 10161. With a plebiscite conducted on 30 June 2012, RA 10161 was ratified by 22,742 registered voters of Imus and turned the municipality into a component city, known as the City of Imus.\n\nThrough Resolution No. 03-2017-189, the construction of the new City Government Center was included in the Priority Development Program of the City Government for the years 2018 – 2021. The building has a total floor space of 30,595.54 square meters, and its construction started in 2019. The Imus City Government Center was completed and inaugurated in 2022.",
  fil: "Ang Imus Municipal Building, sa puso ng pueblo, ay binuksan noong 1935. Ang bagong gusali ng munisipyo ay iniinagura noong 2003.\n\nSina Congressman Pidi Barzaga at Crispin Remulla ay sumama kay Congressman Joseph Abaya sa paghahain ng panukalang batas na magtatatag sa Munisipalidad ng Imus bilang isang legislative district. Sinuportahan ito nina Senators Panfilo Lacson, Richard Gordon, at Bong Revilla. Noong 22 Oktubre 2009, sa ilalim ng Republic Act 9727, itinatag ang lone district ng Imus, kilala bilang \"Third District of Cavite.\"\n\nSa House Bill No. 01989, iminungkahi ni Congressman Erineo Maliksi ang pag-convert ng Imus bilang Lungsod noong 03 Agosto 2010, na naging Republic Act (RA) No. 10161. Sa plebisito noong 30 Hunyo 2012, pinagtibay ng 22,742 rehistradong botante ng Imus ang RA 10161 at ginawang component city ang munisipyo, kilala bilang Lungsod ng Imus.\n\nSa Resolution No. 03-2017-189, isinama ang pagtatayo ng bagong City Government Center sa Priority Development Program ng Pamahalaang Lungsod para sa mga taong 2018 – 2021. May kabuuang floor space na 30,595.54 square meters ang gusali, at nagsimula ang konstruksyon noong 2019. Natapos at iniinagura ang Imus City Government Center noong 2022.",
};
