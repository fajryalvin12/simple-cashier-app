function Card({ icon, count, status, trend }) {
  return (
    <div className="flex flex-col justify-between bg-white rounded-xl p-4 shadow-sm border border-gray-100 min-w-0 flex-1">
      <div className="flex items-start justify-between">
        <div className="p-2 bg-indigo-50 rounded-lg text-lg leading-none">
          {icon}
        </div>
        {trend !== undefined && (
          <span
            className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
              trend >= 0
                ? "bg-green-50 text-green-700"
                : "bg-red-50 text-red-600"
            }`}
          >
            {trend >= 0 ? "▲" : "▼"} {Math.abs(trend)}%
          </span>
        )}
      </div>
      <div className="mt-3">
        {status === "Revenue" ? (
          <p className="text-xl font-bold text-gray-800">
            Rp {count.toLocaleString("id-ID")}
          </p>
        ) : (
          <p className="text-xl font-bold text-gray-800">{count}</p>
        )}
        <p className="text-xs text-gray-500 mt-0.5">{status}</p>
      </div>
    </div>
  );
}

export default Card;
