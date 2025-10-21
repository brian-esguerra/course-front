import type { ReactNode } from 'react';
import './layout.css';

interface LayoutSimpleProps {
  ref: string;
  sizeLeft: number;
  sizeRigth: number;
  form: ReactNode;
  children: ReactNode;
}

const colMap: Record<number, string> = {
  1: "lg:w-1/12",
  2: "lg:w-2/12",
  3: "lg:w-3/12",
  4: "lg:w-4/12",
  5: "lg:w-5/12",
  6: "lg:w-6/12",
  7: "lg:w-7/12",
  8: "lg:w-8/12",
  9: "lg:w-9/12",
  10: "lg:w-10/12",
  11: "lg:w-11/12",
  12: "lg:w-12/12",
};

export default function LayoutSimple({ref, sizeLeft, sizeRigth, form, children }: LayoutSimpleProps) {
  return (
    <>
      <div id={ref} className="layout">
        <div className="flex flex-col lg:flex-row">
          <div className={`${colMap[sizeLeft]} border-b lg:border-r lg:border-b-0 border-b-gray-300 lg:border-r-gray-300 pb-4 lg:pb-0 lg:pt-4 lg:pl-5 lg:pr-10`}>
           {form}
          </div>
          <div className={`${colMap[sizeRigth]} lg:pl-10 pt-4`}>
            {children}
          </div>
        </div>
      </div>
    </>
  );
}