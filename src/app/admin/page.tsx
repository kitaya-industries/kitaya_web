'use client';

import { useState, useCallback } from 'react';
import {
  Loader2,
  Package,
  Truck,
  CheckCircle,
  RefreshCw,
  Download,
  ExternalLink,
  Boxes,
  Save,
  Circle,
} from 'lucide-react';
// SECURITY FIX: Removed direct supabase import.
// Stock operations now go through /api/admin/stock (PIN-protected, service role key server-side).

interface OrderItem {
  name: string;
  weight: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  order_number: string;
  created_at: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  address_line1: string;
  address_line2: string | null;
  city: string;
  state: string;
  pincode: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  order_status: string;
  payment_status: string;
  tracking_number: string | null;
  tracking_url: string | null;
}

interface StockItem {
  slug: string;
  stock_quantity: number;
  is_active: boolean;
  updated_at?: string | null;
}

const STATUS_COLORS: Record<string, string> = {
  placed: 'bg-blue-100 text-blue-700',
  confirmed: 'bg-amber-100 text-amber-700',
  shipped: 'bg-green-100 text-green-700',
  delivered: 'bg-green-200 text-green-800',
  cancelled: 'bg-red-100 text-red-700',
};

export default function AdminPage() {
  const [pin, setPin] = useState('');
  const [authed, setAuthed] = useState(false);
  const [activeTab, setActiveTab] = useState<'orders' | 'stock'>('orders');

  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [ordersError, setOrdersError] = useState('');
  const [shippingOrder, setShippingOrder] = useState<string | null>(null);
  const [shippingResults, setShippingResults] = useState<Record<string, { waybill: string; label?: string; error?: string }>>({});
  const [filter, setFilter] = useState<'all' | 'confirmed' | 'shipped' | 'delivered'>('confirmed');

  const [stockItems, setStockItems] = useState<StockItem[]>([]);
  const [stockLoading, setStockLoading] = useState(false);
  const [stockError, setStockError] = useState('');
  const [savingSlug, setSavingSlug] = useState<string | null>(null);
  const [savingAll, setSavingAll] = useState(false);
  const [stockSuccess, setStockSuccess] = useState('');

  const fetchOrders = useCallback(async (adminPin: string) => {
    setOrdersLoading(true);
    setOrdersError('');
    try {
      const res = await fetch('/api/admin/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin: adminPin }),
      });
      const data = await res.json();
      if (!res.ok) {
        setOrdersError(data.error || 'Failed to load orders');
        return;
      }
      setOrders(data.orders || []);
    } catch {
      setOrdersError('Network error. Please try again.');
    } finally {
      setOrdersLoading(false);
    }
  }, []);

  const fetchStock = useCallback(async () => {
    setStockLoading(true);
    setStockError('');
    setStockSuccess('');
    try {
      // SECURITY FIX: Goes through PIN-protected API route using service role key
      // instead of direct browser -> Supabase call with anon key
      const res = await fetch(`/api/admin/stock?pin=${pin}`);
      const data = await res.json();
      if (!res.ok) {
        setStockError(data.error || 'Failed to load stock');
        return;
      }
      setStockItems((data.stock || []) as StockItem[]);
    } catch {
      setStockError('Network error. Please try again.');
    } finally {
      setStockLoading(false);
    }
  }, [pin]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthed(true);
    await Promise.all([fetchOrders(pin), fetchStock()]);
  };

  const handleCreateShipment = async (order: Order) => {
    setShippingOrder(order.order_number);
    try {
      const res = await fetch('/api/admin/create-shipment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderNumber: order.order_number, pin }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setShippingResults(prev => ({
          ...prev,
          [order.order_number]: { waybill: '', error: data.error || 'Shipment creation failed' },
        }));
      } else {
        setShippingResults(prev => ({
          ...prev,
          [order.order_number]: { waybill: data.waybill, label: data.labelUrl },
        }));
        fetchOrders(pin);
      }
    } catch {
      setShippingResults(prev => ({
        ...prev,
        [order.order_number]: { waybill: '', error: 'Network error. Please try again.' },
      }));
    } finally {
      setShippingOrder(null);
    }
  };

  const updateStockField = (slug: string, patch: Partial<StockItem>) => {
    setStockItems(prev => prev.map(item => item.slug === slug ? { ...item, ...patch } : item));
    setStockSuccess('');
  };

  const saveStockRow = async (item: StockItem) => {
    setSavingSlug(item.slug);
    setStockError('');
    setStockSuccess('');
    try {
      // SECURITY FIX: Goes through PIN-protected API route using service role key
      const res = await fetch('/api/admin/stock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pin,
          updates: [{
            slug: item.slug,
            stock_quantity: Number.isFinite(item.stock_quantity) ? Math.max(0, item.stock_quantity) : 0,
            is_active: !!item.is_active,
          }],
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setStockError(data.error || `Failed to save ${item.slug}`);
        return;
      }
      setStockSuccess(`Saved ${item.slug}`);
      await fetchStock();
    } catch {
      setStockError('Network error while saving stock.');
    } finally {
      setSavingSlug(null);
    }
  };

  const saveAllStock = async () => {
    setSavingAll(true);
    setStockError('');
    setStockSuccess('');
    try {
      // SECURITY FIX: Goes through PIN-protected API route using service role key
      const res = await fetch('/api/admin/stock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pin,
          updates: stockItems.map(item => ({
            slug: item.slug,
            stock_quantity: Number.isFinite(item.stock_quantity) ? Math.max(0, item.stock_quantity) : 0,
            is_active: !!item.is_active,
          })),
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setStockError(data.error || 'Failed to save all stock');
        return;
      }
      setStockSuccess('All stock updated successfully');
      await fetchStock();
    } catch {
      setStockError('Network error while saving all stock.');
    } finally {
      setSavingAll(false);
    }
  };

  const filteredOrders = orders.filter(o => filter === 'all' ? true : o.order_status === filter);
  const activeProducts = stockItems.filter(item => item.is_active);
  const lowStockProducts = stockItems.filter(item => item.is_active && item.stock_quantity > 0 && item.stock_quantity <= 5);
  const outOfStockProducts = stockItems.filter(item => item.stock_quantity <= 0 || !item.is_active);

  if (!authed) {
    return (
      <div className="min-h-screen bg-bg-dark flex items-center justify-center px-4">
        <div className="bg-[#FAFAF7] p-10 w-full max-w-[380px]">
          <div className="text-center mb-8">
            <div className="font-display text-2xl text-charcoal mb-1">Kitaya Admin</div>
            <div className="text-[11px] tracking-[3px] uppercase text-warm-gray">Orders &amp; Stock Dashboard</div>
          </div>
          <form onSubmit={handleAuth} className="space-y-4">
            <div>
              <label className="block text-[11px] tracking-[2px] uppercase text-charcoal font-medium mb-2">Admin PIN</label>
              <input
                type="password"
                value={pin}
                onChange={e => setPin(e.target.value)}
                placeholder="Enter admin PIN"
                className="w-full px-4 py-3 border border-charcoal/15 text-charcoal text-[14px] outline-none focus:border-gold"
                required
              />
            </div>
            <button type="submit" className="w-full py-3 bg-gold text-bg-dark text-[12px] tracking-[2px] uppercase font-medium hover:bg-gold-light transition-colors">
              Access Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    
  <div className="min-h-screen bg-bg pt-24 md:pt-28 pb-20 px-4 sm:px-6 lg:px-10">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8 pb-4 border-b border-charcoal/10">
          <div>
            <div className="font-display text-2xl text-charcoal">
              {activeTab === 'orders' ? 'Orders' : 'Stock & Inventory'}
            </div>
            <div className="text-[11px] tracking-[2px] uppercase text-warm-gray mt-1">Kitaya Industries Admin</div>
          </div>

          <div className="flex items-center gap-3">
            <div className="inline-flex border border-charcoal/10 bg-white p-1">
              <button
                onClick={() => setActiveTab('orders')}
                className={`px-4 py-2 text-[11px] tracking-[1.5px] uppercase transition-colors ${
                  activeTab === 'orders' ? 'bg-gold text-bg-dark' : 'text-warm-gray hover:text-charcoal'
                }`}
              >
                Orders
              </button>
              <button
                onClick={() => setActiveTab('stock')}
                className={`px-4 py-2 text-[11px] tracking-[1.5px] uppercase transition-colors ${
                  activeTab === 'stock' ? 'bg-gold text-bg-dark' : 'text-warm-gray hover:text-charcoal'
                }`}
              >
                Stock &amp; Inventory
              </button>
            </div>

            <button
              onClick={() => activeTab === 'orders' ? fetchOrders(pin) : fetchStock()}
              className="flex items-center gap-2 text-[12px] tracking-[1px] uppercase text-warm-gray hover:text-gold transition-colors"
            >
              <RefreshCw size={14} /> Refresh
            </button>
          </div>
        </div>

        {activeTab === 'orders' && (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {[
                { label: 'Total Orders', value: orders.length, status: 'all' },
                { label: 'To Ship', value: orders.filter(o => o.order_status === 'confirmed').length, status: 'confirmed' },
                { label: 'Shipped', value: orders.filter(o => o.order_status === 'shipped').length, status: 'shipped' },
                { label: 'Delivered', value: orders.filter(o => o.order_status === 'delivered').length, status: 'delivered' },
              ].map(stat => (
                <button
                  key={stat.status}
                  onClick={() => setFilter(stat.status as typeof filter)}
                  className={`p-4 text-left border transition-colors ${filter === stat.status ? 'border-gold bg-bg-warm' : 'border-charcoal/8 bg-white hover:border-charcoal/20'}`}
                >
                  <div className="font-display text-2xl text-charcoal">{stat.value}</div>
                  <div className="text-[11px] tracking-[1px] uppercase text-warm-gray mt-1">{stat.label}</div>
                </button>
              ))}
            </div>

            {ordersError && <div className="bg-red-50 border border-red-200 text-red-700 text-sm p-4 mb-6 rounded">{ordersError}</div>}

            {ordersLoading && (
              <div className="flex items-center justify-center py-20">
                <Loader2 size={20} className="animate-spin text-warm-gray" />
              </div>
            )}

            {!ordersLoading && filteredOrders.length === 0 && (
              <div className="text-center py-20 text-warm-gray text-sm">No orders in this category.</div>
            )}

            {!ordersLoading && filteredOrders.length > 0 && (
              <div className="space-y-4">
                {filteredOrders.map(order => {
                  const result = shippingResults[order.order_number];
                  const isShipping = shippingOrder === order.order_number;
                  const totalWeight = order.items.reduce((sum, item) => {
                    const wg = item.weight.includes('2 ×') || item.weight.includes('2x')
                      ? parseInt(item.weight.replace(/\D/g, '')) * 2
                      : parseInt(item.weight.replace(/\D/g, ''));
                    return sum + (wg * item.quantity);
                  }, 0) + 150;

                  return (
                    <div key={order.id} className="bg-white border border-charcoal/8 p-5 sm:p-6">
                      <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <span className="font-display text-base text-charcoal">{order.order_number}</span>
                            <span className={`text-[10px] tracking-[1px] uppercase px-2.5 py-1 font-medium ${STATUS_COLORS[order.order_status] || 'bg-gray-100 text-gray-600'}`}>
                              {order.order_status}
                            </span>
                          </div>
                          <div className="text-[12px] text-warm-gray">
                            {new Date(order.created_at).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="font-display text-lg text-charcoal">₹{order.total}</div>
                          <div className="text-[11px] text-warm-gray">incl. ₹{order.shipping} shipping</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div className="bg-bg-warm p-3">
                          <div className="text-[10px] tracking-[2px] uppercase text-warm-gray mb-2">Customer</div>
                          <div className="text-[13px] text-charcoal font-medium">{order.customer_name}</div>
                          <div className="text-[12px] text-warm-gray">{order.customer_phone}</div>
                          <div className="text-[12px] text-warm-gray">{order.customer_email}</div>
                        </div>

                        <div className="bg-bg-warm p-3">
                          <div className="text-[10px] tracking-[2px] uppercase text-warm-gray mb-2">Delivery Address</div>
                          <div className="text-[13px] text-charcoal leading-5">
                            {order.address_line1}{order.address_line2 ? `, ${order.address_line2}` : ''}<br />
                            {order.city}, {order.state} — {order.pincode}
                          </div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="text-[10px] tracking-[2px] uppercase text-warm-gray mb-2">Items · {totalWeight}g ship weight</div>
                        <div className="flex flex-wrap gap-2">
                          {order.items.map((item, i) => (
                            <span key={i} className="text-[12px] bg-bg-warm px-3 py-1 text-charcoal">
                              {item.name} {item.weight} × {item.quantity}
                            </span>
                          ))}
                        </div>
                      </div>

                      {order.tracking_number && (
                        <div className="flex items-center gap-3 mb-4 p-3 bg-green-50 border border-green-200">
                          <Truck size={14} className="text-green-600 shrink-0" />
                          <div className="text-[12px] text-green-700">
                            Waybill: <strong>{order.tracking_number}</strong>
                          </div>
                          {order.tracking_url && (
                            <a href={order.tracking_url} target="_blank" rel="noopener noreferrer" className="ml-auto text-green-600 hover:text-green-800">
                              <ExternalLink size={13} />
                            </a>
                          )}
                        </div>
                      )}

                      {result && (
                        <div className={`p-3 mb-4 text-[12px] ${result.error ? 'bg-red-50 border border-red-200 text-red-700' : 'bg-green-50 border border-green-200 text-green-700'}`}>
                          {result.error ? (
                            `Error: ${result.error}`
                          ) : (
                            <div className="flex items-center justify-between">
                              <span>✓ Shipment created — Waybill: <strong>{result.waybill}</strong></span>
                              {result.label && (
                                <a
                                  href={result.label}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-1 text-green-700 hover:text-green-900 font-medium"
                                >
                                  <Download size={13} /> Print Label
                                </a>
                              )}
                            </div>
                          )}
                        </div>
                      )}

                      <div className="flex flex-wrap gap-3">
                        {order.order_status === 'confirmed' && !order.tracking_number && (
                          <button
                            onClick={() => handleCreateShipment(order)}
                            disabled={isShipping}
                            className="flex items-center gap-2 px-5 py-2.5 bg-gold text-bg-dark text-[12px] tracking-[1.5px] uppercase font-medium hover:bg-gold-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {isShipping ? (
                              <>
                                <Loader2 size={13} className="animate-spin" /> Creating...
                              </>
                            ) : (
                              <>
                                <Package size={13} /> Create Shipment
                              </>
                            )}
                          </button>
                        )}
                        {order.order_status === 'shipped' && order.tracking_number && (
                          <div className="flex items-center gap-1.5 text-[12px] text-green-600">
                            <CheckCircle size={14} /> Shipped — tracking active
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}

        {activeTab === 'stock' && (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {[
                { label: 'Total Products', value: stockItems.length },
                { label: 'Active', value: activeProducts.length },
                { label: 'Low Stock', value: lowStockProducts.length },
                { label: 'Out of Stock', value: outOfStockProducts.length },
              ].map(stat => (
                <div key={stat.label} className="p-4 text-left border border-charcoal/8 bg-white">
                  <div className="font-display text-2xl text-charcoal">{stat.value}</div>
                  <div className="text-[11px] tracking-[1px] uppercase text-warm-gray mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="bg-white border border-charcoal/8 p-5 sm:p-6 mb-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="font-display text-lg text-charcoal">Manage Stock</div>
                  <div className="text-[12px] text-warm-gray mt-1">Adjust available quantity and mark products active or inactive.</div>
                </div>
                <button
  type="button"
  onClick={saveAllStock}
  disabled={savingAll || stockLoading || stockItems.length === 0}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-gold text-bg-dark text-[12px] tracking-[1.5px] uppercase font-medium hover:bg-gold-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {savingAll ? <><Loader2 size={13} className="animate-spin" /> Saving...</> : <><Save size={13} /> Save All</>}
                </button>
              </div>
            </div>

            {stockError && <div className="bg-red-50 border border-red-200 text-red-700 text-sm p-4 mb-6 rounded">{stockError}</div>}
            {!stockError && stockSuccess && <div className="bg-green-50 border border-green-200 text-green-700 text-sm p-4 mb-6 rounded">{stockSuccess}</div>}

            {stockLoading && (
              <div className="flex items-center justify-center py-20">
                <Loader2 size={20} className="animate-spin text-warm-gray" />
              </div>
            )}

            {!stockLoading && stockItems.length === 0 && (
              <div className="text-center py-20 text-warm-gray text-sm">No product_stock rows found yet.</div>
            )}

            {!stockLoading && stockItems.length > 0 && (
              <div className="space-y-4">
                {stockItems.map(item => {
                  const isLow = item.is_active && item.stock_quantity > 0 && item.stock_quantity <= 5;
                  const isOut = item.stock_quantity <= 0 || !item.is_active;
                  const isSaving = savingSlug === item.slug;

                  return (
                    <div key={item.slug} className="bg-white border border-charcoal/8 p-5 sm:p-6">
                      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-3 mb-1">
                            <div className="font-display text-base text-charcoal break-all">{item.slug}</div>
                            <span
                              className={`text-[10px] tracking-[1px] uppercase px-2.5 py-1 font-medium ${
                                !item.is_active
                                  ? 'bg-gray-100 text-gray-600'
                                  : isOut
                                    ? 'bg-red-100 text-red-700'
                                    : isLow
                                      ? 'bg-amber-100 text-amber-700'
                                      : 'bg-green-100 text-green-700'
                              }`}
                            >
                              {!item.is_active ? 'Inactive' : isOut ? 'Sold Out' : isLow ? `Low Stock (${item.stock_quantity})` : 'In Stock'}
                            </span>
                          </div>
                          <div className="text-[12px] text-warm-gray flex items-center gap-2">
                            <Boxes size={13} />
                            {item.updated_at ? `Last updated ${new Date(item.updated_at).toLocaleString('en-IN')}` : 'Not updated yet'}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-[140px_150px_auto] gap-3 w-full lg:w-auto lg:min-w-[520px]">
                          <div>
                            <label className="block text-[10px] tracking-[2px] uppercase text-warm-gray mb-2">Quantity</label>
                            <input
  type="number"
  min="0"
  key={item.slug}
  defaultValue={item.stock_quantity}
  onBlur={(e) => {
    const next = e.target.valueAsNumber;
    updateStockField(item.slug, {
      stock_quantity: Number.isNaN(next) ? 0 : Math.max(0, next),
    });
  }}
  className="w-full px-4 py-3 border border-charcoal/15 text-charcoal text-[14px] outline-none focus:border-gold bg-white"
/>
                          </div>

                          <div>
                            <label className="block text-[10px] tracking-[2px] uppercase text-warm-gray mb-2">Status</label>
                            <button
                              type="button"
                              onClick={() => updateStockField(item.slug, { is_active: !item.is_active })}
                              className={`w-full h-[50px] px-4 border text-[12px] tracking-[1.5px] uppercase font-medium transition-colors flex items-center justify-center gap-2 ${
                                item.is_active
                                  ? 'border-green-200 bg-green-50 text-green-700 hover:bg-green-100'
                                  : 'border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100'
                              }`}
                            >
                              <Circle size={10} className={item.is_active ? 'fill-current' : ''} />
                              {item.is_active ? 'Active' : 'Inactive'}
                            </button>
                          </div>

                          <div className="sm:self-end">
  <button
    type="button"
    onClick={() => {
      const current = stockItems.find(s => s.slug === item.slug) ?? item;
      saveStockRow(current);
    }}
    disabled={isSaving || savingAll}
                              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 bg-gold text-bg-dark text-[12px] tracking-[1.5px] uppercase font-medium hover:bg-gold-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {isSaving ? <><Loader2 size={13} className="animate-spin" /> Saving...</> : <><Save size={13} /> Save</>}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}