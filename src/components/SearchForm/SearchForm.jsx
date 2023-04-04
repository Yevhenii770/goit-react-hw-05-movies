function SearchBar({ onSubmit, handleInputChange, value }) {
  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search films"
        onChange={handleInputChange}
        value={value}
      />
      <button type="submit">Search</button>
    </form>
  );
}
export default SearchBar;
