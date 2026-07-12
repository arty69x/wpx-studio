export type Role = 'account' | 'seller' | 'admin';

export type NavItem = { id: string; label: string; badge?: string };
export type Metric = { label: string; value: string; delta: string; tone: 'lime' | 'pink' | 'cyan' | 'violet' | 'orange' };
export type Activity = { title: string; meta: string; status: string; tone: Metric['tone'] };

export const roleNavigation: Record<Role, NavItem[]> = {
  account: [
    { id: 'overview', label: 'Overview' }, { id: 'orders', label: 'My Orders', badge: '3' },
    { id: 'tracking', label: 'Tracking' }, { id: 'returns', label: 'Returns & Refunds' },
    { id: 'reviews', label: 'Reviews' }, { id: 'messages', label: 'Messages', badge: '2' },
    { id: 'vouchers', label: 'Vouchers & Credits' }, { id: 'collection', label: 'My Collection' },
    { id: 'addresses', label: 'Addresses' }, { id: 'payments', label: 'Payment Methods' },
    { id: 'notifications', label: 'Notifications' }, { id: 'security', label: 'Security & Sessions' },
  ],
  seller: [
    { id: 'overview', label: 'Overview' }, { id: 'products', label: 'Products', badge: '48' },
    { id: 'inventory', label: 'Inventory', badge: '6' }, { id: 'orders', label: 'Orders', badge: '12' },
    { id: 'fulfillment', label: 'Fulfillment' }, { id: 'returns', label: 'Returns & Disputes' },
    { id: 'promotions', label: 'Promotions & Drops' }, { id: 'analytics', label: 'Analytics' },
    { id: 'finance', label: 'Finance & Payouts' }, { id: 'coa', label: 'COA / Serial' },
    { id: 'staff', label: 'Staff & Roles' }, { id: 'settings', label: 'Shop Settings' },
  ],
  admin: [
    { id: 'overview', label: 'Command Center' }, { id: 'users', label: 'Users' },
    { id: 'sellers', label: 'Seller Approval', badge: '8' }, { id: 'moderation', label: 'Product Moderation', badge: '14' },
    { id: 'orders', label: 'Order Operations' }, { id: 'payments', label: 'Payments & Refunds' },
    { id: 'commission', label: 'Commission & Fees' }, { id: 'campaigns', label: 'Campaigns & CMS' },
    { id: 'community', label: 'Community Moderation' }, { id: 'reports', label: 'Reports & Audit' },
    { id: 'integrations', label: 'Integrations' }, { id: 'settings', label: 'System Settings' },
  ],
};

export const roleMetrics: Record<Role, Metric[]> = {
  account: [
    { label: 'Active orders', value: '3', delta: '+1 this week', tone: 'lime' },
    { label: 'Collection value', value: '฿48.9K', delta: '+12.4%', tone: 'pink' },
    { label: 'Collector level', value: '08', delta: '820 XP to next', tone: 'cyan' },
    { label: 'Credits', value: '฿1,240', delta: '2 vouchers', tone: 'violet' },
  ],
  seller: [
    { label: 'Revenue', value: '฿284K', delta: '+18.2%', tone: 'lime' },
    { label: 'Orders', value: '1,248', delta: '+94 this week', tone: 'pink' },
    { label: 'Conversion', value: '8.4%', delta: '+1.6%', tone: 'cyan' },
    { label: 'Payout', value: '฿96K', delta: 'Due 15 Jul', tone: 'violet' },
  ],
  admin: [
    { label: 'GMV', value: '฿24.8M', delta: '+21.6%', tone: 'lime' },
    { label: 'Active sellers', value: '842', delta: '+36 this month', tone: 'pink' },
    { label: 'Orders today', value: '3,604', delta: '98.7% healthy', tone: 'cyan' },
    { label: 'Open cases', value: '22', delta: '6 high priority', tone: 'orange' },
  ],
};

export const roleActivities: Record<Role, Activity[]> = {
  account: [
    { title: 'Moon Bunny — Aurora', meta: 'Order #AV-260712-0184', status: 'In transit', tone: 'cyan' },
    { title: 'Neon Kaiju — Noir', meta: 'Delivered 10 Jul', status: 'Review', tone: 'pink' },
    { title: 'Cosmic Cat — Solar', meta: 'Seller is packing', status: 'Processing', tone: 'lime' },
    { title: 'Dream Orbit collection', meta: '9 / 12 collected', status: '75%', tone: 'violet' },
  ],
  seller: [
    { title: '12 new orders', meta: '฿38,420 gross value', status: 'Fulfill', tone: 'lime' },
    { title: 'Moon Bunny stock low', meta: '6 units remaining', status: 'Restock', tone: 'orange' },
    { title: 'Drop campaign approved', meta: 'Launches Friday 20:00', status: 'Scheduled', tone: 'pink' },
    { title: 'Payout statement ready', meta: 'Period 01–10 Jul', status: 'Download', tone: 'cyan' },
  ],
  admin: [
    { title: '8 seller applications', meta: 'KYC documents ready', status: 'Review', tone: 'pink' },
    { title: '14 products flagged', meta: 'AI + community reports', status: 'Moderate', tone: 'orange' },
    { title: 'Payment success rate', meta: '99.14% last 24 hours', status: 'Healthy', tone: 'lime' },
    { title: 'Campaign slot available', meta: 'Homepage hero • Week 30', status: 'Configure', tone: 'cyan' },
  ],
};

export const authModes = ['login', 'register', 'otp', 'forgot-password', 'reset-password'] as const;
export type AuthMode = typeof authModes[number];
