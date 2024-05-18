import React, { useState, useEffect } from 'react';
import iziToast from 'izitoast';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { ArticleList } from './components/ArticlesList';
import { Loader } from './components/Loader';
import { SearchBar } from './components/SearchBar';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'izitoast/dist/css/iziToast.min.css';

function App() {
  const [articles, setArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('React');
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchArticles(currentPage);
  }, [currentPage]);

  const fetchArticles = async (page) => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://hn.algolia.com/api/v1/search?query=${searchQuery}&page=${page - 1}`);
      const data = await response.json();
      if (data.hits.length === 0) {
        iziToast.warning({
          title: 'No results',
          message: 'No articles found for your query. Please try a different search.',
          position: 'topCenter'
        });
      } else {
        setArticles(page > 1 ? [...articles, ...data.hits] : data.hits);
        setTotalPages(data.nbPages);
      }
    } catch (error) {
      console.error('Error fetching data: ', error);
      iziToast.error({
        title: 'Error',
        message: 'Failed to fetch articles.',
        position: 'topCenter'
      });
    }
    setIsLoading(false);
  };

  const doSearch = () => {
    setCurrentPage(1);
    fetchArticles(1);
  };

  const loadMoreArticles = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div className="App">
      {/* Navbar with custom style to control the width, centering and border radius */}
      <div style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: '#8fbc8f', borderRadius: '10px' }}>
        <Navbar variant="dark" expand="lg" style={{ width: '100%', borderRadius: '10px' }}>
          <Container>
            <Navbar.Brand href="#home" style={{ color: 'white' }}>HackerNews</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="#news" style={{ color: 'white' }}>News</Nav.Link>
              <Nav.Link href="#past" style={{ color: 'white' }}>Past</Nav.Link>
              <Nav.Link href="#comments" style={{ color: 'white' }}>Comments</Nav.Link>
              <Nav.Link href="#ask" style={{ color: 'white' }}>Ask</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </div>

      {/* Main container */}
      <Container className="mt-3">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} doSearch={doSearch} />
        {isLoading ? <Loader /> : <ArticleList articles={articles} />}
        {currentPage < totalPages && (
          <div className="d-flex justify-content-center mt-4">
            <Button onClick={loadMoreArticles}>Load More</Button>
          </div>
        )}
      </Container>
    </div>
  );
}

export default App;
