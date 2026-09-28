import type { Metadata } from 'next';
import { EngineeringToolkit } from '@/components/engineering-toolkit';
import { PageFrame } from '@/components/page-frame';

export const metadata: Metadata = {
  title: 'Engineering Toolkit',
  description: "Four live circuit tools for Ohm's Law, voltage dividers, LED resistor sizing, and RC time constants.",
};

export default function ToolkitPage() {
  return <PageFrame><EngineeringToolkit /></PageFrame>;
}
