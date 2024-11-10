import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface PreviewProps {
    content: string | undefined;
    className: string | undefined;
}

const Preview = ({content,className}: PreviewProps) => {
    return (
        <div className={`prose max-w-none text-[#1c2024] p-3 ${className}`}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {content ? (content.replace(/\\/g, "")) : '# Hello World'}
            </ReactMarkdown>
        </div>
    );
};

export default Preview;