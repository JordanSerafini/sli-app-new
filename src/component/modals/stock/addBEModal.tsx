import closeLogo from "../../../assets/closeLogo.png";

function addBEModal({
    setShowModal,
  }: {
    setShowModal: (value: boolean) => void;
  }) {
    
    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-60 w-10/10">
            <div className=" border-2 border-secondary h-9/10 mb-16 bg-white rounded-2xl z-50 flex flex-col p-2 gap-8 text-gray-600 relative sm:w-8.5/10 w-9.5/10">
                <div className="absolute top-2 right-2">
                    <button onClick={handleCloseModal} className="">
                        <img src={closeLogo} alt="" className="h-4 m-" />
                    </button>
                </div>
                <h1 onClick={handleCloseModal}>addBEModal</h1>
            </div>
        </div>
    );
}

export default addBEModal;
