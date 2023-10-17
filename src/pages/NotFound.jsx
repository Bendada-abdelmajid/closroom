import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="page-not-found center">
      <div class="error">
        <h2> 404 </h2>
        <div class="text">
          <b>Error</b>
        </div>
      </div>
      <p>Page not found</p>
      <Link to="/">
        <button className="success_btn">back to home</button>
      </Link>
    </div>
  );
}
