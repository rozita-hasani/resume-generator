import React, {useState} from "react";
import {SectionWrapper} from "./SectionWrapper.tsx";
import {ChevronDown} from "lucide-react";
import {Slider} from "./Slider.tsx";

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

export function FontSection({onFontChange, onFontSizeChange, fontScale}: FontSectionProps) {
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