import { useState, useCallback, useEffect } from 'react';

export const DEFAULT_ORGANISMS = [
  'Homo sapiens',
  'Arabidopsis thaliana',
  'Escherichia coli',
  'Saccharomyces cerevisiae',
  'Drosophila melanogaster',
];

export function useOrganismSelect(initialOrganism = 'Homo sapiens') {
    const [selectedOrganism, setOrganism] = useState(initialOrganism);
    const [organismOptions, setOptions] = useState(DEFAULT_ORGANISMS);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchModels = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('/api/v1/models');
                if (!response.ok) throw new Error('Network error');
                const data = await response.json();
                if (data.models && data.models.length > 0) {
                    setOptions(data.models);
                    setOrganism(data.models[0]);
                }
            } catch (error) {
                console.error("Failed to fetch models, using defaults:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchModels();
    }, []);

    const setSelectedOrganism = useCallback((organism) => {
        setOrganism(organism);
    }, []);

    return {
        selectedOrganism,
        organismOptions,
        setSelectedOrganism,
        isLoading,
    };
}

export default useOrganismSelect;