import { Card } from "@/components/ui/card";

interface Experience {
  title: string;
  company: string;
  period: string;
}

interface ExperienceCardProps {
  experiences: Experience[];
  title: string;
}

export function ExperienceCard({ experiences, title }: ExperienceCardProps) {
  return (
    <Card className="p-6">
      <h3 className="font-semibold mb-4">{title}</h3>
      <div className="space-y-4">
        {experiences.map((exp, index) => (
          <div key={index}>
            <h4 className="font-medium">{exp.title}</h4>
            <p className="text-sm text-muted-foreground">{exp.company} • {exp.period}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default ExperienceCard;