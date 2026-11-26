import type { Project } from "@/lib/projects";

/** Shows the project's image, or a styled placeholder with its name when no image is set. */
export function Thumb({ project, large = false }: { project: Project; large?: boolean }) {
  if (project.thumbnail) {
    return (
      <img
        src={project.thumbnail}
        alt={`${project.name} preview`}
        width={1600}
        height={1000}
        loading={large ? "eager" : "lazy"}
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
    );
  }
  return (
    <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-accent/25 via-ink to-cyan/20">
      <span
        className={`font-display font-bold tracking-tight text-paper/80 ${large ? "text-7xl" : "text-4xl"}`}
      >
        {project.name}
      </span>
    </div>
  );
}
