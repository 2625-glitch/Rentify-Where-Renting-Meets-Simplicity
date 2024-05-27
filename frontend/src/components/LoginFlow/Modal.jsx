/* eslint-disable react/prop-types */
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-6 ">
      <div className="bg-white p-8 rounded-lg shadow-lg relative max-w-full lg:max-w-3xl">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
