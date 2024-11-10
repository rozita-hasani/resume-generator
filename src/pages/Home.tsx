import { useState, useRef, useEffect } from 'react';
import { Editor, Sidebar, Preview } from '../components';
import "../themes/index.css";
import '../App.css';
import jsPDF from 'jspdf';

const Home = () => {
    const [markdown, setMarkdown] = useState<string>();
    const [theme, setTheme] = useState<string>('Caspian');
    const [fontScale, setFontScale] = useState<number>(1);
    const [lineHeightScale, setLineHeightScale] = useState<number>(1);
    const [paddingScale, setPaddingScale] = useState<number>(1);
    const [font, setFont] = useState<string>("'Inter', 'Noto Sans SC', sans-serif");

    const themeFontMapping: { [key: string]: string } = {
        Caspian: "'Inter', 'Noto Sans SC', sans-serif",
        Damavand: "'Poppins', 'Inter', 'Noto Sans SC', sans-serif",
        Khalij: "'Nunito', 'Inter', 'Noto Sans SC', sans-serif",
        Lut: "'Work Sans', 'Inter', 'Noto Sans SC', sans-serif"
    };

    const mainScrollContainerRef = useRef<HTMLDivElement>(null);


    // Update CSS variable for fontScale in the preview
    useEffect(() => {
        const previewContent = document.getElementById('previewContent');
        if (previewContent) {
            console.log("Font scale changed", fontScale);
            previewContent.style.setProperty('--fontScale', fontScale.toString());
        }
    }, [fontScale]);

    // Update CSS variable for lineHeightScale in the preview
    useEffect(() => {
        const previewContent = document.getElementById('previewContent');
        if (previewContent) {
            console.log("Line height scale changed", lineHeightScale);
            previewContent.style.setProperty('--lineHeightScale', lineHeightScale.toString());
        }
    }, [lineHeightScale]);

    // Update CSS variable for paddingScale in the preview
    useEffect(() => {
        const previewContent = document.getElementById('previewContent');
        if (previewContent) {
            console.log("Padding scale changed", paddingScale);
            previewContent.style.setProperty('--paddingScale', paddingScale.toString());
        }
    }, [paddingScale]);

    const generatePDF = () => {
        const previewContent = document.getElementById('previewContent');
        if (previewContent) {
            const doc = new jsPDF({
                unit: 'pt',
                format: 'a4',
                orientation: 'portrait',
            });

            // Generate PDF using content from the preview
            doc.html(previewContent, {
                callback: function (pdf) {
                    pdf.save('resume.pdf');
                },
            });
        }
    };

    // Scroll synchronization between editor and preview
    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        if (mainScrollContainerRef.current) {
            const scrollTop = e.currentTarget.scrollTop;
            mainScrollContainerRef.current.scrollTop = scrollTop;
        }
    };

    const handleThemeChange = (selectedTheme: string) => {
        setTheme(selectedTheme);
        setFont(themeFontMapping[selectedTheme]);
    };

    return (
        <div className=" w-full h-screen bg-gray-100">
            {/* Main Content Area */}
            <div
                className="main-content h-full overflow-auto gap-3 pr-[290px]"
                ref={mainScrollContainerRef}
                onScroll={handleScroll}
            >
                <div className="flex gap-3 justify-center items-start w-full h-screen">
                    {/* Editor */}
                    <div
                        id="editor"
                        className="editor my-4 ml-4 relative w-1/2 min-h-full h-screen overflow-auto"
                    >
                        <Editor className="bg-white border border-gray-200" markdown={markdown} onChange={setMarkdown}/>
                    </div>

                    {/* Preview */}
                    <div
                        id="previewContent"
                        className={`my-4 mr-2 preview w-1/2 relative min-h-full h-screen overflow-auto theme ${theme.toLowerCase()}`}
                        style={{fontFamily: font,}}
                    >
                        <Preview className="bg-white border border-gray-200" content={markdown}/>
                    </div>
                </div>
            </div>


            {/* Sidebar with Options */}
            <Sidebar
                generatePDF={generatePDF}
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
