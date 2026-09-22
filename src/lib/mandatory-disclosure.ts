export interface GeneralInfoItem {
  sno: number;
  information: string;
  details: string;
  isLink?: boolean;
  linkHref?: string;
}

export interface DocumentItem {
  sno: number;
  documentTitle: string;
  documentUrl: string;
  fileAvailable?: boolean;
  certificateNo?: string;
  issueDate?: string;
  validity?: string;
  issuingAuthority?: string;
}

export interface AcademicItem {
  sno: number;
  documentTitle: string;
  documentUrl: string;
  isInternalRoute?: boolean;
  fileAvailable?: boolean;
  academicYear?: string;
  secondaryUrl?: string;
  secondaryLabel?: string;
}

export interface StaffItem {
  sno: number;
  information: string;
  strength: string;
  qualifications: string;
}

export interface BoardResultItem {
  sno: number;
  year: string;
  registeredStudents: string;
  passedStudents: string;
  passPercentage: string;
  remarks: string;
}

export interface InfrastructureItem {
  sno: number;
  information: string;
  details: string;
  isLink?: boolean;
  linkHref?: string;
  iconType?: string;
}

export const GENERAL_INFO: GeneralInfoItem[] = [
  {
    sno: 1,
    information: 'NAME OF THE SCHOOL',
    details: 'MALLA REDDY SCHOOL',
  },
  {
    sno: 2,
    information: 'AFFILIATION NO. (IF APPLICABLE)',
    details: 'Under Process / Applied for CBSE Affiliation',
  },
  {
    sno: 3,
    information: 'SCHOOL CODE (IF APPLICABLE)',
    details: 'Under Process',
  },
  {
    sno: 4,
    information: 'COMPLETE ADDRESS WITH PIN CODE',
    details: 'SY.NO. 1101, Medchal (V), Medchal (M), Medchal – Malkajgiri Dist, Telangana - 500055',
    isLink: true,
    linkHref: 'https://maps.google.com/?q=SY.NO.+1101,+Medchal+(V),+Medchal+(M),+Medchal+Malkajgiri+Dist,+Telangana-500055',
  },
  {
    sno: 5,
    information: 'PRINCIPAL NAME',
    details: 'Mrs. V Swathi',
  },
  {
    sno: 6,
    information: 'PRINCIPAL QUALIFICATION',
    details: 'M.Sc, B.Ed',
  },
  {
    sno: 7,
    information: 'SCHOOL EMAIL ID',
    details: 'mallareddyschoolcbsemedchal@gmail.com',
    isLink: true,
    linkHref: 'mailto:mallareddyschoolcbsemedchal@gmail.com',
  },
  {
    sno: 8,
    information: 'CONTACT DETAILS (LANDLINE/MOBILE)',
    details: '9247587086 / 9247587087',
    isLink: true,
    linkHref: 'tel:9247587086',
  },
];

export const DOCUMENTS_INFO: DocumentItem[] = [
  {
    sno: 1,
    documentTitle: 'COPIES OF AFFILIATION/UPGRADATION LETTER AND RECENT EXTENSION OF AFFILIATION, IF ANY',
    documentUrl: '/documents/disclosure/affiliation-letter.pdf',
    fileAvailable: false,
  },
  {
    sno: 2,
    documentTitle: 'COPIES OF SOCIETIES/TRUST/COMPANY REGISTRATION/RENEWAL CERTIFICATE, AS APPLICABLE',
    documentUrl: '/documents/disclosure/society-registration.pdf',
    fileAvailable: false,
  },
  {
    sno: 3,
    documentTitle: 'COPY OF NO OBJECTION CERTIFICATE (NOC) ISSUED, IF APPLICABLE, BY THE STATE GOVT./UT',
    documentUrl: '/documents/disclosure/noc.pdf',
    fileAvailable: false,
  },
  {
    sno: 4,
    documentTitle: 'COPIES OF RECOGNITION CERTIFICATE UNDER RTE ACT, 2009, AND IT’S RENEWAL IF APPLICABLE',
    documentUrl: '/documents/disclosure/recognition-certificate.pdf',
    fileAvailable: true,
    certificateNo: 'Proc. No. MDCL-MDCL-010-0053 & 0054',
    issueDate: '23-04-2026 & 02-05-2026',
    validity: '10 Years (Academic Years 2026-27 to 2035-36)',
    issuingAuthority: 'RJDSE Hyderabad & DEO Medchal-Malkajgiri',
  },
  {
    sno: 5,
    documentTitle: 'COPY OF VALID BUILDING SAFETY CERTIFICATE AS PER THE NATIONAL BUILDING CODE',
    documentUrl: '/documents/disclosure/building-safety.pdf',
    fileAvailable: true,
    certificateNo: '367/2026',
    issueDate: '27/06/2026',
    validity: '1 Year (Till 26/06/2027)',
    issuingAuthority: 'Executive Engineer, Central Division, Telangana Housing Board',
  },
  {
    sno: 6,
    documentTitle: 'COPY OF VALID FIRE SAFETY CERTIFICATE ISSUED BY THE COMPETENT AUTHORITY',
    documentUrl: '/documents/disclosure/fire-safety.pdf',
    fileAvailable: true,
    certificateNo: '81/SFO/HYD/2026',
    issueDate: '13-08-2026',
    validity: '2 Years (Till 12-08-2028)',
    issuingAuthority: 'Station Fire Officer, Hyderabad',
  },
  {
    sno: 7,
    documentTitle: 'COPY OF THE DEO CERTIFICATE SUBMITTED BY THE SCHOOL FOR AFFILIATION/UPGRADATION/EXTENSION OF AFFILIATIONOR SELF CERTIFICATION BY SCHOOL',
    documentUrl: '/documents/disclosure/recognition-certificate.pdf',
    fileAvailable: true,
    certificateNo: 'Proc. No. MDCL-MDCL-010-0054',
    issueDate: '02-05-2026',
    validity: '10 Years (Academic Years 2026-27 to 2035-36)',
    issuingAuthority: 'District Educational Officer, Medchal-Malkajgiri',
  },
  {
    sno: 8,
    documentTitle: 'COPIES OF VALID WATER, HEALTH AND SANITATION CERTIFICATES',
    documentUrl: '/documents/disclosure/water-health-sanitation.pdf',
    fileAvailable: true,
    certificateNo: 'Rc.No. 204/SHP/DM&HO/Medchal/2026-27',
    issueDate: '03/07/2026',
    validity: '1 Year (Till 02/07/2027)',
    issuingAuthority: 'District Medical & Health Officer (DM&HO), Medchal Malkajgiri',
  },
];

export const RESULTS_ACADEMICS: AcademicItem[] = [
  {
    sno: 1,
    documentTitle: 'FEE STRUCTURE OF THE SCHOOL',
    documentUrl: '/documents/disclosure/fee-structure.pdf',
    fileAvailable: true,
    academicYear: 'Academic Year 2026-27',
  },
  {
    sno: 2,
    documentTitle: 'ANNUAL ACADEMIC CALENDAR',
    documentUrl: '/documents/disclosure/academic-calendar.pdf',
    fileAvailable: true,
    academicYear: 'Academic Year 2026-27 (June 2026 – April 2027)',
  },
  {
    sno: 3,
    documentTitle: 'LIST OF SCHOOL MANAGEMENT COMMITTEE (SMC)',
    documentUrl: '/documents/disclosure/smc.pdf',
    fileAvailable: true,
    academicYear: 'Academic Year 2026-27 (23 Executive Committee Members)',
  },
  {
    sno: 4,
    documentTitle: 'LIST OF PARENTS TEACHERS ASSOCIATION (PTA) MEMBERS',
    documentUrl: '/documents/disclosure/pta.pdf',
    fileAvailable: true,
    academicYear: 'Academic Year 2026-27 (19 Parent & Teacher Representatives)',
  },
  {
    sno: 5,
    documentTitle: 'LAST THREE-YEAR RESULT OF THE BOARD EXAMINATION AS PER APPLICABILITY',
    documentUrl: '/documents/disclosure/board-results.pdf',
    fileAvailable: false,
  },
];

export const STAFF_INFO: StaffItem[] = [
  {
    sno: 1,
    information: 'PRINCIPAL',
    strength: '01',
    qualifications: 'Mrs. V Swathi, M.Sc, B.Ed',
  },
  {
    sno: 2,
    information: 'TOTAL NO. OF TEACHERS',
    strength: '35',
    qualifications: 'Highly Qualified & Certified Faculty',
  },
  {
    sno: 3,
    information: 'PGT (POST GRADUATE TEACHERS)',
    strength: '08',
    qualifications: 'Post Graduate with B.Ed',
  },
  {
    sno: 4,
    information: 'TGT (TRAINED GRADUATE TEACHERS)',
    strength: '15',
    qualifications: 'Graduate with B.Ed',
  },
  {
    sno: 5,
    information: 'PRT (PRIMARY TEACHERS)',
    strength: '12',
    qualifications: 'Graduate with D.El.Ed / B.Ed',
  },
  {
    sno: 6,
    information: 'TEACHERS SECTION RATIO',
    strength: '1.5:1',
    qualifications: 'Complies with CBSE Mandate',
  },
  {
    sno: 7,
    information: 'DETAILS OF SPECIAL EDUCATOR',
    strength: '01',
    qualifications: 'Trained & Certified in Inclusive Education',
  },
  {
    sno: 8,
    information: 'DETAILS OF COUNSELLOR AND WELLNESS TEACHER',
    strength: '01',
    qualifications: 'M.A. Psychology / Certified Child Counsellor',
  },
];

export const CLASS_X_RESULTS: BoardResultItem[] = [
  {
    sno: 1,
    year: '2024-2025',
    registeredStudents: '—',
    passedStudents: '—',
    passPercentage: '100%',
    remarks: 'First Batch In Progress',
  },
];

export const CLASS_XII_RESULTS: BoardResultItem[] = [
  {
    sno: 1,
    year: '2024-2025',
    registeredStudents: '—',
    passedStudents: '—',
    passPercentage: '—',
    remarks: 'Schooling up to Secondary / Senior Secondary to follow',
  },
];

export const INFRASTRUCTURE_INFO: InfrastructureItem[] = [
  {
    sno: 1,
    information: 'TOTAL CAMPUS AREA OF THE SCHOOL (IN SQ MTR)',
    details: '8383.4 SQ MTR (Approx. 2.07 Acres)',
    iconType: 'campus',
  },
  {
    sno: 2,
    information: 'NO. AND SIZE OF THE CLASS ROOMS (IN SQ MTR)',
    details: '33 Classrooms, 48 SQ MTR each (Spacious, Well-Ventilated)',
    iconType: 'classroom',
  },
  {
    sno: 3,
    information: 'NO. AND SIZE OF LABORATORIES INCLUDING COMPUTER LABS (IN SQ MTR)',
    details: '5 Laboratories, 56 SQ MTR each (Composite Science, Physics, Chemistry, Biology, Computer Science)',
    iconType: 'lab',
  },
  {
    sno: 4,
    information: 'NO. AND SIZE OF LIBRARY (IN SQ MTR)',
    details: '1 Central Library, 112 SQ MTR (Extensive Collection & Reading Area)',
    iconType: 'library',
  },
  {
    sno: 5,
    information: 'INTERNET FACILITY',
    details: 'Yes (High-speed Wi-Fi & Fiber Optic Connectivity across Campus)',
    iconType: 'wifi',
  },
  {
    sno: 6,
    information: 'NO. OF GIRLS TOILETS',
    details: '24 (Clean, Hygienic with Continuous Water Supply)',
    iconType: 'toilet',
  },
  {
    sno: 7,
    information: 'NO. OF BOYS TOILETS',
    details: '24 (Clean, Modern Urinals and Stalls)',
    iconType: 'toilet',
  },
  {
    sno: 8,
    information: 'NO. OF TOILETS FOR DIFFERENTLY ABLED PERSONS (CWSN)',
    details: '04 (Specially Equipped Barrier-Free Facilities)',
    iconType: 'accessibility',
  },
  {
    sno: 9,
    information: 'LINK OF YOUTUBE VIDEO OF THE INSPECTION OF SCHOOL COVERING THE INFRASTRUCTURE OF THE SCHOOL',
    details: 'Watch Campus & Infrastructure Video on YouTube',
    isLink: true,
    linkHref: 'https://www.youtube.com',
    iconType: 'video',
  },
];
