import React from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';

export function SearchBar({ searchQuery, setSearchQuery, doSearch }) {
  return (
    <InputGroup className="mb-3" style={{ maxWidth: '600px', margin: 'auto' }}>  
      <FormControl
        placeholder="Search for articles..."
        aria-label="Search for articles"
        aria-describedby="button-addon2"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Button variant="outline-primary" id="button-addon2" onClick={doSearch}>
        Search
      </Button>
    </InputGroup>
  );
}
