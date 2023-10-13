import { Box } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

export interface Props {
  images: string[];
}

const CarouselImages = ({ images }: Props) => {
  return (
    <Carousel useKeyboardArrows centerMode={true}>
      {images.map((image, index) => {
        return (
          <div className="slide" key={index}>
            <Box
              component="img"
              sx={{
                height: 255,
                display: "flex",
                overflow: "hidden",
                width: "100%",
                marginTop: "20px",
              }}
              src={image}
              alt="sample_file"
            />
          </div>
        );
      })}
    </Carousel>
  );
};

export default CarouselImages;
