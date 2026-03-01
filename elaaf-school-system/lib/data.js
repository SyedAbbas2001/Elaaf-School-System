// ============================================
// lib/data.js — Central data for the website
// Edit this file to customize content easily
// ============================================

export const schoolInfo = {
  name: 'Elaaf School System',
  tagline: 'Committed to a Better Tomorrow',
  address: 'B-13 Service Road, Sector 5-I, North Karachi, Karachi, Pakistan',
  phone: '0333 2785646',
  email: 'sendtoelaafschool@gmail.com',
  website: 'www.elaafschoolsystem.com',
  foundedYear: 2013,
  socialMedia: {
    facebook: '#',
    instagram: '#',
    twitter: '#',
    youtube: '#',
  },
};

export const stats = [
  { value: '1500+', label: 'Students Enrolled' },
  { value: '80+', label: 'Qualified Teachers' },
  { value: '15+', label: 'Years of Excellence' },
  { value: '98%', label: 'Pass Rate' },
];

export const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Academics', href: '/academics' },
  { label: 'Admissions', href: '/admissions' },
  { label: 'Events', href: '/events' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '/contact' },
];

export const programs = [
  {
    id: 1,
    level: 'Early Years',
    grades: 'Nursery – KG',
    description: 'A nurturing environment that fosters curiosity, creativity, and foundational skills through play-based learning.',
    icon: '🌱',
    subjects: ['Phonics', 'Numeracy', 'Art & Craft', 'Urdu', 'Islamic Studies'],
  },
  {
    id: 2,
    level: 'Primary',
    grades: 'Grade 1 – 5',
    description: 'Building strong academic foundations with a balanced curriculum that develops critical thinking and essential skills.',
    icon: '📚',
    subjects: ['English', 'Mathematics', 'Science', 'Social Studies', 'Urdu', 'Islamiat'],
  },
  {
    id: 3,
    level: 'Middle School',
    grades: 'Grade 6 – 8',
    description: 'A comprehensive program that prepares students for advanced studies with subject specialization and co-curriculars.',
    icon: '🔬',
    subjects: ['Physics', 'Chemistry', 'Biology', 'Mathematics', 'Computer Science', 'English'],
  },
  {
    id: 4,
    level: 'Secondary',
    grades: 'Grade 9 – 10',
    description: 'Rigorous SSC preparation aligned with Federal and Sindh Board curriculum for strong O-level equivalent results.',
    icon: '🎓',
    subjects: ['Sciences', 'Commerce', 'Humanities', 'Computer Science', 'English Literature'],
  },
];

export const events = [
  {
    id: 1,
    title: 'Annual Sports Day 2026',
    date: '2026-03-15',
    category: 'Sports',
    description: 'A day of athletic excellence, team spirit, and healthy competition for all students across all grade levels.',
    image: null,
  },
  {
    id: 2,
    title: 'Science Exhibition',
    date: '2026-04-05',
    category: 'Academic',
    description: 'Students showcase innovative science projects and experiments to parents, teachers, and industry guests.',
    image: null,
  },
  {
    id: 3,
    title: 'Admissions Open Day',
    date: '2026-03-26',
    category: 'Admissions',
    description: 'Visit our campus, meet our teachers, and learn about our programs and admission requirements.',
    image: null,
  },
  {
    id: 4,
    title: 'Quran Recitation Competition',
    date: '2026-04-20',
    category: 'Islamic',
    description: 'Annual inter-school Quran recitation competition promoting Islamic values and spiritual growth.',
    image: null,
  },
  {
    id: 5,
    title: 'Parent-Teacher Conference',
    date: '2026-05-10',
    category: 'Academic',
    description: 'A dedicated session for parents to discuss student progress and academic performance with class teachers.',
    image: null,
  },
  {
    id: 6,
    title: 'Farewell Ceremony – Class 10',
    date: '2026-06-01',
    category: 'Cultural',
    description: 'A heartfelt farewell ceremony for graduating Class 10 students celebrating their journey and achievements.',
    image: null,
  },
];

export const galleryImages = [
  { id: 1, category: 'Campus', caption: 'Main Building', color: '#1a3a6b' },
  { id: 2, category: 'Sports', caption: 'Sports Day 2025', color: '#C2151D' },
  { id: 3, category: 'Academic', caption: 'Science Lab', color: '#0d1b3e' },
  { id: 4, category: 'Cultural', caption: 'Annual Function', color: '#d4a843' },
  { id: 5, category: 'Campus', caption: 'Library', color: '#2c5364' },
  { id: 6, category: 'Sports', caption: 'Cricket Team', color: '#1a3a6b' },
  { id: 7, category: 'Academic', caption: 'Computer Lab', color: '#C2151D' },
  { id: 8, category: 'Cultural', caption: 'Art Exhibition', color: '#203a43' },
  { id: 9, category: 'Campus', caption: 'Classroom', color: '#0d1b3e' },
];

export const testimonials = [
  {
    id: 1,
    name: 'Ahmed Khan',
    role: 'Parent of Grade 8 Student',
    text: 'Elaaf School System has transformed my child\'s academic journey. The teachers are dedicated and the environment is incredibly supportive.',
  },
  {
    id: 2,
    name: 'Fatima Malik',
    role: 'Class 10 Graduate, 2025',
    text: 'I owe my academic success to Elaaf. The teachers went beyond the curriculum to prepare us for life. Best decision my parents made.',
  },
  {
    id: 3,
    name: 'Muhammad Tariq',
    role: 'Parent of Grade 3 Student',
    text: 'The attention given to each student is remarkable. My daughter has grown so much in confidence and academic ability since joining Elaaf.',
  },
];

// Other schools for the comparison feature
export const otherSchools = [
  {
    id: 1,
    name: 'Beacon House School',
    location: 'Karachi',
    grades: 'Nursery – Grade 12',
    fee: 'PKR 8,000 – 25,000/month',
    rating: 4.5,
    type: 'Private',
    features: ['O/A Levels', 'Sports Facilities', 'Labs', 'Transport'],
    website: '#',
  },
  {
    id: 2,
    name: 'City School',
    location: 'Karachi',
    grades: 'Nursery – Grade 12',
    fee: 'PKR 7,000 – 22,000/month',
    rating: 4.3,
    type: 'Private',
    features: ['Cambridge Curriculum', 'Swimming Pool', 'Library', 'Transport'],
    website: '#',
  },
  {
    id: 3,
    name: 'Karachi Grammar School',
    location: 'Karachi',
    grades: 'Grade 1 – 12',
    fee: 'PKR 20,000 – 50,000/month',
    rating: 4.8,
    type: 'Elite Private',
    features: ['IB Program', 'World-class Facilities', 'Exchange Programs'],
    website: '#',
  },
  {
    id: 4,
    name: 'Army Public School',
    location: 'Karachi',
    grades: 'Nursery – Grade 12',
    fee: 'PKR 3,000 – 10,000/month',
    rating: 4.2,
    type: 'Semi-Govt',
    features: ['Discipline', 'Sports', 'Affordable', 'Strong Results'],
    website: '#',
  },
];

export const faqs = [
  {
    q: 'What are the admission requirements?',
    a: 'Students need to pass an entrance test and submit birth certificate, previous school reports, and photos. Walk-in interviews are also available on Open Days.',
  },
  {
    q: 'What is the fee structure?',
    a: 'Fees vary by grade level. Early Years start from PKR 3,500/month, Primary from PKR 4,500/month, and Secondary from PKR 6,000/month. Sibling discounts available.',
  },
  {
    q: 'Is transport facility available?',
    a: 'Yes, we provide safe and reliable transport services covering major areas of Karachi. Contact the admin office for route details.',
  },
  {
    q: 'Do you offer scholarships?',
    a: 'Yes, merit-based and need-based scholarships are available. Top performers in the entrance test may qualify for partial fee waivers.',
  },
  {
    q: 'What board/curriculum do you follow?',
    a: 'We follow the Federal Board and Sindh Board curriculum. Our teaching methodology aligns with modern educational standards while maintaining Islamic values.',
  },
];
