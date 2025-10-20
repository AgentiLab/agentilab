-- Add Agentilab Fin Planer project
-- URL: https://fin-planer.app
-- Date: October 14, 2025

INSERT INTO projects (slug, title, description, tech, image, overview, features, live_url)
VALUES (
  'fin-planer',
  'Agentilab Fin Planer - AI Financial Planning Assistant',
  'Mobile-first autonomous financial planning application powered by Claude Sonnet 4.5. Intelligent portfolio management, goal planning, real-time market data, tax optimization, and AI-driven financial insights with advanced market intelligence.',
  ARRAY['React 18', 'TypeScript', 'Vite', 'Express', 'Claude Sonnet 4.5', 'Financial Modeling Prep API', 'Exa Search API', 'Recharts', 'Tailwind CSS', 'shadcn/ui', 'Framer Motion'],
  'https://raw.githubusercontent.com/simonpierreboucher02/app-image/main/fin-planer-image.png',
  '# Agentilab Fin Planer - AI Financial Planning Assistant

## Overview

Agentilab Fin Planer is an intelligent mobile-first financial planning application that revolutionizes personal finance management through AI automation. Powered by Claude Sonnet 4.5, the application provides autonomous portfolio management, intelligent goal planning, real-time market intelligence, and personalized financial insights.

## Core Capabilities

The application empowers users to:
- **Portfolio Management** with real-time asset tracking and performance analytics
- **AI Financial Advisor** with streaming chat powered by Claude Sonnet 4.5
- **Goal Planning** with progress tracking and milestone notifications
- **Market Intelligence** with live data from Financial Modeling Prep API
- **Tax Optimization** with personalized strategies for wealth preservation
- **Financial Projections** with 1yr, 5yr, and 20yr growth scenarios

## Technical Architecture

### Frontend Stack
- **React 18** with TypeScript for type-safe development
- **Vite** for lightning-fast builds and HMR
- **Tailwind CSS** with dark-first financial theme
- **shadcn/ui** components optimized for mobile
- **Recharts** for interactive data visualization
- **Framer Motion** for smooth animations

### Backend Architecture
- **Node.js** with Express for robust API
- **In-memory storage** for rapid prototyping (PostgreSQL-ready)
- **Claude Sonnet 4.5** as autonomous AI financial advisor
- **Financial Modeling Prep API** for real-time market data
- **Exa Search API** for financial research and tax information

## Market Intelligence Dashboard

Real-time market data integration provides:

**Major Indices Tracking**
- S&P 500, Dow Jones, Nasdaq live updates
- Daily change percentages with visual indicators
- Historical performance trends

**Market Movers**
- Top gainers with price and volume data
- Worst performers for risk awareness
- Sector performance breakdown

**Professional Analysis**
- Real-time quotes for stocks and ETFs
- Company profiles and fundamentals
- Historical price data for trend analysis

## AI-Powered Features

### Autonomous Financial Advisor

Claude Sonnet 4.5 provides intelligent assistance:
- Portfolio analysis with actionable recommendations
- Goal achievement strategies
- Tax optimization insights
- Market trend interpretation
- Risk assessment and mitigation

### Automatic AI Insights

The dashboard displays 3-4 personalized insights:
- Portfolio diversification recommendations
- Rebalancing suggestions based on risk tolerance
- Goal progress alerts and milestone notifications
- Tax-saving opportunities identification

### Smart Alerts System

Intelligent notifications for:
- Goals approaching completion (80%+ progress)
- Portfolio concentration risks
- Major financial milestones
- Tax deadline reminders

## Portfolio Management

### Asset Allocation
- Stocks, ETFs, cryptocurrency, cash holdings
- Real-time price updates via FinPrep API
- Performance tracking with historical data
- Visual pie charts and trend graphs

### Rebalancing Advisor

Risk-based allocation suggestions:
- **Conservative**: 60% bonds, 30% stocks, 10% cash
- **Moderate**: 50% stocks, 40% bonds, 10% alternatives
- **Aggressive**: 70% stocks, 20% alternatives, 10% bonds

Automatic recommendations based on user profile and market conditions.

### Tax Optimization Center

Personalized tax strategies:
- **Tax-Loss Harvesting**: Offset gains with strategic losses
- **Capital Gains Management**: Long-term vs short-term optimization
- **Retirement Account Optimization**: 401(k) and IRA strategies
- **Charitable Giving**: Tax-efficient donation strategies

## Financial Planning Tools

### Goal Planner

Comprehensive goal tracking:
- Custom financial objectives with target amounts
- Timeline visualization with progress indicators
- Automatic milestone notifications
- AI-powered achievement strategies

### Financial Projections

Advanced scenario modeling:
- **1-year**: Short-term projections
- **5-year**: Medium-term planning
- **20-year**: Long-term wealth building

Three growth scenarios:
- **Optimistic**: 12% annual growth
- **Realistic**: 8% annual growth
- **Pessimistic**: 4% annual growth

Interactive charts with compound interest calculations.

## API Integrations

### Financial Modeling Prep API

Comprehensive market data access:
- Company profiles and fundamentals
- Real-time stock quotes
- ETF information and holdings
- Historical price data
- Market indices (S&P 500, Dow, Nasdaq)
- Top gainers and losers
- Sector performance metrics

### Exa Search API

Intelligent financial research:
- Neural search for financial topics
- Tax rules and regulations lookup
- Macroeconomic insights
- Investment research
- Content extraction from financial sources

## Design System

### Color Palette
- **Primary Blue**: #3B82F6 for main actions
- **Teal**: #14B8A6 for success states
- **Success Green**: For positive returns
- **Danger Red**: For losses and warnings
- **AI Purple**: For intelligent features

### Typography
- **UI Text**: Inter for readability
- **Financial Numbers**: JetBrains Mono for precision
- **Hierarchy**: Clear visual structure for data

### Mobile-First Interface
- Bottom navigation for easy thumb access
- Touch targets minimum 44x44px
- Responsive charts and visualizations
- Skeleton loaders for smooth transitions

## Advanced Features

### Help & Documentation

Complete user guide covering:
- Getting started tutorials
- Portfolio management best practices
- Goal setting strategies
- Tax optimization techniques
- AI advisor usage tips

Accessible via header dropdown for instant help.

### Data Visualization

Interactive charts using Recharts:
- Portfolio allocation pie charts
- Performance line graphs
- Projection scenarios with multiple timeframes
- Market trend indicators',
  ARRAY[
    'AI Financial Advisor - Claude Sonnet 4.5 powered chat with streaming responses and personalized insights',
    'Portfolio Management - Real-time asset tracking for stocks, ETFs, crypto, and cash with performance analytics',
    'Market Intelligence - Live market data with S&P 500, Dow Jones, Nasdaq indices and sector performance',
    'Goal Planning - Financial objectives with progress tracking and automatic milestone notifications',
    'Tax Optimization Center - Personalized strategies including loss harvesting, capital gains management, and retirement planning',
    'Portfolio Rebalancing - Risk-based allocation suggestions (conservative, moderate, aggressive)',
    'AI Insights Dashboard - Automatic portfolio analysis with 3-4 actionable recommendations',
    'Smart Alerts - Intelligent notifications for goals progress, portfolio risks, and financial milestones',
    'Financial Projections - 1yr, 5yr, 20yr scenarios with optimistic, realistic, pessimistic growth models',
    'Real-time Market Data - Stock quotes, ETF info, company profiles via Financial Modeling Prep API',
    'Top Gainers & Losers - Daily market movers with price and volume data',
    'Sector Performance - Real-time sector rotation and performance tracking',
    'Financial Research - AI-powered search via Exa API for tax rules and macroeconomic insights',
    'Interactive Visualizations - Recharts-based portfolio charts, performance graphs, and projections',
    'Mobile-First Design - Bottom navigation, touch-optimized interface, responsive layouts',
    'Dark Mode Interface - Optimized for financial data with calm intelligence design',
    'Help & Documentation - Complete user guide with tutorials and best practices',
    'Streaming AI Chat - Real-time conversational financial planning assistance',
    'Net Worth Tracking - Automatic calculation and historical performance monitoring',
    'Financial Health Score - Comprehensive assessment based on portfolio, goals, and risk profile'
  ],
  'https://fin-planer.app'
);
