import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';

export function ArticleList({ articles }) {
  return (
    <ListGroup style={{ maxWidth: '800px', margin: 'auto' }}> 
      {articles.map((article, index) => (
        <Card key={index} className="mb-3">
          <Card.Body>
            <Card.Title>
              <a href={article.url} target="_blank" rel="noopener noreferrer">{article.title}</a>
            </Card.Title>
            <Card.Text>
              {article.author}
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
    </ListGroup>
  );
}
