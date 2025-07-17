export default function CreativeTemplate({ data }) {
  return (
    <div className="p-6 space-y-8 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg">
      <header className="text-center">
        <h1 className="text-4xl font-bold text-purple-800">{data.name}</h1>
        <p className="text-xl text-purple-600 mt-2">{data.title}</p>
      </header>

      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-purple-700 mb-4">{data.sectionTitles.about}</h2>
        <p className="text-gray-700">{data.about}</p>
      </section>

      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-purple-700 mb-4">{data.sectionTitles.projects}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.projects.map((project, index) => (
            <div key={index} className="border border-purple-200 rounded-lg overflow-hidden">
              <div className="aspect-video bg-purple-100">
                <img
                  src={project.image || "/placeholder.svg?height=200&width=400"}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold text-purple-700">{project.title}</h3>
                <p className="text-gray-600 mt-2">{project.description}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {project.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="text-center text-gray-500 text-sm">
        <p>
          © {new Date().getFullYear()} {data.name} - Creative Portfolio
        </p>
      </footer>
    </div>
  )
}
