export default function ModernTemplate({ data }) {
  return (
    <div className="p-6 space-y-8 bg-white rounded-lg">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 border-b border-gray-200 pb-6">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">{data.name}</h1>
          <p className="text-xl text-gray-600 mt-2">{data.title}</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-black text-white rounded-full">{data.primaryCta.text}</button>
          <button className="px-4 py-2 border border-gray-300 rounded-full">{data.secondaryCta.text}</button>
        </div>
      </header>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{data.sectionTitles.about}</h2>
        <p className="text-gray-700">{data.about}</p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{data.sectionTitles.projects}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.projects.map((project, index) => (
            <div key={index} className="group overflow-hidden rounded-xl bg-gray-50 transition-all hover:shadow-lg">
              <div className="aspect-video overflow-hidden">
                <img
                  src={project.image || "/placeholder.svg?height=200&width=400"}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
                <p className="text-gray-600 mt-2">{project.description}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {project.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="px-2 py-1 bg-gray-200 text-gray-700 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="text-center text-gray-500 text-sm border-t border-gray-200 pt-6 mt-12">
        <p>
          © {new Date().getFullYear()} {data.name} - Modern Portfolio
        </p>
      </footer>
    </div>
  )
}
