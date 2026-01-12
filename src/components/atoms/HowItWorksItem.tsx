import { type ReactNode } from 'react';

type Props = {
  icon: ReactNode;
  title: string;
  description: string;
};

export function HowItWorksItem({ icon, title, description }: Props) {
  return (
    <div className="rounded-2xl border p-5 hover:scale-105 transition-all">
      <div className="mb-4 h-5 w-5">{icon}</div>
      <h3 className="text-sm font-medium text-yellow-400">{title}</h3>
      <p className="mt-2 text-sm text-gray-300">{description}</p>
    </div>
  );
}
