export default function CorporateTemplate({ data }) {
  return (
    <div className="p-6 space-y-8 bg-gray-50 rounded-lg">
      <header className="bg-blue-900 text-white p-8 rounded-lg">
        <h1 className="text-4xl font-bold">{data.name}</h1>
        <p className="text-xl mt-2">{data.title}</p>
      </header>

      <section className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-700">
        <h2 className="text-2xl font-bold text-blue-900 mb-4">{data.sectionTitles.about}</h2>
        <p className="text-gray-700">{data.about}</p>
      </section>

      <section className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-700">
        <h2 className="text-2xl font-bold text-blue-900 mb-4">{data.sectionTitles.projects}</h2>
        <div className="space-y-4">
          {data.projects.map((project, index) => (
            <div key={index} className="flex flex-col md:flex-row gap-4 border-b border-gray-200 pb-4">
              <div className="md:w-1/3 aspect-video bg-gray-100">
                <img
                  src={project.image || "/placeholder.svg?height=200&width=400"}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="md:w-2/3">
                <h3 className="text-xl font-bold text-blue-800">{project.title}</h3>
                <p className="text-gray-600 mt-2">{project.description}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {project.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="text-center text-gray-500 text-sm border-t border-gray-200 pt-4">
        <p>
          © {new Date().getFullYear()} {data.name} - Professional Portfolio
        </p>
      </footer>
    </div>
  )
}
