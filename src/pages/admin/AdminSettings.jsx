import React, { useState } from 'react';
import { 
  Settings, 
  Shield, 
  Bell, 
  Globe, 
  CreditCard,
  User,
  Database,
  Lock,
  ChevronRight
} from 'lucide-react';

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState('General');

  const tabs = [
    { id: 'General', icon: Settings, label: 'General Info' },
    { id: 'Security', icon: Shield, label: 'Security & Access' },
    { id: 'Notifications', icon: Bell, label: 'System Alerts' },
    { id: 'Financial', icon: CreditCard, label: 'Payment Gateway' },
    { id: 'Integration', icon: Globe, label: 'API & External' },
  ];

  const SettingRow = ({ label, desc, children }) => (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center py-8 gap-6 first:pt-0 last:pb-0">
      <div className="space-y-1 max-w-lg">
         <h4 className="text-base font-black text-gray-800 tracking-tight">{label}</h4>
         <p className="text-xs text-gray-500 font-medium leading-relaxed">{desc}</p>
      </div>
      <div className="w-full md:w-auto shrink-0">
         {children}
      </div>
    </div>
  );

  return (
    <div className="space-y-6 pb-20 p-4">
      {/* Horizontal Tabs */}
      <div className="flex overflow-x-auto gap-3 pb-2 scrollbar-hide">
         {tabs.map((tab) => (
           <button
             key={tab.id}
             onClick={() => setActiveTab(tab.id)}
             className={`flex-shrink-0 flex items-center gap-2 px-6 py-3 rounded-2xl transition-all ${
               activeTab === tab.id 
                 ? 'bg-[#f42464] text-white shadow-lg' 
                 : 'bg-white text-gray-400 border border-gray-100'
             }`}
           >
              <tab.icon size={16} />
              <span className="text-[10px] font-black uppercase tracking-widest">{tab.id}</span>
           </button>
         ))}
      </div>

      {/* Settings Content Area */}
      <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
         <div className="border-b border-gray-50 pb-4 mb-6">
            <h2 className="text-sm font-black font-condensed uppercase tracking-tight text-gray-800">{activeTab} Settings</h2>
         </div>

         <div className="divide-y divide-gray-50">
            <SettingRow label="Maintenance" desc="Temporarily disable user features.">
               <div className="relative inline-flex items-center cursor-pointer group scale-75 origin-right">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-14 h-8 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#f42464]"></div>
               </div>
            </SettingRow>

            <SettingRow label="Brand Name" desc="Platform display name.">
               <input type="text" defaultValue="Diamond Jackpot" className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-2 font-bold text-gray-800 outline-none w-full text-xs" />
            </SettingRow>

            <SettingRow label="Force Logout" desc="Admin inactivity limit.">
               <select className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-2 font-bold text-gray-800 outline-none w-full text-xs">
                  <option>1 hour</option>
                  <option>8 hours</option>
               </select>
            </SettingRow>
         </div>

         <div className="mt-8 pt-6 border-t border-gray-50 space-y-3">
            <button className="w-full py-4 bg-gray-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg active:scale-95">Save Changes</button>
            <button className="w-full py-4 bg-gray-50 text-gray-400 rounded-2xl font-black text-[10px] uppercase tracking-widest active:bg-gray-100">Restore Defaults</button>
         </div>
      </div>
    </div>
  );
};

export default AdminSettings;
