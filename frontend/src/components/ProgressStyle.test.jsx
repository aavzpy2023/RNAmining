import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Visual Progress Bar Determinism', () => {
    it('App.jsx must contain green progress bar CSS overrides without multi-color transitions', () => {
        const appPath = path.resolve(__dirname, '../App.jsx');
        if (!fs.existsSync(appPath)) {
            console.warn('App.jsx not found at path in this test environment context.');
            return;
        }
        
        const appContent = fs.readFileSync(appPath, 'utf8');
        
        expect(appContent).toContain('#nprogress .bar { background: #22c55e !important; }');
        expect(appContent).toContain('.progress-bar { background-color: #22c55e !important;');
        
        // Ensure no blue conflicting colors exist within the progress overrides
        expect(appContent).not.toMatch(/#nprogress \.bar \{[^}]*background:\s*(blue|#0284c7)/i);
    });
});