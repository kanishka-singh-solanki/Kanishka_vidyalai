import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react'; // Task 2
import styled from '@emotion/styled';

const PostContainer = styled.div(() => ({
  width: '300px',
  margin: '10px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  overflow: 'hidden',
}));

const CarouselContainer = styled.div(() => ({
  position: 'relative',
}));

const Carousel = styled.div(() => ({
  display: 'flex',
  overflowX: 'scroll',
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  position: 'relative',
}));

const CarouselItem = styled.div(() => ({
  flex: '0 0 auto',
  scrollSnapAlign: 'start',
}));

const Image = styled.img(() => ({
  width: '280px',
  height: 'auto',
  maxHeight: '300px',
  padding: '10px',
}));

const Content = styled.div(() => ({
  padding: '10px',
  '& > h2': {
    marginBottom: '16px',
  },
}));

const Button = styled.button(() => ({
  position: 'absolute',
  bottom: 0,
  top: '40%',   // Task1
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  border: 'none',
  color: '#000',
  fontSize: '20px',
  cursor: 'pointer',
  height: '50px',
}));

const PrevButton = styled(Button)`
  left: 10px;
`;

const NextButton = styled(Button)`
  right: 10px;
`;

const Post = ({ post }) => {
  const carouselRef = useRef(null);

  const handleNextClick = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: 300, // Task 1
        behavior: 'smooth',
      });
    }
  };

  const handlePrevClick = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -300, // Task 1
        behavior: 'smooth',
      });
    }
  };

  // Task2
  const [loadedImages, setLoadedImages] = useState(post.images.slice(0, 3));

  useEffect(() => {
    const loadMoreImages = async () => {
      const remainingImages = post.images.slice(loadedImages.length);
      if (remainingImages.length > 0) {
        const nextImage = remainingImages[0];
        setLoadedImages(prevImages => [...prevImages, nextImage]);
      }
    };
      loadMoreImages();
  }, [loadedImages, post.images, handleNextClick]);
  // Task2

  return (
    <PostContainer>
      <CarouselContainer>
        {/* <Carousel ref={carouselRef}>
          {post.images.map((image, index) => (
            <CarouselItem key={index}>
              <Image src={image.url} alt={post.title} />
            </CarouselItem>
          ))}
        </Carousel> */}

        {/* Task2 */}
        {loadedImages.length > 0 ? (
          <Carousel ref={carouselRef}>
            {loadedImages.map((image, index) => (
              <CarouselItem key={index}>
                <Image src={image.url} alt={post.title} />
              </CarouselItem>
            ))}
          </Carousel>
        ) : (
          <p>Loading images...</p>
        )}
        {/* Task2 */}
        
        <PrevButton onClick={handlePrevClick}>&#10094;</PrevButton>
        <NextButton onClick={handleNextClick}>&#10095;</NextButton>
      </CarouselContainer>
      <Content>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
      </Content>
    </PostContainer>
  );
};

Post.propTypes = {
  post: PropTypes.shape({
    content: PropTypes.any,
    images: PropTypes.shape({
      map: PropTypes.func,
    }),
    title: PropTypes.any,
  }),
};

export default Post;
