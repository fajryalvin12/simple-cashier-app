function Card({ icon, count, status }) {
  return (
    <div className="flex flex-col gap-8 justify-center items-center h-32 w-64 rounded-lg p-4 bg-white">
      <div className="flex gap-4 items-center w-full">
        <div className="p-2 text-white bg-black rounded-sm text-md">{icon}</div>
        <div>
          <div className="text-sm font-semibold">{count}</div>
          <div className="text-sm text-gray-500">{status}</div>
        </div>
      </div>
      <div className="flex text-xs justify-between items-center w-full">
        <div>See the details</div>
        <div>graphic</div>
      </div>
    </div>
  );
}

export default Card;
