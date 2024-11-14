import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface PreviewProps {
    content?: string;
    className?: string;
}

const Preview = ({content = '# Hello World', className}: PreviewProps) => {
    return (
        <div className={`prose max-w-none text-[#1c2024] p-3 ${className}`}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {content.replace(/\\/g, "")}
            </ReactMarkdown>
        </div>
    );
};

export default Preview;