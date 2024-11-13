import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import api from '../../services/api';
import Loading from '../../components/Loading';

import { FullPageContainer, Container, LeftBlock, MiddleBlock, RightBlock } from './styles';

function BookDetails(props) {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchBook() {
      setLoading(true);
      await api.get(`/volumes/${props.match.params.book_id}`).then(({ data: response }) => {
        const bookData = response.docs[0]; // Assuming you're interested in the first book from the response.

        const bookLoaded = {
          id: bookData.key,
          title: bookData.title,
          authors: bookData.author_name ? bookData.author_name.join(', ') : 'UNKNOWN AUTHOR',
          publisher: bookData.publisher ? bookData.publisher[0] : 'UNKNOWN PUBLISHER',
          publishedDate: bookData.publish_date ? bookData.publish_date[0] : 'UNKNOWN DATE',
          isbn: bookData.isbn ? bookData.isbn[0] : 'UNKNOWN ISBN',
          language: bookData.language ? bookData.language[0] : 'UNKNOWN LANGUAGE',
          pagesAmount: bookData.number_of_pages_median || 'UNKNOWN',
          firstPublishYear: bookData.first_publish_year || 'UNKNOWN',
          description: 'Description not available',
          // You can update description based on your data source
        };

        setBook(bookLoaded);
        setLoading(false);
      });
    }

    fetchBook();
  }, [props.match.params.book_id]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <FullPageContainer>
          <Link to="/" className="back-link">
            <i className="fas fa-arrow-left"></i> Back
          </Link>
          <Container>
            <LeftBlock className="book-image">
              <div className="title-and-image">
                {/* Placeholder image as there's no thumbnail in the data */}
                <img src="https://books.google.com.br/googlebooks/images/no_cover_thumb.gif" alt={`${book.title} Cover`} />
                <h1>{book.title}</h1>
              </div>

              <div className="stats">
                <div className="stat-row">
                  <label>Author(s):</label> <span>{book.authors}</span>
                </div>
                <div className="stat-row">
                  <label>Publisher:</label> <span>{book.publisher}</span>
                </div>
                <div className="stat-row">
                  <label>Published in:</label> <span>{book.publishedDate}</span>
                </div>
                <div className="stat-row">
                  <label>Pages amount:</label> <span>{book.pagesAmount}</span>
                </div>
                <div className="stat-row">
                  <label>First Published in:</label> <span>{book.firstPublishYear}</span>
                </div>
              </div>
            </LeftBlock>

            <MiddleBlock cover2Columns={false}>
              <div className="desc-row">
                <h2>Book Description</h2>
                <p className="description">{book.description}</p>
              </div>
            </MiddleBlock>

            {/* No sale info, as the API doesn't provide it, but you can add custom components for other functionalities */}
          </Container>
        </FullPageContainer>
      )}
    </>
  );
}

export default BookDetails;
