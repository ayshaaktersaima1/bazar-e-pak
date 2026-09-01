const PageBanner = ({ title, description, imageClass }) => {
  return (
    <section className={`bg-cover bg-center bg-no-repeat ${imageClass}`}>
      <div className="mx-auto flex w-[90%] items-center py-16 md:py-20 lg:py-24">
        <div className="max-w-xl">
          <h1 className="text-3xl font-bold text-[#001B08] md:text-4xl lg:text-5xl">
            {title}
          </h1>

          <p className="mt-4 text-base leading-7 text-gray-700 md:text-lg">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default PageBanner;
