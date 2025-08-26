import StepsSlider from "./Steps/StepsSlider";
import StepsTitle from "./Steps/StepsTitle";

const StepsSection = () => {
  return (
    <section className="steps-section min-h-dvh">
      <div className="h-full flex lg:flex-row flex-col items-center relative">
        <div className="lg:w-[57%] flex-none h-80 lg:h-full md:mt-20 xl:mt-0">
          <StepsTitle />
        </div>

        <div className="h-full">
          <StepsSlider />
        </div>
      </div>
    </section>
  );
};

export default StepsSection;
