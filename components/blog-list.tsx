import { format } from "date-fns"; // Import date-fns for consistent date formatting

interface Blog {
  title: string;
  link: string;
  date: string;
}

interface BlogListProps {
  blogs: Blog[];
}

export function BlogList({ blogs }: BlogListProps) {
  return (
    <div className="space-y-4">
      {blogs.map((blog, index) => (
        <div key={index} className="p-4 border rounded-lg">
          <a href={blog.link} className="text-lg font-medium">
            {blog.title}
          </a>
          <p className="text-sm text-muted-foreground">
            {format(new Date(blog.date), "dd/MM/yyyy")} {/* Format date consistently */}
          </p>
        </div>
      ))}
    </div>
  );
}

export default BlogList;
