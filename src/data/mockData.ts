export interface Company {
  id: string;
  name: string;
  symbol: string;
  sector: string;
  sentiment: {
    score: number; // -1 to 1
    label: 'Positive' | 'Neutral' | 'Negative';
    trend: 'up' | 'down' | 'stable';
  };
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: number;
  logo?: string;
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  sentiment: number;
  source: string;
  publishedAt: string;
  companySymbol: string;
}

export interface SentimentData {
  date: string;
  positive: number;
  neutral: number;
  negative: number;
  overall: number;
}

// Mock Companies Data
export const mockCompanies: Company[] = [
  {
    id: '1',
    name: 'Apple Inc.',
    symbol: 'AAPL',
    sector: 'Technology',
    sentiment: {
      score: 0.7,
      label: 'Positive',
      trend: 'up'
    },
    price: 189.45,
    change: 2.34,
    changePercent: 1.25,
    volume: 45234567,
    marketCap: 2980000000000
  },
  {
    id: '2',
    name: 'Microsoft Corporation',
    symbol: 'MSFT',
    sector: 'Technology',
    sentiment: {
      score: 0.5,
      label: 'Positive',
      trend: 'up'
    },
    price: 378.92,
    change: 4.67,
    changePercent: 1.25,
    volume: 23456789,
    marketCap: 2810000000000
  },
  {
    id: '3',
    name: 'Tesla Inc.',
    symbol: 'TSLA',
    sector: 'Automotive',
    sentiment: {
      score: -0.2,
      label: 'Negative',
      trend: 'down'
    },
    price: 234.56,
    change: -5.78,
    changePercent: -2.41,
    volume: 78901234,
    marketCap: 745000000000
  },
  {
    id: '4',
    name: 'Amazon.com Inc.',
    symbol: 'AMZN',
    sector: 'E-commerce',
    sentiment: {
      score: 0.3,
      label: 'Positive',
      trend: 'stable'
    },
    price: 156.78,
    change: 1.23,
    changePercent: 0.79,
    volume: 34567890,
    marketCap: 1620000000000
  },
  {
    id: '5',
    name: 'NVIDIA Corporation',
    symbol: 'NVDA',
    sector: 'Technology',
    sentiment: {
      score: 0.8,
      label: 'Positive',
      trend: 'up'
    },
    price: 489.12,
    change: 12.45,
    changePercent: 2.61,
    volume: 56789012,
    marketCap: 1200000000000
  }
];

// Mock News Data
export const mockNews: NewsItem[] = [
  {
    id: '1',
    title: 'Apple Reports Strong Q4 Earnings, iPhone Sales Exceed Expectations',
    summary: 'Apple\'s latest quarterly results show robust growth in iPhone sales and services revenue.',
    sentiment: 0.8,
    source: 'Financial Times',
    publishedAt: '2025-01-23T14:30:00Z',
    companySymbol: 'AAPL'
  },
  {
    id: '2',
    title: 'Microsoft Azure Cloud Growth Continues to Accelerate',
    summary: 'Microsoft\'s cloud division shows impressive growth, driving overall company performance.',
    sentiment: 0.7,
    source: 'Reuters',
    publishedAt: '2025-01-23T12:15:00Z',
    companySymbol: 'MSFT'
  },
  {
    id: '3',
    title: 'Tesla Faces Production Challenges in China Factory',
    summary: 'Tesla encounters manufacturing delays that could impact Q1 delivery targets.',
    sentiment: -0.4,
    source: 'Bloomberg',
    publishedAt: '2025-01-23T10:45:00Z',
    companySymbol: 'TSLA'
  },
  {
    id: '4',
    title: 'Amazon Invests Heavily in AI Infrastructure',
    summary: 'Amazon announces major investments in artificial intelligence and machine learning capabilities.',
    sentiment: 0.6,
    source: 'TechCrunch',
    publishedAt: '2025-01-23T09:20:00Z',
    companySymbol: 'AMZN'
  },
  {
    id: '5',
    title: 'NVIDIA Launches Next-Generation AI Chips',
    summary: 'NVIDIA unveils breakthrough technology that could revolutionize AI computing.',
    sentiment: 0.9,
    source: 'Wired',
    publishedAt: '2025-01-23T08:00:00Z',
    companySymbol: 'NVDA'
  }
];

// Mock Sentiment Timeline Data
export const mockSentimentData: SentimentData[] = [
  { date: '2025-01-17', positive: 45, neutral: 35, negative: 20, overall: 0.25 },
  { date: '2025-01-18', positive: 52, neutral: 30, negative: 18, overall: 0.34 },
  { date: '2025-01-19', positive: 48, neutral: 32, negative: 20, overall: 0.28 },
  { date: '2025-01-20', positive: 55, neutral: 28, negative: 17, overall: 0.38 },
  { date: '2025-01-21', positive: 42, neutral: 38, negative: 20, overall: 0.22 },
  { date: '2025-01-22', positive: 58, neutral: 25, negative: 17, overall: 0.41 },
  { date: '2025-01-23', positive: 61, neutral: 24, negative: 15, overall: 0.46 }
];

// Mock Word Cloud Data
export const mockTrendingKeywords = [
  { text: 'AI', value: 120 },
  { text: 'Growth', value: 95 },
  { text: 'Innovation', value: 85 },
  { text: 'Cloud', value: 78 },
  { text: 'Revenue', value: 72 },
  { text: 'Investment', value: 68 },
  { text: 'Technology', value: 65 },
  { text: 'Earnings', value: 62 },
  { text: 'Market', value: 58 },
  { text: 'Future', value: 55 },
  { text: 'Digital', value: 52 },
  { text: 'Expansion', value: 48 },
  { text: 'Sustainability', value: 45 },
  { text: 'Partnership', value: 42 },
  { text: 'Acquisition', value: 38 }
];

// Helper functions
export const getSentimentColor = (score: number): string => {
  if (score > 0.1) return '#10B981'; // Green
  if (score < -0.1) return '#EF4444'; // Red
  return '#F59E0B'; // Yellow
};

export const getSentimentLabel = (score: number): string => {
  if (score > 0.1) return 'Positive';
  if (score < -0.1) return 'Negative';
  return 'Neutral';
};

export const formatMarketCap = (value: number): string => {
  if (value >= 1e12) return `$${(value / 1e12).toFixed(1)}T`;
  if (value >= 1e9) return `$${(value / 1e9).toFixed(1)}B`;
  if (value >= 1e6) return `$${(value / 1e6).toFixed(1)}M`;
  return `$${value.toLocaleString()}`;
};

export const formatVolume = (value: number): string => {
  if (value >= 1e9) return `${(value / 1e9).toFixed(1)}B`;
  if (value >= 1e6) return `${(value / 1e6).toFixed(1)}M`;
  if (value >= 1e3) return `${(value / 1e3).toFixed(1)}K`;
  return value.toString();
};
