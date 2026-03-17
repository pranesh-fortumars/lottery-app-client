import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  UserPlus
} from 'lucide-react';

const AdminUsers = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([
    { id: '101', name: 'Rajesh Kumar', email: 'rajesh@example.com', phone: '+91 98765 43210', balance: '14,500', status: 'Active', joined: 'Mar 10, 2024' },
    { id: '102', name: 'Amit Singh', email: 'amit@example.com', phone: '+91 87654 32109', balance: '2,100', status: 'Active', joined: 'Mar 12, 2024' },
    { id: '103', name: 'Suresh Patil', email: 'suresh@example.com', phone: '+91 76543 21098', balance: '0', status: 'Restricted', joined: 'Mar 14, 2024' },
    { id: '104', name: 'Vijay Varma', email: 'vijay@example.com', phone: '+91 65432 10987', balance: '42,800', status: 'Active', joined: 'Mar 15, 2024' },
  ]);

  return (
    <div className="space-y-6 p-4">
      {/* Search & Actions */}
      <div className="space-y-4">
        <div className="relative">
           <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
           <input 
             type="text" 
             placeholder="Search members..." 
             className="w-full h-14 bg-white border border-gray-100 rounded-2xl pl-14 pr-6 outline-none font-bold text-gray-800 shadow-sm text-xs"
           />
        </div>
        
        <div className="flex gap-3">
           <button className="flex-grow h-14 bg-gradient-to-r from-[#f42464] to-[#ff004d] rounded-2xl font-black text-[10px] text-white uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg">
              <UserPlus size={16} /> Add User
           </button>
        </div>
      </div>

      {/* User Cards */}
      <div className="space-y-4">
        {users.map((user) => (
          <div 
            key={user.id} 
            onClick={() => navigate(`/admin/users/${user.id}`)}
            className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 flex items-center justify-between group active:scale-[0.98] transition-all"
          >
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-[#f42464] font-black text-lg border border-gray-100 shadow-sm group-hover:bg-[#f42464] group-hover:text-white transition-colors">
                   {user.name.charAt(0)}
                </div>
                <div>
                   <h4 className="font-black text-gray-800 text-sm">{user.name}</h4>
                   <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{user.phone}</p>
                </div>
             </div>
             <div className="text-right">
                <p className="font-black text-emerald-600 text-sm">₹{user.balance}</p>
                <span className={`text-[8px] font-black uppercase tracking-widest ${user.status === 'Active' ? 'text-emerald-500' : 'text-red-500'}`}>
                  {user.status}
                </span>
             </div>
          </div>
        ))}
      </div>
      
      <div className="pt-4 text-center">
         <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Showing 4 of 12,845 members</p>
      </div>
    </div>
  );
};

export default AdminUsers;
