import React from "react";
import { Link } from "react-router-dom";

export default function Breadcrumb({ breadcrumbs }) {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        {breadcrumbs.map(
          (breadcrumb, index) =>
            breadcrumb && (
              <li className="breadcrumb-item" key={index}>
                {index === breadcrumbs.length - 1 ? (
                  <p>{breadcrumb.label}</p>
                ) : (
                  <Link to={breadcrumb.url}>{breadcrumb.label}</Link>
                )}
              </li>
            )
        )}
      </ol>
    </nav>
  );
}