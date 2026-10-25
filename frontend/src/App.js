import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Login from './components/Login';

export default function App() {
  const [theme, setTheme] = useState('dark');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [queuesSubTab, setQueuesSubTab] = useState('SELECT');
  const [canteenCategory, setCanteenCategory] = useState('BREAKFAST');

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Check for stored session on load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setCurrentUser(parsed);
        setIsAuthenticated(true);
      } catch (e) {
        localStorage.removeItem('user');
      }
    }
  }, []);

  // 1. Complaints State (Initialized empty so database IDs drive the UI)
  const [complaints, setComplaints] = useState([]);
  const [newComplaint, setNewComplaint] = useState({ title: '', desc: '' });
  
  // Load Complaints from MySQL Backend
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/complaints');
        if (response.data && response.data.length > 0) {
          const mapped = response.data.map(c => ({
            id: c.id,
            title: c.title,
            desc: c.desc,
            upvotes: c.upvotes,
            status: c.status,
            votedBy: c.votedBy ? c.votedBy.map(u => u.id) : []
          }));
          setComplaints(mapped);
        }
      } catch (error) {
        console.error("Failed to load complaints from backend:", error);
      }
    };

    fetchComplaints();
  }, []);

  // 2. Campus Mart State
  const [martItems, setMartItems] = useState([
    { id: 1, title: 'Casio Scientific Calculator FX-991EX', type: 'SELL', price: '450', seller: 'Rahul (BE)', contact: '9876543210', sellerName: 'Rahul' },
    { id: 2, title: 'Engineering Mechanics Drafter', type: 'LEND', price: 'Free', seller: 'Priya (TE)', contact: '9876543211', sellerName: 'Priya' }
  ]);
  const [newMartItem, setNewMartItem] = useState({ title: '', type: 'SELL', price: '', contact: '' });

  // 3. Lost & Found State
  const [lostItems, setLostItems] = useState([
    { id: 1, title: 'Blue Boat Earbuds Case', location: 'Library 2nd Floor', claimerId: null, status: 'AVAILABLE' },
    { id: 2, title: 'College ID Card', location: 'Canteen Counter', claimerId: 101, status: 'READY_TO_HANDOVER' }
  ]);
  const [newLostItem, setNewLostItem] = useState({ title: '', location: '' });

  // 4. Cafe Bosco Canteen Menu
  const canteenMenu = {
    BREAKFAST: [
      { id: 1, name: 'Poha', price: '50' },
      { id: 2, name: 'Misal Pav', price: '50' },
      { id: 3, name: 'Idli Sambar (5 pc)', price: '45' },
      { id: 4, name: 'Medu Vada (2 pc)', price: '45' },
      { id: 5, name: 'Vada Pav', price: '20' },
      { id: 6, name: 'Samosa Pav', price: '25' },
      { id: 7, name: 'Bhaji Pav', price: '20' },
      { id: 8, name: 'Cutlets', price: '40' },
      { id: 9, name: 'Chole Bhature', price: '60' },
      { id: 10, name: 'Puri Bhaji', price: '50' }
    ],
    SANDWICHES: [
      { id: 11, name: 'Veg (Plain) Sandwich', price: '50' },
      { id: 12, name: 'Veg Grilled Sandwich', price: '60' },
      { id: 13, name: 'Masala Grilled Sandwich', price: '50' },
      { id: 14, name: 'Veg Masala Grilled Sandwich', price: '60' },
      { id: 15, name: 'Only Cheese (Plain)', price: '60' },
      { id: 16, name: 'Only Cheese Grilled', price: '70' },
      { id: 17, name: 'Veg Cheese Grilled', price: '80' },
      { id: 18, name: 'Veg Masala Cheese Grilled', price: '80' },
      { id: 19, name: 'Chilly Cheese Sandwich', price: '80' }
    ],
    SHAKES: [
      { id: 20, name: 'Rose Milkshake', price: '80' },
      { id: 21, name: 'Chocolate Milkshake', price: '80' },
      { id: 22, name: 'Strawberry Milkshake', price: '80' },
      { id: 23, name: 'Mango Milkshake', price: '80' },
      { id: 24, name: 'Cold Coffee', price: '80' },
      { id: 25, name: 'Cold Coffee (Ice Cream)', price: '120' },
      { id: 26, name: 'Moccha Shake', price: '120' },
      { id: 27, name: 'Fresh Lemon Water', price: '20' },
      { id: 28, name: 'Mint Mojito', price: '80' }
    ]
  };

  const [canteenOrders, setCanteenOrders] = useState([
    { id: 501, studentId: 101, studentName: 'Aarav Patil', studentYear: 'SE', item: 'Veg Cheese Grilled', status: 'PENDING' },
    { id: 502, studentId: 102, studentName: 'Rohan Sharma', studentYear: 'TE', item: 'Cold Coffee', status: 'PENDING' }
  ]);

  const [blacklistedStudents, setBlacklistedStudents] = useState([]);

  // 5. Concession Pass State
  const [concessionStatus, setConcessionStatus] = useState('NOT_APPLIED');
  const [concessionForm, setConcessionForm] = useState({ station: '', travelClass: 'SECOND', tenure: 'MONTHLY' });

  // --- Handlers ---
  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
    setActiveTab('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  const handleToggleUpvote = async (id) => {
    if (!currentUser) return;

    // 1. Instant UI update
    setComplaints(complaints.map(item => {
      if (item.id === id) {
        const hasVoted = item.votedBy.includes(currentUser.id);
        const updatedVotedBy = hasVoted 
          ? item.votedBy.filter(uid => uid !== currentUser.id)
          : [...item.votedBy, currentUser.id];
        const updatedUpvotes = hasVoted ? item.upvotes - 1 : item.upvotes + 1;
        return { ...item, upvotes: updatedUpvotes, votedBy: updatedVotedBy };
      }
      return item;
    }));

    // 2. Persist to MySQL database
    try {
      await axios.post(`http://localhost:8080/api/complaints/${id}/upvote?userId=${currentUser.id}`);
    } catch (error) {
      console.error("Failed to persist upvote to MySQL:", error);
    }
  };

  const handleAddComplaint = async (e) => {
    e.preventDefault();
    if (!newComplaint.title || !currentUser) return;

    try {
      const response = await axios.post('http://localhost:8080/api/complaints', {
        title: newComplaint.title,
        desc: newComplaint.desc,
        upvotes: 1,
        status: 'OPEN'
      });

      const saved = response.data;
      setComplaints([...complaints, {
        id: saved.id,
        title: saved.title,
        desc: saved.desc,
        upvotes: saved.upvotes || 1,
        votedBy: [currentUser.id],
        status: saved.status || 'OPEN'
      }]);
      setNewComplaint({ title: '', desc: '' });
    } catch (error) {
      console.error("Failed to add complaint to backend:", error);
    }
  };

  const handleAddMartItem = (e) => {
    e.preventDefault();
    if (!newMartItem.title || !currentUser) return;
    setMartItems([...martItems, { 
      id: Date.now(), 
      ...newMartItem, 
      seller: `${currentUser.name} (${currentUser.role})`,
      sellerName: currentUser.name
    }]);
    setNewMartItem({ title: '', type: 'SELL', price: '', contact: '' });
  };

  const handleContactSeller = (item) => {
    alert(`📞 Contact Seller/Lender:\n\nItem: ${item.title}\nSeller: ${item.seller}\nPhone Number: ${item.contact}\n\nPlease call or WhatsApp this number to coordinate!`);
  };

  const handleDelistMartItem = (id) => {
    if (window.confirm("Are you sure you want to delist this item from the market?")) {
      setMartItems(martItems.filter(item => item.id !== id));
    }
  };

  const handleAddLostItem = (e) => {
    e.preventDefault();
    if (!newLostItem.title) return;
    setLostItems([...lostItems, { id: Date.now(), title: newLostItem.title, location: newLostItem.location, claimerId: null, status: 'AVAILABLE' }]);
    setNewLostItem({ title: '', location: '' });
  };

  const handleClaimItem = (id) => {
    if (!currentUser) return;
    setLostItems(lostItems.map(item => item.id === id ? { ...item, claimerId: currentUser.id } : item));
    alert('Claim request submitted! Visit the Office Admin with proof.');
  };

  const handleApproveClaim = (id) => {
    setLostItems(lostItems.map(item => item.id === id ? { ...item, status: 'READY_TO_HANDOVER' } : item));
  };

  const handlePlaceCanteenOrder = (itemName) => {
    if (!currentUser) return;
    if (blacklistedStudents.includes(currentUser.id)) {
      alert('❌ You have been blacklisted by Canteen Admin for uncollected orders. Please contact canteen staff.');
      return;
    }
    const newOrder = {
      id: Date.now(),
      studentId: currentUser.id,
      studentName: currentUser.name,
      studentYear: 'Member',
      item: itemName,
      status: 'PENDING'
    };
    setCanteenOrders([...canteenOrders, newOrder]);
    alert(`Order placed for ${itemName}!`);
  };

  const handleCompleteCanteenOrder = (orderId) => {
    setCanteenOrders(canteenOrders.filter(order => order.id !== orderId));
  };

  const handleBlacklistStudent = (order) => {
    if (!blacklistedStudents.includes(order.studentId)) {
      setBlacklistedStudents([...blacklistedStudents, order.studentId]);
    }
    setCanteenOrders(canteenOrders.filter(o => o.id !== order.id));
    alert(`Student ${order.studentName} has been blacklisted and order removed!`);
  };

  // --- STRICT AUTH GATEKEEPER ---
  if (!isAuthenticated) {
    return (
      <div className="app-container" style={{ justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Login onLoginSuccess={handleLoginSuccess} />
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="sidebar">
        <div className="logo">🎓 Campus Sync</div>
        <button className={`nav-btn ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>🏠 Main Dashboard</button>
        <button className={`nav-btn ${activeTab === 'complaints' ? 'active' : ''}`} onClick={() => setActiveTab('complaints')}>📢 All Complaints</button>
        <button className={`nav-btn ${activeTab === 'mart' ? 'active' : ''}`} onClick={() => setActiveTab('mart')}>🛒 Campus Mart</button>
        <button className={`nav-btn ${activeTab === 'lost' ? 'active' : ''}`} onClick={() => setActiveTab('lost')}>🔍 Lost & Found</button>
        <button className={`nav-btn ${activeTab === 'queues' ? 'active' : ''}`} onClick={() => { setActiveTab('queues'); setQueuesSubTab('SELECT'); }}>⌛ Queues & Pass</button>
      </div>

      <div className="main-content">
        <div className="top-header">
          <div><strong>Active User:</strong> {currentUser?.name}</div>
          <div className="header-actions">
            <button className="theme-btn" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
              {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
            </button>
            <span className="badge badge-green" style={{ fontSize: '0.85rem', padding: '6px 12px' }}>
              ROLE: {currentUser?.role}
            </span>
            <button className="btn btn-small btn-danger" onClick={handleLogout}>🚪 Logout</button>
          </div>
        </div>

        <div className="page-content">
          {/* MAIN DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div>
              <div className="hero-banner" style={{ backgroundImage: `url('/campus.jpg')` }}>
                <div className="hero-overlay">
                  <div className="hero-college">Don Bosco Institute Of Technology, Kurla</div>
                  <div className="hero-title">Welcome, {currentUser?.name}</div>
                  <div className="hero-subtitle">Authorized DBIT {currentUser?.role}</div>
                </div>
              </div>

              <div className="section-title">
                <span>🔥 Top Priority Campus Complaints</span>
                <button className="btn" onClick={() => setActiveTab('complaints')}>View All Complaints →</button>
              </div>

              {complaints
                .slice()
                .sort((a, b) => b.upvotes - a.upvotes)
                .slice(0, 3)
                .map((item, index) => {
                  const hasVoted = item.votedBy.includes(currentUser.id);
                  return (
                    <div key={item.id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <span style={{ color: 'var(--primary)', fontWeight: 'bold', marginRight: '8px' }}>#{index + 1}</span>
                        <span className={`badge ${item.status === 'SOLVED' ? 'badge-green' : 'badge-yellow'}`}>{item.status}</span>
                        <h3 style={{ margin: '6px 0' }}>{item.title}</h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{item.desc}</p>
                      </div>
                      <div>
                        {currentUser.role === 'STUDENT' && (
                          <button className={`btn-upvote ${hasVoted ? 'voted' : ''}`} onClick={() => handleToggleUpvote(item.id)}>
                            {hasVoted ? '▲ Upvoted' : '▲ Upvote'} ({item.upvotes})
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          )}

          {/* ALL COMPLAINTS MODULE */}
          {activeTab === 'complaints' && (
            <div>
              <h2 className="section-title">Campus Complaints Desk</h2>
              {currentUser.role === 'STUDENT' && (
                <div className="card">
                  <h3>Raise a New Complaint</h3>
                  <form onSubmit={handleAddComplaint} style={{ marginTop: '10px' }}>
                    <div className="form-group">
                      <input placeholder="Complaint Title" value={newComplaint.title} onChange={e => setNewComplaint({...newComplaint, title: e.target.value})} required />
                    </div>
                    <div className="form-group">
                      <textarea placeholder="Description..." value={newComplaint.desc} onChange={e => setNewComplaint({...newComplaint, desc: e.target.value})} required />
                    </div>
                    <button className="btn" type="submit">Submit Complaint</button>
                  </form>
                </div>
              )}

              {complaints.sort((a,b) => b.upvotes - a.upvotes).map(item => {
                const hasVoted = item.votedBy.includes(currentUser.id);
                return (
                  <div key={item.id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <span className={`badge ${item.status === 'SOLVED' ? 'badge-green' : 'badge-yellow'}`}>{item.status}</span>
                      <h4 style={{ margin: '6px 0' }}>{item.title}</h4>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{item.desc}</p>
                    </div>
                    <div>
                      {currentUser.role === 'STUDENT' && (
                        <button className={`btn-upvote ${hasVoted ? 'voted' : ''}`} onClick={() => handleToggleUpvote(item.id)}>
                          {hasVoted ? '▲ Upvoted' : '▲ Upvote'} ({item.upvotes})
                        </button>
                      )}
                      {currentUser.role === 'FACULTY' && (
                        <select value={item.status} onChange={(e) => setComplaints(complaints.map(c => c.id === item.id ? {...c, status: e.target.value} : c))} className="role-select">
                          <option value="OPEN">OPEN</option>
                          <option value="IN_PROGRESS">IN PROGRESS</option>
                          <option value="SOLVED">SOLVED</option>
                        </select>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* CAMPUS MART MODULE */}
          {activeTab === 'mart' && (
            <div>
              <h2 className="section-title">Campus Marketplace</h2>
              {currentUser.role === 'STUDENT' && (
                <div className="card">
                  <h3>List an Item for Sale or Lend</h3>
                  <form onSubmit={handleAddMartItem} style={{ marginTop: '10px' }}>
                    <div className="form-group">
                      <input placeholder="Item Name (e.g., Drafter, Calculator, Books)" value={newMartItem.title} onChange={e => setNewMartItem({...newMartItem, title: e.target.value})} required />
                    </div>
                    <div className="form-group" style={{ flexDirection: 'row' }}>
                      <select value={newMartItem.type} onChange={e => setNewMartItem({...newMartItem, type: e.target.value})}>
                        <option value="SELL">Sell</option>
                        <option value="LEND">Lend for Free</option>
                      </select>
                      <input placeholder="Price (or 'Free')" value={newMartItem.price} onChange={e => setNewMartItem({...newMartItem, price: e.target.value})} required />
                      <input placeholder="Contact Number" value={newMartItem.contact} onChange={e => setNewMartItem({...newMartItem, contact: e.target.value})} required />
                    </div>
                    <button className="btn" type="submit">Post Item</button>
                  </form>
                </div>
              )}

              <div className="grid-2">
                {martItems.map(item => {
                  const isOwner = currentUser?.name === item.sellerName || item.seller.includes(currentUser?.name);
                  
                  return (
                    <div key={item.id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <span className={`badge ${item.type === 'SELL' ? 'badge-green' : 'badge-yellow'}`}>{item.type}</span>
                        <h3 style={{ margin: '8px 0' }}>{item.title}</h3>
                        <p style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{item.price === 'Free' ? 'Free (Lend)' : `Price: ₹${item.price}`}</p>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '4px' }}>Seller: {item.seller}</p>
                      </div>

                      <div style={{ marginTop: '15px', display: 'flex', gap: '8px' }}>
                        <button 
                          className="btn" 
                          style={{ flex: 1 }}
                          onClick={() => handleContactSeller(item)}
                        >
                          {item.type === 'SELL' ? '🛍️ Get Contact' : '🤝 Get Contact'}
                        </button>

                        {(isOwner || currentUser?.role === 'OFFICE_ADMIN') && (
                          <button 
                            className="btn btn-danger btn-small"
                            onClick={() => handleDelistMartItem(item.id)}
                            title="Remove this item after selling"
                          >
                            🗑️ Delist / Sold
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* LOST & FOUND MODULE */}
          {activeTab === 'lost' && (
            <div>
              <h2 className="section-title">Lost & Found Desk</h2>
              <div className="card">
                <h3>Report a Found Item</h3>
                <form onSubmit={handleAddLostItem} style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
                  <input style={{ flex: 1 }} placeholder="Item Name" value={newLostItem.title} onChange={e => setNewLostItem({...newLostItem, title: e.target.value})} required />
                  <input style={{ flex: 1 }} placeholder="Location Found (e.g., Room 204)" value={newLostItem.location} onChange={e => setNewLostItem({...newLostItem, location: e.target.value})} required />
                  <button className="btn" type="submit">Post Item</button>
                </form>
              </div>

              <div className="grid-2">
                {lostItems.map(item => {
                  const isClaimedByMe = item.claimerId === currentUser.id;
                  const isReady = item.status === 'READY_TO_HANDOVER';

                  return (
                    <div key={item.id} className="card">
                      <h4>{item.title}</h4>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: '4px 0' }}>Found at: {item.location}</p>
                      
                      <div style={{ marginTop: '8px' }}>
                        {isReady ? (
                          isClaimedByMe ? (
                            <span className="badge badge-green">Ready to Handover (Collect at Admin Office)</span>
                          ) : (
                            <span className="badge badge-yellow">Claimed</span>
                          )
                        ) : (
                          <span className="badge badge-yellow">Available</span>
                        )}
                      </div>

                      <div style={{ marginTop: '12px' }}>
                        {currentUser.role === 'STUDENT' && !item.claimerId && (
                          <button className="btn btn-small" onClick={() => handleClaimItem(item.id)}>Claim This Item</button>
                        )}
                        {currentUser.role === 'OFFICE_ADMIN' && item.claimerId && !isReady && (
                          <button className="btn btn-small" onClick={() => handleApproveClaim(item.id)}>Approve Claim</button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* QUEUES & PASS MODULE */}
          {activeTab === 'queues' && (
            <div>
              {queuesSubTab === 'SELECT' && (
                <div>
                  <h2 className="section-title">Campus Services & Queues</h2>
                  <div className="grid-2" style={{ marginTop: '1rem' }}>
                    <div className="sub-nav-card" onClick={() => setQueuesSubTab('CANTEEN')}>
                      <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🍔</h2>
                      <h3>Cafe Bosco Queue & Orders</h3>
                      <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>View menu, live orders ahead, and place food orders.</p>
                    </div>

                    {currentUser.role !== 'FACULTY' && (
                      <div className="sub-nav-card" onClick={() => setQueuesSubTab('CONCESSION')}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🚆</h2>
                        <h3>Railway Concession Pass</h3>
                        <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>Apply for quarterly/monthly local train pass concessions.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* CANTEEN SUB-SECTION */}
              {queuesSubTab === 'CANTEEN' && (
                <div>
                  <div className="section-title">
                    <span>☕ Cafe Bosco (Canteen Desk)</span>
                    <button className="btn btn-small" onClick={() => setQueuesSubTab('SELECT')}>← Back to Services</button>
                  </div>

                  <div className="canteen-gallery">
                    <div className="canteen-img-card" style={{ backgroundImage: `url('/canteen1.jpg')` }}>
                      <span>Cafe Bosco Entrance</span>
                    </div>
                    <div className="canteen-img-card" style={{ backgroundImage: `url('/canteen2.jpg')` }}>
                      <span>Food Counter Desk</span>
                    </div>
                  </div>

                  {(currentUser.role === 'STUDENT' || currentUser.role === 'FACULTY') && (
                    <div className="grid-2">
                      <div className="card">
                        <h3>Canteen Menu & Orders</h3>
                        {blacklistedStudents.includes(currentUser.id) && (
                          <div className="badge badge-red" style={{ width: '100%', margin: '10px 0', padding: '8px', textAlign: 'center' }}>
                            ⚠️ You are blacklisted by Canteen Admin for uncollected orders.
                          </div>
                        )}

                        <div className="menu-tabs" style={{ marginTop: '15px' }}>
                          <button className={`menu-tab-btn ${canteenCategory === 'BREAKFAST' ? 'active' : ''}`} onClick={() => setCanteenCategory('BREAKFAST')}>Breakfast</button>
                          <button className={`menu-tab-btn ${canteenCategory === 'SANDWICHES' ? 'active' : ''}`} onClick={() => setCanteenCategory('SANDWICHES')}>Sandwiches</button>
                          <button className={`menu-tab-btn ${canteenCategory === 'SHAKES' ? 'active' : ''}`} onClick={() => setCanteenCategory('SHAKES')}>Shakes & Drinks</button>
                        </div>

                        <div>
                          {canteenMenu[canteenCategory].map(item => {
                            const activeCount = canteenOrders.filter(o => o.item === item.name).length;
                            return (
                              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', padding: '6px 0', borderBottom: '1px solid var(--border-color)' }}>
                                <div>
                                  <strong>{item.name}</strong> (₹{item.price})
                                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Orders ahead: {activeCount}</p>
                                </div>
                                <button className="btn btn-small" onClick={() => handlePlaceCanteenOrder(item.name)}>Order</button>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <div className="card">
                        <h3>My Active Orders</h3>
                        {canteenOrders.filter(o => o.studentId === currentUser.id).length === 0 ? (
                          <p style={{ color: 'var(--text-muted)', marginTop: '10px' }}>No active orders.</p>
                        ) : (
                          canteenOrders.filter(o => o.studentId === currentUser.id).map(order => (
                            <div key={order.id} style={{ background: 'var(--bg-main)', padding: '10px', borderRadius: '6px', marginTop: '10px' }}>
                              <p><strong>{order.item}</strong></p>
                              <span className="badge badge-yellow">Order Status: {order.status}</span>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}

                  {/* CANTEEN ADMIN VIEW */}
                  {currentUser.role === 'CANTEEN_ADMIN' && (
                    <div className="card">
                      <h3>Canteen Orders Management Desk</h3>
                      {canteenOrders.length === 0 ? (
                        <p style={{ color: 'var(--text-muted)', marginTop: '10px' }}>No pending orders in queue.</p>
                      ) : (
                        <div style={{ marginTop: '15px' }}>
                          {canteenOrders.map(order => (
                            <div key={order.id} style={{ background: 'var(--bg-main)', padding: '12px', borderRadius: '8px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <div>
                                <p style={{ fontSize: '1rem', fontWeight: 'bold' }}>{order.item}</p>
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Ordered by: {order.studentName}</p>
                              </div>
                              <div style={{ display: 'flex', gap: '8px' }}>
                                <button className="btn btn-small" onClick={() => handleCompleteCanteenOrder(order.id)}>Mark Completed</button>
                                <button className="btn btn-small btn-danger" onClick={() => handleBlacklistStudent(order)}>Blacklist Student</button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* CONCESSION SUB-SECTION */}
              {queuesSubTab === 'CONCESSION' && currentUser.role !== 'FACULTY' && (
                <div>
                  <div className="section-title">
                    <span>🚆 Railway Concession Pass</span>
                    <button className="btn btn-small" onClick={() => setQueuesSubTab('SELECT')}>← Back to Services</button>
                  </div>

                  <div className="card">
                    {currentUser.role === 'STUDENT' && (
                      <div>
                        {concessionStatus === 'NOT_APPLIED' ? (
                          <form onSubmit={(e) => { e.preventDefault(); setConcessionStatus('PENDING'); }}>
                            <div className="form-group">
                              <label>Home Station:</label>
                              <input placeholder="e.g. Kurla / Dombivli" value={concessionForm.station} onChange={e => setConcessionForm({...concessionForm, station: e.target.value})} required />
                            </div>
                            <div className="form-group">
                              <label>Class:</label>
                              <select value={concessionForm.travelClass} onChange={e => setConcessionForm({...concessionForm, travelClass: e.target.value})}>
                                <option value="SECOND">2nd Class</option>
                                <option value="FIRST">1st Class</option>
                              </select>
                            </div>
                            <button className="btn" type="submit">Apply for Pass</button>
                          </form>
                        ) : (
                          <p style={{ marginTop: '10px' }}>Application Status: <span className="badge badge-yellow">{concessionStatus}</span></p>
                        )}
                      </div>
                    )}

                    {currentUser.role === 'OFFICE_ADMIN' && (
                      <div>
                        <p><strong>Pending Applications:</strong></p>
                        {concessionStatus === 'PENDING' ? (
                          <div style={{ background: 'var(--bg-main)', padding: '12px', borderRadius: '6px', margin: '10px 0' }}>
                            <p>Applicant: {currentUser.name}</p>
                            <p>Station: {concessionForm.station || 'Kurla'}</p>
                            <div style={{ marginTop: '10px', display: 'flex', gap: '8px' }}>
                              <button className="btn btn-small" onClick={() => setConcessionStatus('APPROVED')}>Approve</button>
                              <button className="btn btn-small btn-danger" onClick={() => setConcessionStatus('REJECTED')}>Reject</button>
                            </div>
                          </div>
                        ) : (
                          <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>No pending applications.</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}