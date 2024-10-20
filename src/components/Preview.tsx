import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface PreviewProps {
    content: string;
}

const Preview: React.FC<PreviewProps> = ({ content }) => {
    return (
        <div className="prose max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {content.replace(/\\/g, "")}
            </ReactMarkdown>
        </div>
    );
};

export default Preview;