export interface Project {
  id?: string;
  name: string;
  gitURL: string;
  liveURL?: string;
  description: string;
  technologies: readonly string[];
  image: string;
  year: string;
  features: readonly string[];
}