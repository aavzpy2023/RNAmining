import { useState, useCallback } from 'react';

export const DEFAULT_ORGANISMS = [
  'Homo sapiens',
  'Arabidopsis thaliana',
  'Escherichia coli',
  'Saccharomyces cerevisiae',
  'Drosophila melanogaster',
];

export function useOrganismSelect(initialOrganism = 'Homo sapiens') {
  const [selectedOrganism, setOrganism] = useState(initialOrganism);

  const setSelectedOrganism = useCallback((organism) => {
    if (DEFAULT_ORGANISMS.includes(organism)) {
      setOrganism(organism);
    }
  }, []);

  return {
    selectedOrganism,
    organismOptions: DEFAULT_ORGANISMS,
    setSelectedOrganism,
  };
}

export default useOrganismSelect;