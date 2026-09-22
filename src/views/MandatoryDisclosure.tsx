'use client';

import {
  FileText,
  ExternalLink,
  Building2,
  GraduationCap,
  Users,
  CheckCircle2,
  PlayCircle,
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
  return (
    <div className="md-page">
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <h1 className="hero-brand-name">
            Mandatory Public <span className="text-primary">Disclosure</span>
          </h1>
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
                <table className="md-table md-table--3col">
                  <caption className="sr-only">Section A: General Information</caption>
                  <colgroup>
                    <col style={{ width: '70px' }} />
                    <col style={{ width: '52%' }} />
                    <col style={{ width: 'auto' }} />
                  </colgroup>
                  <thead>
                    <tr>
                      <th scope="col" style={{ width: '70px', textAlign: 'center' }}>S.NO</th>
                      <th scope="col" style={{ width: '52%' }}>INFORMATION</th>
                      <th scope="col">DETAILS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {GENERAL_INFO.map((item) => (
                      <tr key={item.sno}>
                        <td className="md-cell-index">{item.sno}</td>
                        <td className="md-cell-title">{item.information}</td>
                        <td className="md-cell-content">
                          {item.isLink && item.linkHref && item.details?.trim() ? (
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
                            <span className={item.details?.trim() ? 'md-data-text' : 'md-empty-dash'}>
                              {item.details?.trim() ? item.details : '-'}
                            </span>
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
                  <span>8 Documents</span>
                </div>
              </div>

              <div className="md-table-wrapper">
                <table className="md-table md-table--3col">
                  <caption className="sr-only">Section B: Documents and Information</caption>
                  <colgroup>
                    <col style={{ width: '70px' }} />
                    <col style={{ width: '52%' }} />
                    <col style={{ width: 'auto' }} />
                  </colgroup>
                  <thead>
                    <tr>
                      <th scope="col" style={{ width: '70px', textAlign: 'center' }}>S.NO</th>
                      <th scope="col" style={{ width: '52%' }}>DOCUMENTS / INFORMATION</th>
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
                          {item.fileAvailable && item.documentUrl ? (
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
                            <span className="md-empty-dash">-</span>
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
                  <span>5 Items</span>
                </div>
              </div>

              <div className="md-table-wrapper">
                <table className="md-table md-table--3col">
                  <caption className="sr-only">Section C: Results and Academics</caption>
                  <colgroup>
                    <col style={{ width: '70px' }} />
                    <col style={{ width: '52%' }} />
                    <col style={{ width: 'auto' }} />
                  </colgroup>
                  <thead>
                    <tr>
                      <th scope="col" style={{ width: '70px', textAlign: 'center' }}>S.NO</th>
                      <th scope="col" style={{ width: '52%' }}>DOCUMENTS / INFORMATION</th>
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
                          {item.fileAvailable && item.documentUrl ? (
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
                            <span className="md-empty-dash">-</span>
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
             SECTION D: STAFF (TEACHING)
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
                <table className="md-table md-table--4col">
                  <caption className="sr-only">Section D: Staff (Teaching)</caption>
                  <colgroup>
                    <col style={{ width: '70px' }} />
                    <col style={{ width: '40%' }} />
                    <col style={{ width: '20%' }} />
                    <col style={{ width: 'auto' }} />
                  </colgroup>
                  <thead>
                    <tr>
                      <th scope="col" style={{ width: '70px', textAlign: 'center' }}>S.NO</th>
                      <th scope="col" style={{ width: '40%' }}>INFORMATION</th>
                      <th scope="col" style={{ width: '20%', textAlign: 'center' }}>NUMBER / STRENGTH</th>
                      <th scope="col">NAME AND QUALIFICATIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {STAFF_INFO.map((item, idx) => (
                      <tr key={`${item.information}-${idx}`}>
                        <td className="md-cell-index">{item.sno || '-'}</td>
                        <td className="md-cell-title">{item.information}</td>
                        <td style={{ textAlign: 'center' }}>
                          {item.strength?.trim() ? (
                            <span className="md-pill-number">{item.strength}</span>
                          ) : (
                            <span className="md-empty-dash">-</span>
                          )}
                        </td>
                        <td className="md-cell-content">
                          <span className={item.qualifications?.trim() ? 'md-data-text' : 'md-empty-dash'}>
                            {item.qualifications?.trim() ? item.qualifications : '-'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* =================================================================
             RESULT CLASS: X (SEPARATE CARD)
             ================================================================= */}
          <section id="sec-result-x" className="md-card-section">
            <div className="md-card">
              <div className="md-card-header">
                <div className="md-card-header-left">
                  <div className="md-section-indicator md-section-indicator--roman">X</div>
                  <div>
                    <h2 className="md-card-title">Result Class: X</h2>
                    <p className="md-card-subtitle">Three-year academic performance records for CBSE Class X Board Examinations.</p>
                  </div>
                </div>
                <div className="md-card-header-badge">
                  <GraduationCap size={14} />
                  <span>Class X Results</span>
                </div>
              </div>

              <div className="md-table-wrapper">
                <table className="md-table md-table--6col">
                  <caption className="sr-only">CBSE Class X Board Results</caption>
                  <colgroup>
                    <col style={{ width: '70px' }} />
                    <col style={{ width: '15%' }} />
                    <col style={{ width: '22%' }} />
                    <col style={{ width: '20%' }} />
                    <col style={{ width: '18%' }} />
                    <col style={{ width: 'auto' }} />
                  </colgroup>
                  <thead>
                    <tr>
                      <th scope="col" style={{ width: '70px', textAlign: 'center' }}>S.NO</th>
                      <th scope="col" style={{ width: '15%', textAlign: 'center' }}>YEAR</th>
                      <th scope="col" style={{ width: '22%', textAlign: 'center' }}>NO. OF REGISTERED STUDENTS</th>
                      <th scope="col" style={{ width: '20%', textAlign: 'center' }}>NO. OF STUDENTS PASSED</th>
                      <th scope="col" style={{ width: '18%', textAlign: 'center' }}>PASS PERCENTAGE</th>
                      <th scope="col" style={{ textAlign: 'center' }}>REMARKS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {CLASS_X_RESULTS.map((r, idx) => (
                      <tr key={idx}>
                        <td className="md-cell-index">{r.sno || '-'}</td>
                        <td style={{ textAlign: 'center' }}>
                          {r.year?.trim() ? <strong>{r.year}</strong> : <span className="md-empty-dash">-</span>}
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          {r.registeredStudents?.trim() ? r.registeredStudents : <span className="md-empty-dash">-</span>}
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          {r.passedStudents?.trim() ? r.passedStudents : <span className="md-empty-dash">-</span>}
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          {r.passPercentage?.trim() ? (
                            <span className="md-pass-badge">{r.passPercentage}</span>
                          ) : (
                            <span className="md-empty-dash">-</span>
                          )}
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          {r.remarks?.trim() ? (
                            <span className="md-data-subtext">{r.remarks}</span>
                          ) : (
                            <span className="md-empty-dash">-</span>
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
             RESULT CLASS: XII (SEPARATE CARD)
             ================================================================= */}
          <section id="sec-result-xii" className="md-card-section">
            <div className="md-card">
              <div className="md-card-header">
                <div className="md-card-header-left">
                  <div className="md-section-indicator md-section-indicator--roman">XII</div>
                  <div>
                    <h2 className="md-card-title">Result Class: XII</h2>
                    <p className="md-card-subtitle">Three-year academic performance records for CBSE Class XII Board Examinations.</p>
                  </div>
                </div>
                <div className="md-card-header-badge">
                  <GraduationCap size={14} />
                  <span>Class XII Results</span>
                </div>
              </div>

              <div className="md-table-wrapper">
                <table className="md-table md-table--6col">
                  <caption className="sr-only">CBSE Class XII Board Results</caption>
                  <colgroup>
                    <col style={{ width: '70px' }} />
                    <col style={{ width: '15%' }} />
                    <col style={{ width: '22%' }} />
                    <col style={{ width: '20%' }} />
                    <col style={{ width: '18%' }} />
                    <col style={{ width: 'auto' }} />
                  </colgroup>
                  <thead>
                    <tr>
                      <th scope="col" style={{ width: '70px', textAlign: 'center' }}>S.NO</th>
                      <th scope="col" style={{ width: '15%', textAlign: 'center' }}>YEAR</th>
                      <th scope="col" style={{ width: '22%', textAlign: 'center' }}>NO. OF REGISTERED STUDENTS</th>
                      <th scope="col" style={{ width: '20%', textAlign: 'center' }}>NO. OF STUDENTS PASSED</th>
                      <th scope="col" style={{ width: '18%', textAlign: 'center' }}>PASS PERCENTAGE</th>
                      <th scope="col" style={{ textAlign: 'center' }}>REMARKS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {CLASS_XII_RESULTS.map((r, idx) => (
                      <tr key={idx}>
                        <td className="md-cell-index">{r.sno || '-'}</td>
                        <td style={{ textAlign: 'center' }}>
                          {r.year?.trim() ? <strong>{r.year}</strong> : <span className="md-empty-dash">-</span>}
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          {r.registeredStudents?.trim() ? r.registeredStudents : <span className="md-empty-dash">-</span>}
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          {r.passedStudents?.trim() ? r.passedStudents : <span className="md-empty-dash">-</span>}
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          {r.passPercentage?.trim() ? (
                            <span className="md-pass-badge">{r.passPercentage}</span>
                          ) : (
                            <span className="md-empty-dash">-</span>
                          )}
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          {r.remarks?.trim() ? (
                            <span className="md-data-subtext">{r.remarks}</span>
                          ) : (
                            <span className="md-empty-dash">-</span>
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
                <table className="md-table md-table--3col">
                  <caption className="sr-only">Section E: School Infrastructure</caption>
                  <colgroup>
                    <col style={{ width: '70px' }} />
                    <col style={{ width: '52%' }} />
                    <col style={{ width: 'auto' }} />
                  </colgroup>
                  <thead>
                    <tr>
                      <th scope="col" style={{ width: '70px', textAlign: 'center' }}>S.NO</th>
                      <th scope="col" style={{ width: '52%' }}>INFORMATION</th>
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
                            <span className={item.details?.trim() ? 'md-data-text' : 'md-empty-dash'}>
                              {item.details?.trim() ? item.details : '-'}
                            </span>
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
    </div>
  );
}
