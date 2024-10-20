import { forwardRef } from 'react';
import { MDXEditor, headingsPlugin, listsPlugin, quotePlugin, thematicBreakPlugin } from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css';

interface EditorProps {
    markdown: string;
    onChange: (value: string) => void;
}

const Editor = forwardRef<HTMLDivElement, EditorProps>(({ markdown, onChange }, ref) => {
    return (
        <div ref={ref} className="flex-1 bg-white overflow-y-auto p-5">
            <MDXEditor
                markdown={markdown}
                onChange={onChange ? (newMarkdown) => onChange(newMarkdown || '') : undefined}
                className="h-full"
                plugins={[headingsPlugin(), listsPlugin(), quotePlugin(), thematicBreakPlugin()]}
            />
        </div>
    );
});

export default Editor;