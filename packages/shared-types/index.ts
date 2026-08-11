export interface TeacherProfile {
  id: string;
  name: string;
  photoUrl: string;
  qualification: string;
  department: string;
  subject: string;
  experience: string;
  designation: string;
  email: string;
  phone: string;
  isPublicVisible: boolean;
  joiningDate?: string;
  bio?: string;
}

export interface StudentRecord {
  id: string;
  admissionNo: string;
  rollNo: string;
  name: string;
  gender: 'Male' | 'Female' | 'Other';
  dob: string;
  className: string;
  section: string;
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  address: string;
  status: 'Active' | 'Inactive' | 'Graduated' | 'Suspended';
  joiningDate: string;
  documents?: { name: string; url: string }[];
}

export interface StaffRecord {
  id: string;
  staffId: string;
  name: string;
  role: string;
  department: string;
  email: string;
  phone: string;
  joiningDate: string;
  status: 'Active' | 'On Leave' | 'Resigned';
}

export interface AdmissionEnquiry {
  id: string;
  applicantName: string;
  parentName: string;
  email: string;
  phone: string;
  gradeApplying: string;
  previousSchool?: string;
  message?: string;
  status: 'Pending' | 'Under Review' | 'Approved' | 'Rejected';
  createdAt: string;
  notes?: string;
}

export interface AcademicClass {
  id: string;
  name: string; // e.g. "Grade 10"
  sections: string[]; // e.g. ["A", "B", "C"]
  subjects: string[];
  classTeacherId?: string;
  roomNo?: string;
}

export interface AttendanceRecord {
  id: string;
  date: string;
  type: 'Student' | 'Teacher';
  targetId: string;
  targetName: string;
  className?: string;
  status: 'Present' | 'Absent' | 'Late' | 'Excused';
  remarks?: string;
}

export interface Examination {
  id: string;
  title: string;
  term: string; // e.g. "Mid-Term 2026"
  className: string;
  subject: string;
  date: string;
  totalMarks: number;
  passingMarks: number;
}

export interface ExamResult {
  id: string;
  examId: string;
  studentId: string;
  studentName: string;
  className: string;
  subject: string;
  marksObtained: number;
  maxMarks: number;
  grade: string;
  remarks?: string;
}

export interface FeeStructure {
  id: string;
  className: string;
  academicYear: string;
  tuitionFee: number;
  admissionFee: number;
  developmentFee: number;
  transportFee: number;
  dueDate: string;
}

export interface FeePayment {
  id: string;
  receiptNo: string;
  studentId: string;
  studentName: string;
  className: string;
  amountPaid: number;
  paymentMethod: 'Cash' | 'Online' | 'Cheque' | 'Card';
  transactionId?: string;
  paymentDate: string;
  feeTerm: string;
  status: 'Paid' | 'Partial' | 'Pending';
}

export interface Notice {
  id: string;
  title: string;
  category: 'General' | 'Academic' | 'Exams' | 'Sports' | 'Urgent';
  content: string;
  author: string;
  publishDate: string;
  expiryDate?: string;
  attachmentUrl?: string;
  isImportant: boolean;
}

export interface NewsItem {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  imageUrl: string;
  author: string;
  publishDate: string;
  status: 'Draft' | 'Published';
}

export interface SchoolEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: 'Cultural' | 'Sports' | 'Academic' | 'Holiday' | 'Parent-Teacher';
  imageUrl?: string;
  isPublic: boolean;
}

export interface GalleryAlbum {
  id: string;
  title: string;
  coverImage: string;
  category: string;
  eventDate: string;
  images: { id: string; url: string; caption: string }[];
}

export interface Achievement {
  id: string;
  title: string;
  category: 'Student' | 'Teacher' | 'School';
  recipientName: string;
  year: string;
  description: string;
  imageUrl?: string;
}

export interface DocumentDownload {
  id: string;
  title: string;
  category: 'Circular' | 'Admission Form' | 'Syllabus' | 'Policy' | 'Timetable';
  fileUrl: string;
  fileSize: string;
  uploadedAt: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  type: 'Holiday' | 'Exam' | 'Event' | 'Notice';
  description?: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  submittedAt: string;
  status: 'New' | 'Read' | 'Replied';
}

export interface SiteContent {
  heroTitle: string;
  heroSubtitle: string;
  principalName: string;
  principalMessage: string;
  principalImageUrl: string;
  schoolHistory: string;
  vision: string;
  mission: string;
  coreValues: string[];
  contactAddress: string;
  contactPhone: string;
  contactEmail: string;
  workingHours: string;
  socialLinks: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    youtube?: string;
  };
}

export interface SystemSetting {
  schoolName: string;
  logoUrl: string;
  currentAcademicYear: string;
  academicTerms: string[];
  smtpConfigured: boolean;
  maintenanceMode: boolean;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  adminId: string;
  adminEmail: string;
  action: string;
  details: string;
  ipAddress: string;
}
