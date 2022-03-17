export interface MdxData {
  content: string;
  data: {
    [key: string]: any;
  };
  filePath: string;
}

export interface GuidesPageProps {
  featuredGuides?: GuideData[];
  guides: GuideData[];
}
export interface TocHeading {
  text: string;
  level: number;
  link: string;
}

export interface Guide {
  title: string;
  author: string;
  authorAvatar: string;
  authorAvatar2?: string;
  authorTwitter: string;
  authorTwitter2?: string;
  tags: string[];
  summary: string;
  date: string;
  updated: string;
  image: string;
  draft: boolean;
  featuredOrder?: number;
}

export interface Doc {
  title: string;
  author: string;
  authorAvatar: string;
  authorAvatar2?: string;
  authorTwitter: string;
  authorTwitter2?: string;
  summary: string;
  date: string;
  updated: string;
}

export interface GuideData {
  metadata: Guide;
  slug: string;
}
