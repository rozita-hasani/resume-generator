import {useState, useRef, useEffect} from 'react';
import {Editor, Sidebar, Preview} from '../components';
import '../styles/main.css'

const Index = () => {
    const [markdown, setMarkdown] = useState<string>();
    const [theme, setTheme] = useState<string>('Tehran');
    const [fontScale, setFontScale] = useState<number>(1);
    const [lineHeightScale, setLineHeightScale] = useState<number>(1.5);
    const [paddingScale, setPaddingScale] = useState<number>(24);
    const [font, setFont] = useState<string>("'Inter', 'Noto Sans SC', sans-serif");

    const themeFontMapping: { [key: string]: string } = {
        Tehran: "'Inter', 'Noto Sans SC', sans-serif",
        Isfahan: "'Poppins', 'Inter', 'Noto Sans SC', sans-serif",
        Shiraz: "'Nunito', 'Inter', 'Noto Sans SC', sans-serif",
        Mashhad: "'Work Sans', 'Inter', 'Noto Sans SC', sans-serif"
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
                className="main-content gap-3 pr-[310px] h-full"
                ref={mainScrollContainerRef}
                onScroll={handleScroll}
            >
                <div className="flex justify-center items-start w-full h-screen">
                    <Editor markdown={markdown} onChange={setMarkdown}/>
                    <Preview content={markdown} theme={theme} font={font} previewContainerRef={previewContainerRef}/>
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

export default Index;