// Define types for our portfolio data
export type Project = {
  id: number
  title: string
  description: string
  tags: string[]
  image: string
}

export type Skill = {
  skill: string
  level: number
}

export type Education = {
  id: number
  institution: string
  degree: string
  fieldOfStudy: string
  startDate: string
  endDate: string
  description: string
  location: string
  gpa?: string
}

export type WorkExperience = {
  id: number
  company: string
  position: string
  startDate: string
  endDate: string
  description: string
  location: string
  achievements: string[]
}

export type ExtraCurricular = {
  id: number
  organization: string
  role: string
  startDate: string
  endDate: string
  description: string
}

export type VolunteerExperience = {
  id: number
  organization: string
  role: string
  startDate: string
  endDate: string
  description: string
  location: string
}

export type Achievement = {
  id: number
  title: string
  date: string
  description: string
  issuer?: string
}

export type Certification = {
  id: number
  name: string
  issuer: string
  date: string
  expiryDate?: string
  credentialID?: string
  credentialURL?: string
}

export type Hobby = {
  id: number
  name: string
  description: string
}

export type Reference = {
  id: number
  name: string
  relationship: string
  company: string
  email: string
  phone?: string
  description?: string
}

export type PortfolioTemplate = "minimal" | "creative" | "corporate" | "modern"

export type TemplateCustomization = {
  layout: "standard" | "alternate" | "compact" | "expanded"
  headerStyle: "centered" | "left-aligned" | "right-aligned" | "split"
  projectLayout: "grid" | "list" | "cards" | "masonry"
  projectsPerRow: 1 | 2 | 3 | 4
  skillStyle: "bars" | "circles" | "tags" | "numbers"
  backgroundStyle: "solid" | "gradient" | "pattern" | "image"
  backgroundImage?: string
  backgroundPattern?: string
  backgroundGradient?: string
  spacing: "compact" | "comfortable" | "spacious"
  borderRadius: number
  animations: "none" | "subtle" | "moderate" | "playful"
  customCSS?: string
}

export type PortfolioData = {
  name: string
  title: string
  about: string
  projects: Project[]
  skills: Skill[]
  education: Education[]
  workExperience: WorkExperience[]
  extraCurriculars: ExtraCurricular[]
  volunteerExperience: VolunteerExperience[]
  achievements: Achievement[]
  certifications: Certification[]
  hobbies: Hobby[]
  references: Reference[]
  primaryCta: {
    text: string
    link: string
  }
  secondaryCta: {
    text: string
    link: string
  }
  contactSettings: {
    title: string
    description: string
    submitButtonText: string
    fields: {
      name: boolean
      email: boolean
      subject: boolean
      message: boolean
    }
  }
  sectionTitles: {
    projects: string
    about: string
    contact: string
    education: string
    workExperience: string
    extraCurriculars: string
    volunteerExperience: string
    achievements: string
    certifications: string
    hobbies: string
    references: string
  }
  sectionOrder: string[]
  theme: {
    colorScheme: "light" | "dark" | "system"
    primaryColor: string
    secondaryColor?: string
    accentColor?: string
    fontFamily: string
    headingFont?: string
    bodyFont?: string
    template: PortfolioTemplate
    templateCustomization: TemplateCustomization
  }
}

// Default portfolio data template
export const getDefaultPortfolioData = (): PortfolioData => ({
  name: "Jane Doe",
  title: "UX Designer & Developer",
  about:
    "I'm a passionate UX designer and developer with over 5 years of experience creating beautiful, functional digital experiences. I specialize in user-centered design and front-end development.",
  projects: [
    {
      id: 1,
      title: "E-commerce Redesign",
      description:
        "A complete overhaul of an e-commerce platform focusing on user experience and conversion optimization.",
      tags: ["React", "UX Design", "Figma"],
      image: "/placeholder.svg?height=200&width=400&text=Project+1",
    },
    {
      id: 2,
      title: "Mobile Banking App",
      description:
        "A secure and intuitive mobile banking application with biometric authentication and real-time notifications.",
      tags: ["React Native", "UI Design", "Firebase"],
      image: "/placeholder.svg?height=200&width=400&text=Project+2",
    },
    {
      id: 3,
      title: "Portfolio Website",
      description:
        "A responsive portfolio website showcasing creative work with smooth animations and filtering capabilities.",
      tags: ["Next.js", "Tailwind CSS", "Framer Motion"],
      image: "/placeholder.svg?height=200&width=400&text=Project+3",
    },
  ],
  skills: [
    { skill: "HTML/CSS", level: 95 },
    { skill: "JavaScript", level: 85 },
    { skill: "React", level: 80 },
    { skill: "UI/UX Design", level: 90 },
    { skill: "Figma", level: 85 },
    { skill: "Node.js", level: 70 },
  ],
  education: [
    {
      id: 1,
      institution: "University of Design",
      degree: "Bachelor of Science",
      fieldOfStudy: "Computer Science",
      startDate: "2015-09",
      endDate: "2019-05",
      description: "Graduated with honors. Specialized in Human-Computer Interaction.",
      location: "San Francisco, CA",
      gpa: "3.8/4.0",
    },
  ],
  workExperience: [
    {
      id: 1,
      company: "Tech Innovations Inc.",
      position: "Senior UX Designer",
      startDate: "2020-03",
      endDate: "Present",
      description:
        "Lead UX designer for multiple high-profile projects. Collaborate with cross-functional teams to deliver user-centered design solutions.",
      location: "San Francisco, CA",
      achievements: [
        "Increased user engagement by 40% through redesign of core features",
        "Led a team of 3 junior designers",
        "Implemented design system that reduced development time by 30%",
      ],
    },
    {
      id: 2,
      company: "Digital Solutions LLC",
      position: "UX/UI Designer",
      startDate: "2019-06",
      endDate: "2020-02",
      description:
        "Designed user interfaces for web and mobile applications. Conducted user research and usability testing.",
      location: "San Francisco, CA",
      achievements: [
        "Redesigned company website resulting in 25% increase in conversions",
        "Created wireframes and prototypes for 10+ client projects",
      ],
    },
  ],
  extraCurriculars: [
    {
      id: 1,
      organization: "Design Club",
      role: "President",
      startDate: "2017-09",
      endDate: "2019-05",
      description: "Organized weekly design workshops and annual design hackathon with 200+ participants.",
    },
  ],
  volunteerExperience: [
    {
      id: 1,
      organization: "Tech for Good",
      role: "UX Volunteer",
      startDate: "2020-01",
      endDate: "Present",
      description: "Provide pro bono UX design services to non-profit organizations.",
      location: "Remote",
    },
  ],
  achievements: [
    {
      id: 1,
      title: "Design Excellence Award",
      date: "2021-11",
      description: "Recognized for outstanding contributions to product design.",
      issuer: "Design Industry Association",
    },
  ],
  certifications: [
    {
      id: 1,
      name: "Certified UX Professional",
      issuer: "UX Certification Board",
      date: "2020-06",
      expiryDate: "2023-06",
      credentialID: "UX-2020-1234",
      credentialURL: "https://example.com/cert/UX-2020-1234",
    },
  ],
  hobbies: [
    {
      id: 1,
      name: "Photography",
      description: "Street photography and landscape photography.",
    },
    {
      id: 2,
      name: "Hiking",
      description: "Weekend hikes and annual backpacking trips.",
    },
  ],
  references: [
    {
      id: 1,
      name: "John Smith",
      relationship: "Former Manager",
      company: "Tech Innovations Inc.",
      email: "john.smith@example.com",
      phone: "555-123-4567",
      description: "Worked together for 2 years on multiple projects.",
    },
  ],
  primaryCta: {
    text: "Hire Me",
    link: "#contact",
  },
  secondaryCta: {
    text: "Download Resume",
    link: "#",
  },
  contactSettings: {
    title: "Contact",
    description: "Feel free to reach out if you're looking for a developer, have a question, or just want to connect.",
    submitButtonText: "Send Message",
    fields: {
      name: true,
      email: true,
      subject: false,
      message: true,
    },
  },
  sectionTitles: {
    projects: "Projects",
    about: "About Me",
    contact: "Contact",
    education: "Education",
    workExperience: "Work Experience",
    extraCurriculars: "Extra Curriculars",
    volunteerExperience: "Volunteer Experience",
    achievements: "Achievements",
    certifications: "Certifications",
    hobbies: "Hobbies",
    references: "References",
  },
  sectionOrder: [
    "hero",
    "about",
    "education",
    "workExperience",
    "projects",
    "skills",
    "achievements",
    "certifications",
    "extraCurriculars",
    "volunteerExperience",
    "hobbies",
    "references",
    "contact",
  ],
  theme: {
    colorScheme: "light",
    primaryColor: "#0ea5e9",
    secondaryColor: "#6366f1",
    accentColor: "#f97316",
    fontFamily: "inter",
    headingFont: "inter",
    bodyFont: "inter",
    template: "minimal",
    templateCustomization: {
      layout: "standard",
      headerStyle: "centered",
      projectLayout: "grid",
      projectsPerRow: 3,
      skillStyle: "bars",
      backgroundStyle: "solid",
      spacing: "comfortable",
      borderRadius: 8,
      animations: "subtle",
    },
  },
})
