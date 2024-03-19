function addBEModal({
    setShowModal,
  }: {
    setShowModal: (value: boolean) => void;
  }) {
    
    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
       
        <div className="self-center border-2 border-secondary w-9/10 h-9.5/10 fixed bg-white rounded-2xl z-50 flex flex-col p-2 gap-8 text-gray-600">
        <h1 onClick={handleCloseModal}>addBEModal</h1>
        </div>
    );

  }
export default addBEModal;