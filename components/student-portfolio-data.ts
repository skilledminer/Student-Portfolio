export interface StudentPortfolioData {
  personal: {
    firstName: string
    lastName: string
    email: string
    phone: string
    summary: string
    location: string
    website: string
    linkedin: string
    github: string
  }
  education: Array<{
    id: number
    university: string
    degree: string
    major: string
    gpa: string
    startDate: string
    endDate: string
    location: string
    relevantCourses: string[]
    description: string
  }>
  workExperience: Array<{
    id: number
    company: string
    position: string
    startDate: string
    endDate: string
    location: string
    description: string
    achievements: string[]
  }>
  extraCurriculars: Array<{
    id: number
    organization: string
    role: string
    startDate: string
    endDate: string
    description: string
  }>
  volunteerExperience: Array<{
    id: number
    organization: string
    role: string
    startDate: string
    endDate: string
    location: string
    description: string
  }>
  projects: Array<{
    id: number
    name: string
    description: string
    technologies: string[]
    url: string
    githubUrl: string
    startDate: string
    endDate: string
  }>
  skills: {
    technical: string[]
    soft: string[]
    languages: string[]
  }
  achievements: Array<{
    id: number
    title: string
    date: string
    description: string
    issuer: string
  }>
  certifications: Array<{
    id: number
    name: string
    issuer: string
    date: string
    expiryDate: string
    credentialID: string
    credentialURL: string
  }>
  hobbies: Array<{
    id: number
    name: string
    description: string
  }>
  references: Array<{
    id: number
    name: string
    relationship: string
    company: string
    email: string
    phone: string
    description: string
  }>
  profileImage?: string
  theme: {
    template: "modern" | "creative" | "academic" | "minimal" | "tech" | "artistic"
    colorScheme: "blue" | "purple" | "green" | "orange" | "pink" | "teal" | "red"
    fontFamily: "inter" | "poppins" | "roboto" | "playfair" | "montserrat"
    layout: "standard" | "compact" | "spacious"
  }
}

export const getDefaultStudentData = (): StudentPortfolioData => ({
  personal: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    summary: "",
    location: "",
    website: "",
    linkedin: "",
    github: "",
  },
  education: [
    {
      id: 1,
      university: "",
      degree: "",
      major: "",
      gpa: "",
      startDate: "",
      endDate: "",
      location: "",
      relevantCourses: [],
      description: "",
    },
  ],
  workExperience: [],
  extraCurriculars: [],
  volunteerExperience: [],
  projects: [],
  skills: {
    technical: [],
    soft: [],
    languages: [],
  },
  achievements: [],
  certifications: [],
  hobbies: [],
  references: [],
  theme: {
    template: "modern",
    colorScheme: "blue",
    fontFamily: "inter",
    layout: "standard",
  },
})

export const studentThemes = {
  blue: {
    name: "Ocean Blue",
    primary: "#3b82f6",
    secondary: "#1e40af",
    accent: "#60a5fa",
    background: "#f8fafc",
    text: "#1e293b",
    description: "Professional and trustworthy",
  },
  purple: {
    name: "Creative Purple",
    primary: "#8b5cf6",
    secondary: "#7c3aed",
    accent: "#a78bfa",
    background: "#faf5ff",
    text: "#1e1b4b",
    description: "Creative and innovative",
  },
  green: {
    name: "Nature Green",
    primary: "#10b981",
    secondary: "#059669",
    accent: "#34d399",
    background: "#f0fdf4",
    text: "#064e3b",
    description: "Fresh and growth-oriented",
  },
  orange: {
    name: "Energy Orange",
    primary: "#f97316",
    secondary: "#ea580c",
    accent: "#fb923c",
    background: "#fff7ed",
    text: "#9a3412",
    description: "Energetic and enthusiastic",
  },
  pink: {
    name: "Warm Pink",
    primary: "#ec4899",
    secondary: "#db2777",
    accent: "#f472b6",
    background: "#fdf2f8",
    text: "#831843",
    description: "Warm and approachable",
  },
  teal: {
    name: "Modern Teal",
    primary: "#14b8a6",
    secondary: "#0d9488",
    accent: "#2dd4bf",
    background: "#f0fdfa",
    text: "#134e4a",
    description: "Modern and balanced",
  },
  red: {
    name: "Bold Red",
    primary: "#ef4444",
    secondary: "#dc2626",
    accent: "#f87171",
    background: "#fef2f2",
    text: "#7f1d1d",
    description: "Bold and confident",
  },
}

export const studentFonts = {
  inter: {
    name: "Inter",
    family: "'Inter', sans-serif",
    description: "Clean and modern",
  },
  poppins: {
    name: "Poppins",
    family: "'Poppins', sans-serif",
    description: "Friendly and approachable",
  },
  roboto: {
    name: "Roboto",
    family: "'Roboto', sans-serif",
    description: "Professional and readable",
  },
  playfair: {
    name: "Playfair Display",
    family: "'Playfair Display', serif",
    description: "Elegant and sophisticated",
  },
  montserrat: {
    name: "Montserrat",
    family: "'Montserrat', sans-serif",
    description: "Bold and contemporary",
  },
}

export const studentTemplates = {
  modern: {
    name: "Modern Student",
    description: "Clean, professional design perfect for tech and business students",
    preview: "🎯",
  },
  creative: {
    name: "Creative Portfolio",
    description: "Vibrant design ideal for design, art, and creative students",
    preview: "🎨",
  },
  academic: {
    name: "Academic Scholar",
    description: "Traditional, scholarly design for research and academic pursuits",
    preview: "📚",
  },
  minimal: {
    name: "Minimal Clean",
    description: "Simple, distraction-free design that focuses on content",
    preview: "✨",
  },
  tech: {
    name: "Tech Innovator",
    description: "Modern tech-focused design for computer science and engineering students",
    preview: "💻",
  },
  artistic: {
    name: "Artistic Expression",
    description: "Bold, expressive design for artists and creative professionals",
    preview: "🎭",
  },
}
