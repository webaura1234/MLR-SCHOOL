'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Phone, MessageCircle } from 'lucide-react';
import { FEE_ACADEMIC_YEAR, FEE_ROWS, formatFee } from '@/lib/fee-structure';
import { useSiteInfo } from '@/lib/useSiteInfo';
import { trackPhoneClick } from '@/lib/googleAds';
import './FeeStructure.css';

const FeeStructure = () => {
  const { siteInfo } = useSiteInfo();

  return (
    <div className="fee-page">
      <section className="page-header">
        <div className="container">
          <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            Fee <span className="text-primary">Structure</span>
          </motion.h1>
          <p>
            Transparent, class-wise fees for the {FEE_ACADEMIC_YEAR} academic year at Malla Reddy
            School, Medchal.
          </p>
        </div>
      </section>

      <section className="section fee-table-section">
        <div className="container">
          <span className="fee-eyebrow">Academic Year {FEE_ACADEMIC_YEAR}</span>
          <h2 className="fee-heading">
            Class-wise <span className="text-accent">Fee Details</span>
          </h2>

          <motion.div
            className="fee-table-wrap"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
          >
            <table className="fee-table">
              <caption className="sr-only">
                Class-wise registration and term/tuition fees for the {FEE_ACADEMIC_YEAR} academic
                year
              </caption>
              <thead>
                <tr>
                  <th scope="col">Class</th>
                  <th scope="col">Registration Fee</th>
                  <th scope="col">Term/Tuition Fee</th>
                </tr>
              </thead>
              <tbody>
                {FEE_ROWS.map((row) => (
                  <tr key={row.className}>
                    <th scope="row">{row.className}</th>
                    <td data-label="Registration Fee">{formatFee(row.registrationFee)}</td>
                    <td data-label="Term/Tuition Fee">{formatFee(row.tuitionFee)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          <div className="fee-cta-row">
            <Link href="/admission" className="fee-cta">
              Apply for Admission
            </Link>
          </div>

          <p className="fee-note">
            Fees are shown per the {FEE_ACADEMIC_YEAR} academic year and are subject to revision.
            Transport, uniform, and books are billed separately. For the latest details, please
            contact our admissions office.
          </p>

          <div className="fee-contact">
            <a
              href={`tel:${siteInfo.phoneTel}`}
              className="fee-contact-link"
              onClick={() => trackPhoneClick('fee_structure_page')}
            >
              <Phone size={18} aria-hidden="true" />
              <span>{siteInfo.phoneDisplay}</span>
            </a>
            <a
              href={`https://wa.me/${siteInfo.whatsappNumber}`}
              className="fee-contact-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle size={18} aria-hidden="true" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeeStructure;
