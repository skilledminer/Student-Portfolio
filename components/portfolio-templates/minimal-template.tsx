export default function MinimalTemplate({ data }) {
  const { theme } = data
  const { templateCustomization } = theme

  // Generate theme-specific styles
  const getThemeStyles = () => {
    const styles = {
      backgroundColor: theme.colorScheme === "dark" ? "#1f2937" : "#ffffff",
      color: theme.colorScheme === "dark" ? "#f3f4f6" : "#1f2937",
      fontFamily: getFontFamily(theme.fontFamily),
    }

    return styles
  }

  const getFontFamily = (font) => {
    switch (font) {
      case "roboto":
        return "'Roboto', sans-serif"
      case "poppins":
        return "'Poppins', sans-serif"
      case "montserrat":
        return "'Montserrat', sans-serif"
      default:
        return "'Inter', sans-serif"
    }
  }

  const getButtonStyles = () => {
    return {
      backgroundColor: theme.primaryColor,
      borderColor: theme.primaryColor,
    }
  }

  const getSpacingClass = () => {
    switch (templateCustomization.spacing) {
      case "compact":
        return "space-y-8"
      case "spacious":
        return "space-y-24"
      case "comfortable":
      default:
        return "space-y-16"
    }
  }

  const getBorderRadiusStyle = () => {
    return {
      borderRadius: `${templateCustomization.borderRadius}px`,
    }
  }

  const getProjectLayoutClass = () => {
    switch (templateCustomization.projectLayout) {
      case "list":
        return "flex flex-col gap-6"
      case "masonry":
        return "columns-1 md:columns-2 lg:columns-3 gap-6"
      case "cards":
      case "grid":
      default:
        return `grid gap-8 md:grid-cols-2 lg:grid-cols-${templateCustomization.projectsPerRow}`
    }
  }

  const isDark = theme.colorScheme === "dark"

  return (
    <div
      className={`${getSpacingClass()} pb-16 rounded-lg p-6 ${isDark ? "bg-gray-900" : "bg-white"}`}
      style={{
        ...getThemeStyles(),
        ...(templateCustomization.customCSS ? { customCSS: templateCustomization.customCSS } : {}),
      }}
    >
      {/* Hero Section */}
      <section id="home" className="transition-all duration-300 ease-in-out">
        <div
          className={`flex flex-col items-center justify-center space-y-6 text-center ${
            templateCustomization.headerStyle === "left-aligned"
              ? "md:items-start md:text-left"
              : templateCustomization.headerStyle === "right-aligned"
                ? "md:items-end md:text-right"
                : templateCustomization.headerStyle === "split"
                  ? "md:flex-row md:justify-between md:text-left"
                  : "md:flex-row md:space-x-10 md:space-y-0 md:text-left" // centered (default)
          }`}
        >
          <div
            className={`relative h-40 w-40 overflow-hidden rounded-full border-4 ${isDark ? "border-gray-800" : "border-white"} shadow-lg`}
            style={templateCustomization.headerStyle === "split" ? { order: 2 } : {}}
          >
            <img src="/placeholder.svg?height=160&width=160" alt="Profile" className="h-full w-full object-cover" />
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">{data.name}</h1>
            <p className={`text-xl ${isDark ? "text-gray-300" : "text-gray-600"}`}>{data.title}</p>
            <div
              className={`flex flex-wrap gap-3 ${
                templateCustomization.headerStyle === "right-aligned"
                  ? "justify-end"
                  : templateCustomization.headerStyle === "centered"
                    ? "justify-center md:justify-start"
                    : "justify-center md:justify-start"
              }`}
            >
              <button style={getButtonStyles()} className="px-4 py-2 rounded text-white">
                {data.primaryCta.text}
              </button>
              <button
                className={`px-4 py-2 rounded border ${isDark ? "border-gray-700 text-gray-300 hover:bg-gray-800" : "border-gray-300"}`}
              >
                <span className="mr-2">↓</span>
                {data.secondaryCta.text}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="transition-all duration-300 ease-in-out">
        <h2 className="mb-8 text-3xl font-bold">{data.sectionTitles.projects}</h2>
        <div className={getProjectLayoutClass()}>
          {data.projects.map((project, index) => (
            <div
              key={index}
              className={`group overflow-hidden border ${
                isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
              } shadow-sm transition-all hover:shadow-md ${
                templateCustomization.projectLayout === "masonry" ? "mb-6 inline-block w-full" : ""
              }`}
              style={getBorderRadiusStyle()}
            >
              <div className="aspect-video w-full overflow-hidden bg-gray-100">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className={`h-full w-full object-cover ${
                    templateCustomization.animations !== "none"
                      ? "transition-transform duration-300 group-hover:scale-105"
                      : ""
                  }`}
                />
              </div>
              <div className="p-5">
                <h3 className="mb-2 text-xl font-bold">{project.title}</h3>
                <p className={`mb-4 ${isDark ? "text-gray-300" : "text-gray-600"}`}>{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2 py-1 rounded-full text-sm"
                      style={{ backgroundColor: theme.primaryColor + "20", color: theme.primaryColor }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About Me Section */}
      <section id="about" className="transition-all duration-300 ease-in-out">
        <h2 className="mb-8 text-3xl font-bold">{data.sectionTitles.about}</h2>
        <div className="grid gap-10 md:grid-cols-2">
          <div className="space-y-4">
            <p className={isDark ? "text-gray-300" : "text-gray-700"}>{data.about}</p>
            <p className={isDark ? "text-gray-300" : "text-gray-700"}>
              My approach combines aesthetic sensibility with technical expertise to build products that not only look
              great but also solve real problems for users. I've worked with startups and established companies across
              various industries.
            </p>
            <p className={isDark ? "text-gray-300" : "text-gray-700"}>
              When I'm not designing or coding, you can find me hiking, reading science fiction, or experimenting with
              new cooking recipes.
            </p>
          </div>
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Skills</h3>
            {data.skills.map((item, index) => {
              if (templateCustomization.skillStyle === "bars") {
                return (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">{item.skill}</span>
                      <span className={isDark ? "text-gray-400" : "text-gray-500"}>{item.level}%</span>
                    </div>
                    <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${item.level}%`,
                          backgroundColor: theme.primaryColor,
                        }}
                      ></div>
                    </div>
                  </div>
                )
              } else if (templateCustomization.skillStyle === "circles") {
                return (
                  <div key={index} className="flex items-center gap-4">
                    <div className="relative h-16 w-16">
                      <svg viewBox="0 0 36 36" className="h-16 w-16">
                        <path
                          className="stroke-current text-gray-200"
                          fill="none"
                          strokeWidth="3"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                          className="stroke-current"
                          fill="none"
                          strokeWidth="3"
                          strokeDasharray={`${item.level}, 100`}
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          style={{ stroke: theme.primaryColor }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold">
                        {item.level}%
                      </div>
                    </div>
                    <span className="font-medium">{item.skill}</span>
                  </div>
                )
              } else if (templateCustomization.skillStyle === "tags") {
                return (
                  <span
                    key={index}
                    className="inline-block mr-2 mb-2 px-3 py-1 rounded-full text-sm"
                    style={{ backgroundColor: theme.primaryColor + "20", color: theme.primaryColor }}
                  >
                    {item.skill}
                  </span>
                )
              } else if (templateCustomization.skillStyle === "numbers") {
                return (
                  <div key={index} className="flex items-center justify-between mb-2">
                    <span className="font-medium">{item.skill}</span>
                    <span className="text-lg font-bold" style={{ color: theme.primaryColor }}>
                      {item.level}%
                    </span>
                  </div>
                )
              }
              return null
            })}
          </div>
        </div>
      </section>

      {/* Education Section */}
      {data.education && data.education.length > 0 && (
        <section id="education" className="transition-all duration-300 ease-in-out">
          <h2 className="mb-8 text-3xl font-bold">{data.sectionTitles.education}</h2>
          <div className="space-y-8">
            {data.education.map((edu, index) => (
              <div
                key={index}
                className={`p-6 border ${isDark ? "border-gray-700 bg-gray-800" : "border-gray-200"}`}
                style={getBorderRadiusStyle()}
              >
                <div className="flex flex-col md:flex-row md:justify-between mb-2">
                  <h3 className="text-xl font-bold">{edu.institution}</h3>
                  <span className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                    {edu.startDate} - {edu.endDate}
                  </span>
                </div>
                <p className="text-lg font-medium mb-2">
                  {edu.degree} in {edu.fieldOfStudy}
                </p>
                <p className={isDark ? "text-gray-300" : "text-gray-600"}>{edu.description}</p>
                {edu.gpa && (
                  <p className="mt-2">
                    <span className="font-medium">GPA:</span> {edu.gpa}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Work Experience Section */}
      {data.workExperience && data.workExperience.length > 0 && (
        <section id="experience" className="transition-all duration-300 ease-in-out">
          <h2 className="mb-8 text-3xl font-bold">{data.sectionTitles.workExperience}</h2>
          <div className="space-y-8">
            {data.workExperience.map((work, index) => (
              <div
                key={index}
                className={`p-6 border ${isDark ? "border-gray-700 bg-gray-800" : "border-gray-200"}`}
                style={getBorderRadiusStyle()}
              >
                <div className="flex flex-col md:flex-row md:justify-between mb-2">
                  <h3 className="text-xl font-bold">{work.company}</h3>
                  <span className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                    {work.startDate} - {work.endDate}
                  </span>
                </div>
                <p className="text-lg font-medium mb-2">{work.position}</p>
                <p className={isDark ? "text-gray-300" : "text-gray-600"}>{work.description}</p>
                {work.achievements && work.achievements.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-medium mb-2">Key Achievements:</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {work.achievements.map((achievement, i) => (
                        <li key={i}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section id="contact" className="transition-all duration-300 ease-in-out">
        <h2 className="mb-8 text-3xl font-bold">{data.sectionTitles.contact}</h2>
        <div
          className={`p-6 border ${isDark ? "border-gray-700 bg-gray-800" : "border-gray-200"}`}
          style={getBorderRadiusStyle()}
        >
          <p className="mb-6">{data.contactSettings.description}</p>
          <div className="grid gap-4">
            {data.contactSettings.fields.name && (
              <div>
                <label className="block mb-2 font-medium">Name</label>
                <input
                  type="text"
                  className={`w-full p-2 border rounded ${isDark ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"}`}
                  placeholder="Your name"
                />
              </div>
            )}
            {data.contactSettings.fields.email && (
              <div>
                <label className="block mb-2 font-medium">Email</label>
                <input
                  type="email"
                  className={`w-full p-2 border rounded ${isDark ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"}`}
                  placeholder="Your email"
                />
              </div>
            )}
            {data.contactSettings.fields.subject && (
              <div>
                <label className="block mb-2 font-medium">Subject</label>
                <input
                  type="text"
                  className={`w-full p-2 border rounded ${isDark ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"}`}
                  placeholder="Subject"
                />
              </div>
            )}
            {data.contactSettings.fields.message && (
              <div>
                <label className="block mb-2 font-medium">Message</label>
                <textarea
                  className={`w-full p-2 border rounded ${isDark ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"}`}
                  rows={4}
                  placeholder="Your message"
                ></textarea>
              </div>
            )}
            <div>
              <button className="px-4 py-2 rounded text-white" style={getButtonStyles()}>
                {data.contactSettings.submitButtonText}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
