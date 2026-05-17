import React, { useState } from 'react';
import '../settings.css';

export default function SettingsPage() {
    // 1. Existing Layout Settings
    const [simpleMode, setSimpleMode] = useState(localStorage.getItem('simpleMode') === 'true');
    const [showIcons, setShowIcons] = useState(localStorage.getItem('showIcons') === 'true');
    const [colorCoded, setColorCoded] = useState(localStorage.getItem('colorCoded') === 'true');

    // 2. NEW Physical Accessibility Settings
    const [reduceGlare, setReduceGlare] = useState(localStorage.getItem('reduceGlare') === 'true');
    const [reduceMotion, setReduceMotion] = useState(localStorage.getItem('reduceMotion') === 'true');
    const [legibleText, setLegibleText] = useState(localStorage.getItem('legibleText') === 'true');

    // Universal toggle function
    const toggleSetting = (settingKey, currentValue, setterFunc) => {
        const newValue = !currentValue;
        setterFunc(newValue);
        localStorage.setItem(settingKey, newValue);

        // Refreshes the app instantly so the new classes apply
        window.location.reload();
    };

    return (
        <div className="settings-container">
            <header className="settings-header">
                <h1>Accessibility Settings</h1>
                <p>Adjust these display settings to make reading and navigating easier.</p>
            </header>

            {/* NEW SECTION: Physical Vision & Reading */}
            <section className="settings-section">
                <h2>Vision & Reading</h2>

                <div className="setting-item toggle-item">
                    <div className="setting-text">
                        <label>Reduce Screen Glare</label>
                        <p>Softens bright white backgrounds to reduce eye strain.</p>
                    </div>
                    <button
                        className={`toggle-btn ${reduceGlare ? 'on' : ''}`}
                        onClick={() => toggleSetting('reduceGlare', reduceGlare, setReduceGlare)}
                    >
                        {reduceGlare ? 'ON' : 'OFF'}
                    </button>
                </div>

                <div className="setting-item toggle-item">
                    <div className="setting-text">
                        <label>Extra Legible Text</label>
                        <p>Increases space between letters and lines for easier reading.</p>
                    </div>
                    <button
                        className={`toggle-btn ${legibleText ? 'on' : ''}`}
                        onClick={() => toggleSetting('legibleText', legibleText, setLegibleText)}
                    >
                        {legibleText ? 'ON' : 'OFF'}
                    </button>
                </div>

                <div className="setting-item toggle-item">
                    <div className="setting-text">
                        <label>Reduce Motion</label>
                        <p>Stops menus from sliding and animating.</p>
                    </div>
                    <button
                        className={`toggle-btn ${reduceMotion ? 'on' : ''}`}
                        onClick={() => toggleSetting('reduceMotion', reduceMotion, setReduceMotion)}
                    >
                        {reduceMotion ? 'ON' : 'OFF'}
                    </button>
                </div>
            </section>

            {/* EXISTING SECTION: Layout & Directory */}
            <section className="settings-section">
                <h2>Directory Layout</h2>

                <div className="setting-item toggle-item">
                    <div className="setting-text">
                        <label>Simple List View</label>
                        <p>Changes side-by-side cards into one large vertical list.</p>
                    </div>
                    <button
                        className={`toggle-btn ${simpleMode ? 'on' : ''}`}
                        onClick={() => toggleSetting('simpleMode', simpleMode, setSimpleMode)}
                    >
                        {simpleMode ? 'ON' : 'OFF'}
                    </button>
                </div>

                <div className="setting-item toggle-item">
                    <div className="setting-text">
                        <label>Show Visual Icons</label>
                        <p>Adds large pictures next to category names.</p>
                    </div>
                    <button
                        className={`toggle-btn ${showIcons ? 'on' : ''}`}
                        onClick={() => toggleSetting('showIcons', showIcons, setShowIcons)}
                    >
                        {showIcons ? 'ON' : 'OFF'}
                    </button>
                </div>

                <div className="setting-item toggle-item">
                    <div className="setting-text">
                        <label>Color-Coded Categories</label>
                        <p>Applies background colors to separate different topics.</p>
                    </div>
                    <button
                        className={`toggle-btn ${colorCoded ? 'on' : ''}`}
                        onClick={() => toggleSetting('colorCoded', colorCoded, setColorCoded)}
                    >
                        {colorCoded ? 'ON' : 'OFF'}
                    </button>
                </div>
            </section>

            <section className="settings-section danger-zone">
                <button
                    className="reset-btn"
                    onClick={() => {
                        localStorage.clear();
                        window.location.reload();
                    }}
                >
                    Reset All Settings to Normal
                </button>
            </section>
        </div>
    );
}