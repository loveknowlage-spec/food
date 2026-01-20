
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  LayoutDashboard, UtensilsCrossed, ShoppingCart, Users, CreditCard, 
  Truck, Box, Percent, FileText, Star, Bell, UserCog, BarChart3, 
  Settings as SettingsIcon, ShieldAlert, LogOut, Plus, Edit, Trash2, CheckCircle, 
  Clock, AlertCircle, Search, TrendingUp, DollarSign, X, ChevronRight, Activity,
  Globe, Clock3, MapPin, Phone, Mail, Save, ToggleRight, Info, RotateCcw,
  Package, CheckCircle2
} from 'lucide-react';
import { MENU_ITEMS } from '../constants';

const sidebarLinks = [
  { name: 'Dashboard', icon: LayoutDashboard },
  { name: 'Orders', icon: ShoppingCart },
  { name: 'Menu', icon: UtensilsCrossed },
  { name: 'Inventory', icon: Box },
  { name: 'Customers', icon: Users },
  { name: 'Revenue', icon: CreditCard },
  { name: 'Analytics', icon: BarChart3 },
  { name: 'Security', icon: ShieldAlert },
  { name: 'Settings', icon: SettingsIcon },
];

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'order' | 'delivery' | 'system';
  read: boolean;
}

interface AdminPanelProps {
  onLogout: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [menuItems, setMenuItems] = useState(MENU_ITEMS.map(item => ({ ...item, isAvailable: true })));
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: '1', title: 'New Order Received', message: 'Order #ORD-1287 from Charlie Davis', time: '5m ago', type: 'order', read: false },
    { id: '2', title: 'Delivery Successful', message: 'Order #ORD-1288 reached Bob Smith', time: '1h ago', type: 'delivery', read: true },
    { id: '3', title: 'System Alert', message: 'Inventory for "Salmon" is low (45kg remaining)', time: '2h ago', type: 'system', read: true },
  ]);

  const [orders, setOrders] = useState([
    { id: 'ORD-1289', customer: 'Alice Johnson', items: 'Truffle Mac & Cheese, Spritz', total: 29.50, status: 'Preparing', time: '12:45 PM' },
    { id: 'ORD-1288', customer: 'Bob Smith', items: 'Salmon Fillet', total: 24.00, status: 'Delivered', time: '12:30 PM' },
    { id: 'ORD-1287', customer: 'Charlie Davis', items: 'Burrata Salad, 2x Soda', total: 22.50, status: 'Pending', time: '12:55 PM' },
    { id: 'ORD-1286', customer: 'David Wilson', items: 'Scallops, Martini', total: 39.00, status: 'Ready', time: '12:15 PM' },
  ]);

  const [inventory, setInventory] = useState([
    { name: 'Salmon', stock: 45, unit: 'kg', max: 100, threshold: 10 },
    { name: 'Truffles', stock: 8, unit: 'g', max: 50, threshold: 15 },
    { name: 'Burrata', stock: 12, unit: 'pcs', max: 40, threshold: 5 },
    { name: 'Pasta', stock: 80, unit: 'kg', max: 150, threshold: 20 },
  ]);

  const [activityLogs, setActivityLogs] = useState([
    { action: 'Updated Menu', user: 'Admin Dipto', time: '2 mins ago', type: 'info' },
    { action: 'Successful Login', user: 'Admin Dipto', time: '1 hour ago', type: 'security' },
  ]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const stats = useMemo(() => ({
    revenue: orders.filter(o => o.status === 'Delivered').reduce((acc, o) => acc + o.total, 0) + 12340.50,
    activeOrders: orders.filter(o => o.status !== 'Delivered').length,
    customers: 1284,
    rating: 4.9
  }), [orders]);

  const unreadCount = useMemo(() => notifications.filter(n => !n.read).length, [notifications]);

  const addNotification = (title: string, message: string, type: 'order' | 'delivery' | 'system') => {
    const newNotif: Notification = {
      id: Date.now().toString(),
      title,
      message,
      time: 'Just now',
      type,
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const updateOrderStatus = (id: string, newStatus: string) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o));
    setActivityLogs(prev => [{ action: `Order ${id} -> ${newStatus}`, user: 'Admin Dipto', time: 'Just now', type: 'info' }, ...prev]);
    
    const order = orders.find(o => o.id === id);
    if (newStatus === 'Preparing') {
      addNotification('Order Accepted', `Order ${id} for ${order?.customer} is now in preparation.`, 'order');
    } else if (newStatus === 'Delivered') {
      addNotification('Delivery Completed', `Order ${id} has been successfully delivered to ${order?.customer}.`, 'delivery');
    }
  };

  const handleRestock = (name: string) => {
    setInventory(prev => prev.map(item => item.name === name ? { ...item, stock: item.max } : item));
    setActivityLogs(prev => [{ action: `Restocked ${name}`, user: 'Admin Dipto', time: 'Just now', type: 'info' }, ...prev]);
    addNotification('Inventory Updated', `Successfully restocked ${name} to maximum capacity.`, 'system');
  };

  const toggleAvailability = (id: string) => {
    setMenuItems(prev => prev.map(item => item.id === id ? { ...item, isAvailable: !item.isAvailable } : item));
    const item = menuItems.find(i => i.id === id);
    setActivityLogs(prev => [{ action: `${item?.name} ${!item?.isAvailable ? 'Enabled' : 'Disabled'}`, user: 'Admin Dipto', time: 'Just now', type: 'info' }, ...prev]);
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const filteredOrders = useMemo(() => 
    orders.filter(o => 
      o.customer.toLowerCase().includes(searchQuery.toLowerCase()) || 
      o.id.toLowerCase().includes(searchQuery.toLowerCase())
    )
  , [orders, searchQuery]);

  const filteredMenu = useMemo(() => 
    menuItems.filter(i => i.name.toLowerCase().includes(searchQuery.toLowerCase()))
  , [menuItems, searchQuery]);

  const renderContent = () => {
    switch (activeTab) {
      case 'Dashboard':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Total Revenue', value: `$${stats.revenue.toFixed(2)}`, icon: DollarSign, color: 'text-green-500', trend: '+12.5%' },
                { label: 'Active Orders', value: stats.activeOrders.toString(), icon: ShoppingCart, color: 'text-orange-500', trend: '+4' },
                { label: 'Total Customers', value: stats.customers.toLocaleString(), icon: Users, color: 'text-blue-500', trend: '+18%' },
                { label: 'Avg Rating', value: stats.rating.toString(), icon: Star, color: 'text-yellow-500', trend: 'Stable' },
              ].map((stat, i) => (
                <div key={i} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col gap-4 group hover:shadow-xl transition-all hover:-translate-y-1">
                  <div className="flex justify-between items-start">
                    <div className={`p-3 rounded-2xl bg-slate-50 ${stat.color} group-hover:scale-110 transition-transform`}>
                      <stat.icon size={24} />
                    </div>
                    <span className="text-[10px] font-black text-green-500 bg-green-50 px-2 py-1 rounded-full">{stat.trend}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">{stat.label}</span>
                    <div className="text-3xl font-black text-slate-900 mt-1">{stat.value}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-white p-8 rounded-[3rem] shadow-sm border border-slate-100">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-xl font-bold">Priority Orders</h3>
                  <button onClick={() => setActiveTab('Orders')} className="text-[10px] font-black uppercase tracking-widest text-orange-500 hover:underline">Full Queue</button>
                </div>
                <div className="space-y-4">
                  {orders.filter(o => o.status !== 'Delivered').map((order, i) => (
                    <div key={i} className="flex items-center justify-between p-5 bg-slate-50 rounded-[2rem] hover:bg-white border border-transparent hover:border-slate-100 transition-all group">
                      <div className="flex items-center gap-5">
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center font-black text-[10px] shadow-sm">{order.id.split('-')[1]}</div>
                        <div>
                          <div className="font-bold text-sm text-slate-900">{order.customer}</div>
                          <div className="text-[10px] text-slate-400 uppercase tracking-widest truncate max-w-[200px]">{order.items}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-8">
                        <div className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm ${
                          order.status === 'Preparing' ? 'bg-orange-500 text-white pulse-orange' : 
                          order.status === 'Ready' ? 'bg-blue-500 text-white' : 'bg-slate-200 text-slate-600'
                        }`}>
                          {order.status}
                        </div>
                        <button 
                          onClick={() => updateOrderStatus(order.id, order.status === 'Pending' ? 'Preparing' : order.status === 'Preparing' ? 'Ready' : 'Delivered')}
                          className="bg-slate-900 text-white p-2.5 rounded-xl hover:bg-orange-500 transition-all shadow-lg"
                        >
                          <ChevronRight size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-8">
                <div className="bg-slate-900 p-10 rounded-[3rem] shadow-xl text-white relative overflow-hidden h-fit">
                   <div className="absolute top-0 right-0 p-10 opacity-10"><TrendingUp size={120} /></div>
                   <h3 className="text-xl font-bold mb-6 relative z-10 italic">System Status</h3>
                   <div className="space-y-6 relative z-10">
                      <div>
                        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-2 opacity-60">Memory Usage</div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                           <div className="h-full bg-orange-400 w-[42%]"></div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-white/10 rounded-2xl"><Activity size={20} /></div>
                        <div>
                           <div className="text-[10px] font-black uppercase tracking-widest opacity-60">Server Load</div>
                           <div className="font-bold">Optimized (0.2s)</div>
                        </div>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'Orders':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center">
              <h3 className="text-3xl font-serif font-bold italic text-slate-900">Order Management</h3>
              <div className="flex gap-2">
                {['All', 'Pending', 'Preparing', 'Ready', 'Delivered'].map(s => (
                  <button key={s} className="px-5 py-2 rounded-full bg-white border border-slate-100 text-[9px] font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all shadow-sm">
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {filteredOrders.map(order => (
                <div key={order.id} className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col gap-6 group hover:shadow-xl transition-all">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{order.id}</span>
                    <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${
                      order.status === 'Preparing' ? 'bg-orange-100 text-orange-600 pulse-orange' : 
                      order.status === 'Delivered' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                    }`}>{order.status}</span>
                  </div>
                  <div>
                    <h4 className="font-black text-lg text-slate-900">{order.customer}</h4>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-1">{order.items}</p>
                  </div>
                  <div className="h-px bg-slate-50"></div>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-black text-slate-900">${order.total.toFixed(2)}</span>
                    <div className="flex gap-1">
                      {order.status === 'Pending' && (
                        <button onClick={() => updateOrderStatus(order.id, 'Preparing')} className="bg-orange-500 text-white px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-orange-600 shadow-lg shadow-orange-500/10">Accept</button>
                      )}
                      {order.status === 'Preparing' && (
                        <button onClick={() => updateOrderStatus(order.id, 'Ready')} className="bg-blue-500 text-white px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-blue-600 shadow-lg shadow-blue-500/10">Ready</button>
                      )}
                      {order.status === 'Ready' && (
                        <button onClick={() => updateOrderStatus(order.id, 'Delivered')} className="bg-green-500 text-white px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-green-600 shadow-lg shadow-green-500/10">Deliver</button>
                      )}
                      {order.status === 'Delivered' && (
                        <div className="flex items-center gap-2 text-green-500 font-black text-[9px] uppercase">
                          <CheckCircle size={16} /> Completed
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-12 bg-white rounded-[4rem] border border-slate-100 shadow-sm animate-in zoom-in duration-500">
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-8">
              {(() => {
                const Icon = sidebarLinks.find(l => l.name === activeTab)?.icon;
                return Icon ? <Icon size={48} className="text-slate-400" /> : <Activity size={48} className="text-slate-400" />;
              })()}
            </div>
            <h3 className="text-4xl font-serif font-bold italic mb-4 text-slate-900">{activeTab} System</h3>
            <p className="text-slate-500 max-w-sm font-medium">Standard operations for the {activeTab} module are active.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex bg-[#F8F9FB] pt-24 overflow-hidden">
      {/* Admin Sidebar */}
      <aside className="w-80 fixed left-0 top-24 bottom-0 bg-slate-900 border-r border-slate-800 z-40 overflow-y-auto no-scrollbar shadow-2xl">
        <div className="p-8">
          <div className="flex items-center gap-4 mb-10 p-5 bg-white/5 rounded-[2rem] border border-white/10 group cursor-default">
             <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center font-black text-white italic text-xl shadow-lg group-hover:scale-105 transition-transform">D</div>
             <div>
                <div className="text-white font-black text-sm">Dipto Admin</div>
                <div className="text-slate-500 text-[9px] font-black uppercase tracking-widest">Master Node 01</div>
             </div>
          </div>

          <nav className="flex flex-col gap-1.5">
            {sidebarLinks.map(link => (
              <button
                key={link.name}
                onClick={() => setActiveTab(link.name)}
                className={`flex items-center gap-4 px-6 py-4 rounded-[1.5rem] transition-all group relative overflow-hidden ${
                  activeTab === link.name ? 'bg-orange-500 text-white shadow-2xl shadow-orange-500/30' : 'text-slate-500 hover:text-white hover:bg-white/5'
                }`}
              >
                <link.icon size={18} className={`${activeTab === link.name ? 'text-white' : 'text-slate-500 group-hover:text-white'} transition-colors`} />
                <span className="text-[10px] font-black uppercase tracking-widest leading-none">{link.name}</span>
                {link.name === 'Orders' && activeTab !== 'Orders' && stats.activeOrders > 0 && (
                  <span className="ml-auto bg-orange-500 text-white w-5 h-5 flex items-center justify-center rounded-full text-[8px] font-black border-2 border-slate-900">{stats.activeOrders}</span>
                )}
                {activeTab === link.name && <div className="absolute right-0 top-0 bottom-0 w-1 bg-white/20"></div>}
              </button>
            ))}
          </nav>

          <div className="mt-10 pt-8 border-t border-slate-800">
            <button onClick={onLogout} className="flex items-center gap-4 px-6 py-4 rounded-[1.5rem] w-full text-red-400 hover:bg-red-500/10 transition-all group active:scale-95">
              <LogOut size={18} />
              <span className="text-[10px] font-black uppercase tracking-widest">Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-80 p-12 overflow-y-auto no-scrollbar">
        <header className="flex justify-between items-center mb-12 relative">
          <div>
            <div className="flex items-center gap-2 mb-2">
               <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
               <span className="text-slate-400 font-black uppercase tracking-[0.4em] text-[9px] block">Active Production Node</span>
            </div>
            <h2 className="text-5xl font-serif font-bold italic text-slate-900 leading-none">{activeTab}</h2>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white border border-slate-100 px-5 py-3.5 rounded-2xl shadow-sm focus-within:ring-4 ring-orange-500/5 transition-all w-72">
               <Search size={18} className="text-slate-300" />
               <input 
                 type="text" 
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 placeholder={`Search in ${activeTab}...`} 
                 className="outline-none text-xs font-bold w-full bg-transparent text-slate-900"
               />
            </div>

            <div className="h-10 w-px bg-slate-200 mx-2"></div>
            
            <div className="flex items-center gap-3 relative" ref={notifRef}>
               <button 
                onClick={() => setIsNotifOpen(!isNotifOpen)}
                className={`relative h-[48px] w-[48px] flex items-center justify-center rounded-2xl border transition-all group active:scale-95 ${isNotifOpen ? 'bg-orange-500 border-orange-500' : 'bg-white border-slate-100 shadow-sm hover:shadow-xl hover:scale-105'}`}
               >
                  <Bell size={20} className={`${isNotifOpen ? 'text-white' : 'text-slate-400 group-hover:text-orange-500'}`} />
                  {unreadCount > 0 && (
                    <span className={`absolute top-2 right-2 w-4 h-4 rounded-full flex items-center justify-center text-[7px] font-black border-2 ${isNotifOpen ? 'bg-white text-orange-500 border-orange-500' : 'bg-orange-500 text-white border-white'}`}>
                      {unreadCount}
                    </span>
                  )}
               </button>

               {/* Notifications Dropdown */}
               {isNotifOpen && (
                 <div className="absolute top-full right-0 mt-4 w-96 bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 z-50 overflow-hidden animate-in fade-in zoom-in duration-200">
                    <div className="p-6 border-b border-slate-50 flex items-center justify-between">
                       <h4 className="font-black text-sm text-slate-900">Notifications</h4>
                       <button onClick={markAllAsRead} className="text-[9px] font-black uppercase tracking-widest text-orange-500 hover:underline">Mark all read</button>
                    </div>
                    <div className="max-h-[400px] overflow-y-auto no-scrollbar">
                       {notifications.length > 0 ? (
                         notifications.map((n) => (
                           <div key={n.id} className={`p-5 border-b border-slate-50 flex gap-4 hover:bg-slate-50 transition-colors ${!n.read ? 'bg-orange-50/30' : ''}`}>
                              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                                n.type === 'order' ? 'bg-orange-100 text-orange-600' : 
                                n.type === 'delivery' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                              }`}>
                                {n.type === 'order' ? <Package size={18} /> : n.type === 'delivery' ? <CheckCircle2 size={18} /> : <Info size={18} />}
                              </div>
                              <div className="flex-grow">
                                 <div className="flex items-center justify-between mb-0.5">
                                    <span className="font-bold text-xs text-slate-900">{n.title}</span>
                                    <span className="text-[9px] font-black uppercase text-slate-300">{n.time}</span>
                                 </div>
                                 <p className="text-[11px] text-slate-500 font-medium leading-relaxed">{n.message}</p>
                              </div>
                              {!n.read && <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2"></div>}
                           </div>
                         ))
                       ) : (
                         <div className="p-10 text-center">
                            <Bell className="mx-auto text-slate-200 mb-4" size={48} />
                            <p className="text-slate-400 font-medium text-sm">No new notifications</p>
                         </div>
                       )}
                    </div>
                    <div className="p-4 bg-slate-50 text-center">
                       <button className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-slate-900 transition-colors">View All Alerts</button>
                    </div>
                 </div>
               )}

               <div className="w-[48px] h-[48px] rounded-2xl overflow-hidden border-2 border-white shadow-lg cursor-pointer hover:scale-110 transition-all group relative">
                  <img src="https://picsum.photos/64/64?random=admin" className="w-full h-full object-cover" alt="Admin" />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
               </div>
            </div>
          </div>
        </header>

        <div className="pb-24">
          {renderContent()}
        </div>
      </main>
      
      <style>{`
        .pulse-orange {
          animation: pulse-orange 2s infinite;
        }
        @keyframes pulse-orange {
          0% { box-shadow: 0 0 0 0 rgba(249, 115, 22, 0.4); }
          70% { box-shadow: 0 0 0 10px rgba(249, 115, 22, 0); }
          100% { box-shadow: 0 0 0 0 rgba(249, 115, 22, 0); }
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default AdminPanel;
