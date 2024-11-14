import {Download} from "lucide-react";

interface ButtonsProps {
    handlePrint: () => void;
}

export const SidebarButtons = ({handlePrint}: ButtonsProps) => {
    return (
        <div className='px-4'>
            <button onClick={handlePrint} className="flex justify-center gap-2 p-3 text-white text-base font-medium bg-[#1a73e8] hover:bg-[#075cca] rounded-lg w-full transition-all ease-in-out">
                <Download className='w-5'/>
                Download PDF
            </button>
            <div className="mt-3 bg-[#ffdd01] mx-auto w-full flex justify-center rounded-md">
                <a href="https://www.buymeacoffee.com/rozitahasani" target="_blank" rel="noopener noreferrer">
                    <img
                        src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
                        alt="Buy Me A Coffee"
                        className='w-40'
                    />
                </a>
            </div>
        </div>
    )
}