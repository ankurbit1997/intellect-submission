import "../styles/one.css";
import WellBeing from "../components/Wellbeing/index";
import { useCallback, useState } from "react";
import { AnimatePresence } from "framer-motion";

const One = () => {
  const [showModal, setShowModal] = useState(false);

  const closeModal = useCallback(() => {
    setShowModal(false);
  }, []);

  return (
    <AnimatePresence>
      <div className="container pt-10 relative">
        {showModal ? (
          <WellBeing closeModal={closeModal} />
        ) : (
          <button
            onClick={() => setShowModal(!showModal)}
            className="bg-teal-600 mt-4 text-xs text-white font-semibold px-2 py-2 w-auto self-stretch rounded-md"
          >
            Check-In
          </button>
        )}
      </div>
    </AnimatePresence>
  );
};

export default One;
