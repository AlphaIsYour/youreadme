// Core types for Reavas

export type SectionType =
  | 'header'
  | 'badges'
  | 'description'
  | 'features'
  | 'screenshots'
  | 'installation'
  | 'usage'
  | 'tech-stack'
  | 'roadmap'
  | 'contributing'
  | 'faq'
  | 'license'
  | 'acknowledgements'
  | 'custom';

export interface Section {
  id: string;
  type: SectionType;
  title: string;
  content: string;
  enabled: boolean;
  order: number;
}

export interface ProjectData {
  name: string;
  description: string;
  version: string;
  author: string;
  license: string;
  repository: string;
  homepage: string;
  keywords: string[];
  sections: Section[];
}

export interface Badge {
  id: string;
  label: string;
  message: string;
  color: string;
  logo?: string;
  logoColor?: string;
  url?: string;
  category: string;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  icon: string;
  sections: Section[];
  defaultProject: Partial<ProjectData>;
}

export interface ChecklistItem {
  id: string;
  label: string;
  description: string;
  checked: boolean;
  category: 'essential' | 'recommended' | 'optional';
}

export interface ValidationResult {
  valid: boolean;
  warnings: string[];
  errors: string[];
}
