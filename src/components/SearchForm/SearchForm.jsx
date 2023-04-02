function SearchBar({ onSubmit, handleInputChange, searchQuery }) {
  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search films"
        onChange={handleInputChange}
        value={searchQuery}
      />
      <button type="submit">Search</button>
    </form>
  );
}
export default SearchBar;
