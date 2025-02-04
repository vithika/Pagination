import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { PAGE_SIZE } from "./constants";
import ProductCard from "./components/ProductCard";

function App() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const datafetched = await fetch("https://dummyjson.com/products?limit=200");
    const json = await datafetched.json();
    setData(json.products);
  };
  const handlePageChange = (n) => {
    setCurrentPage(n);
  };

  const totalProducts = data.length;
  const no_Of_pages = Math.ceil(totalProducts / PAGE_SIZE);
  const start = currentPage * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  return !data.length ? (
    <h1>No products found</h1>
  ) : (
    <div className="App">
      <h1> Pagination</h1>
      <div className="pagination-container">
        <button
          disabled={currentPage === 0}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          ☚
        </button>
        {[...Array(no_Of_pages).keys()].map((n) => (
          <button
            className={"page_no " + (n === currentPage ? "active" : " ")}
            key={n}
            onClick={() => handlePageChange(n)}
          >
            {n}
          </button>
        ))}
        <button
          disabled={currentPage === no_Of_pages - 1}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          {" "}
          ☛
        </button>
      </div>
      <div className="products-container">
        {data.slice(start, end).map((d) => (
          <ProductCard key={d.id} image={d.thumbnail} title={d.title} />
        ))}
      </div>
    </div>
  );
}

export default App;
