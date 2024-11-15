import {useState, useRef, useEffect} from 'react';
import {Editor, Sidebar, Preview} from '../components';
import "../styles/themes/index.css";
import '../styles/print.css'
import '../styles/global.css'

const Home = () => {
    const [markdown, setMarkdown] = useState<string>();
    const [theme, setTheme] = useState<string>('Caspian');
    const [fontScale, setFontScale] = useState<number>(1);
    const [lineHeightScale, setLineHeightScale] = useState<number>(1.5);
    const [paddingScale, setPaddingScale] = useState<number>(24);
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
                className="main-content gap-3 pr-[310px] h-full"
                ref={mainScrollContainerRef}
                onScroll={handleScroll}
            >
                <div className="flex justify-center items-start w-full h-screen" >
                    <div id="editor" className="editor m-4 relative w-1/2 custom-scrollbar overflow-auto bg-white border border-gray-200" style={{ height: 'calc(100vh - 32px)' }}>
                        <Editor className=" " markdown={markdown} onChange={setMarkdown}/>
                    </div>

                    <div id="previewContainer"
                         ref={previewContainerRef}
                         className={`my-4 mr-2 w-1/2 relative overflow-auto custom-scrollbar h-full theme bg-white border border-gray-200 ${theme.toLowerCase()}`}
                         style={{fontFamily: font,
                             height: 'calc(100vh - 32px)'}}
                    >
                        <Preview className="previewContent " content={markdown}/>
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