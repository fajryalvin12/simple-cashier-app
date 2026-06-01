import { useState } from "react";

const navItems = [
  { icon: "📊", label: "Dashboard", key: "dashboard" },
  { icon: "📦", label: "Products", key: "products" },
  { icon: "🧾", label: "Transactions", key: "transactions" },
];

function Sidebar({ activePage, onNavigate }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`flex flex-col bg-gray-900 text-white transition-all duration-300 ${
        collapsed ? "w-16" : "w-56"
      } min-h-screen shrink-0`}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-gray-700">
        <span className="text-2xl">🏪</span>
        {!collapsed && (
          <span className="font-bold text-sm tracking-widest uppercase text-white">
            KasirApp
          </span>
        )}
      </div>

      {/* Nav Items */}
      <nav className="flex flex-col gap-1 px-2 py-4 flex-1">
        {navItems.map((item) => (
          <button
            key={item.key}
            onClick={() => onNavigate(item.key)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors cursor-pointer w-full text-left ${
              activePage === item.key
                ? "bg-indigo-600 text-white font-semibold"
                : "text-gray-400 hover:bg-gray-800 hover:text-white"
            }`}
          >
            <span className="text-base shrink-0">{item.icon}</span>
            {!collapsed && <span>{item.label}</span>}
          </button>
        ))}
      </nav>

      {/* Collapse Toggle */}
      <div className="px-2 pb-4">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-500 hover:bg-gray-800 hover:text-white w-full cursor-pointer transition-colors"
        >
          <span className="text-base shrink-0">{collapsed ? "→" : "←"}</span>
          {!collapsed && <span>Collapse</span>}
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
