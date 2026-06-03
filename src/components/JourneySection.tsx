"use client";

import React from "react";
import { motion } from "framer-motion";
import { Award, MapPin, Globe, Building2, type LucideIcon } from "lucide-react";
import { useInView } from "../hooks/useInView";
import { useCountUp } from "../hooks/useCountUp";
import "./JourneySection.css";

const stats = [
  { label: "Years of Excellence", end: 40, suffix: "+", icon: Award },
  { label: "Total Campuses", end: 7, suffix: "", icon: MapPin },
  { label: "Acres of Campus", end: 5, suffix: "+", icon: Globe },
  { label: "Modern Labs", end: 15, suffix: "+", icon: Building2 },
];

type StatItemProps = {
  label: string;
  end: number;
  suffix: string;
  icon: LucideIcon;
  active: boolean;
};

function StatItem({ label, end, suffix, icon: Icon, active }: StatItemProps) {
  const value = useCountUp(end, 2500, active);

  return (
    <div className="journey-stat-wrap">
      <div className="journey-stat-card">
        <div className="journey-stat-icon" aria-hidden>
          <Icon className="journey-stat-icon-svg" size={24} />
        </div>
        <p className="journey-stat-number">
          {value.toLocaleString()}
          {suffix}
        </p>
        <p className="journey-stat-label">{label}</p>
      </div>
    </div>
  );
}

export function JourneySection() {
  const { ref, inView } = useInView<HTMLElement>({
    once: false,
    threshold: 0.35,
    rootMargin: "0px 0px -15% 0px",
  });

  return (
    <section className="journey-section" ref={ref} aria-labelledby="journey-heading">
      <div className="journey-section-glow" aria-hidden />

      <div className="container journey-container">
        <div className="journey-header">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="journey-eyebrow"
          >
            Milestones of Excellence
          </motion.p>
          <motion.h2
            id="journey-heading"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="journey-title"
          >
            For Our <span className="journey-title-highlight">40 Year Journey</span>
          </motion.h2>
        </div>

        <div className="journey-stats-grid">
          {stats.map((stat) => (
            <StatItem key={stat.label} {...stat} active={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
