import React from "react";
import "../styles/invoice.css";

const InvoicePage = () => {
  const invoiceData = {
    invoiceNumber: "INV-2025-001",
    date: "11 October 2025",
    name: "Aisy Iffat",
    email: "aisy@example.com",
    items: [
      { description: "Nasi Lemak Set", quantity: 2, price: 8.5 },
      { description: "Western Chicken Chop", quantity: 1, price: 14.0 },
    ],
  };

  const total = invoiceData.items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  return (
    <div className="invoice-container">
      <header className="invoice-header">
        <h1>Nasi Lemak & Western</h1>
        <p>Receipt / Invoice</p>
      </header>

      <section className="invoice-info">
        <div>
          <h3>Bill To:</h3>
          <p>{invoiceData.name}</p>
          <p>{invoiceData.email}</p>
        </div>
        <div>
          <h3>Invoice Details:</h3>
          <p>Invoice No: {invoiceData.invoiceNumber}</p>
          <p>Date: {invoiceData.date}</p>
        </div>
      </section>

      <table className="invoice-table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Qty</th>
            <th>Price (RM)</th>
            <th>Total (RM)</th>
          </tr>
        </thead>
        <tbody>
          {invoiceData.items.map((item, index) => (
            <tr key={index}>
              <td>{item.description}</td>
              <td>{item.quantity}</td>
              <td>{item.price.toFixed(2)}</td>
              <td>{(item.quantity * item.price).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="invoice-total">
        <h3>Total: RM {total.toFixed(2)}</h3>
      </div>

      <footer className="invoice-footer">
        <p>Thank you for your purchase!</p>
        <p>Contact us: nasiwestern@example.com | +60 13-234 5678</p>
      </footer>
    </div>
  );
};

export default InvoicePage;
