import { useState } from "react";
import Card from "./components/Card";

function App() {
  const overview = [
    { icon: "1", count: 120, status: "Total Products" },
    { icon: "2", count: 845, status: "Total Orders" },
    { icon: "3", count: 12450, status: "Revenue" },
    { icon: "4", count: 7, status: "Low stock product" },
  ];

  return (
    <>
      <div className="flex flex-col gap-4 justify-center items-center h-screen bg-gray-200">
        <h1 className="text-lg font-bold">Dashboard</h1>
        <div className="flex gap-4">
          {overview.map((item, index) => {
            return (
              <Card
                key={index}
                icon={item.icon}
                count={item.count}
                status={item.status}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
