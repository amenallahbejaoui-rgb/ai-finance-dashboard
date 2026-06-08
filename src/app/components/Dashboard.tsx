'use client';

import React from 'react';
import { TrendingUp, TrendingDown, Activity, DollarSign } from 'lucide-react';
import { mockCompanies, mockSentimentData, mockNews } from '../../data/mockData';
import styles from './Dashboard.module.scss';

interface DashboardStats {
  totalValue: number;
  change: number;
  changePercent: number;
  positiveCount: number;
  negativeCount: number;
  neutralCount: number;
}

const Dashboard: React.FC = () => {
  // Calculate dashboard statistics
  const stats: DashboardStats = React.useMemo(() => {
    const totalValue = mockCompanies.reduce((sum, company) => sum + company.marketCap, 0);
    const totalChange = mockCompanies.reduce((sum, company) => sum + company.change, 0);
    const changePercent = mockCompanies.reduce((sum, company) => sum + company.changePercent, 0) / mockCompanies.length;
    
    const sentimentCounts = mockCompanies.reduce(
      (acc, company) => {
        if (company.sentiment.score > 0.1) acc.positive++;
        else if (company.sentiment.score < -0.1) acc.negative++;
        else acc.neutral++;
        return acc;
      },
      { positive: 0, negative: 0, neutral: 0 }
    );
    
    return {
      totalValue,
      change: totalChange,
      changePercent,
      positiveCount: sentimentCounts.positive,
      negativeCount: sentimentCounts.negative,
      neutralCount: sentimentCounts.neutral
    };
  }, []);

  const latestSentiment = mockSentimentData[mockSentimentData.length - 1];

  const formatCurrency = (value: number): string => {
    if (value >= 1e12) return `$${(value / 1e12).toFixed(1)}T`;
    if (value >= 1e9) return `$${(value / 1e9).toFixed(1)}B`;
    if (value >= 1e6) return `$${(value / 1e6).toFixed(1)}M`;
    return `$${value.toLocaleString()}`;
  };

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>AI Finance Dashboard</h1>
          <p className={styles.subtitle}>
            Real-time sentiment analysis and market insights
          </p>
        </div>
        <div className={styles.dateInfo}>
          <span className={styles.date}>
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </span>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className={styles.statsGrid}>
        <div className={`${styles.statCard} ${styles.primary}`}>
          <div className={styles.statIcon}>
            <DollarSign size={24} />
          </div>
          <div className={styles.statContent}>
            <h3 className={styles.statValue}>{formatCurrency(stats.totalValue)}</h3>
            <p className={styles.statLabel}>Total Market Cap</p>
            <div className={`${styles.statChange} ${stats.changePercent >= 0 ? styles.positive : styles.negative}`}>
              {stats.changePercent >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
              <span>{stats.changePercent >= 0 ? '+' : ''}{stats.changePercent.toFixed(2)}%</span>
            </div>
          </div>
        </div>

        <div className={`${styles.statCard} ${styles.success}`}>
          <div className={styles.statIcon}>
            <TrendingUp size={24} />
          </div>
          <div className={styles.statContent}>
            <h3 className={styles.statValue}>{stats.positiveCount}</h3>
            <p className={styles.statLabel}>Positive Sentiment</p>
            <div className={styles.statPercentage}>
              {((stats.positiveCount / mockCompanies.length) * 100).toFixed(0)}% of companies
            </div>
          </div>
        </div>

        <div className={`${styles.statCard} ${styles.warning}`}>
          <div className={styles.statIcon}>
            <Activity size={24} />
          </div>
          <div className={styles.statContent}>
            <h3 className={styles.statValue}>{stats.neutralCount}</h3>
            <p className={styles.statLabel}>Neutral Sentiment</p>
            <div className={styles.statPercentage}>
              {((stats.neutralCount / mockCompanies.length) * 100).toFixed(0)}% of companies
            </div>
          </div>
        </div>

        <div className={`${styles.statCard} ${styles.danger}`}>
          <div className={styles.statIcon}>
            <TrendingDown size={24} />
          </div>
          <div className={styles.statContent}>
            <h3 className={styles.statValue}>{stats.negativeCount}</h3>
            <p className={styles.statLabel}>Negative Sentiment</p>
            <div className={styles.statPercentage}>
              {((stats.negativeCount / mockCompanies.length) * 100).toFixed(0)}% of companies
            </div>
          </div>
        </div>
      </div>

      {/* Overall Sentiment Indicator */}
      <div className={styles.sentimentOverview}>
        <h2 className={styles.sectionTitle}>Market Sentiment Overview</h2>
        <div className={styles.sentimentBar}>
          <div 
            className={styles.sentimentPositive}
            style={{ width: `${latestSentiment.positive}%` }}
          />
          <div 
            className={styles.sentimentNeutral}
            style={{ width: `${latestSentiment.neutral}%` }}
          />
          <div 
            className={styles.sentimentNegative}
            style={{ width: `${latestSentiment.negative}%` }}
          />
        </div>
        <div className={styles.sentimentLabels}>
          <div className={styles.sentimentLabel}>
            <div className={`${styles.sentimentDot} ${styles.positive}`}></div>
            <span>Positive ({latestSentiment.positive}%)</span>
          </div>
          <div className={styles.sentimentLabel}>
            <div className={`${styles.sentimentDot} ${styles.neutral}`}></div>
            <span>Neutral ({latestSentiment.neutral}%)</span>
          </div>
          <div className={styles.sentimentLabel}>
            <div className={`${styles.sentimentDot} ${styles.negative}`}></div>
            <span>Negative ({latestSentiment.negative}%)</span>
          </div>
        </div>
      </div>

      {/* Recent News Section */}
      <div className={styles.recentNews}>
        <h2 className={styles.sectionTitle}>Latest Market News</h2>
        <div className={styles.newsList}>
          {mockNews.slice(0, 3).map((news) => (
            <div key={news.id} className={styles.newsItem}>
              <div className={styles.newsHeader}>
                <h3 className={styles.newsTitle}>{news.title}</h3>
                <div className={`${styles.sentimentBadge} ${
                  news.sentiment > 0.1 ? styles.positive : 
                  news.sentiment < -0.1 ? styles.negative : styles.neutral
                }`}>
                  {news.sentiment > 0.1 ? 'Positive' : 
                   news.sentiment < -0.1 ? 'Negative' : 'Neutral'}
                </div>
              </div>
              <p className={styles.newsSubtitle}>{news.summary}</p>
              <div className={styles.newsFooter}>
                <span className={styles.newsSource}>{news.source}</span>
                <span className={styles.newsTime}>
                  {new Date(news.publishedAt).toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
