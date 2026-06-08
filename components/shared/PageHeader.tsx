"use client";

import { motion } from "framer-motion";
import Breadcrumbs from "@/components/shared/Breadcrumbs";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: { label: string; href?: string }[];
}

export default function PageHeader({ title, subtitle, breadcrumbs }: PageHeaderProps) {
  return (
    <div className="bg-imus-navy pb-12 pt-10 text-white">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-heading text-3xl font-bold md:text-4xl"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-3 max-w-2xl text-white/80"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </div>
  );
}
