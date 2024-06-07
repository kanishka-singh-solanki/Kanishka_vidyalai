import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useContext } from 'react';   // Task7
import styled from '@emotion/styled';
import Post from './Post';
import Container from '../common/Container';
// import useWindowWidth from '../hooks/useWindowWidth';
import useWindowWidth, { WindowWidthContext } from '../hooks/WindowWidthContext';  // Task 7

const PostListContainer = styled.div(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
}));

const LoadMoreButton = styled.button(() => ({
  padding: '10px 20px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: 5,
  cursor: 'pointer',
  fontSize: 16,
  marginTop: 20,
  transition: 'background-color 0.3s ease',
  fontWeight: 600,

  '&:hover': {
    backgroundColor: '#0056b3',
  },
  '&:disabled': {
    backgroundColor: '#808080',
    cursor: 'default',
  },
}));

export default function Posts() {
  const [posts, setPosts] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);   // Task 7
  const [ hideLoadMoreButton, setHideLoadMoreButton ] = useState(false);  //Task4
  const [page, setPage] = useState(0); // Task4

  // const { isSmallerDevice } = useWindowWidth();
  const { isSmallerDevice } = useContext(WindowWidthContext); // Task 7

  useEffect(() => {

    // Task4
    const fetchPosts = async () => {
      try {
        const { data: newPosts } = await axios.get('/api/v1/posts', {
          params: {
            start: page * (isSmallerDevice ? 5 : 10),
            limit: isSmallerDevice ? 5 : 10,
          },
        });
        
        // Task 7
        setPosts((prevPosts) => [...prevPosts, ...newPosts]);
        setIsLoading(false);
    
        // Handle no new posts fetched on "Load More"
        if (
          page * (isSmallerDevice ? 5 : 10) === posts.length + (isSmallerDevice ? 5 : 10) &&
          !hideLoadMoreButton
        ) {
          setPage(page - 1);
        }
        // Task 7

        // Handle no more posts to load
        if (newPosts.length === 0) {
          setHideLoadMoreButton(true);
        }
        // setPosts([...posts, ...newPosts]);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    
    fetchPosts();
  }, [page, isSmallerDevice]);
    // Task4

  const handleClick = () => {
    setPage(page + 1);    //Task4
    setIsLoading(true);

  };

  return (
    <Container>
      <PostListContainer>
        {posts.map(post => (
          <Post post={post} />
        ))}
      </PostListContainer>


      {/* Task4 */}
      {!hideLoadMoreButton && <div style={{ display: 'flex', justifyContent: 'center' }}>
        <LoadMoreButton onClick={handleClick} disabled={isLoading}>
          {!isLoading ? 'Load More' : 'Loading...'}
        </LoadMoreButton>
      </div>}
        {/* Task4 */}
        
    </Container>
  );
}
