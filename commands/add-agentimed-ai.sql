-- Add AgentiMed.ai - Autonomous Medical Assistant project
-- URL: https://agentimedai.app
-- Date: October 14, 2025

INSERT INTO projects (slug, title, description, tech, image, overview, features, live_url)
VALUES (
  'agentimed-ai',
  'AgentiMed.ai - Autonomous Medical Assistant',
  'Mobile-first medical diagnostic assistant powered by Claude Sonnet 4.5 and Exa API. AI-powered differential diagnosis, vital signs monitoring, symptom tracking, conversational health insights, and medical research for educational purposes with comprehensive safety disclaimers.',
  ARRAY['React 18', 'TypeScript', 'Express', 'Claude Sonnet 4.5', 'Exa API', 'Tailwind CSS', 'shadcn/ui', 'TanStack Query', 'Medical AI', 'Health Monitoring'],
  'https://raw.githubusercontent.com/simonpierreboucher02/app-image/main/agentimed-ai-image.png',
  '# AgentiMed.ai - Autonomous Medical Assistant

## Overview

AgentiMed.ai is an intelligent mobile-first medical diagnostic assistant that leverages advanced AI to provide health tracking, symptom analysis, and differential diagnosis capabilities. Powered by Claude Sonnet 4.5 and Exa API, the application offers conversational health insights, vital signs monitoring, and access to latest medical guidelines for educational purposes.

**Important Medical Disclaimer**: This system is for informational and educational purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment. Always consult qualified healthcare professionals for medical decisions.

## Core Capabilities

The application provides comprehensive health tracking:
- **Vital Signs Monitoring** with color-coded health status indicators
- **Symptom Tracking** with intensity and duration recording
- **AI Differential Diagnosis** with probability-ranked conditions
- **Medical Research** access to latest clinical guidelines via Exa API
- **Conversational AI Assistant** for health questions and insights
- **Test Results Management** for lab values and measurements

## Technical Architecture

### Frontend Stack
- **React 18** with TypeScript for type-safe medical applications
- **TanStack Query** for server state management
- **Tailwind CSS** with medical blue and health green theme
- **shadcn/ui** components optimized for health interfaces
- **Mobile-first design** following Apple Health Interface Guidelines
- **Dark/Light mode** with clinical aesthetic

### Backend Architecture
- **Node.js** with Express for robust API
- **In-memory storage** for rapid prototyping (PostgreSQL-ready)
- **Claude Sonnet 4.5** for differential diagnosis and health conversations
- **Exa API** for medical research and clinical protocol search
- **RESTful endpoints** for all medical data operations

## AI-Powered Differential Diagnosis

Claude Sonnet 4.5 provides intelligent medical analysis:

### Diagnostic Process
1. Patient provides symptoms and vital signs
2. AI analyzes clinical presentation
3. Generates probability-ranked differential diagnoses
4. Provides ICD-10 codes for each condition
5. Includes medical reasoning and evidence
6. Recommends next steps and investigations

### Diagnosis Structure
Each AI-generated diagnosis includes:
- **Condition Name**: Clear medical terminology
- **Probability**: Likelihood percentage (0-100%)
- **ICD-10 Code**: International disease classification
- **Reasoning**: Clinical logic and evidence base
- **Recommendations**: Suggested tests, treatments, or referrals
- **Urgency Level**: Immediate, urgent, or routine care

## Vital Signs Monitoring

Comprehensive health metrics tracking:

### Tracked Vitals
- **Blood Pressure**: Systolic and diastolic readings with status indicators
- **Heart Rate**: Beats per minute with normal range detection
- **Temperature**: Body temperature in Celsius or Fahrenheit
- **SpO2**: Blood oxygen saturation percentage
- **Blood Glucose**: Glucose levels for diabetes management
- **Respiratory Rate**: Breaths per minute

### Status Indicators
Color-coded health status system:
- **Green**: Normal, healthy range
- **Yellow**: Borderline, monitor closely
- **Red**: Abnormal, seek medical attention

Real-time alerts for critical values.

## Symptom Tracker

Intelligent symptom recording:

### Quick Add Common Symptoms
Pre-configured buttons for rapid entry:
- Headache, Fever, Cough, Fatigue
- Nausea, Dizziness, Pain
- Custom symptom descriptions

### Symptom Details
- **Description**: Clear symptom presentation
- **Intensity**: Scale from mild to severe (1-10)
- **Duration**: Time since onset
- **Associated Factors**: Triggers, relieving factors
- **Timestamp**: Automatic recording time

## Medical Research Integration

Exa API provides access to authoritative sources:

### Research Capabilities
- **Clinical Guidelines**: Latest treatment protocols
- **Medical Literature**: PubMed and peer-reviewed journals
- **Drug Information**: Medication details and interactions
- **Diagnostic Criteria**: Evidence-based diagnostic standards

### Automatic Context
AI assistant automatically searches relevant medical information when:
- Generating differential diagnoses
- Answering health questions
- Explaining medical terminology
- Providing treatment recommendations

## Conversational Health Assistant

Interactive AI chat powered by Claude Sonnet 4.5:

### Chat Features
- Natural language health discussions
- Medical terminology explanation
- Symptom interpretation
- Treatment option discussions
- Medication information
- Preventive health advice

### Safety Integration
Every response includes:
- Medical disclaimer reminders
- Encouragement to consult healthcare professionals
- Clear distinction between AI insights and medical advice
- Emergency situation recognition with 911 prompts

## Test Results Management

Comprehensive laboratory tracking:

### Supported Tests
- Blood work (CBC, metabolic panels)
- Urinalysis results
- Imaging study notes
- Specialist consultations
- Home monitoring readings

### Result Visualization
- Trend graphs for longitudinal tracking
- Normal range comparisons
- Historical value tracking
- Export capabilities for healthcare providers

## Patient Profile System

Centralized health information:

### Profile Data
- **Demographics**: Age, sex, height, weight
- **Medical History**: Chronic conditions, surgeries
- **Allergies**: Medication and environmental
- **Current Medications**: Active prescriptions
- **Family History**: Genetic risk factors
- **Lifestyle Factors**: Exercise, diet, smoking status

Profile data enhances AI diagnostic accuracy.

## Design System

### Medical Color Palette
- **Medical Blue**: #2563EB for trust and professionalism
- **Health Green**: #10B981 for positive indicators
- **Warning Amber**: For borderline values
- **Alert Red**: For critical readings
- **Clinical White**: Clean medical interface

### Typography
- **Primary**: Inter for medical text clarity
- **Display**: DM Sans for headers
- **Monospace**: JetBrains Mono for vital signs and lab values

### Mobile-First Interface
Following Apple Health Interface Guidelines:
- Touch targets minimum 44x44px
- Swipeable data cards
- Quick-action buttons
- Smooth, calm animations
- WCAG AAA accessibility compliance

## Safety and Compliance

### Medical Disclaimers
Prominently displayed on all pages:
- Educational purposes only
- Not medical advice
- Consult healthcare professionals
- Emergency situations require 911

### Data Privacy
- Patient data stored securely
- No sharing with third parties
- HIPAA-aware architecture (ready for compliance)
- User data control and deletion

### Clinical Accuracy
- Evidence-based information sources
- Regular medical knowledge updates
- Transparent AI reasoning
- Source attribution for medical facts',
  ARRAY[
    'AI Differential Diagnosis - Claude Sonnet 4.5 generates probability-ranked diagnoses with ICD-10 codes and reasoning',
    'Vital Signs Monitoring - Track blood pressure, heart rate, temperature, SpO2, glucose with color-coded status indicators',
    'Symptom Tracker - Record symptoms with intensity (1-10), duration, and quick-add common conditions',
    'Conversational Health Assistant - Chat with Claude Sonnet 4.5 for medical insights and health questions',
    'Medical Research - Exa API access to clinical guidelines, PubMed literature, and treatment protocols',
    'Test Results Management - Track lab work, imaging studies, and home monitoring readings',
    'Patient Profile - Comprehensive health history including allergies, medications, and family history',
    'Health Status Indicators - Color-coded alerts for normal (green), borderline (yellow), abnormal (red) readings',
    'Mobile-First Design - Touch-optimized interface following Apple Health Interface Guidelines',
    'Dark/Light Mode - Clinical aesthetic optimized for medical data viewing',
    'ICD-10 Coding - International disease classification for all diagnoses',
    'Clinical Reasoning - Transparent AI logic showing evidence base for each diagnosis',
    'Treatment Recommendations - AI-suggested next steps, tests, and referrals',
    'Urgency Assessment - Categorization of conditions by care urgency (immediate, urgent, routine)',
    'Medical Terminology - Clear explanations of complex medical terms',
    'Trend Analysis - Longitudinal tracking of vital signs and lab values',
    'Emergency Recognition - AI detects critical situations and prompts 911 contact',
    'Medical Disclaimers - Comprehensive safety warnings on all pages and interactions',
    'WCAG AAA Accessibility - Full compliance for users with disabilities',
    'Evidence-Based Information - All medical data from authoritative peer-reviewed sources'
  ],
  'https://agentimedai.app'
);
