"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Award, Trophy, Sparkles, ArrowRight } from "lucide-react";

export function MilestonesOfExcellence() {
  return (
    <section
      className="section text-center"
      style={{ backgroundColor: "#ffffff", padding: "6rem 0", overflow: "hidden" }}
    >
      <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1rem" }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55 }}
          style={{ marginBottom: "3rem" }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.6rem",
              padding: "0.55rem 1.1rem",
              borderRadius: "999px",
              background: "#f1f5f9",
              color: "var(--primary)",
              fontWeight: 800,
              fontSize: "10px",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              marginBottom: "1rem",
            }}
          >
            <Trophy size={14} aria-hidden />
            Milestones of Excellence
          </div>

          <h2
            className="section-title text-center"
            style={{ margin: 0, fontSize: "clamp(2.2rem, 4vw, 3.2rem)", color: "#1f2937" }}
          >
            Celebrating student success
          </h2>
          <p
            className="section-desc"
            style={{ margin: "1rem auto 0", maxWidth: "46rem", color: "#6b7280", fontSize: "1.1rem" }}
          >
            From academic achievements to co-curricular victories, we recognize every step forward on our journey of
            learning.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "1.25rem",
            justifyItems: "stretch",
            marginBottom: "3rem",
          }}
        >
          {[
            {
              icon: Award,
              title: "Academic Excellence",
              desc: "Strong foundations and consistent progress across classes.",
            },
            {
              icon: Sparkles,
              title: "All-Round Growth",
              desc: "Sports, arts, and activities that build confident learners.",
            },
            {
              icon: Trophy,
              title: "Recognition & Awards",
              desc: "Celebrating standout performances and proud moments.",
            },
          ].map((card, idx) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: idx * 0.08, duration: 0.55 }}
              style={{
                background: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "24px",
                padding: "1.6rem",
                textAlign: "left",
                boxShadow: "0 18px 50px rgba(15, 23, 42, 0.06)",
              }}
            >
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "14px",
                  background: "rgba(10, 36, 99, 0.08)",
                  display: "grid",
                  placeItems: "center",
                  color: "var(--primary)",
                  marginBottom: "1rem",
                }}
              >
                <card.icon size={20} aria-hidden />
              </div>
              <h3 style={{ margin: 0, fontSize: "1.15rem", color: "#111827", fontWeight: 900 }}>{card.title}</h3>
              <p style={{ margin: "0.6rem 0 0", color: "#6b7280", lineHeight: 1.6 }}>{card.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <Link href="/achievers" className="btn-primary squishy-btn" style={{ display: "inline-flex", gap: "0.6rem" }}>
            Explore achievements
            <ArrowRight size={18} className="inline-icon" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

