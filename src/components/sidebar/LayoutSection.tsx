import {SidebarSection} from "./SidebarSection.tsx";
import {Slider} from "./Slider.tsx";

interface LayoutSectionProps {
    onLineHeightChange: (height: number) => void;
    onPaddingChange: (padding: number) => void;
    lineHeightScale: number;
    paddingScale: number;
}

export function LayoutSection({onLineHeightChange, onPaddingChange, lineHeightScale, paddingScale}: LayoutSectionProps) {
    return (
        <SidebarSection title="Layout">
            <Slider label="Line Height" value={lineHeightScale} min={1.0} max={3.0} step={0.1}
                    onChange={(e) => onLineHeightChange(parseFloat(e.target.value))}
                    currentValue={lineHeightScale.toString()}/>
            <Slider label="Page Padding" value={paddingScale} min={0} max={48} step={2}
                    onChange={(e) => onPaddingChange(parseFloat(e.target.value))}
                    currentValue={`${paddingScale}px`}/>
        </SidebarSection>
    )
}