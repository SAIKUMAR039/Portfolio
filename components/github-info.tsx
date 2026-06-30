import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { ExternalLink, Star, Eye, GitFork } from 'lucide-react';

interface GitHubInfoProps {
  username: string;
}

interface GitHubData {
  name: string;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  followers: number;
  following: number;
  stars: number;
  top_repos: Array<{
    name: string;
    html_url: string;
    stargazers_count: number;
    watchers_count: number;
  }>;
}

const GitHubInfo: React.FC<GitHubInfoProps> = ({ username }) => {
  const [data, setData] = useState<GitHubData | null>(null);

  useEffect(() => {
    async function fetchGitHubData() {
      try {
        const userResponse = await fetch(`https://api.github.com/users/${username}`);
        const userData = await userResponse.json();

        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
        const reposData = await reposResponse.json();

        const stars = reposData.reduce((acc: number, repo: any) => acc + repo.stargazers_count, 0);
        const topRepos = reposData
          .sort((a: any, b: any) => b.watchers_count - a.watchers_count)
          .slice(0, 5)
          .map((repo: any) => ({
            name: repo.name,
            html_url: repo.html_url,
            stargazers_count: repo.stargazers_count,
            watchers_count: repo.watchers_count,
          }));

        setData({
          name: userData.name,
          avatar_url: userData.avatar_url,
          html_url: userData.html_url,
          public_repos: userData.public_repos,
          followers: userData.followers,
          following: userData.following,
          stars,
          top_repos: topRepos,
        });
      } catch (error) {
        console.error('Error fetching GitHub data:', error);
      }
    }

    fetchGitHubData();
  }, [username]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center space-x-4 pb-2">
        <Avatar className="h-16 w-16">
          <AvatarImage src={data.avatar_url} alt={`${data.name}'s avatar`} />
          <AvatarFallback>{username.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col space-y-1 truncate">
          <CardTitle>{data.name}</CardTitle>
          <a href={data.html_url} target="_blank" rel="noopener noreferrer">
            {data.html_url}
            
          </a>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="secondary">👀 Followers: {data.followers}</Badge>
          <Badge variant="secondary">👀 Following: {data.following}</Badge>
        </div>
        <div className="bg-secondary/30 p-3 rounded-lg mb-4">
          <div className="flex items-center justify-center text-lg font-semibold">
            <Star className="mr-2 h-5 w-5 text-yellow-500" />
            Total Stars: {data.stars}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GitHubInfo;