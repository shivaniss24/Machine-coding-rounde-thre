import { useState } from "react";
import { snacks } from "./snacks";
import "./styles.css";

export default function App() {
  const [snacksData, setSnacksData] = useState(snacks);
  const [searchInput, setSearchInput] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortBy, setSortBy] = useState("");

  // Use to filter the data
  const handleSearchInputChange = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchInput(value);

    const filteredSnacks = snacks.filter(
      // Includes function in used to find that if seach input is present in snacks
      (snack) =>
        snack.product_name.toLowerCase().includes(value) ||
        snack.ingredients.join(" ").toLowerCase().includes(value)
    );
    setSnacksData(filteredSnacks);
  };

  // Handles the header click table functionality
  const handleTableHeaderClick = (columnName) => {
    if (sortBy === columnName) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(columnName);
      setSortOrder("asc");
    }
  };

  // Actual sorting of data happens here
  // Based on sort function happening above.
  const sortedSnacksData = snacksData.slice().sort((a, b) => {
    if (sortOrder === "asc") {
      return a[sortBy] > b[sortBy] ? 1 : -1;
    } else {
      return a[sortBy] < b[sortBy] ? 1 : -1;
    }
  });

  return (
    <div className="App">
      <h1>Snacks Table</h1>
      <input
        type="text"
        style={{
          padding: "12px 24px",
          borderStyle: "none",
          border: "2px solid black",
          borderRadius: "4px"
        }}
        placeholder="Search products here"
        value={searchInput}
        onChange={handleSearchInputChange}
      />
      <hr />
      <table>
        <thead>
          <tr>
            <th onClick={() => handleTableHeaderClick("id")}>ID</th>
            <th onClick={() => handleTableHeaderClick("product_name")}>
              Product Name
            </th>
            <th onClick={() => handleTableHeaderClick("product_weight")}>
              Product Weight
            </th>
            <th onClick={() => handleTableHeaderClick("price")}>Price</th>
            <th onClick={() => handleTableHeaderClick("calories")}>Calories</th>
            <th onClick={() => handleTableHeaderClick("ingredients")}>
              Ingredients
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedSnacksData.map((snack) => (
            <tr key={snack.id}>
              <td>{snack.id}</td>
              <td>{snack.product_name}</td>
              <td>{snack.product_weight}</td>
              <td>{snack.price}</td>
              <td>{snack.calories}</td>
              <td>{snack.ingredients.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
