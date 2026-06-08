'use client';

import React from 'react';
import { TrendingUp, TrendingDown, Minus, DollarSign, Volume2 } from 'lucide-react';
import { Company, formatMarketCap, formatVolume, getSentimentColor } from '../../data/mockData';
import styles from './CompanyCard.module.scss';

interface CompanyCardProps {
  company: Company;
  onClick?: () => void;
}

const CompanyCard: React.FC<CompanyCardProps> = ({ company, onClick }) => {
  const sentimentColor = getSentimentColor(company.sentiment.score);
  const isPositiveChange = company.changePercent >= 0;

  const getTrendIcon = () => {
    switch (company.sentiment.trend) {
      case 'up':
        return <TrendingUp size={16} className={styles.trendIcon} />;
      case 'down':
        return <TrendingDown size={16} className={styles.trendIcon} />;
      default:
        return <Minus size={16} className={styles.trendIcon} />;
    }
  };

  return (
    <div 
      className={`${styles.card} ${onClick ? styles.clickable : ''}`}
      onClick={onClick}
    >
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.companyInfo}>
          <h3 className={styles.companyName}>{company.name}</h3>
          <span className={styles.symbol}>{company.symbol}</span>
        </div>
        <div className={styles.sector}>
          {company.sector}
        </div>
      </div>

      {/* Price Information */}
      <div className={styles.priceSection}>
        <div className={styles.currentPrice}>
          <DollarSign size={20} />
          <span className={styles.price}>${company.price.toFixed(2)}</span>
        </div>
        <div className={`${styles.priceChange} ${isPositiveChange ? styles.positive : styles.negative}`}>
          {isPositiveChange ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
          <span>
            {isPositiveChange ? '+' : ''}${company.change.toFixed(2)} ({isPositiveChange ? '+' : ''}{company.changePercent.toFixed(2)}%)
          </span>
        </div>
      </div>

      {/* Sentiment Analysis */}
      <div className={styles.sentimentSection}>
        <div className={styles.sentimentHeader}>
          <span className={styles.sentimentLabel}>Sentiment Analysis</span>
          {getTrendIcon()}
        </div>
        
        <div className={styles.sentimentScore}>
          <div 
            className={styles.sentimentBar}
            style={{ 
              background: `linear-gradient(90deg, ${sentimentColor} ${Math.abs(company.sentiment.score) * 50}%, var(--bg-tertiary) ${Math.abs(company.sentiment.score) * 50}%)`
            }}
          >
            <div 
              className={styles.sentimentFill}
              style={{ 
                width: `${Math.abs(company.sentiment.score) * 100}%`,
                background: sentimentColor
              }}
            />
          </div>
          <span 
            className={styles.sentimentText}
            style={{ color: sentimentColor }}
          >
            {company.sentiment.label} ({(company.sentiment.score * 100).toFixed(0)}%)
          </span>
        </div>
      </div>

      {/* Market Data */}
      <div className={styles.marketData}>
        <div className={styles.marketItem}>
          <Volume2 size={16} />
          <div className={styles.marketItemContent}>
            <span className={styles.marketLabel}>Volume</span>
            <span className={styles.marketValue}>{formatVolume(company.volume)}</span>
          </div>
        </div>
        <div className={styles.marketItem}>
          <DollarSign size={16} />
          <div className={styles.marketItemContent}>
            <span className={styles.marketLabel}>Market Cap</span>
            <span className={styles.marketValue}>{formatMarketCap(company.marketCap)}</span>
          </div>
        </div>
      </div>

      {/* Sentiment Trend Indicator */}
      <div className={styles.trendIndicator}>
        <div className={`${styles.trendDot} ${styles[company.sentiment.trend]}`} />
        <span className={styles.trendText}>
          {company.sentiment.trend === 'up' ? 'Improving' : 
           company.sentiment.trend === 'down' ? 'Declining' : 'Stable'} sentiment
        </span>
      </div>
    </div>
  );
};

export default CompanyCard;
