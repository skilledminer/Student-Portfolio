import { studentThemes, studentFonts, type StudentPortfolioData } from "./student-portfolio-data"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface StudentPortfolioPreviewProps {
  data: StudentPortfolioData
  profileImage: string
}

export default function StudentPortfolioPreview({ data, profileImage }: StudentPortfolioPreviewProps) {
  // ---------------------------------------------------------------------
  // Normalise legacy vs. current field names so the template code is safe
  // ---------------------------------------------------------------------
  const educationEntry = data.education?.[0] ?? {
    university: "",
    degree: "",
    major: "",
    graduationYear: "",
    gpa: "",
    relevantCourses: [],
  }

  const workExperience = data.workExperience ?? []

  const projects = data.projects ?? []

  const theme = studentThemes[data.theme.colorScheme]
  const font = studentFonts[data.theme.fontFamily]

  const getSpacing = () => {
    switch (data.theme.layout) {
      case "compact":
        return "space-y-4"
      case "spacious":
        return "space-y-12"
      default:
        return "space-y-8"
    }
  }

  const getPadding = () => {
    switch (data.theme.layout) {
      case "compact":
        return "p-4"
      case "spacious":
        return "p-8"
      default:
        return "p-6"
    }
  }

  const containerStyle = {
    fontFamily: font.family,
    backgroundColor: theme.background,
    color: theme.text,
  }

  const primaryStyle = {
    color: theme.primary,
  }

  const secondaryStyle = {
    color: theme.secondary,
  }

  const accentStyle = {
    backgroundColor: theme.accent,
    color: "white",
  }

  const renderModernTemplate = () => (
    <div className={`${getSpacing()} ${getPadding()} rounded-lg border`} style={containerStyle}>
      {/* Header */}
      <div className="flex items-start gap-6 border-b pb-6" style={{ borderColor: theme.accent + "30" }}>
        <img
          src={profileImage || "/placeholder.svg"}
          alt="Profile"
          className="h-24 w-24 rounded-full object-cover border-4"
          style={{ borderColor: theme.primary }}
        />
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2" style={primaryStyle}>
            {data.personal.firstName} {data.personal.lastName}
          </h1>
          <p className="text-lg mb-2" style={secondaryStyle}>
            {educationEntry.degree} in {educationEntry.major}
          </p>
          <p className="text-sm opacity-75">
            {data.personal.email} • {data.personal.phone}
          </p>
        </div>
      </div>

      {/* Summary */}
      {data.personal.summary && (
        <div>
          <h2 className="text-xl font-semibold mb-3" style={primaryStyle}>
            Professional Summary
          </h2>
          <p className="leading-relaxed">{data.personal.summary}</p>
        </div>
      )}

      {/* Education */}
      <div>
        <h2 className="text-xl font-semibold mb-3" style={primaryStyle}>
          Education
        </h2>
        <div className="rounded-lg p-4" style={{ backgroundColor: theme.primary + "10" }}>
          <h3 className="font-semibold text-lg">{educationEntry.university}</h3>
          <p className="font-medium">
            {educationEntry.degree} in {educationEntry.major}
          </p>
          <p className="text-sm opacity-75">
            {educationEntry.graduationYear}
            {educationEntry.gpa && ` • GPA: ${educationEntry.gpa}`}
          </p>
          {educationEntry.relevantCourses.length > 0 && (
            <div className="mt-3">
              <p className="text-sm font-medium mb-2">Relevant Courses:</p>
              <div className="flex flex-wrap gap-1">
                {educationEntry.relevantCourses.map((course, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {course}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Experience */}
      {workExperience?.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-3" style={primaryStyle}>
            Experience
          </h2>
          <div className="space-y-4">
            {workExperience.map((exp, index) => (
              <div key={index} className="border-l-4 pl-4" style={{ borderColor: theme.accent }}>
                <h3 className="font-semibold">{exp.position}</h3>
                <p style={secondaryStyle}>{exp.company}</p>
                <p className="text-sm opacity-75">
                  {exp.startDate} - {exp.endDate}
                </p>
                <p className="text-sm mt-2">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects?.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-3" style={primaryStyle}>
            Projects
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {projects.map((project, index) => (
              <div key={index} className="rounded-lg p-4 border" style={{ borderColor: theme.primary + "30" }}>
                <h3 className="font-semibold mb-2">{project.name}</h3>
                <p className="text-sm mb-3">{project.description}</p>
                <div className="flex flex-wrap gap-1 mb-2">
                  {project.technologies.map((tech, techIndex) => (
                    <Badge key={techIndex} style={accentStyle} className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
                {project.url && (
                  <p className="text-xs" style={primaryStyle}>
                    {project.url}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      <div>
        <h2 className="text-xl font-semibold mb-3" style={primaryStyle}>
          Skills
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {data.skills.technical.length > 0 && (
            <div>
              <h3 className="font-medium mb-2" style={secondaryStyle}>
                Technical
              </h3>
              <div className="flex flex-wrap gap-1">
                {data.skills.technical.map((skill, index) => (
                  <Badge key={index} style={accentStyle} className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          {data.skills.soft.length > 0 && (
            <div>
              <h3 className="font-medium mb-2" style={secondaryStyle}>
                Soft Skills
              </h3>
              <div className="flex flex-wrap gap-1">
                {data.skills.soft.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          {data.skills.languages.length > 0 && (
            <div>
              <h3 className="font-medium mb-2" style={secondaryStyle}>
                Languages
              </h3>
              <div className="flex flex-wrap gap-1">
                {data.skills.languages.map((lang, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {lang}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Awards */}
      {data.awards?.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-3" style={primaryStyle}>
            Awards & Achievements
          </h2>
          <ul className="list-disc list-inside space-y-1">
            {data.awards.map((award, index) => (
              <li key={index} className="text-sm">
                {award}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )

  const renderCreativeTemplate = () => (
    <div
      className={`${getSpacing()} ${getPadding()} rounded-lg`}
      style={{
        ...containerStyle,
        background: `linear-gradient(135deg, ${theme.background} 0%, ${theme.primary}15 100%)`,
      }}
    >
      {/* Creative Header with Artistic Layout */}
      <div className="text-center mb-8">
        <div className="relative inline-block mb-4">
          <img
            src={profileImage || "/placeholder.svg"}
            alt="Profile"
            className="h-32 w-32 rounded-full object-cover border-4 mx-auto"
            style={{ borderColor: theme.accent }}
          />
          <div
            className="absolute -top-2 -right-2 w-8 h-8 rounded-full"
            style={{ backgroundColor: theme.primary }}
          ></div>
        </div>
        <h1
          className="text-4xl font-bold mb-2"
          style={{
            background: `linear-gradient(45deg, ${theme.primary}, ${theme.secondary})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {data.personal.firstName} {data.personal.lastName}
        </h1>
        <p className="text-xl mb-4" style={secondaryStyle}>
          {educationEntry.degree} in {educationEntry.major}
        </p>
        {data.personal.summary && <p className="max-w-2xl mx-auto leading-relaxed">{data.personal.summary}</p>}
      </div>

      {/* Rest of the content with creative styling */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Education Card */}
        <Card className="border-0 shadow-lg" style={{ backgroundColor: theme.primary + "10" }}>
          <CardHeader>
            <CardTitle style={primaryStyle}>🎓 Education</CardTitle>
          </CardHeader>
          <CardContent>
            <h3 className="font-semibold">{educationEntry.university}</h3>
            <p>
              {educationEntry.degree} in {educationEntry.major}
            </p>
            <p className="text-sm opacity-75">{educationEntry.graduationYear}</p>
          </CardContent>
        </Card>

        {/* Skills Card */}
        <Card className="border-0 shadow-lg" style={{ backgroundColor: theme.secondary + "10" }}>
          <CardHeader>
            <CardTitle style={secondaryStyle}>⚡ Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {data.skills.technical.slice(0, 6).map((skill, index) => (
                <Badge key={index} style={accentStyle} className="mr-1">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Projects with Creative Layout */}
      {projects?.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6 text-center" style={primaryStyle}>
            🚀 Featured Projects
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((project, index) => (
              <Card key={index} className="border-0 shadow-lg overflow-hidden">
                <div className="h-2" style={{ backgroundColor: theme.accent }}></div>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-2" style={primaryStyle}>
                    {project.name}
                  </h3>
                  <p className="text-sm mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )

  // Render different templates based on selection
  switch (data.theme.template) {
    case "creative":
    case "artistic":
      return renderCreativeTemplate()
    case "academic":
    case "minimal":
    case "tech":
    case "modern":
    default:
      return renderModernTemplate()
  }
}
