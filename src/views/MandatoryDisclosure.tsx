'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  FileText,
  ExternalLink,
  Printer,
  Building2,
  GraduationCap,
  Users,
  Mail,
  PlayCircle,
  ShieldCheck,
  ChevronRight,
  Clock,
  CheckCircle2,
  Calendar,
  FileCheck,
} from 'lucide-react';
import {
  GENERAL_INFO,
  DOCUMENTS_INFO,
  RESULTS_ACADEMICS,
  STAFF_INFO,
  CLASS_X_RESULTS,
  CLASS_XII_RESULTS,
  INFRASTRUCTURE_INFO,
} from '@/lib/mandatory-disclosure';
import './MandatoryDisclosure.css';

export default function MandatoryDisclosure() {
  const [modalDoc, setModalDoc] = useState<{ title: string; url: string } | null>(null);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="md-page">
      {/* Top Banner / Hero */}
      <section className="md-hero">
        <div className="container">
          <div className="md-hero-card">
            <div className="md-hero-topline">
              <div className="md-pill-badge">
                <ShieldCheck size={15} />
                <span>CBSE Appendix IX Statutory Compliance</span>
              </div>
              <div className="md-session-tag">
                <Calendar size={13} />
                <span>Academic Session 2026-27</span>
              </div>
            </div>

            <h1 className="md-hero-title">
              Mandatory Public <span className="text-primary">Disclosure</span>
            </h1>

            <p className="md-hero-desc">
              In accordance with Central Board of Secondary Education (CBSE) guidelines, Malla Reddy School provides
              complete public access to institutional certifications, governance details, academic performance, and
              infrastructure standards.
            </p>

            {/* Institutional Summary Metadata Strip */}
            <div className="md-meta-strip">
              <div className="md-meta-item">
                <span className="md-meta-label">Institution</span>
                <span className="md-meta-value">Malla Reddy School</span>
              </div>
              <div className="md-meta-divider" />
              <div className="md-meta-item">
                <span className="md-meta-label">Location</span>
                <span className="md-meta-value">Medchal, Hyderabad (TS)</span>
              </div>
              <div className="md-meta-divider" />
              <div className="md-meta-item">
                <span className="md-meta-label">Principal</span>
                <span className="md-meta-value">Mrs. V Swathi (M.Sc, B.Ed)</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="md-hero-actions">
              <button type="button" className="md-btn md-btn-primary" onClick={handlePrint}>
                <Printer size={16} />
                <span>Print Disclosure Document</span>
              </button>
              <a
                href="mailto:mallareddyschoolcbsemedchal@gmail.com?subject=Enquiry%20regarding%20Mandatory%20Public%20Disclosure"
                className="md-btn md-btn-outline"
              >
                <Mail size={16} />
                <span>Contact Compliance Desk</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Container */}
      <main className="md-main-content">
        <div className="container">

          {/* =================================================================
             SECTION A: GENERAL INFORMATION
             ================================================================= */}
          <section id="sec-general" className="md-card-section">
            <div className="md-card">
              <div className="md-card-header">
                <div className="md-card-header-left">
                  <div className="md-section-indicator">A</div>
                  <div>
                    <h2 className="md-card-title">General Information</h2>
                    <p className="md-card-subtitle">Official identification, administration, and campus contact details.</p>
                  </div>
                </div>
                <div className="md-card-header-badge">
                  <CheckCircle2 size={14} />
                  <span>8 Items</span>
                </div>
              </div>

              <div className="md-table-wrapper">
                <table className="md-table">
                  <caption className="sr-only">Section A: General Information</caption>
                  <thead>
                    <tr>
                      <th scope="col" style={{ width: '60px', textAlign: 'center' }}>S.NO</th>
                      <th scope="col" style={{ width: '38%' }}>INFORMATION</th>
                      <th scope="col">DETAILS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {GENERAL_INFO.map((item) => (
                      <tr key={item.sno}>
                        <td className="md-cell-index">{item.sno}</td>
                        <td className="md-cell-title">{item.information}</td>
                        <td className="md-cell-content">
                          {item.isLink && item.linkHref ? (
                            <a
                              href={item.linkHref}
                              target={item.linkHref.startsWith('http') ? '_blank' : undefined}
                              rel={item.linkHref.startsWith('http') ? 'noopener noreferrer' : undefined}
                              className="md-data-link"
                            >
                              <span>{item.details}</span>
                              {item.linkHref.startsWith('http') ? <ExternalLink size={13} /> : null}
                            </a>
                          ) : (
                            <span className="md-data-text">{item.details}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* =================================================================
             SECTION B: DOCUMENTS AND INFORMATION
             ================================================================= */}
          <section id="sec-documents" className="md-card-section">
            <div className="md-card">
              <div className="md-card-header">
                <div className="md-card-header-left">
                  <div className="md-section-indicator">B</div>
                  <div>
                    <h2 className="md-card-title">Documents and Information</h2>
                    <p className="md-card-subtitle">Statutory certifications, registration deeds, and governmental approvals.</p>
                  </div>
                </div>
                <div className="md-card-header-badge">
                  <FileText size={14} />
                  <span>5 Uploaded • 3 in Progress</span>
                </div>
              </div>

              <div className="md-table-wrapper">
                <table className="md-table">
                  <caption className="sr-only">Section B: Documents and Information</caption>
                  <thead>
                    <tr>
                      <th scope="col" style={{ width: '60px', textAlign: 'center' }}>S.NO</th>
                      <th scope="col" style={{ width: '62%' }}>DOCUMENTS / INFORMATION</th>
                      <th scope="col" style={{ textAlign: 'center' }}>UPLOAD DOCUMENTS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {DOCUMENTS_INFO.map((item) => (
                      <tr key={item.sno}>
                        <td className="md-cell-index">{item.sno}</td>
                        <td className="md-cell-title md-cell-title--doc">
                          <FileText size={16} className="md-doc-icon" />
                          <span className="md-doc-heading">{item.documentTitle}</span>
                        </td>
                        <td className="md-cell-action">
                          {item.fileAvailable ? (
                            <a
                              href={item.documentUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="md-action-btn md-action-btn--view"
                            >
                              <FileText size={14} />
                              <span>View Document</span>
                              <ExternalLink size={12} />
                            </a>
                          ) : (
                            <button
                              type="button"
                              className="md-action-btn md-action-btn--pending"
                              onClick={() => setModalDoc({ title: item.documentTitle, url: item.documentUrl })}
                              title="Click to view certification status"
                            >
                              <Clock size={13} />
                              <span>Certification in Progress</span>
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Statutory Note Box */}
              <div className="md-statutory-note">
                <div className="md-note-icon-wrap">
                  <ShieldCheck size={20} />
                </div>
                <div className="md-note-content">
                  <h4 className="md-note-title">CBSE Mandatory Self-Attestation Compliance</h4>
                  <p className="md-note-desc">
                    The school uploads self-attested copies of the above-listed documents duly signed by the
                    Chairman/Manager/Secretary and Principal. In case it is noticed at a later stage that uploaded documents
                    are not genuine, the school shall be liable for regulatory action as per CBSE affiliation norms.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* =================================================================
             SECTION C: RESULTS AND ACADEMICS
             ================================================================= */}
          <section id="sec-academics" className="md-card-section">
            <div className="md-card">
              <div className="md-card-header">
                <div className="md-card-header-left">
                  <div className="md-section-indicator">C</div>
                  <div>
                    <h2 className="md-card-title">Results and Academics</h2>
                    <p className="md-card-subtitle">Fee schedules, academic calendars, governance committees, and performance records.</p>
                  </div>
                </div>
                <div className="md-card-header-badge">
                  <GraduationCap size={14} />
                  <span>4 Uploaded • 1 in Progress</span>
                </div>
              </div>

              <div className="md-table-wrapper">
                <table className="md-table">
                  <caption className="sr-only">Section C: Results and Academics</caption>
                  <thead>
                    <tr>
                      <th scope="col" style={{ width: '60px', textAlign: 'center' }}>S.NO</th>
                      <th scope="col" style={{ width: '62%' }}>DOCUMENTS / INFORMATION</th>
                      <th scope="col" style={{ textAlign: 'center' }}>UPLOAD DOCUMENTS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {RESULTS_ACADEMICS.map((item) => (
                      <tr key={item.sno}>
                        <td className="md-cell-index">{item.sno}</td>
                        <td className="md-cell-title md-cell-title--doc">
                          <GraduationCap size={16} className="md-doc-icon" />
                          <span className="md-doc-heading">{item.documentTitle}</span>
                        </td>
                        <td className="md-cell-action">
                          {item.fileAvailable ? (
                            <a
                              href={item.documentUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="md-action-btn md-action-btn--view"
                            >
                              <FileText size={14} />
                              <span>View Document</span>
                              <ExternalLink size={12} />
                            </a>
                          ) : (
                            <button
                              type="button"
                              className="md-action-btn md-action-btn--pending"
                              onClick={() => setModalDoc({ title: item.documentTitle, url: item.documentUrl })}
                              title="Click to view status"
                            >
                              <Clock size={13} />
                              <span>Under Publication</span>
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* =================================================================
             SECTION D: STAFF (TEACHING) & RESULTS
             ================================================================= */}
          <section id="sec-staff" className="md-card-section">
            <div className="md-card">
              <div className="md-card-header">
                <div className="md-card-header-left">
                  <div className="md-section-indicator">D</div>
                  <div>
                    <h2 className="md-card-title">Staff (Teaching)</h2>
                    <p className="md-card-subtitle">Teaching staff, qualifications, and ratio as per disclosure.</p>
                  </div>
                </div>
                <div className="md-card-header-badge">
                  <Users size={14} />
                  <span>Teaching Staff</span>
                </div>
              </div>

              {/* Staff Table */}
              <div className="md-table-wrapper">
                <table className="md-table">
                  <caption className="sr-only">Section D: Staff (Teaching)</caption>
                  <thead>
                    <tr>
                      <th scope="col" style={{ width: '60px', textAlign: 'center' }}>S.NO</th>
                      <th scope="col" style={{ width: '35%' }}>INFORMATION</th>
                      <th scope="col" style={{ width: '20%', textAlign: 'center' }}>NUMBER / STRENGTH</th>
                      <th scope="col">NAME AND QUALIFICATIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {STAFF_INFO.map((item, idx) => (
                      <tr key={`${item.information}-${idx}`}>
                        <td className="md-cell-index">{item.sno || ''}</td>
                        <td className="md-cell-title">{item.information}</td>
                        <td style={{ textAlign: 'center' }}>
                          {item.strength ? <span className="md-pill-number">{item.strength}</span> : null}
                        </td>
                        <td className="md-cell-content">
                          <span className="md-data-text">{item.qualifications}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Sub-Tables: Board Results */}
              <div className="md-subtables-container">
                {/* Class X */}
                <div className="md-subtable-block">
                  <div className="md-subtable-header">
                    <div className="md-subtable-badge">Class X</div>
                    <h3 className="md-subtable-title">Result Class: X</h3>
                  </div>
                  <div className="md-table-wrapper">
                    <table className="md-table md-table--compact">
                      <thead>
                        <tr>
                          <th scope="col" style={{ width: '50px', textAlign: 'center' }}>S.NO</th>
                          <th scope="col">YEAR</th>
                          <th scope="col" style={{ textAlign: 'center' }}>NO. OF REGISTERED STUDENTS</th>
                          <th scope="col" style={{ textAlign: 'center' }}>NO. OF STUDENTS PASSED</th>
                          <th scope="col" style={{ textAlign: 'center' }}>PASS PERCENTAGE</th>
                          <th scope="col">REMARKS</th>
                        </tr>
                      </thead>
                      <tbody>
                        {CLASS_X_RESULTS.map((r, idx) => (
                          <tr key={idx}>
                            <td className="md-cell-index">{r.sno || ''}</td>
                            <td><strong>{r.year}</strong></td>
                            <td style={{ textAlign: 'center' }}>{r.registeredStudents}</td>
                            <td style={{ textAlign: 'center' }}>{r.passedStudents}</td>
                            <td style={{ textAlign: 'center' }}>
                              {r.passPercentage ? <span className="md-pass-badge">{r.passPercentage}</span> : null}
                            </td>
                            <td><span className="md-data-subtext">{r.remarks}</span></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Class XII */}
                <div className="md-subtable-block">
                  <div className="md-subtable-header">
                    <div className="md-subtable-badge">Class XII</div>
                    <h3 className="md-subtable-title">Result Class: XII</h3>
                  </div>
                  <div className="md-table-wrapper">
                    <table className="md-table md-table--compact">
                      <thead>
                        <tr>
                          <th scope="col" style={{ width: '50px', textAlign: 'center' }}>S.NO</th>
                          <th scope="col">YEAR</th>
                          <th scope="col" style={{ textAlign: 'center' }}>NO. OF REGISTERED STUDENTS</th>
                          <th scope="col" style={{ textAlign: 'center' }}>NO. OF STUDENTS PASSED</th>
                          <th scope="col" style={{ textAlign: 'center' }}>PASS PERCENTAGE</th>
                          <th scope="col">REMARKS</th>
                        </tr>
                      </thead>
                      <tbody>
                        {CLASS_XII_RESULTS.map((r, idx) => (
                          <tr key={idx}>
                            <td className="md-cell-index">{r.sno || ''}</td>
                            <td><strong>{r.year}</strong></td>
                            <td style={{ textAlign: 'center' }}>{r.registeredStudents}</td>
                            <td style={{ textAlign: 'center' }}>{r.passedStudents}</td>
                            <td style={{ textAlign: 'center' }}>
                              {r.passPercentage ? <span className="md-pass-badge">{r.passPercentage}</span> : null}
                            </td>
                            <td><span className="md-data-subtext">{r.remarks}</span></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* =================================================================
             SECTION E: SCHOOL INFRASTRUCTURE
             ================================================================= */}
          <section id="sec-infra" className="md-card-section">
            <div className="md-card">
              <div className="md-card-header">
                <div className="md-card-header-left">
                  <div className="md-section-indicator">E</div>
                  <div>
                    <h2 className="md-card-title">School Infrastructure</h2>
                    <p className="md-card-subtitle">Campus dimensions, physical facilities, laboratories, and safety infrastructure.</p>
                  </div>
                </div>
                <div className="md-card-header-badge">
                  <Building2 size={14} />
                  <span>9 Parameters</span>
                </div>
              </div>

              <div className="md-table-wrapper">
                <table className="md-table">
                  <caption className="sr-only">Section E: School Infrastructure</caption>
                  <thead>
                    <tr>
                      <th scope="col" style={{ width: '60px', textAlign: 'center' }}>S.NO</th>
                      <th scope="col" style={{ width: '45%' }}>INFORMATION</th>
                      <th scope="col">DETAILS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {INFRASTRUCTURE_INFO.map((item) => (
                      <tr key={item.sno}>
                        <td className="md-cell-index">{item.sno}</td>
                        <td className="md-cell-title">{item.information}</td>
                        <td className="md-cell-content">
                          {item.isLink && item.linkHref ? (
                            <a
                              href={item.linkHref}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="md-video-link-btn"
                            >
                              <PlayCircle size={17} className="md-video-icon" />
                              <span>{item.details}</span>
                              <ExternalLink size={13} />
                            </a>
                          ) : (
                            <span className="md-data-text">{item.details}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

        </div>
      </main>

      {/* Document Certification Notice Modal */}
      {modalDoc && (
        <div className="md-modal-overlay" onClick={() => setModalDoc(null)}>
          <div className="md-modal" onClick={(e) => e.stopPropagation()}>
            <div className="md-modal-header">
              <div className="md-modal-icon">
                <FileCheck size={22} />
              </div>
              <div>
                <h3 className="md-modal-title">Document Verification Status</h3>
                <span className="md-modal-tag">Official Certification Underway</span>
              </div>
            </div>
            <div className="md-modal-body">
              <p className="md-modal-desc">
                The certified copy of <strong>{modalDoc.title}</strong> is currently being attested and processed
                by school management for CBSE regulatory publication.
              </p>
              <div className="md-modal-meta">
                <span className="md-modal-meta-label">Designated File:</span>
                <code className="md-modal-meta-code">{modalDoc.url}</code>
              </div>
            </div>
            <div className="md-modal-footer">
              <button type="button" className="md-btn md-btn-primary" onClick={() => setModalDoc(null)}>
                Understood & Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
