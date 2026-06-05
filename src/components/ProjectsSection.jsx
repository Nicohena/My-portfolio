import { useState, useCallback } from 'react'
import { projects } from '../data/projects'
import PreviewCard from './PreviewCard'
import ProjectOverlay from './ProjectOverlay'
import './ProjectsSection.css'

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState(null)

  const handleSelect = useCallback((project) => {
    setSelectedProject(project)
  }, [])

  const handleClose = useCallback(() => {
    setSelectedProject(null)
  }, [])

  return (
    <>
      <section className="projects-section" id="projects">
        {/* Heading */}
        <div className="projects-header">
          <span className="projects-banner">Selected</span>
          <h2 className="projects-title">Projects</h2>
        </div>

        {/* Card grid */}
        <div className="projects-grid">
          {projects.map((project) => (
            <PreviewCard
              key={project.id}
              project={project}
              onSelect={handleSelect}
            />
          ))}
        </div>
      </section>

      {/* Full-screen detail overlay */}
      {selectedProject && (
        <ProjectOverlay
          project={selectedProject}
          onClose={handleClose}
          onSelectProject={handleSelect}
        />
      )}
    </>
  )
}
