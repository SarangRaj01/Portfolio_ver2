/**
 * Single source of truth for every personal and professional detail on the site.
 * Everything here comes from Resume.pdf. Nothing is invented.
 * To update the site, edit this file (and replace public/Sarang_Raj_Resume.pdf).
 */

export const profile = {
  name: 'Sarang Raj',
  firstName: 'Sarang',
  lastName: 'Raj',
  headline: 'Computer Science undergraduate building backend systems, compilers, and network software.',
  location: 'Kozhikode, Kerala, India',
  phone: '+91 73066 69609',
  phoneHref: 'tel:+917306669609',
  email: 'sarangraj188@gmail.com',
  emailHref: 'mailto:sarangraj188@gmail.com',
  github: { label: 'github.com/SarangRaj01', href: 'https://github.com/SarangRaj01' },
  leetcode: { label: 'leetcode.com/u/Sarang_Raj', href: 'https://leetcode.com/u/Sarang_Raj' },
  resumeHref: '/Sarang_Raj_Resume.pdf',
  resumeFileName: 'Sarang_Raj_Resume.pdf',
  summary:
    'Computer Science undergraduate at VIT Vellore (CGPA 9.40) with hands-on experience in backend development with Java and Spring Boot, relational database design in MySQL, systems programming in C, and socket-level networking in Python. Solved 76 LeetCode problems, built a thread-safe inventory system with automated concurrency tests, and presented a cloud computing talk to an audience of 60+ students.',
  heroSummary:
    'CGPA 9.40 at VIT Vellore. Hands-on with Java and Spring Boot, MySQL schema design, systems programming in C, and socket-level networking in Python.',
} as const

export type Stat = {
  value: number
  decimals?: number
  prefix?: string
  suffix?: string
  label: string
  detail: string
}

/** Figures below are quoted directly from the resume. */
export const stats: Stat[] = [
  { value: 9.4, decimals: 2, label: 'CGPA', detail: 'B.Tech CSE, VIT Vellore (3rd year)' },
  { value: 76, label: 'LeetCode problems solved', detail: 'Contest rating 1,490' },
  { value: 16, label: 'Automated tests', detail: 'Unit, WebMvc, and multi-threaded' },
  { value: 60, suffix: '+', label: 'Students in the audience', detail: 'Cloud computing technical talk' },
]

export type SkillGroup = {
  id: string
  label: string
  blurb: string
  items: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    id: 'languages',
    label: 'Languages',
    blurb: 'Java and Python for most of the work, C for systems programming.',
    items: ['Java', 'Python', 'C', 'C++', 'JavaScript', 'SQL'],
  },
  {
    id: 'backend',
    label: 'Backend and Web',
    blurb: 'REST backends on Spring Boot with a React and Vite front end.',
    items: ['Spring Boot', 'Spring Data JPA', 'Hibernate', 'REST APIs', 'React', 'Vite', 'HTML', 'CSS'],
  },
  {
    id: 'databases',
    label: 'Databases',
    blurb: 'Relational schema design with a focus on consistency under concurrency.',
    items: ['MySQL', 'Relational schema design', 'Transactions', 'Row-level locking'],
  },
  {
    id: 'tools',
    label: 'Tools and Platforms',
    blurb: 'Build, debug, and packet-inspection tooling.',
    items: ['Git', 'GitHub', 'Docker', 'Maven', 'Postman', 'Wireshark', 'LLVM/Clang', 'GCC', 'MS Excel'],
  },
  {
    id: 'core',
    label: 'Core CS',
    blurb: 'Coursework fundamentals behind the projects.',
    items: [
      'Data Structures and Algorithms',
      'Object-Oriented Programming',
      'Operating Systems',
      'Computer Networks',
      'DBMS',
      'Compiler Design',
      'Cloud Computing',
    ],
  },
]

export type Project = {
  id: string
  index: string
  title: string
  kind: string
  tech: string[]
  points: string[]
  link?: { label: string; href: string }
  /** Large pull-out figures, quoted from the resume. */
  highlights?: { value: string; label: string }[]
  featured?: boolean
}

export const projects: Project[] = [
  {
    id: 'inventory',
    index: '01',
    title: 'Distributed Inventory and Order Consistency System',
    kind: 'Backend · Databases',
    tech: ['Java 21', 'Spring Boot', 'Hibernate/JPA', 'MySQL', 'React', 'Maven'],
    link: { label: 'github.com/SarangRaj01/ProjectDBMS', href: 'https://github.com/SarangRaj01/ProjectDBMS' },
    featured: true,
    highlights: [
      { value: '11', label: 'REST endpoints' },
      { value: '12', label: 'MySQL tables' },
      { value: '16', label: 'automated tests' },
    ],
    points: [
      'Built a REST backend with 11 endpoints over a 12-table MySQL schema covering products, warehouses, inventory, customers, orders, and stock reservations across multiple warehouses.',
      'Prevented overselling under concurrent orders using pessimistic row-level locking (SELECT ... FOR UPDATE), JPA @Version optimistic checks, and a database CHECK constraint (reserved quantity <= on-hand quantity).',
      'Implemented atomic multi-item order placement and cancellation with @Transactional rollback, idempotency keys to block duplicate submissions, and audit tables for inventory movements and order status history.',
      'Wrote 16 automated unit, WebMvc, and multi-threaded tests using CyclicBarrier; two simultaneous requests for 7 units from 10 in stock result in exactly one success and no oversell.',
      'Built a React and Vite dashboard showing live stock levels and an order placement flow.',
    ],
  },
  {
    id: 'shc',
    index: '02',
    title: 'Self-Healing Compiler (SHC): Runtime Vulnerability Detection and Mitigation',
    kind: 'Compilers · Security · Capstone',
    tech: ['C11', 'Python', 'GCC/Clang'],
    link: { label: 'github.com/SarangRaj01/self-healing-compiler', href: 'https://github.com/SarangRaj01/self-healing-compiler' },
    featured: true,
    highlights: [
      { value: '~4.2 µs', label: 'detect-to-heal latency' },
      { value: '100%', label: 'post-attack availability' },
      { value: '0', label: 'false positives across 1,500,000 probes' },
    ],
    points: [
      'Capstone project for BCSE307P Compiler Design Lab (team of 3): a compiler toolchain that injects shadow-stack, bounds-check, and control-flow-integrity probes and pre-builds alternate function variants, so a running service can recover from memory-corruption exploits instead of crashing.',
      'Reported 100% post-attack availability and about 4.2 microseconds detect-to-heal latency, versus 300 to 1800 seconds for a rebuild and redeploy, with under 6.5% overhead on a benign workload and 0 false positives across 1,500,000 probes.',
      'My contributions: problem identification, a 15-paper literature survey, and design of the exploit benchmarks (a 180-byte buffer-overflow packet against a 64-byte stack frame, and an indirect function-pointer hijack).',
    ],
  },
  {
    id: 'lan',
    index: '03',
    title: 'LAN Messenger with Network Discovery',
    kind: 'Networking',
    tech: ['Python', 'TCP/UDP Sockets', 'Wireshark'],
    points: [
      'Built a LAN chat and multiplayer-style lobby from scratch: a TCP client-server chat extended with UDP broadcast discovery so peers find each other without typing IP addresses.',
      'Designed a discovery protocol where each machine broadcasts a "who’s here" message and listens for replies, populating a live list of peers with their IP and port.',
      'Tested across multiple laptops on one Wi-Fi network and traced traffic through the Ethernet, IP, TCP, and UDP layers with Wireshark captures and ARP-based MAC resolution.',
    ],
  },
  {
    id: 'chat',
    index: '04',
    title: 'Real-Time Chat Application',
    kind: 'Networking',
    tech: ['Python', 'TCP Sockets', 'Multithreading'],
    points: [
      'Built a multi-client chat server on raw TCP sockets that runs one thread per connection, so many users can chat at once.',
      'Handled client join and leave events and broadcast messages to all connected clients in real time.',
    ],
  },
]

export type Education = {
  id: string
  institution: string
  place?: string
  period: string
  degree: string
  detail: string
  grade?: string
}

export const education: Education[] = [
  {
    id: 'vit',
    institution: 'Vellore Institute of Technology (VIT)',
    place: 'Vellore, Tamil Nadu',
    period: 'Expected 2028',
    degree: 'B.Tech in Computer Science and Engineering',
    detail: '3rd Year',
    grade: 'CGPA 9.40',
  },
  {
    id: 'kv',
    institution: 'Kendriya Vidyalaya No. 1',
    period: '2021 – 2023',
    degree: 'Class XII and Class X (CBSE)',
    detail: 'Class XII: 81.8% · Class X: 91.2%',
  },
]

export const achievements = [
  {
    id: 'talk',
    title: 'Technical talk on cloud computing',
    body: 'Presented a topic on cloud computing to an audience of 60+ students.',
  },
  {
    id: 'leetcode',
    title: 'LeetCode (Sarang_Raj)',
    body: '76 problems solved; 123 submissions in the past year across 34 active days; contest rating 1,490.',
    link: { label: 'leetcode.com/u/Sarang_Raj', href: 'https://leetcode.com/u/Sarang_Raj' },
  },
] as const

export const navItems = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
] as const
