import type { ReactNode } from 'react';

interface SectionProps {
  id: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export default function Section({ id, title, subtitle, children }: SectionProps) {
  let showTitle = title == null ? 'container__no_title' : 'container__full';
  return (
    <>
      <section id={id} className={`${showTitle}`}>
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