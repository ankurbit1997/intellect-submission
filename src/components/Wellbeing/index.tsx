import { IMoodCard } from "./interface";
import { useCallback, useState } from "react";
import { alright, bad, fantastic, prettygood, terrible } from "../../assets";
import IconBxArrowBack from "../../svg/Back";
import Cross from "../../svg/Cross";
import { motion } from "framer-motion";
import MoodCard from "../UI/MoodCard";

export const moodData: IMoodCard[] = [
  {
    id: 1,
    title: "Terrible",
    img: terrible,
  },
  {
    id: 2,
    title: "Bad",
    img: bad,
  },
  {
    id: 3,
    title: "Alright",
    img: alright,
  },
  {
    id: 4,
    title: "Good",
    img: prettygood,
  },
  {
    id: 5,
    title: "Fantastic",
    img: fantastic,
  },
];

const Index = ({ closeModal }: { closeModal: () => void }) => {
  const [selectedMood, setSelectedMood] = useState<IMoodCard | null>();

  //mocking next step handle , in real application this wont look like this
  const [continueClicked, setContinueClicked] = useState(false);

  const handleContinueClicked = useCallback(() => {
    setContinueClicked(true);
  }, []);

  const isDisabled = !selectedMood;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded p-5 flex flex-col items-center w-full max-w-xl mx-3 sm:md-2 relative"
    >
      <h4 className="text-black sm:text-xl font-semibold">
        Wellbeing Check-in
      </h4>
      <p className="text-gray-600 mt-24 sm:mt-32 text-xs font-semibold">
        {continueClicked
          ? "Thanks for the answer!"
          : "Hello! How are you feeling today?"}
      </p>
      <div
        onClick={() => {
          if (continueClicked) {
            setContinueClicked(false);
            setSelectedMood(null);
          } else {
            closeModal();
          }
        }}
        data-testid={"back-button"}
        role="button"
        className="absolute left-4 top-4"
      >
        <IconBxArrowBack />
      </div>
      <div
        data-testid={"close-button"}
        onClick={closeModal}
        role="button"
        className="absolute right-4 top-4"
      >
        <Cross />
      </div>
      {continueClicked && selectedMood ? (
        <div className="flex mb-16 sm:mb-20 mt-8 gap-1 grow flex-wrap">
          <MoodCard selectedMood={selectedMood} item={selectedMood} />
        </div>
      ) : (
        <div className="flex mb-16 sm:mb-20 mt-8 gap-1 grow flex-wrap">
          {moodData.map((item) => {
            return (
              <MoodCard
                selectedMood={selectedMood}
                setSelectedMood={setSelectedMood}
                key={item?.id}
                item={item}
              />
            );
          })}
        </div>
      )}

      <button
        onClick={handleContinueClicked}
        disabled={isDisabled}
        className={` mt-4 text-xs  font-semibold px-2 py-2 w-auto self-stretch rounded-md ${
          isDisabled ? "bg-teal-100 text-teal-600" : "bg-teal-600 text-teal-50"
        }`}
        data-testid={continueClicked ? "thankyou-button" : "continue-button"}
      >
        {continueClicked ? "Thank you!" : "Continue"}
      </button>
    </motion.div>
  );
};

export default Index;
