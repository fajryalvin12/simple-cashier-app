import Card from "../components/Card";
import { getDashboardSummary } from "../services/dashboardServices";
import {
  getTransactionsList,
  getTransactionDetails,
} from "../services/transactionServices";
import { useEffect, useState } from "react";

function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [trxDetails, setTrxDetails] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getDashboardSummary();
        const dataTrx = await getTransactionsList();
        setTransactions(dataTrx);
        setSummary(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  const overview = [
    {
      icon: "📦",
      count: summary?.totalProducts || 0,
      status: "Total Products",
    },
    {
      icon: "🛒",
      count: summary?.totalTransactions || 0,
      status: "Total Orders",
    },
    {
      icon: "💰",
      count: summary?.totalRevenue || 0,
      status: "Revenue",
    },
    {
      icon: "⚠️",
      count: summary?.lowStockProducts || 0,
      status: "Low stock product",
    },
  ];

  const handleDetailTrx = async (id) => {
    try {
      const details = await getTransactionDetails(id);
      setTrxDetails(details);
    } catch (error) {
      console.error(error);
    }
  };

  console.log(trxDetails);

  return (
    <div className="flex flex-col gap-4 items-center min-h-screen py-10 bg-gray-200">
      <h1 className="text-lg font-bold">Dashboard</h1>
      <div className="flex gap-4">
        {overview?.map((item, index) => {
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
      <div className="bg-white p-4 w-full m-4 rounded-xl overflow-hidden shadow-sm">
        <h2 className="text-md font-bold">Recent Transactions</h2>
        <table className="w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2">ID</th>
              <th className="py-2">User</th>
              <th className="py-2">Total Price</th>
              <th className="py-2">Order date</th>
              <th className="py-2">Action</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {transactions.map((trx) => (
              <tr key={trx.id} className="hover:bg-gray-50 transition-colors">
                <td className="py-2 border-b">{trx.id}</td>
                <td className="py-2 border-b">{trx.user.username}</td>
                <td className="py-2 border-b">
                  Rp{trx.total_price.toLocaleString("id-ID")}
                </td>
                <td className="py-2 border-b">
                  {new Date(trx.created_at).toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
                <td className="py-2 border-b">
                  <button
                    onClick={() => handleDetailTrx(trx.id)}
                    className="text-blue-600 hover:underline"
                  >
                    Detail
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
