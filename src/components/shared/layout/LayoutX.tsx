import type { ReactNode } from 'react';
import './layout.css';

interface LayoutProps {
  id: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export default function LayoutX({ id, title, subtitle, children }: LayoutProps) {
  return (
    <>
      <div id={id} className="layout">
        <div className="container">
          <div class="layout__horizontal max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
            <div class="lg:w-1/2 xl:w-6/12 p-6 sm:p-12 bg-gray-100/20">
              <div class="mt-12 flex flex-col items-center">
                <h2 class="text-2xl xl:text-3xl font-extrabold">
                    {title}
                </h2>
                <hr className="mt-4 border border-gray-100 w-full" />
              </div>
              <div class="mx-auto max-w-sm mt-10">
                {children}
              </div>
            </div>
            <div class="flex-1 text-center hidden lg:flex">
              <div class="bg-image w-full">
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}