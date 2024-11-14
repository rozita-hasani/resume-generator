import {useState, useRef, useEffect} from 'react';
import {Editor, Sidebar, Preview} from '../components';
import "../styles/themes/index.css";
import '../styles/print.css'

const Home = () => {
    const [markdown, setMarkdown] = useState<string>();
    const [theme, setTheme] = useState<string>('Caspian');
    const [fontScale, setFontScale] = useState<number>(1);
    const [lineHeightScale, setLineHeightScale] = useState<number>(1.5);
    const [paddingScale, setPaddingScale] = useState<number>(20);
    const [font, setFont] = useState<string>("'Inter', 'Noto Sans SC', sans-serif");

    const themeFontMapping: { [key: string]: string } = {
        Caspian: "'Inter', 'Noto Sans SC', sans-serif",
        Damavand: "'Poppins', 'Inter', 'Noto Sans SC', sans-serif",
        Khalij: "'Nunito', 'Inter', 'Noto Sans SC', sans-serif",
        Lut: "'Work Sans', 'Inter', 'Noto Sans SC', sans-serif"
    };

    const mainScrollContainerRef = useRef<HTMLDivElement>(null);
    const previewContainerRef = useRef<HTMLDivElement>(null);

    // Update CSS variables in the previewContainer
    useEffect(() => {
        const previewContainer = previewContainerRef.current;
        if (previewContainer) {
            previewContainer.style.setProperty('--fontScale', fontScale.toString());
            previewContainer.style.setProperty('--lineHeightScale', lineHeightScale.toString());
            previewContainer.style.setProperty('--paddingScale', `${paddingScale}px`);
        }
    }, [fontScale, lineHeightScale, paddingScale]);

    const handleThemeChange = (selectedTheme: string) => {
        setTheme(selectedTheme);
        setFont(themeFontMapping[selectedTheme]);
    };

    // Scroll synchronization between editor and preview
    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        if (mainScrollContainerRef.current) {
            const scrollTop = e.currentTarget.scrollTop;
            mainScrollContainerRef.current.scrollTop = scrollTop;
        }
    };


    // Handle print action to export as PDF
    const handlePrint = () => {
                window.print();
    };

    return (
        <div className="w-full h-full min-h-screen bg-gray-100">
            <div
                className="main-content gap-3 pr-[310px] py-4"
                ref={mainScrollContainerRef}
                onScroll={handleScroll}
            >
                <div className="flex gap-3 justify-center items-start w-full">
                    <div id="editor" className="editor ml-4 relative w-1/2 ">
                        <Editor className="bg-white border border-gray-200 " markdown={markdown} onChange={setMarkdown}/>
                    </div>

                    <div id="previewContainer"
                         ref={previewContainerRef}
                         className={`mr-2 w-1/2 relative overflow-auto theme ${theme.toLowerCase()}`}
                         style={{fontFamily: font}}
                    >
                        <Preview className="previewContent bg-white border border-gray-200 " content={markdown}/>
                    </div>
                </div>
            </div>

            <Sidebar
                handlePrint={handlePrint}
                onThemeChange={handleThemeChange}
                onFontChange={setFont}
                onFontSizeChange={setFontScale}
                onLineHeightChange={setLineHeightScale}
                onPaddingChange={setPaddingScale}
                fontScale={fontScale}
                lineHeightScale={lineHeightScale}
                paddingScale={paddingScale}
            />
        </div>
    );
};

export default Home;