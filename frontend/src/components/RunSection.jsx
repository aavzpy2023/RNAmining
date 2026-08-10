import React from 'react';

const styles = {
    runButton: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', width: '100%', padding: '14px', backgroundColor: '#0284c7', color: 'white', border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 4px 6px rgba(2, 132, 199, 0.3)' }
};

export const RunSection = ({ isRunning, disabled, onClick }) => (
    <section style={{ textAlign: 'center', marginTop: '16px' }}>
    <button
    style={{
        ...styles.runButton,
        ...(disabled || isRunning ? { opacity: 0.5, cursor: 'not-allowed', boxShadow: 'none' } : {})
    }}
    onClick={onClick}
    disabled={disabled || isRunning}
    >
    {isRunning ? (
        <>
        <span className="material-symbols-outlined animate-spin">sync</span>
        Running...
        </>
    ) : (
        <>
        <span className="material-symbols-outlined">play_circle</span>
        Run RNAmining
        </>
    )}
    </button>
    <p style={{ fontSize: '13px', color: '#94a3b8', marginTop: '12px' }}>
    Example of results are made available <a href="#" style={{ color: '#38bdf8', textDecoration: 'underline' }}>here</a>.
    </p>
    </section>
);

export default RunSection;
