import { Download } from 'lucide-react';

interface SidebarProps {
    generatePDF: () => void;
}

const Sidebar = ({ generatePDF } : SidebarProps) => {
    return (
        <div className="fixed inset-y-0 right-0 py-5 z-10 w-20 flex-col border-l bg-white text-center ml-1.5">
            <button
                onClick={generatePDF}
                className="p-3 text-base bg-gray-100 hover:bg-gray-200 rounded-md transition-colors ease-in-out"
            >
                <Download />
            </button>
        </div>
    );
};

export default Sidebar;