/**
 * Class-wise fee structure — single source of truth for the /fee-structure page.
 * Update the figures here; the page, FAQs, and JSON-LD all read from this file.
 */

export const FEE_ACADEMIC_YEAR = '2026-27';

export interface FeeRow {
  /** Classes covered by this slab, as shown in the first column. */
  className: string;
  /** One-time registration fee, in rupees. */
  registrationFee: number;
  /** Term / tuition fee, in rupees. */
  tuitionFee: number;
}

export const FEE_ROWS: FeeRow[] = [
  { className: 'Nursery, PP-I, PP-II', registrationFee: 1000, tuitionFee: 30000 },
  { className: 'Class I, II', registrationFee: 1000, tuitionFee: 40000 },
  { className: 'Class III, IV, V', registrationFee: 1000, tuitionFee: 45000 },
  { className: 'Class VI, VII, VIII', registrationFee: 1000, tuitionFee: 50000 },
];

/** Formats a rupee amount the Indian way, e.g. 30000 -> "₹30,000". */
export function formatFee(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}
