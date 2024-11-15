import {forwardRef} from 'react';
import {MDXEditor, headingsPlugin, listsPlugin, quotePlugin, thematicBreakPlugin, diffSourcePlugin} from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css';
import './editor.css';

interface EditorProps {
    markdown?: string;
    onChange: (value: string) => void;
}

const defaultResume = `
## Rozita Hasani
### Junior Front-End Developer
Graz, Austria


---

### About



`;

const Editor = forwardRef<HTMLDivElement, EditorProps>(({markdown, onChange}, ref) => {
    return (
        <div
            ref={ref}
            className="editor m-4 relative w-1/2 custom-scrollbar overflow-auto bg-white border border-gray-200"
            style={{height: 'calc(100vh - 32px)'}}
        >
            <MDXEditor
                markdown={markdown ? markdown : defaultResume}
                onChange={onChange ? (newMarkdown) => onChange(newMarkdown || '') : undefined}
                plugins={[
                    headingsPlugin(),
                    listsPlugin(),
                    quotePlugin(),
                    thematicBreakPlugin(),
                    diffSourcePlugin({viewMode: 'source'})
                ]}
            />
        </div>
    );
});

export default Editor;