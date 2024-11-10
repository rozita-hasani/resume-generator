import React, { useState } from 'react';
import {Download} from "lucide-react";

interface SidebarProps {
    generatePDF: () => void;
    onThemeChange: (theme: string) => void;
    onFontSizeChange: (size: number) => void;
    onLineHeightChange: (height: number) => void;
    onPaddingChange: (padding: number) => void;
    onFontChange: (font: string) => void;
    fontScale: number;
    lineHeightScale: number;
    paddingScale: number;
}

const Sidebar = ({ generatePDF, onThemeChange, onFontSizeChange, onLineHeightChange, onPaddingChange, onFontChange, fontScale, lineHeightScale, paddingScale }: SidebarProps) => {

    return (
        <div
            className="sidebar flex flex-col justify-between fixed right-0 top-0 bottom-0 max-w-[300px] w-full bg-white py-6 ml-10 border border-gray-200 overflow-auto">
            <div>
                <ThemeSection onThemeChange={onThemeChange}/>
                <FontSection onFontChange={onFontChange} onFontSizeChange={onFontSizeChange} fontScale={fontScale} />
                <LayoutSection onLineHeightChange={onLineHeightChange} onPaddingChange={onPaddingChange} lineHeightScale={lineHeightScale} paddingScale={paddingScale} />
            </div>
            <Buttons generatePDF={generatePDF}/>
        </div>
    );
};

export default Sidebar;


interface ThemeSectionProps {
    onThemeChange: (theme: string) => void;
}

function ThemeSection({onThemeChange}: ThemeSectionProps) {
    const [theme, setTheme] = useState<string>('caspian');

    const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedTheme = e.target.value;
        setTheme(selectedTheme);
        onThemeChange(selectedTheme);
    };

    return (
        <div className="mb-4 pb-4 border-b border-gray-200 px-4">
            <h3 className="text-base font-medium">Theme</h3>
            <label className="block text-sm font-medium py-3 text-[#5f6368]">
                Select Theme</label>
            <select value={theme} onChange={handleThemeChange}
                    className="w-full text-sm text-[#3c4043] bg-gray-100 hover:bg-gray-200 hover:text-[#63676e] px-3 py-4 rounded-lg"
                    style={{fontFamily: "'Inter', 'Noto Sans SC', sans-serif"}}>
                <option value="Caspian">Caspian</option>
                <option value="Damavand">Damavand</option>
                <option value="Khalij">Khalij</option>
                <option value="Lut">Lut</option>
            </select>
        </div>
    )
}

interface FontSectionProps {
    onFontChange: (font: string) => void;
    onFontSizeChange: (size: number) => void;
    fontScale: number;
}

function FontSection({onFontChange, onFontSizeChange, fontScale}: FontSectionProps) {
    const [font, setFont] = useState<string>("'Open Sans', sans-serif");

    const fonts: { [key: string]: string } = {
        "'Open Sans', sans-serif": 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap',
        "'Noto Sans', sans-serif": 'https://fonts.googleapis.com/css2?family=Noto+Sans:wght@300;400;600;700&display=swap',
        "'Ubuntu', sans-serif": 'https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&display=swap',
    };

    const handleFontChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedFont = e.target.value;
        setFont(selectedFont);
        onFontChange(selectedFont);

        // Dynamically load the selected font by adding link to head
        const linkId = 'font-link';
        let linkElement = document.getElementById(linkId) as HTMLLinkElement;

        if (linkElement) {
            // If the link element already exists, update the href attribute
            linkElement.href = fonts[selectedFont];
        } else {
            // Otherwise, create a new link element
            linkElement = document.createElement('link');
            linkElement.id = linkId;
            linkElement.href = fonts[selectedFont];
            document.head.appendChild(linkElement);
        }
    };

    return (
        <div className="mb-4 pb-4 border-b border-gray-200 px-4">
            <h3 className="text-base font-medium">Font</h3>
            <label className="block text-sm font-medium py-3 text-[#5f6368]">
                Name</label>
            <select value={font} onChange={handleFontChange}
                    className="w-full text-sm text-[#3c4043] mb-4 bg-gray-100 hover:bg-gray-200 hover:text-[#63676e] px-3 py-4 rounded-lg"
                    style={{fontFamily: 'Roboto, sans-serif'}}>
                <option value="'Open Sans', sans-serif">Open Sans</option>
                <option value="'Noto Sans', sans-serif">Noto Sans</option>
                <option value="'Ubuntu', sans-serif">Ubuntu</option>
            </select>

            <label className="flex justify-between text-sm font-medium py-3 text-[#5f6368]">
                Size
                <span>{fontScale}</span>
            </label>
            <input type="range" min="0.1" max="5.0" step='0.1' value={fontScale} onChange={(e) => onFontSizeChange(parseFloat(e.target.value))}
                   className="w-full accent-[#1a73e8] transition-all"/>
        </div>
    )
}

interface LayoutSectionProps {
    onLineHeightChange: (height: number) => void;
    onPaddingChange: (padding: number) => void;
    lineHeightScale: number;
    paddingScale: number;
}

function LayoutSection({onLineHeightChange, onPaddingChange, lineHeightScale, paddingScale}: LayoutSectionProps) {
    return (
        <div className="mb-4 px-4">
            <h3 className="text-base font-medium">Layout</h3>
            <label className="flex justify-between text-sm font-medium py-3 text-[#5f6368]">
                Line Height
                <span>{lineHeightScale}</span>
            </label>
            <input type="range" min="0.1" max="2" step="0.1" value={lineHeightScale} onChange={(e) => onLineHeightChange(parseFloat(e.target.value))}
                   className="w-full mb-4 accent-[#1a73e8] transition-all"/>

            <label className="flex justify-between text-sm font-medium py-3 text-[#5f6368]">
                Page Padding
                <span>{paddingScale}</span>
            </label>
            <input type="range" min="0.1" max="2" step='0.1' value={paddingScale} onChange={(e) => onPaddingChange(parseFloat(e.target.value))}
                   className="w-full accent-[#1a73e8] transition-all"/>
        </div>
    )
}

interface ButtonsProps {
    generatePDF: () => void;
}

const Buttons = ({generatePDF}: ButtonsProps) => {
    return (
        <div className='px-4'>
            <button onClick={generatePDF}
                    className="flex justify-center gap-2 p-3 text-white text-base font-medium bg-[#1a73e8] hover:bg-[#075cca] rounded-lg w-full transition-all ease-in-out">
                <Download className='w-5'/>
                Download PDF
            </button>
            <div className="mt-3 bg-[#ffdd01] mx-auto w-full flex justify-center rounded-md">
                <a href="https://www.buymeacoffee.com/rozitahasani" target="_blank" rel="noopener noreferrer">
                    <img
                        src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
                        alt="Buy Me A Coffee"
                        className='w-40'
                    />
                </a>
            </div>
        </div>
    )
}