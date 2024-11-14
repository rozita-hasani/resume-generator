import React, {useState} from 'react';
import {ChevronDown} from "lucide-react";
import {SectionWrapper} from "./SectionWrapper.tsx";
import {Slider} from "./Slider.tsx";
import {SidebarButtons} from "./SidebarButtons.tsx";

interface SidebarProps {
    handlePrint: () => void;
    onThemeChange: (theme: string) => void;
    onFontSizeChange: (size: number) => void;
    onLineHeightChange: (height: number) => void;
    onPaddingChange: (padding: number) => void;
    onFontChange: (font: string) => void;
    fontScale: number;
    lineHeightScale: number;
    paddingScale: number;
}

const Sidebar = ({handlePrint, onThemeChange, onFontSizeChange, onLineHeightChange, onPaddingChange, onFontChange, fontScale, lineHeightScale, paddingScale}: SidebarProps) => {
    return (
        <div className="sidebar flex flex-col justify-between fixed right-0 top-0 bottom-0 max-w-[300px] w-full bg-white py-6 ml-10 border border-gray-200 overflow-auto">
            <div>
                <ThemeSection onThemeChange={onThemeChange}/>
                <FontSection onFontChange={onFontChange} onFontSizeChange={onFontSizeChange} fontScale={fontScale}/>
                <LayoutSection onLineHeightChange={onLineHeightChange} onPaddingChange={onPaddingChange} lineHeightScale={lineHeightScale} paddingScale={paddingScale}/>
            </div>
            <SidebarButtons handlePrint={handlePrint}/>
        </div>
    );
};

export default Sidebar;

// ThemeSection Component
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
        <SectionWrapper title="Theme">
            <div className='relative w-full'>
                <label className="block text-sm font-medium py-3 text-[#5f6368]">Select Theme</label>
                <select
                    value={theme}
                    onChange={handleThemeChange}
                    className="w-full appearance-none text-sm text-[#3c4043] bg-gray-100 hover:bg-gray-200 hover:text-[#63676e] pl-3 pr-9 py-4 rounded-lg"
                    style={{fontFamily: "'Inter', 'Noto Sans SC', sans-serif"}}>
                    <option value="Caspian">Caspian</option>
                    <option value="Damavand">Damavand</option>
                    <option value="Khalij">Khalij</option>
                    <option value="Lut">Lut</option>
                </select>
                <ChevronDown className="w-4 h-4 absolute right-3 top-3/4 transform -translate-y-1/2 text-[#3c4043]"/>
            </div>
        </SectionWrapper>
    )
}

// FontSection Component
interface FontSectionProps {
    onFontChange: (font: string) => void;
    onFontSizeChange: (size: number) => void;
    fontScale: number;
}

const loadFont = (fontUrl: string) => {
    const linkId = 'font-link';
    let linkElement = document.getElementById(linkId) as HTMLLinkElement;

    if (linkElement) {
        linkElement.href = fontUrl;
    } else {
        linkElement = document.createElement('link');
        linkElement.id = linkId;
        linkElement.rel = 'stylesheet';
        linkElement.href = fontUrl;
        document.head.appendChild(linkElement);
    }
};

function FontSection({onFontChange, onFontSizeChange, fontScale}: FontSectionProps) {
    const [font, setFont] = useState<string>("'Open Sans', sans-serif");
    const baseFontSize = 16;

    const fonts: { [key: string]: string } = {
        "Open Sans": 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap',
        "Noto Sans": 'https://fonts.googleapis.com/css2?family=Noto+Sans:wght@300;400;600;700&display=swap',
        "Ubuntu": 'https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&display=swap',
    };

    const handleFontChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedFont = e.target.value;
        setFont(selectedFont);
        onFontChange(selectedFont);
        loadFont(fonts[selectedFont]);
    };

    return (
        <SectionWrapper title="Font">
            <div className='relative w-full mb-4'>
                <label className="block text-sm font-medium py-3 text-[#5f6368]">Name</label>
                <select value={font} onChange={handleFontChange}
                        className="w-full appearance-none text-sm text-[#3c4043] bg-gray-100 hover:bg-gray-200 hover:text-[#63676e] pl-3 pr-9 py-4 rounded-lg"
                        style={{fontFamily: 'Roboto, sans-serif'}}>
                    {Object.keys(fonts).map((fontKey) => (
                        <option key={fontKey} value={fontKey}>{fontKey}</option>
                    ))}
                </select>
                <ChevronDown className="w-4 h-4 absolute right-3 top-3/4 transform -translate-y-1/2 text-[#3c4043]"/>
            </div>

            <Slider label="Size" value={fontScale} min={0.5} max={3.0} step={0.1}
                    onChange={(e) => onFontSizeChange(parseFloat(e.target.value))}
                    currentValue={`${(fontScale * baseFontSize).toFixed(1)}px`}/>
        </SectionWrapper>
    )
}

// LayoutSection Component
interface LayoutSectionProps {
    onLineHeightChange: (height: number) => void;
    onPaddingChange: (padding: number) => void;
    lineHeightScale: number;
    paddingScale: number;
}

function LayoutSection({onLineHeightChange, onPaddingChange, lineHeightScale, paddingScale}: LayoutSectionProps) {
    return (
        <SectionWrapper title="Layout">
            <Slider label="Line Height" value={lineHeightScale} min={1.0} max={3.0} step={0.1}
                    onChange={(e) => onLineHeightChange(parseFloat(e.target.value))}
                    currentValue={lineHeightScale.toString()}/>
            <Slider label="Page Padding" value={paddingScale} min={0} max={40} step={2}
                    onChange={(e) => onPaddingChange(parseFloat(e.target.value))}
                    currentValue={`${paddingScale}px`}/>
        </SectionWrapper>
    )
}