"use client";

export default function PrintButton() {
  return <button type="button" className="pt-btn alt" onClick={() => window.print()}>Print</button>;
}
