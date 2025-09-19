import { useEffect } from 'react';

function useDocumentTitle(title: string) {
  useEffect(() => {
    document.title = title; 
    return () => {
      document.title = 'B-Educar';
    };
  }, [title]);
}

export default useDocumentTitle;
