import type { ReactNode } from 'react';

interface SectionProps {
  id: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export default function Section({ id, title, subtitle, children }: SectionProps) {
  return (
    <>
      <section id={id}>
        <div className="container">
          <div className="text-center">
            <h2 className="text-gray-800 font-bold mb-2">
              {title}
            </h2>
            {subtitle && (
              <p className="text-gray-700 mb-8">{subtitle}</p>
            )}
          </div>
          <div className="">
            {children}
          </div>
        </div>
      </section>
    </>
  );
}