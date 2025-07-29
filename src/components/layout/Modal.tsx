interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}
const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/30 backdrop-blur-sm">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-md relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 text-xl"
                >
                    &times;
                </button>
                {children}
            </div>
        </div>
    )
}
export default Modal;