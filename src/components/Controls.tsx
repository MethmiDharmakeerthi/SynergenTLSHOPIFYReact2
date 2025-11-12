import React from 'react';

interface ControlsProps {
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  sortOrder: string;
  onSortChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  allTags: string[];
  selectedTags: string[];
  onTagChange: (tag: string) => void;
}

const Controls: React.FC<ControlsProps> = ({
  searchQuery,
  onSearchChange,
  sortOrder,
  onSortChange,
  allTags,
  selectedTags,
  onTagChange,
}) => {
  return (
    <div className="controls">
      <h3>Filters</h3>
      <div className="control-group">
        <label htmlFor="search">Search</label>
        <input
          type="search"
          id="search"
          placeholder="Search by title..."
          value={searchQuery}
          onChange={onSearchChange}
        />
      </div>

      <div className="control-group">
        <label htmlFor="sort">Sort by</label>
        <select id="sort" value={sortOrder} onChange={onSortChange}>
          <option value="default">Default</option>
          <option value="price-asc">Price (Low to High)</option>
          <option value="price-desc">Price (High to Low)</option>
        </select>
      </div>

      <div className="control-group">
        <label>Filter by Tag</label>
        <div className="tag-list">
          {allTags.map((tag) => (
            <div key={tag} className="tag-option">
              <input
                type="checkbox"
                id={`tag-${tag}`}
                value={tag}
                checked={selectedTags.includes(tag)}
                onChange={() => onTagChange(tag)}
              />
              <label htmlFor={`tag-${tag}`}>{tag}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Controls;