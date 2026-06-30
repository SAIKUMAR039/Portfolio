interface SkillsListProps {
  skills: string[];
}

export function SkillsList({ skills }: SkillsListProps) {
  return (
    <div className="space-y-2">
      <h3 className="font-semibold">Skills:</h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span key={skill} className="px-3 py-1 bg-secondary rounded-full text-sm">
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}