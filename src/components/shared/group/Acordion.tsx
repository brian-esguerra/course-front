import type { ReactNode } from 'react';

interface AcordionProps {
  ref: string;
  title: string;
  children: ReactNode;
}

export default function Acordion({ref, title, children }: AcordionProps) {
  return (
    <div id={ref} class="border-b border-b-gray-300">
      <details class="group" open>
          <summary
            class="flex cursor-pointer list-none items-center justify-between py-4 text-lg font-medium text-secondary-900 group-open:text-primary-500">
            {title}
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="block h-5 w-5 group-open:hidden">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="hidden h-5 w-5 group-open:block">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15" />
              </svg>
            </div>
          </summary>
          <div class="pb-4">
            {children}
          </div>
      </details>
    </div>
  );
}