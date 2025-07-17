import { studentThemes, studentFonts, type StudentPortfolioData } from "./student-portfolio-data"

interface StudentPortfolioPDFProps {
  data: StudentPortfolioData
  profileImage: string
}

export default function StudentPortfolioPDF({ data, profileImage }: StudentPortfolioPDFProps) {
  const theme = studentThemes[data.theme.colorScheme]
  const font = studentFonts[data.theme.fontFamily]

  const educationEntry = data.education?.[0] ?? {
    university: "",
    degree: "",
    major: "",
    graduationYear: "",
    gpa: "",
    relevantCourses: [],
  }

  const containerStyle = {
    fontFamily: font.family,
    backgroundColor: "white",
    color: "#333",
    padding: "20mm",
    width: "210mm",
    minHeight: "297mm",
    fontSize: "12px",
    lineHeight: "1.4",
  }

  return (
    <div style={containerStyle}>
      {/* Header */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "30px",
          borderBottom: `2px solid ${theme.primary}`,
          paddingBottom: "20px",
        }}
      >
        <h1 style={{ color: theme.primary, marginBottom: "10px", fontSize: "24px", fontWeight: "bold" }}>
          {data.personal.firstName} {data.personal.lastName}
        </h1>
        <div style={{ color: "#666", fontSize: "14px" }}>
          {data.personal.email && <span>{data.personal.email}</span>}
          {data.personal.email && data.personal.phone && <span> | </span>}
          {data.personal.phone && <span>{data.personal.phone}</span>}
        </div>
        {data.personal.location && (
          <div style={{ color: "#666", fontSize: "12px", marginTop: "5px" }}>{data.personal.location}</div>
        )}
        {(data.personal.website || data.personal.linkedin || data.personal.github) && (
          <div style={{ color: "#666", fontSize: "12px", marginTop: "5px" }}>
            {data.personal.website && <span>{data.personal.website}</span>}
            {data.personal.website && (data.personal.linkedin || data.personal.github) && <span> | </span>}
            {data.personal.linkedin && <span>{data.personal.linkedin}</span>}
            {data.personal.linkedin && data.personal.github && <span> | </span>}
            {data.personal.github && <span>{data.personal.github}</span>}
          </div>
        )}
      </div>

      {/* Professional Summary */}
      {data.personal.summary && (
        <div style={{ marginBottom: "25px" }}>
          <h2
            style={{
              color: theme.primary,
              borderBottom: `1px solid ${theme.primary}`,
              paddingBottom: "5px",
              marginBottom: "15px",
              fontSize: "16px",
            }}
          >
            Professional Summary
          </h2>
          <p style={{ textAlign: "justify", margin: "0" }}>{data.personal.summary}</p>
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div style={{ marginBottom: "25px" }}>
          <h2
            style={{
              color: theme.primary,
              borderBottom: `1px solid ${theme.primary}`,
              paddingBottom: "5px",
              marginBottom: "15px",
              fontSize: "16px",
            }}
          >
            Education
          </h2>
          {data.education.map((edu, index) => (
            <div key={index} style={{ marginBottom: "15px" }}>
              <h3 style={{ color: "#444", marginBottom: "5px", fontSize: "14px", fontWeight: "bold" }}>
                {edu.degree} - {edu.university}
              </h3>
              <div style={{ color: "#666", fontSize: "12px", marginBottom: "3px" }}>
                {edu.startDate} - {edu.endDate} | {edu.location}
              </div>
              {edu.gpa && <div style={{ color: "#666", fontSize: "12px", marginBottom: "3px" }}>GPA: {edu.gpa}</div>}
              {edu.relevantCourses?.length > 0 && (
                <div style={{ color: "#666", fontSize: "12px", marginBottom: "3px" }}>
                  Relevant Courses: {edu.relevantCourses.join(", ")}
                </div>
              )}
              {edu.description && <p style={{ margin: "5px 0 0 0", fontSize: "12px" }}>{edu.description}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Work Experience */}
      {data.workExperience.length > 0 && (
        <div style={{ marginBottom: "25px" }}>
          <h2
            style={{
              color: theme.primary,
              borderBottom: `1px solid ${theme.primary}`,
              paddingBottom: "5px",
              marginBottom: "15px",
              fontSize: "16px",
            }}
          >
            Work Experience
          </h2>
          {data.workExperience.map((exp, index) => (
            <div key={index} style={{ marginBottom: "15px" }}>
              <h3 style={{ color: "#444", marginBottom: "5px", fontSize: "14px", fontWeight: "bold" }}>
                {exp.position} - {exp.company}
              </h3>
              <div style={{ color: "#666", fontSize: "12px", marginBottom: "3px" }}>
                {exp.startDate} - {exp.endDate} | {exp.location}
              </div>
              {exp.description && (
                <p style={{ margin: "5px 0 0 0", fontSize: "12px", textAlign: "justify" }}>{exp.description}</p>
              )}
              {exp.achievements?.length > 0 && (
                <ul style={{ margin: "5px 0 0 20px", fontSize: "12px" }}>
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} style={{ marginBottom: "2px" }}>
                      {achievement}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <div style={{ marginBottom: "25px" }}>
          <h2
            style={{
              color: theme.primary,
              borderBottom: `1px solid ${theme.primary}`,
              paddingBottom: "5px",
              marginBottom: "15px",
              fontSize: "16px",
            }}
          >
            Projects
          </h2>
          {data.projects.map((project, index) => (
            <div key={index} style={{ marginBottom: "15px" }}>
              <h3 style={{ color: "#444", marginBottom: "5px", fontSize: "14px", fontWeight: "bold" }}>
                {project.name}
              </h3>
              {project.description && (
                <p style={{ margin: "5px 0", fontSize: "12px", textAlign: "justify" }}>{project.description}</p>
              )}
              {project.technologies?.length > 0 && (
                <div style={{ color: "#666", fontSize: "12px", marginBottom: "3px" }}>
                  Technologies: {project.technologies.join(", ")}
                </div>
              )}
              {(project.url || project.githubUrl) && (
                <div style={{ color: "#666", fontSize: "12px" }}>
                  {project.url && <span>Live: {project.url}</span>}
                  {project.url && project.githubUrl && <span> | </span>}
                  {project.githubUrl && <span>Code: {project.githubUrl}</span>}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {(data.skills.technical.length > 0 || data.skills.soft.length > 0 || data.skills.languages.length > 0) && (
        <div style={{ marginBottom: "25px" }}>
          <h2
            style={{
              color: theme.primary,
              borderBottom: `1px solid ${theme.primary}`,
              paddingBottom: "5px",
              marginBottom: "15px",
              fontSize: "16px",
            }}
          >
            Skills
          </h2>
          {data.skills.technical.length > 0 && (
            <div style={{ marginBottom: "8px" }}>
              <strong style={{ fontSize: "12px" }}>Technical:</strong>
              <span style={{ fontSize: "12px", marginLeft: "5px" }}>{data.skills.technical.join(", ")}</span>
            </div>
          )}
          {data.skills.soft.length > 0 && (
            <div style={{ marginBottom: "8px" }}>
              <strong style={{ fontSize: "12px" }}>Soft Skills:</strong>
              <span style={{ fontSize: "12px", marginLeft: "5px" }}>{data.skills.soft.join(", ")}</span>
            </div>
          )}
          {data.skills.languages.length > 0 && (
            <div style={{ marginBottom: "8px" }}>
              <strong style={{ fontSize: "12px" }}>Languages:</strong>
              <span style={{ fontSize: "12px", marginLeft: "5px" }}>{data.skills.languages.join(", ")}</span>
            </div>
          )}
        </div>
      )}

      {/* Achievements */}
      {data.achievements.length > 0 && (
        <div style={{ marginBottom: "25px" }}>
          <h2
            style={{
              color: theme.primary,
              borderBottom: `1px solid ${theme.primary}`,
              paddingBottom: "5px",
              marginBottom: "15px",
              fontSize: "16px",
            }}
          >
            Achievements
          </h2>
          {data.achievements.map((achievement, index) => (
            <div key={index} style={{ marginBottom: "10px" }}>
              <h4 style={{ color: "#444", marginBottom: "3px", fontSize: "13px", fontWeight: "bold" }}>
                {achievement.title}
              </h4>
              {achievement.issuer && (
                <div style={{ color: "#666", fontSize: "11px", marginBottom: "2px" }}>{achievement.issuer}</div>
              )}
              {achievement.date && (
                <div style={{ color: "#666", fontSize: "11px", marginBottom: "2px" }}>{achievement.date}</div>
              )}
              {achievement.description && (
                <p style={{ margin: "3px 0 0 0", fontSize: "12px" }}>{achievement.description}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Certifications */}
      {data.certifications.length > 0 && (
        <div style={{ marginBottom: "25px" }}>
          <h2
            style={{
              color: theme.primary,
              borderBottom: `1px solid ${theme.primary}`,
              paddingBottom: "5px",
              marginBottom: "15px",
              fontSize: "16px",
            }}
          >
            Certifications
          </h2>
          {data.certifications.map((cert, index) => (
            <div key={index} style={{ marginBottom: "10px" }}>
              <h4 style={{ color: "#444", marginBottom: "3px", fontSize: "13px", fontWeight: "bold" }}>{cert.name}</h4>
              <div style={{ color: "#666", fontSize: "11px", marginBottom: "2px" }}>
                {cert.issuer} | {cert.date}
                {cert.expiryDate && ` - ${cert.expiryDate}`}
              </div>
              {cert.credentialID && <div style={{ color: "#666", fontSize: "11px" }}>ID: {cert.credentialID}</div>}
            </div>
          ))}
        </div>
      )}

      {/* Extra Curriculars */}
      {data.extraCurriculars.length > 0 && (
        <div style={{ marginBottom: "25px" }}>
          <h2
            style={{
              color: theme.primary,
              borderBottom: `1px solid ${theme.primary}`,
              paddingBottom: "5px",
              marginBottom: "15px",
              fontSize: "16px",
            }}
          >
            Extra Curricular Activities
          </h2>
          {data.extraCurriculars.map((activity, index) => (
            <div key={index} style={{ marginBottom: "10px" }}>
              <h4 style={{ color: "#444", marginBottom: "3px", fontSize: "13px", fontWeight: "bold" }}>
                {activity.role} - {activity.organization}
              </h4>
              <div style={{ color: "#666", fontSize: "11px", marginBottom: "2px" }}>
                {activity.startDate} - {activity.endDate}
              </div>
              {activity.description && <p style={{ margin: "3px 0 0 0", fontSize: "12px" }}>{activity.description}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Volunteer Experience */}
      {data.volunteerExperience.length > 0 && (
        <div style={{ marginBottom: "25px" }}>
          <h2
            style={{
              color: theme.primary,
              borderBottom: `1px solid ${theme.primary}`,
              paddingBottom: "5px",
              marginBottom: "15px",
              fontSize: "16px",
            }}
          >
            Volunteer Experience
          </h2>
          {data.volunteerExperience.map((vol, index) => (
            <div key={index} style={{ marginBottom: "10px" }}>
              <h4 style={{ color: "#444", marginBottom: "3px", fontSize: "13px", fontWeight: "bold" }}>
                {vol.role} - {vol.organization}
              </h4>
              <div style={{ color: "#666", fontSize: "11px", marginBottom: "2px" }}>
                {vol.startDate} - {vol.endDate} | {vol.location}
              </div>
              {vol.description && <p style={{ margin: "3px 0 0 0", fontSize: "12px" }}>{vol.description}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
