import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react'; // Task 2
import styled from '@emotion/styled';
import Image from 'next/image'; // Task 4


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

// const Image = styled.img(() => ({
const ImageStyled = styled(Image)(() => ({ // Task4
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

// Task5
const HeadingContainer = styled.div(() => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
}));

const DataContainer = styled.div(() => ({
  display: 'flex',
  flexDirection: 'column',
  margin: '2%',
}));

const IconContainer = styled.div(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '60px',
  height: '60px',
  backgroundColor: 'grey',
  borderRadius: '50%',
  color: 'white',
  fontSize: '25px',
  fontWeight: 'bold',
  margin: '5px',
  padding: '0',
}));

const NameText = styled.div(() => ({
  display: 'flex',
  fontWeight: 'bold',
}));

const EmailText = styled.div(() => ({
  display: 'flex',
}));
// Task5

const Post = ({ post }) => {
  const carouselRef = useRef(null);

    // Task4
  
    const initialLoadedImages = post.images.slice(0, 2);
    const [loadedImages, setLoadedImages] = useState(initialLoadedImages);
  
    const initialLoadingStates = Array(initialLoadedImages.length).fill(true);
    const [loadingStates, setLoadingStates] = useState(initialLoadingStates);
  
    const handleImageLoad = index => {
      // Option 1: Update state directly (more concise)
      setLoadingStates(prevStates => [
        ...prevStates.slice(0, index),
        false,
        ...prevStates.slice(index + 1),
      ]);
  
      // Option 2: Update specific element using spread syntax (cleaner)
      setLoadingStates(prevStates => {
        return [...prevStates].map((state, i) => (i === index ? false : state));
      });
    };
  
    // Task4

  const handleNextClick = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: 300, // Task 1
        behavior: 'smooth',
      });
    }
    loadMoreImages(); // Task4
  };

  const handlePrevClick = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -300, // Task 1
        behavior: 'smooth',
      });
    }
  };

  // // Task2
  // const [loadedImages, setLoadedImages] = useState(post.images.slice(0, 3));

  // useEffect(() => {
  //   const loadMoreImages = async () => {
  //     const remainingImages = post.images.slice(loadedImages.length);
  //     if (remainingImages.length > 0) {
  //       const nextImage = remainingImages[0];
  //       setLoadedImages(prevImages => [...prevImages, nextImage]);
  //     }
  //   };
  //     loadMoreImages();
  // }, [loadedImages, post.images, handleNextClick]);
  // // Task2

  // Task4
  const loadMoreImages = () => {
    // Get the remaining images to load (more concise and efficient)
    const remainingImages = post.images.slice(loadedImages.length);

    if (remainingImages.length) {
      // Get the next image to load
      const nextImage = remainingImages[0];

      // Update loaded images and loading states using spread syntax (cleaner)
      setLoadedImages(prevImages => [...prevImages, nextImage]);
      setLoadingStates(prevStates => [...prevStates, true]);
    }
  };
  // Task4

  return (
    <PostContainer>
      
      {/* Task5 */}
      <HeadingContainer>
        <IconContainer>
          {post.user.name
            .split(' ')
            .map((part, index, arr) =>
              index === 0 || index === arr.length - 1 ? part[0] : '',
            )
            .join('')
            .toUpperCase()}
        </IconContainer>
        <DataContainer>
          <NameText>{post.user.name}</NameText>
          <EmailText>{post.user.email}</EmailText>
        </DataContainer>
      </HeadingContainer>
      {/* Task5 */}

      <CarouselContainer>
        
        <Carousel ref={carouselRef}>
          {loadedImages.map((image, index) => (
            <CarouselItem key={index}>
              {loadingStates[index] ? <p>Loading...</p> : null}{' '}
              {/* Ternary for loading state */}
              <ImageStyled
                src={image.url}
                alt={post.title}
                width={300}
                height={300}
                onLoad={() => handleImageLoad(index)}
                onError={e => {
                  if (e.target.status === 504) {
                    const updatedImages = post.images
                      .slice(0, index)
                      .concat(post.images.slice(index + 1)); // Concatenation for removed image
                    setLoadedImages(
                      updatedImages.filter((_, i) => i !== index),
                    );
                    setLoadingStates(updatedImages.map(() => false)); // Create loading states for all images

                    loadMoreImages();
                  }
                }}
              />
            </CarouselItem>
          ))}
        </Carousel>

        {/* Task4 */}
        
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
