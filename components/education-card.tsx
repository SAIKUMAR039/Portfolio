import { Card } from "./ui/card";

interface Education {
  title: string;
  company: string;
  period: string;
}

interface EducationCardProps {
  experiences: Education[];
}

export function EducationCard({ experiences }: EducationCardProps) {
  return (
    <Card className="p-6">
      <h3 className="font-semibold mb-4">Education</h3>
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