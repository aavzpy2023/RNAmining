import React from 'react';

// ==========================================
// STYLES (Identical sizing and layout as About.jsx)
// ==========================================
const styles = {
    container: {
        width: '100%',
        maxWidth: '900px',
        margin: '0 auto',
        padding: '24px 20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px'
    },
    hero: {
        textAlign: 'center',
        marginBottom: '8px'
    },
    heroH1: {
        fontSize: '32px',
        fontWeight: '700',
        color: '#f8fafc',
        margin: '0 0 8px 0'
    },
    heroP: {
        fontSize: '16px',
        color: '#94a3b8',
        margin: 0
    },
    // Main Wrapper Card (Matches About.jsx)
    mainCard: {
        border: '1px solid #334155',
        borderRadius: '16px',
        padding: '24px',
        backgroundColor: '#1e293b',
        marginBottom: '20px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.2)'
    },
    mainCardTitle: {
        fontSize: '20px',
        fontWeight: '600',
        color: '#f8fafc',
        margin: '0 0 16px 0',
        borderBottom: '1px solid #334155',
        paddingBottom: '8px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    },
    mainCardDesc: {
        color: '#94a3b8',
        fontSize: '14px',
        marginBottom: '20px',
        lineHeight: '1.5'
    },
    // Grid and Inner Cards (Matches About.jsx)
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '16px',
        width: '100%'
    },
    innerCard: {
        backgroundColor: '#0f172a',
        border: '1px solid #334155',
        borderRadius: '12px',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    name: {
        fontSize: '16px',
        fontWeight: '700',
        color: '#f1f5f9',
        margin: '0 0 4px 0'
    },
    role: {
        fontSize: '13px',
        color: '#38bdf8',
        fontWeight: '600',
        margin: '0 0 8px 0'
    },
    institution: {
        fontSize: '13px',
        color: '#94a3b8',
        margin: '0 0 16px 0',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '6px',
        lineHeight: '1.4'
    },
    email: {
        color: '#38bdf8',
        textDecoration: 'none',
        fontSize: '13px',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        wordBreak: 'break-all'
    }
};

export default function Contact() {
    return (
        <main style={styles.container}>
        {/* Semantic Header */}
        <header style={styles.hero}>
        <h1 style={styles.heroH1}>Get in Touch</h1>
        <p style={styles.heroP}>Reach out to our academic and technical team for inquiries and collaborations.</p>
        </header>

        <article>
        {/* Main Wrapper Container matching About.jsx style */}
        <section style={styles.mainCard} aria-labelledby="directory-title">
        <h2 id="directory-title" style={styles.mainCardTitle}>
        <span className="material-symbols-outlined" style={{ color: '#38bdf8' }}>contact_mail</span>
        Project Directory
        </h2>
        <p style={styles.mainCardDesc}>
        For research inquiries, technical support, or academic collaborations, please contact the respective team member:
        </p>

        <div style={styles.grid} aria-label="Team Members Directory">

        {/* Nathaly */}
        <article style={styles.innerCard}>
        <div>
        <h3 style={styles.name}>Nathaly Elizalde Araya</h3>
        <p style={styles.role}>Original Research / PhD Student</p>
        <p style={styles.institution}>
        <span className="material-symbols-outlined" style={{ fontSize: '16px', color: '#38bdf8' }}>domain</span>
        <span>Paper Author</span>
        </p>
        </div>
        <a href="mailto:nathaly.elizaldea@utem.cl" style={styles.email}>
        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>mail</span>
        nathaly.elizaldea@utem.cl
        </a>
        </article>

        {/* Andrey */}
        <article style={styles.innerCard}>
        <div>
        <h3 style={styles.name}>Andrey Vinajera Zamora</h3>
        <p style={styles.role}>Lead Architect / PhD Student</p>
        <p style={styles.institution}>
        <span className="material-symbols-outlined" style={{ fontSize: '16px', color: '#38bdf8' }}>terminal</span>
        <span>Technical & Infrastructure</span>
        </p>
        </div>
        <a href="mailto:avinajera2011@gmail.com" style={styles.email}>
        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>mail</span>
        avinajera2011@gmail.com
        </a>
        </article>

        {/* Raul */}
        <article style={styles.innerCard}>
        <div>
        <h3 style={styles.name}>Dr. Raul Arias-Carrasco</h3>
        <p style={styles.role}>Academic Advisor & Supervisor</p>
        <p style={styles.institution}>
        <span className="material-symbols-outlined" style={{ fontSize: '16px', color: '#38bdf8' }}>account_balance</span>
        <span>
        Director Doctorado, UTEM<br/>
        Investigador, Univ. Mayor
        </span>
        </p>
        </div>
        <a href="mailto:raul.arias@utem.cl" style={styles.email}>
        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>mail</span>
        raul.arias@utem.cl
        </a>
        </article>

        </div>
        </section>
        </article>
        </main>
    );
}
