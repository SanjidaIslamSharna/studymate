import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Pagination, Navigation } from "swiper/modules";


const slides = [
  {
    desktopImage:
      "https://i.postimg.cc/y8zMrGTL/back_school_concept_with_glasses_books_pencils_holder_wooden_white_wall_side_view.jpg",
    mobileImage: "https://i.postimg.cc/y8zMrGTL/back_school_concept_with_glasses_books_pencils_holder_wooden_white_wall_side_view.jpg",
    title: "Keep Your Pets Warm This Winter",
    subtitle: "Explore cozy outfits and care tips for your furry friends.",
  },
  {
    desktopImage:
      "https://i.postimg.cc/SNQT2pVG/pile-books-pencils-desk.jpg",
    mobileImage: "https://i.postimg.cc/SNQT2pVG/pile-books-pencils-desk.jpg",
    title: "Winter Grooming & Paw Care",
    subtitle: "Protect your pet's paws and fur with professional care.",
  },
  {
    desktopImage:
      "https://i.postimg.cc/L8Mc0WVW/front_view_books_desk.jpg",
    mobileImage: "https://i.postimg.cc/L8Mc0WVW/front_view_books_desk.jpg",
    title: "Stay Cozy, Stay Happy",
    subtitle: "Discover winter essentials for your beloved pets.",
  },
];
const HeroBanner = () => {
  return (
    <Swiper
      modules={[Autoplay, Pagination, Navigation]}
      slidesPerView={1}
      loop={true}
      autoplay={{ delay: 6000, disableOnInteraction: false }}
      className="w-full"
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          {/* ✅ Slide Wrapper */}
          <div className="relative w-full h-[40vh] sm:h-[55vh] md:h-[70vh] overflow-hidden">
            
            {/* ✅ Responsive Image */}
            <picture>
              <source media="(max-width: 640px)" srcSet={slide.mobileImage} />
              <img
                src={slide.desktopImage}
                alt={slide.title}
                className="w-full h-full object-cover transition-all duration-700"
              />
            </picture>

            {/* ✅ Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>

            {/* ✅ Text Content */}
            <div className="absolute inset-0 flex flex-col justify-center sm:justify-center px-4 sm:px-8 md:px-20">
              <div className="text-white max-w-md sm:max-w-lg">
                <h1 className="text-xl sm:text-3xl md:text-5xl font-bold leading-tight drop-shadow-lg">
                  {slide.title}
                </h1>
                <p className="mt-2 sm:mt-4 text-sm sm:text-base md:text-xl text-gray-200 drop-shadow-md">
                  {slide.subtitle}
                </p>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
export default HeroBanner;