import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  UserPlus,
  X,
  User,
  Mail,
  Phone,
  Wallet,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

const AdminUsers = () => {
  const navigate = useNavigate();
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [users, setUsers] = useState([
    { id: '101', name: 'Rajesh Kumar', email: 'rajesh@example.com', phone: '+91 98765 43210', balance: 14500, status: 'Active', joined: 'Mar 10, 2024' },
    { id: '102', name: 'Amit Singh', email: 'amit@example.com', phone: '+91 87654 32109', balance: 2100, status: 'Active', joined: 'Mar 12, 2024' },
    { id: '103', name: 'Suresh Patil', email: 'suresh@example.com', phone: '+91 76543 21098', balance: 0, status: 'Restricted', joined: 'Mar 14, 2024' },
    { id: '104', name: 'Vijay Varma', email: 'vijay@example.com', phone: '+91 65432 10987', balance: 42800, status: 'Active', joined: 'Mar 15, 2024' },
  ]);

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    phone: '',
    balance: ''
  });

  const handleAddUser = (e) => {
    e.preventDefault();
    if (!newUser.name || !newUser.phone) return;

    const userToAdd = {
      id: (Math.floor(Math.random() * 900) + 105).toString(),
      ...newUser,
      balance: newUser.balance ? parseInt(newUser.balance) : 0,
      status: 'Active',
      joined: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    setUsers([userToAdd, ...users]);
    setNewUser({ name: '', email: '', phone: '', balance: '' });
    setShowAddForm(false);
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phone.includes(searchTerm)
  );

  return (
    <div className="space-y-6 p-4 pb-24 relative min-h-screen bg-[#f8f9fa]">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-6">
         <p className="text-[#f42464] text-[10px] font-black uppercase tracking-widest mb-1">Management</p>
         <h1 className="text-2xl font-black text-gray-900 font-condensed uppercase tracking-tighter">Player Directory</h1>
         <p className="text-gray-400 text-[11px] font-medium">Total active members: {users.length}</p>
      </div>

      {/* Search & Actions */}
      <div className="space-y-4">
        <div className="relative">
           <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
           <input 
             type="text" 
             placeholder="Search by name or phone..." 
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
             className="w-full h-14 bg-white border border-gray-100 rounded-2xl pl-14 pr-6 outline-none font-bold text-gray-800 shadow-sm text-xs placeholder:text-gray-300 focus:border-[#f42464]/30 transition-all"
           />
        </div>
        
        <button 
          onClick={() => setShowAddForm(true)}
          className="w-full h-14 bg-gradient-to-r from-[#f42464] to-[#ff004d] rounded-2xl font-black text-[10px] text-white uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all shadow-[#f42464]/20"
        >
          <UserPlus size={18} /> Register New Player
        </button>
      </div>

      {/* User Cards */}
      <div className="space-y-4">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <motion.div 
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={user.id} 
              onClick={() => navigate(`/admin/users/${user.id}`)}
              className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 flex items-center justify-between group active:scale-[0.98] transition-all cursor-pointer"
            >
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#fce4ec] rounded-2xl flex items-center justify-center text-[#f42464] font-black text-lg border border-white shadow-sm group-hover:bg-[#f42464] group-hover:text-white transition-colors">
                     {user.name.charAt(0)}
                  </div>
                  <div>
                     <h4 className="font-black text-gray-800 text-sm tracking-tight">{user.name}</h4>
                     <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">{user.phone}</p>
                  </div>
               </div>
               <div className="text-right flex items-center gap-3">
                  <div>
                    <p className="font-black text-emerald-600 text-sm">₹{user.balance.toLocaleString()}</p>
                    <span className={`text-[7px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${
                      user.status === 'Active' ? 'bg-emerald-50 text-emerald-500' : 'bg-red-50 text-red-500'
                    }`}>
                      {user.status}
                    </span>
                  </div>
                  <ChevronRight size={16} className="text-gray-200" />
               </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
             <User size={48} className="mx-auto text-gray-100 mb-4" />
             <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">No players found</p>
          </div>
        )}
      </div>

      {/* Add User Modal Overlay */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-end justify-center p-4"
            onClick={() => setShowAddForm(false)}
          >
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white w-full max-w-[440px] rounded-t-[2.5rem] rounded-b-[1.5rem] p-8 shadow-2xl space-y-6 overflow-hidden relative"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center border-b border-gray-50 pb-6">
                <div>
                   <h2 className="text-xl font-black text-gray-900 uppercase tracking-tighter italic">Add New Player</h2>
                   <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Create a user manually</p>
                </div>
                <button 
                  onClick={() => setShowAddForm(false)}
                  className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 active:bg-[#f42464] active:text-white transition-all"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleAddUser} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
                    <input 
                      required
                      type="text" 
                      placeholder="Enter player name" 
                      value={newUser.name}
                      onChange={e => setNewUser({...newUser, name: e.target.value})}
                      className="w-full h-12 bg-gray-50 border border-transparent rounded-xl pl-11 pr-4 outline-none font-bold text-gray-800 focus:bg-white focus:border-[#f42464]/20 transition-all text-xs"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
                    <input 
                      required
                      type="tel" 
                      placeholder="+91 XXXXX XXXXX" 
                      value={newUser.phone}
                      onChange={e => setNewUser({...newUser, phone: e.target.value})}
                      className="w-full h-12 bg-gray-50 border border-transparent rounded-xl pl-11 pr-4 outline-none font-bold text-gray-800 focus:bg-white focus:border-[#f42464]/20 transition-all text-xs"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Email (Optional)</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
                    <input 
                      type="email" 
                      placeholder="player@example.com" 
                      value={newUser.email}
                      onChange={e => setNewUser({...newUser, email: e.target.value})}
                      className="w-full h-12 bg-gray-50 border border-transparent rounded-xl pl-11 pr-4 outline-none font-bold text-gray-800 focus:bg-white focus:border-[#f42464]/20 transition-all text-xs"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Initial Balance</label>
                  <div className="relative">
                    <Wallet className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
                    <input 
                      type="number" 
                      placeholder="₹ 0.00" 
                      value={newUser.balance}
                      onChange={e => setNewUser({...newUser, balance: e.target.value})}
                      className="w-full h-12 bg-gray-50 border border-transparent rounded-xl pl-11 pr-4 outline-none font-bold text-gray-800 focus:bg-white focus:border-[#f42464]/20 transition-all text-xs"
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full h-14 bg-gray-900 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl flex items-center justify-center gap-2 mt-4 active:scale-95 transition-all"
                >
                  <CheckCircle2 size={18} className="text-emerald-400" /> Create Account
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="pt-4 text-center">
         <p className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.2em]">Listing players by recent activity</p>
      </div>
    </div>
  );
};

export default AdminUsers;
