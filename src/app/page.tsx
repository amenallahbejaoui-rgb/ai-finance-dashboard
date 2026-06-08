'use client';

import React from "react";
import Dashboard from "./components/Dashboard";
import CompanyCard from "./components/CompanyCard";
import { mockCompanies } from "../data/mockData";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      {/* Main Dashboard */}
      <Dashboard />
      
      {/* Companies Grid */}
      <section className={styles.companiesSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Company Analysis</h2>
          <p className={styles.sectionSubtitle}>
            Detailed sentiment analysis and market performance for tracked companies
          </p>
        </div>
        
        <div className={styles.companiesGrid}>
          {mockCompanies.map((company) => (
            <CompanyCard 
              key={company.id} 
              company={company}
              onClick={() => {
                // TODO: Navigate to company detail page
                console.log(`Viewing details for ${company.name}`);
              }}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
