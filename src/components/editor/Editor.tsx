import {forwardRef} from 'react';
import {MDXEditor, headingsPlugin, listsPlugin, quotePlugin, thematicBreakPlugin, diffSourcePlugin} from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css';
import './editor.css';

interface EditorProps {
    markdown?: string;
    onChange: (value: string) => void;
    className: string;
}

const defaultResume = `
## Rozita Hasani
### Junior Front-End Developer
Graz, Austria


---

### About



`;

const Editor = forwardRef<HTMLDivElement, EditorProps>(({className, markdown, onChange}, ref) => {
    return (
        <div ref={ref} className={className}>
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