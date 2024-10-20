import { useState, useEffect } from 'react';
import { Editor, Sidebar, Preview } from '../components';
import jsPDF from 'jspdf';

const Home = () => {
    const [markdown, setMarkdown] = useState<string>('');

    useEffect(() => {
        // Fetching initial content (if available)
        fetch("resumeContent")
            .then((response) => response.text())
            .then((text) => {
                setMarkdown(text);
            });
    }, []);

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
                margin: [10, 10, 10, 10],
                autoPaging: 'text',
            });
        }
    };

    return (
        <div className="flex w-full h-screen box-border bg-gray-100 fixed">
            <div className="flex-4 flex gap-1.5 box-border w-full overflow-hidden">
                <div className="flex-1 bg-white p-5 overflow-auto">
                    <Editor markdown={markdown} onChange={setMarkdown} />
                </div>
                <div className="flex-1 bg-white p-5 overflow-auto" id="previewContent">
                    <Preview content={markdown} />
                </div>
            </div>
            <Sidebar generatePDF={generatePDF} />
        </div>
    );
};

export default Home;