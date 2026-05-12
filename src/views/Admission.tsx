'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import OptimizedImage from '../components/OptimizedImage';
import './Admission.css';
import { useSiteInfo } from '@/lib/useSiteInfo';

import heroDesktop from '../../public/malla-reddy-hero.jpg';

const Admission = () => {
  const { siteInfo } = useSiteInfo();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    studentName: '',
    className: '',
    parentName: '',
    phone: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('idle');

    try {
      const response = await fetch('/api/admission', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            ...formData,
            name: formData.studentName,
        }),
      });

      const result = await response.json();
      if (!result.success) {
        throw new Error(result.error || 'Submission failed');
      }

      setStatus('success');
      setFormData({
        studentName: '',
        className: '',
        parentName: '',
        phone: '',
        message: ''
      });
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="admission-page">
      <section className="page-header">
        <div className="container">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Admission & <span className="text-primary">Enquiry</span>
          </motion.h1>
          <p>Begin your child&apos;s journey under the <strong>NDP Framework</strong>. Enroll today for the 2026-27 academic year.</p>
        </div>
      </section>

      <section className="admission-content section">
        <div className="container">
          <div className="admission-grid">
            <div className="admission-info">
              <OptimizedImage 
                src={heroDesktop} 
                alt="Malla Reddy School Campus" 
                className="rounded-image shadow-image mb-8"
                aspectRatio="16/9"
              />
              <h2>The NDP Advantage</h2>
              <div className="process-steps">
                <div className="process-step">
                  <div className="step-num-circle">1</div>
                  <div className="step-text">
                    <h3>Digital Enquiry</h3>
                    <p>Express interest through our NDP-aligned digital portal to start the process.</p>
                  </div>
                </div>
                <div className="process-step">
                  <div className="step-num-circle">2</div>
                  <div className="step-text">
                    <h3>Guided Campus Tour</h3>
                    <p>Experience our world-class infrastructure and pedagogical framework firsthand.</p>
                  </div>
                </div>
                <div className="process-step">
                  <div className="step-num-circle">3</div>
                  <div className="step-text">
                    <h3>Academic Alignment</h3>
                    <p>A personal session with our counselors to ensure the best fit for your child.</p>
                  </div>
                </div>
              </div>

            </div>

            <div className="admission-form-container card">
              <div className="fee-notice" style={{ 
                padding: '1.5rem', 
                borderRadius: 'var(--radius-lg)', 
                background: 'rgba(13, 182, 181, 0.05)', 
                border: '1px dashed #0DB6B5',
                marginBottom: '2rem'
              }}>
                <h4 style={{ fontWeight: 800, color: '#0A2463', marginBottom: '0.5rem', fontSize: '1rem' }}>Fee Structure</h4>
                <p style={{ color: '#475569', fontStyle: 'italic', lineHeight: '1.5', fontSize: '0.85rem' }}>
                  &quot;For fee structure details, please{' '}
                  <a
                    href={`tel:${siteInfo.phoneTel}`}
                    style={{ color: '#0DB6B5', fontWeight: 800, textDecoration: 'underline', fontStyle: 'normal' }}
                  >
                    call us directly
                  </a>
                  {' '}or visit our Malla Reddy School campus.&quot;
                </p>
              </div>
              <h2>Enquiry Form</h2>
              
              {status === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{ textAlign: 'center', padding: '3rem 0' }}
                >
                  <CheckCircle2 size={64} color="#0DB6B5" style={{ margin: '0 auto 1.5rem' }} />
                  <h3 style={{ fontWeight: 900, color: '#0A2463', marginBottom: '1rem' }}>Enquiry Sent!</h3>
                  <p style={{ color: '#666', marginBottom: '2rem' }}>Thank you for your interest. Our admissions team will contact you shortly.</p>
                  <button 
                    onClick={() => setStatus('idle')}
                    className="btn-secondary"
                  >
                    Send Another Enquiry
                  </button>
                </motion.div>
              ) : (
                <form className="admission-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Student Name</label>
                    <input 
                      type="text" 
                      name="studentName"
                      value={formData.studentName}
                      onChange={handleChange}
                      placeholder="Full name of the student" 
                      required 
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Class Applying For</label>
                    <select 
                      name="className"
                      value={formData.className}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Class</option>
                      <option value="Pre-Primary">Pre-Primary (Nursery/PP1/PP2)</option>
                      <option value="Primary">Primary (Grade I - V)</option>
                      <option value="Middle">Middle (Grade VI - VIII)</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Parent Name</label>
                    <input 
                      type="text" 
                      name="parentName"
                      value={formData.parentName}
                      onChange={handleChange}
                      placeholder="Parent / Guardian name" 
                      required 
                    />
                  </div>

                  <div className="form-group">
                    <label>Phone Number</label>
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="10-digit mobile number" 
                      required 
                    />
                  </div>

                  <div className="form-group">
                    <label>Message</label>
                    <textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={3} 
                      placeholder="Any specific questions?"
                    ></textarea>
                  </div>

                  {status === 'error' && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#EF4444', marginBottom: '1.5rem', fontSize: '0.9rem', fontWeight: 600 }}>
                      <AlertCircle size={16} /> Failed to send enquiry. Please try again or call us.
                    </div>
                  )}

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="btn-primary" 
                    style={{ 
                      width: '100%', 
                      padding: '1.25rem', 
                      borderRadius: 'var(--radius-lg)', 
                      fontWeight: 900, 
                      textTransform: 'uppercase', 
                      letterSpacing: '0.1em',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.75rem',
                      opacity: isSubmitting ? 0.7 : 1,
                      cursor: isSubmitting ? 'not-allowed' : 'pointer'
                    }}
                  >
                    {isSubmitting ? (
                      <>Processing... <Loader2 size={18} className="animate-spin" /></>
                    ) : (
                      <>Register Enquiry <Send size={18} /></>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Admission;
