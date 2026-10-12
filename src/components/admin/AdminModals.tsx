import React, { useState } from 'react';
import { X, UserPlus, MapPin, Hotel, CreditCard, Car, Bell, HelpCircle, Network, Sparkles, CheckCircle2 } from 'lucide-react';
import { AdminInvestor, AdminPlotItem, AdminSiteTourBooking } from '../../types/admin';
import { ShareInvestment, SupportTicket, DoubleProfitPlan } from '../../types';

// ==========================================
// 1. ADD INVESTOR MODAL
// ==========================================
interface AddInvestorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (investor: Omit<AdminInvestor, 'id'>) => void;
}

export const AddInvestorModal: React.FC<AddInvestorModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [fullName, setFullName] = useState('');
  const [fullNameBn, setFullNameBn] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [branch, setBranch] = useState('Chattogram Office (Salma Centre)');
  const [rank, setRank] = useState('Associate Member');
  const [nidNo, setNidNo] = useState('');
  const [totalInvested, setTotalInvested] = useState(500000);
  const [nomineeName, setNomineeName] = useState('');
  const [nomineeRelation, setNomineeRelation] = useState('Spouse');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) return;
    const memberId = 'CSBD-' + (branch.includes('Ctg') || branch.includes('Chattogram') ? 'CTG' : 'DHK') + '-' + Math.floor(1000 + Math.random() * 9000);
    onAdd({
      fullName,
      fullNameBn: fullNameBn || fullName,
      username: username || fullName.toLowerCase().replace(/[^a-z0-9]/g, '_').slice(0, 12),
      phone,
      email: email || `${username || 'investor'}@gmail.com`,
      memberId,
      branch,
      rank,
      kycStatus: 'verified',
      nidNo: nidNo || '1990 ' + Math.floor(1000 + Math.random() * 9000) + ' ' + Math.floor(1000 + Math.random() * 9000),
      totalInvested: Number(totalInvested),
      commissionBalance: 0,
      dividendBalance: 0,
      status: 'active',
      joinedDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
      nomineeName: nomineeName || 'Not Appointed',
      nomineeRelation
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-amber-500" />
            <h3 className="text-base font-bold text-white">Create New Investor Account</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Full Name (English) *</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                placeholder="e.g. Al-Haj Mohammad Ali"
                className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 text-white"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Full Name (বাংলা)</label>
              <input
                type="text"
                value={fullNameBn}
                onChange={e => setFullNameBn(e.target.value)}
                placeholder="e.g. আল-হাজ্ব মোহাম্মদ আলী"
                className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Username / Portal ID *</label>
              <input
                type="text"
                required
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="e.g. mohammad_ali7"
                className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 text-white font-mono"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Mobile Phone Number *</label>
              <input
                type="text"
                required
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="+880 1711-000000"
                className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 text-white font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Corporate Branch</label>
              <select
                value={branch}
                onChange={e => setBranch(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 text-white"
              >
                <option value="Chattogram Office (Salma Centre)">Chattogram Office (Salma Centre)</option>
                <option value="Dhaka Head Office (Mirpur-12)">Dhaka Head Office (Mirpur-12)</option>
                <option value="Sylhet Regional Branch">Sylhet Regional Branch</option>
                <option value="Cox's Bazar Site Office">Cox's Bazar Site Office</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">MLM Rank Level</label>
              <select
                value={rank}
                onChange={e => setRank(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 text-white"
              >
                <option value="Associate Member">Associate Member</option>
                <option value="Senior Associate">Senior Associate</option>
                <option value="Executive Associate">Executive Associate</option>
                <option value="Gold Senior Associate">Gold Senior Associate</option>
                <option value="Crown Diamond Director">Crown Diamond Director</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">National NID Number</label>
              <input
                type="text"
                value={nidNo}
                onChange={e => setNidNo(e.target.value)}
                placeholder="1985 4481 0021 99"
                className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 text-white font-mono"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Initial Portfolio Value (BDT)</label>
              <input
                type="number"
                value={totalInvested}
                onChange={e => setTotalInvested(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 text-white font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Authorized Nominee Name</label>
              <input
                type="text"
                value={nomineeName}
                onChange={e => setNomineeName(e.target.value)}
                placeholder="e.g. Begum Rokeya"
                className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 text-white"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Nominee Relation</label>
              <input
                type="text"
                value={nomineeRelation}
                onChange={e => setNomineeRelation(e.target.value)}
                placeholder="e.g. Spouse / Son / Daughter"
                className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 text-white"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold shadow-md"
            >
              Add Investor to CRM
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ==========================================
// 2. EDIT INVESTOR MODAL
// ==========================================
interface EditInvestorModalProps {
  investor: AdminInvestor | null;
  onClose: () => void;
  onSave: (updated: AdminInvestor) => void;
}

export const EditInvestorModal: React.FC<EditInvestorModalProps> = ({ investor, onClose, onSave }) => {
  if (!investor) return null;

  const [fullName, setFullName] = useState(investor.fullName);
  const [phone, setPhone] = useState(investor.phone);
  const [email, setEmail] = useState(investor.email);
  const [branch, setBranch] = useState(investor.branch);
  const [rank, setRank] = useState(investor.rank);
  const [kycStatus, setKycStatus] = useState(investor.kycStatus);
  const [dividendBalance, setDividendBalance] = useState(investor.dividendBalance);
  const [commissionBalance, setCommissionBalance] = useState(investor.commissionBalance);
  const [status, setStatus] = useState(investor.status);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...investor,
      fullName,
      phone,
      email,
      branch,
      rank,
      kycStatus,
      dividendBalance: Number(dividendBalance),
      commissionBalance: Number(commissionBalance),
      status
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-base font-bold text-white">Edit Investor Details</h3>
            <span className="text-xs text-amber-400 font-mono">@{investor.username} · {investor.memberId}</span>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Full Name</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 text-white"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Phone Number</label>
              <input
                type="text"
                required
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 text-white font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 text-white"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Office Branch</label>
              <input
                type="text"
                value={branch}
                onChange={e => setBranch(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">MLM Rank</label>
              <input
                type="text"
                value={rank}
                onChange={e => setRank(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 text-white"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">KYC Status</label>
              <select
                value={kycStatus}
                onChange={e => setKycStatus(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 text-white"
              >
                <option value="verified">Verified</option>
                <option value="pending">Pending</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Account Status</label>
              <select
                value={status}
                onChange={e => setStatus(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 text-white"
              >
                <option value="active">Active</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 rounded-xl bg-slate-800/60 border border-slate-700">
            <div>
              <label className="block text-emerald-400 font-semibold mb-1">Dividend Wallet Balance (BDT)</label>
              <input
                type="number"
                value={dividendBalance}
                onChange={e => setDividendBalance(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 text-emerald-400 font-mono font-bold"
              />
            </div>
            <div>
              <label className="block text-amber-400 font-semibold mb-1">MLM Commission Balance (BDT)</label>
              <input
                type="number"
                value={commissionBalance}
                onChange={e => setCommissionBalance(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 text-amber-400 font-mono font-bold"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md"
            >
              Save Updates
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ==========================================
// 3. ADD PLOT MODAL
// ==========================================
interface AddPlotModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (plot: Omit<AdminPlotItem, 'id'>) => void;
}

export const AddPlotModal: React.FC<AddPlotModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [projectName, setProjectName] = useState('City R Mega Town - Purbachal');
  const [sector, setSector] = useState('Sector 4');
  const [roadNo, setRoadNo] = useState('Road #14 (40ft Avenue)');
  const [plotNo, setPlotNo] = useState('');
  const [katha, setKatha] = useState(5);
  const [facing, setFacing] = useState('South Facing');
  const [totalCost, setTotalCost] = useState(3500000);
  const [paidAmount, setPaidAmount] = useState(0);
  const [status, setStatus] = useState<AdminPlotItem['status']>('available');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!plotNo) return;
    onAdd({
      projectName,
      sector,
      roadNo,
      plotNo,
      katha: Number(katha),
      facing,
      totalCost: Number(totalCost),
      paidAmount: Number(paidAmount),
      status,
      baynaStatus: status === 'allotted' ? 'registered' : 'n/a',
      allotmentLetterNo: status === 'allotted' ? `CSBD/AL/PUR/${new Date().getFullYear()}/${Math.floor(1000 + Math.random() * 9000)}` : undefined
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-emerald-500" />
            <h3 className="text-base font-bold text-white">Add New Land Plot to Inventory</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Development Project *</label>
            <select
              value={projectName}
              onChange={e => {
                setProjectName(e.target.value);
                setTotalCost(e.target.value.includes('Mawa') ? katha * 550000 : katha * 700000);
              }}
              className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 text-white"
            >
              <option value="City R Mega Town - Purbachal">City R Mega Town - Purbachal</option>
              <option value="Mawa Project 1 (Expressway)">Mawa Project 1 (Expressway)</option>
              <option value="Kuakata Luxury Resort City">Kuakata Luxury Resort City</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Sector / Phase *</label>
              <input
                type="text"
                required
                value={sector}
                onChange={e => setSector(e.target.value)}
                placeholder="Sector 4"
                className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 text-white"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Plot Number *</label>
              <input
                type="text"
                required
                value={plotNo}
                onChange={e => setPlotNo(e.target.value)}
                placeholder="e.g. 210"
                className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 text-white font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Size (Katha) *</label>
              <select
                value={katha}
                onChange={e => {
                  const val = Number(e.target.value);
                  setKatha(val);
                  setTotalCost(projectName.includes('Mawa') ? val * 550000 : val * 700000);
                }}
                className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 text-white font-mono"
              >
                <option value={3}>3 Katha</option>
                <option value={5}>5 Katha</option>
                <option value={7.5}>7.5 Katha</option>
                <option value={10}>10 Katha</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Facing</label>
              <select
                value={facing}
                onChange={e => setFacing(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 text-white"
              >
                <option value="South Facing">South Facing</option>
                <option value="North Facing">North Facing</option>
                <option value="South-East Corner">South-East Corner</option>
                <option value="Lakeview Corner">Lakeview Corner</option>
                <option value="Avenue Commercial">Avenue Commercial</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Total Valuation (BDT) *</label>
              <input
                type="number"
                required
                value={totalCost}
                onChange={e => setTotalCost(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 text-white font-mono"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Availability Status</label>
              <select
                value={status}
                onChange={e => setStatus(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 text-white"
              >
                <option value="available">Available</option>
                <option value="booked">Booked (Downpayment paid)</option>
                <option value="allotted">Fully Allotted</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md"
            >
              Save Plot to Catalog
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ==========================================
// 4. EDIT PLOT MODAL
// ==========================================
interface EditPlotModalProps {
  plot: AdminPlotItem | null;
  onClose: () => void;
  onSave: (updated: AdminPlotItem) => void;
}

export const EditPlotModal: React.FC<EditPlotModalProps> = ({ plot, onClose, onSave }) => {
  if (!plot) return null;

  const [facing, setFacing] = useState(plot.facing);
  const [totalCost, setTotalCost] = useState(plot.totalCost);
  const [paidAmount, setPaidAmount] = useState(plot.paidAmount);
  const [status, setStatus] = useState(plot.status);
  const [allotteeName, setAllotteeName] = useState(plot.allotteeName || '');
  const [allotteeUsername, setAllotteeUsername] = useState(plot.allotteeUsername || '');
  const [baynaStatus, setBaynaStatus] = useState(plot.baynaStatus || 'pending');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...plot,
      facing,
      totalCost: Number(totalCost),
      paidAmount: Number(paidAmount),
      status,
      allotteeName: allotteeName || undefined,
      allotteeUsername: allotteeUsername || undefined,
      baynaStatus
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-base font-bold text-white">Edit Plot #{plot.plotNo}</h3>
            <span className="text-xs text-amber-400 font-mono">{plot.projectName} ({plot.katha} Katha)</span>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Facing</label>
              <input
                type="text"
                value={facing}
                onChange={e => setFacing(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 text-white"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Inventory Status</label>
              <select
                value={status}
                onChange={e => setStatus(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 text-white"
              >
                <option value="available">Available</option>
                <option value="booked">Booked</option>
                <option value="allotted">Allotted</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Total Valuation (BDT)</label>
              <input
                type="number"
                value={totalCost}
                onChange={e => setTotalCost(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 text-white font-mono"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Amount Paid So Far (BDT)</label>
              <input
                type="number"
                value={paidAmount}
                onChange={e => setPaidAmount(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 text-emerald-400 font-mono font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Allottee Name</label>
              <input
                type="text"
                value={allotteeName}
                onChange={e => setAllotteeName(e.target.value)}
                placeholder="Leave blank if unassigned"
                className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 text-white"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Allottee Username</label>
              <input
                type="text"
                value={allotteeUsername}
                onChange={e => setAllotteeUsername(e.target.value)}
                placeholder="e.g. Ziabulctg1"
                className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 text-white font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Bayna Deed Status</label>
            <select
              value={baynaStatus}
              onChange={e => setBaynaStatus(e.target.value as any)}
              className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 text-white"
            >
              <option value="registered">Registered Bayna Deed Completed</option>
              <option value="pending">Bayna Deed Pending / In Progress</option>
              <option value="n/a">Not Applicable</option>
            </select>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold shadow-md"
            >
              Save Plot Updates
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ==========================================
// 5. ADD MANUAL BANK DEPOSIT SLIP MODAL
// ==========================================
interface AddManualSlipModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (slipData: any) => void;
}

export const AddManualSlipModal: React.FC<AddManualSlipModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [memberUsername, setMemberUsername] = useState('Ziabulctg1');
  const [memberName, setMemberName] = useState('Ziabul Hoque Chowdhury');
  const [amount, setAmount] = useState(35000);
  const [bankName, setBankName] = useState('Islami Bank Bangladesh PLC');
  const [branchName, setBranchName] = useState('Agrabad Commercial Branch, Ctg');
  const [transactionId, setTransactionId] = useState('');
  const [notes, setNotes] = useState('Counter deposit / pay-order clearance');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) return;
    onAdd({
      id: 'slip-' + Date.now(),
      slipNo: 'SLIP-MAN-' + Math.floor(1000 + Math.random() * 9000),
      memberUsername,
      memberName,
      memberId: 'CSBD-CTG-8842',
      bookingId: 'plot-purbachal-142',
      projectName: 'City R Mega Town - Purbachal',
      bankName,
      branchName,
      amount: Number(amount),
      depositDate: new Date().toISOString().split('T')[0],
      transactionId: transactionId || 'PO-' + Math.floor(100000 + Math.random() * 900000),
      slipImageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&auto=format&fit=crop&q=80',
      notes,
      status: 'approved',
      submittedAt: 'Just Now (Manual Entry)'
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-emerald-500" />
            <h3 className="text-base font-bold text-white">Record Manual Offline Deposit / Pay-Order</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Investor Username *</label>
              <input
                type="text"
                required
                value={memberUsername}
                onChange={e => setMemberUsername(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 text-white font-mono"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Investor Full Name *</label>
              <input
                type="text"
                required
                value={memberName}
                onChange={e => setMemberName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Deposit Amount (BDT) *</label>
              <input
                type="number"
                required
                value={amount}
                onChange={e => setAmount(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 text-emerald-400 font-mono font-bold"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Deposit Bank</label>
              <input
                type="text"
                value={bankName}
                onChange={e => setBankName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Bank Branch</label>
              <input
                type="text"
                value={branchName}
                onChange={e => setBranchName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 text-white"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Pay-Order / TxID</label>
              <input
                type="text"
                value={transactionId}
                onChange={e => setTransactionId(e.target.value)}
                placeholder="IBBL-PO-88219"
                className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 text-white font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Notes / Ledger Remarks</label>
            <input
              type="text"
              value={notes}
              onChange={e => setNotes(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 text-white"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md"
            >
              Credit & Generate Receipt
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ==========================================
// 6. SCHEDULE SITE TOUR MODAL
// ==========================================
interface AddTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (tour: Omit<AdminSiteTourBooking, 'id'>) => void;
}

export const AddTourModal: React.FC<AddTourModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [clientName, setClientName] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredDate, setPreferredDate] = useState('Friday, Next Week');
  const [timeSlot, setTimeSlot] = useState('Morning (09:30 AM)');
  const [projectInterested, setProjectInterested] = useState('City R Mega Town Purbachal');
  const [pickupLocation, setPickupLocation] = useState('Mirpur-10 Circle (Head Office)');
  const [guestsCount, setGuestsCount] = useState(2);
  const [assignedBus, setAssignedBus] = useState('AC Microbus #01 (Dhaka Metro)');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !phone) return;
    onAdd({
      clientName,
      phone,
      preferredDate,
      timeSlot,
      projectInterested,
      pickupLocation,
      guestsCount: Number(guestsCount),
      assignedBus,
      coordinator: 'Md. Rakibul Hasan (Senior Executive)',
      status: 'confirmed',
      createdAt: 'Just now'
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Car className="w-5 h-5 text-blue-500" />
            <h3 className="text-base font-bold text-white">Schedule Weekend Site Tour</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Client Name *</label>
              <input
                type="text"
                required
                value={clientName}
                onChange={e => setClientName(e.target.value)}
                placeholder="e.g. Engr. Shafiqul Alam"
                className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 text-white"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Phone Number *</label>
              <input
                type="text"
                required
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="+880 1711-223344"
                className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 text-white font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Project Interested</label>
              <select
                value={projectInterested}
                onChange={e => setProjectInterested(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 text-white"
              >
                <option value="City R Mega Town Purbachal">City R Mega Town Purbachal</option>
                <option value="Mawa Project 1 (Expressway)">Mawa Project 1 (Expressway)</option>
                <option value="City Royal Bay Kuakata">City Royal Bay Kuakata</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Number of Guests</label>
              <input
                type="number"
                min={1}
                max={10}
                value={guestsCount}
                onChange={e => setGuestsCount(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 text-white font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Tour Date</label>
              <input
                type="text"
                value={preferredDate}
                onChange={e => setPreferredDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 text-white"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Pickup Location</label>
              <input
                type="text"
                value={pickupLocation}
                onChange={e => setPickupLocation(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Assign Transport Bus</label>
            <input
              type="text"
              value={assignedBus}
              onChange={e => setAssignedBus(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 text-white"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md"
            >
              Confirm Tour Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ==========================================
// 7. REPLY TICKET MODAL
// ==========================================
interface ReplyTicketModalProps {
  ticket: SupportTicket | null;
  onClose: () => void;
  onReply: (ticketId: string, replyMessage: string) => void;
}

export const ReplyTicketModal: React.FC<ReplyTicketModalProps> = ({ ticket, onClose, onReply }) => {
  const [replyText, setReplyText] = useState('');

  if (!ticket) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    onReply(ticket.id, replyText);
    setReplyText('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-base font-bold text-white">Reply to Ticket: {ticket.subject}</h3>
            <span className="text-xs text-amber-400 font-mono">Ticket #{ticket.ticketNo} · Category: {ticket.category}</span>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Thread */}
        <div className="space-y-3 p-3 rounded-xl bg-slate-800/50 border border-slate-800 max-h-60 overflow-y-auto text-xs">
          {ticket.messages.map((msg, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-xl ${
                msg.sender === 'support'
                  ? 'bg-amber-600/20 border border-amber-500/30 text-amber-100 ml-4'
                  : 'bg-slate-800 border border-slate-700 text-slate-200 mr-4'
              }`}
            >
              <div className="flex items-center justify-between font-bold text-[11px] mb-1">
                <span>{msg.senderName} ({msg.sender.toUpperCase()})</span>
                <span className="text-slate-400 font-mono">{msg.timestamp}</span>
              </div>
              <p>{msg.text}</p>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Support Official Response *</label>
            <textarea
              required
              rows={3}
              value={replyText}
              onChange={e => setReplyText(e.target.value)}
              placeholder="Type your official administrative reply to the investor..."
              className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 text-white placeholder-slate-500"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md"
            >
              Send Reply & Update Ticket
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ==========================================
// 8. ADD 12-MONTH DOUBLE PROFIT PLAN MODAL
// ==========================================
interface AddDoublePlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  investors: AdminInvestor[];
  onAdd: (plan: Partial<DoubleProfitPlan>) => void;
}

export const AddDoublePlanModal: React.FC<AddDoublePlanModalProps> = ({
  isOpen,
  onClose,
  investors,
  onAdd
}) => {
  const [selectedInvestorId, setSelectedInvestorId] = useState(investors[0]?.id || '');
  const [customMemberName, setCustomMemberName] = useState('');
  const [customMemberId, setCustomMemberId] = useState('');
  const [principalAmount, setPrincipalAmount] = useState<number>(500000);
  const [customAmountStr, setCustomAmountStr] = useState<string>('500000');
  const [packageName, setPackageName] = useState('Executive Gold Double Profit (12 Months)');
  const [deedNo, setDeedNo] = useState(`CZS-DP-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`);
  const [bankPrefix, setBankPrefix] = useState('IBBL-PDC');

  if (!isOpen) return null;

  const selectedInv = investors.find(i => i.id === selectedInvestorId);
  const memberName = selectedInv ? selectedInv.fullName : (customMemberName || 'Investor Member');
  const memberId = selectedInv ? selectedInv.memberId : (customMemberId || 'CSBD-CTG-9999');

  const totalReturn = principalAmount * 2;
  const monthlyInstallment = Math.round(totalReturn / 12);

  const handleSelectPackage = (amt: number, name: string) => {
    setPrincipalAmount(amt);
    setCustomAmountStr(String(amt));
    setPackageName(name);
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '');
    setCustomAmountStr(val);
    const num = Number(val) || 0;
    setPrincipalAmount(num);
    setPackageName(`Custom Double Return Plan (৳${num.toLocaleString()})`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (principalAmount < 50000) {
      alert('Minimum investment amount is BDT 50,000');
      return;
    }

    const checkNumbers = Array.from({ length: 12 }, (_, i) => `${bankPrefix}-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000) + i}`);

    onAdd({
      memberId,
      memberName,
      packageName,
      packageNameBn: `${packageName} (১২ মাসে দ্বিগুণ মুনাফা)`,
      principalAmount,
      totalReturnAmount: totalReturn,
      monthlyInstallmentAmount: monthlyInstallment,
      totalMonths: 12,
      paidInstallments: 0,
      remainingInstallments: 12,
      totalPaidOut: 0,
      startDate: new Date().toISOString().split('T')[0],
      nextPayoutDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'active',
      agreementDeedNo: deedNo,
      pdcCheckNumbers: checkNumbers
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <div>
              <h3 className="text-base font-bold text-white">Enroll Investor in 12-Month Double Profit Plan</h3>
              <span className="text-xs text-amber-400 font-mono">100% Net Profit Disbursed in 12 Equal Monthly Installments</span>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          {/* Select Existing Investor or Enter Custom */}
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Select Registered CRM Investor</label>
            <select
              value={selectedInvestorId}
              onChange={e => {
                setSelectedInvestorId(e.target.value);
                setCustomMemberName('');
              }}
              className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 text-white"
            >
              <option value="">-- Choose Investor from CRM or Enter Custom Below --</option>
              {investors.map(inv => (
                <option key={inv.id} value={inv.id}>
                  {inv.fullName} ({inv.memberId}) · Phone: {inv.phone}
                </option>
              ))}
            </select>
          </div>

          {!selectedInvestorId && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Custom Member Full Name *</label>
                <input
                  type="text"
                  required
                  value={customMemberName}
                  onChange={e => setCustomMemberName(e.target.value)}
                  placeholder="e.g. Md. Rafiqul Islam"
                  className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Custom Member ID *</label>
                <input
                  type="text"
                  required
                  value={customMemberId}
                  onChange={e => setCustomMemberId(e.target.value)}
                  placeholder="e.g. CSBD-DHK-9812"
                  className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 text-white"
                />
              </div>
            </div>
          )}

          {/* Preset Packages */}
          <div>
            <label className="block text-slate-300 font-semibold mb-1.5">Choose Capital Package</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                { amount: 100000, name: 'Starter Double Profit (৳১,০০,০০০)' },
                { amount: 250000, name: 'Silver Wealth Booster (৳২,৫০,০০০)' },
                { amount: 500000, name: 'Executive Gold Double Profit (৳৫,০০,০০০)' },
                { amount: 1000000, name: 'Platinum 2X Elite (৳১০,০০,০০০)' },
                { amount: 2500000, name: 'Crown VIP Double Return (৳২৫,০০,০০০)' },
                { amount: 5000000, name: 'Presidential Diamond (৳৫০,০০,০০০)' }
              ].map(p => (
                <button
                  key={p.amount}
                  type="button"
                  onClick={() => handleSelectPackage(p.amount, p.name)}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    principalAmount === p.amount
                      ? 'border-amber-500 bg-amber-500/20 text-white ring-1 ring-amber-500'
                      : 'border-slate-800 bg-slate-800/60 text-slate-300'
                  }`}
                >
                  <strong className="block text-xs font-mono">৳{p.amount.toLocaleString()}</strong>
                  <span className="text-[10px] text-emerald-400 block mt-0.5">2X: ৳{(p.amount * 2).toLocaleString()}</span>
                  <span className="text-[10px] text-amber-300 block font-mono">৳{Math.round((p.amount * 2) / 12).toLocaleString()}/mo</span>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Amount */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Or Custom Capital Amount (BDT) *</label>
              <input
                type="text"
                required
                value={customAmountStr}
                onChange={handleCustomChange}
                placeholder="500000"
                className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 text-white font-mono font-bold"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Package Title</label>
              <input
                type="text"
                value={packageName}
                onChange={e => setPackageName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 text-white"
              />
            </div>
          </div>

          {/* Live Calculation Preview */}
          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-center">
            <div>
              <span className="text-[10px] text-slate-400 font-sans block">Invested Principal</span>
              <strong className="text-white text-xs">৳{principalAmount.toLocaleString()}</strong>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-sans block">100% Net Profit</span>
              <strong className="text-emerald-400 text-xs">+৳{principalAmount.toLocaleString()}</strong>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-sans block">Total 12-Mo Payout</span>
              <strong className="text-amber-400 text-xs">৳{totalReturn.toLocaleString()}</strong>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-sans block">Monthly Installment</span>
              <strong className="text-emerald-300 text-xs font-black">৳{monthlyInstallment.toLocaleString()} / mo</strong>
            </div>
          </div>

          {/* Deed & PDC Prefix */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Agreement Deed Number</label>
              <input
                type="text"
                value={deedNo}
                onChange={e => setDeedNo(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 text-white font-mono"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">12 Bank PDC Cheques Prefix</label>
              <input
                type="text"
                value={bankPrefix}
                onChange={e => setBankPrefix(e.target.value)}
                placeholder="IBBL-PDC / CBL-PDC"
                className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-800 text-white font-mono"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:brightness-110 text-slate-950 font-black shadow-md flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>Enroll Plan & Generate 12 PDC Cheques</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
