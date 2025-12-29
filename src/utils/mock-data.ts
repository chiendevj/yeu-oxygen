/**
 * Mock Data Store
 * Centralized mock data for development and testing
 * TODO: Replace with API calls when backend is ready
 */

export interface CollectionEntry {
  id: string;
  orderNumber: string;
  time: string;
  status: 'confirmed' | 'collecting' | 'completed' | 'cancelled';
  date: string;
  wasteType?: 'organic' | 'plastic' | 'glass' | 'paper' | 'hazardous';
}

export interface OrderDetail {
  id: string;
  orderNumber: string;
  orderCode: string;
  wasteType: 'organic' | 'plastic' | 'glass' | 'paper' | 'hazardous';
  collectionTime: string;
  collectionDate: string;
  collectionAddress: string;
  status: 'confirmed' | 'collecting' | 'completed' | 'cancelled';
  collector: {
    name: string;
    phone: string;
    avatar: string | null;
  };
  notes: string;
}

// Waste type categories với màu từ sorting-process.tsx
export const wasteCategories = {
  organic: {
    title: 'Hữu cơ',
    color: '#3B9E3E',
    icons: ['leaf-outline', 'fast-food-outline', 'nutrition-outline'],
  },
  plastic: {
    title: 'Nhựa',
    color: '#347EA9',
    icons: ['water-outline', 'beer-outline', 'flask-outline'],
  },
  glass: {
    title: 'Thủy tinh',
    color: '#818181',
    icons: ['wine-outline', 'wine-sharp', 'glasses-outline'],
  },
  paper: {
    title: 'Giấy',
    color: '#9E9D24',
    icons: ['newspaper-outline', 'document-outline', 'duplicate-outline'],
  },
  hazardous: {
    title: 'Nguy hại',
    color: '#A45454',
    icons: ['warning-outline', 'flame-outline', 'skull-outline'],
  },
};

// Mock collection history data
export const mockCollectionHistory: CollectionEntry[] = [
  // Tháng 10/2025
  {
    id: '26',
    orderNumber: 'Đơn 026',
    time: '08:30',
    status: 'confirmed',
    date: '2025-10-01',
  },
  {
    id: '27',
    orderNumber: 'Đơn 027',
    time: '10:00',
    status: 'completed',
    date: '2025-10-01',
  },
  {
    id: '28',
    orderNumber: 'Đơn 028',
    time: '12:30',
    status: 'completed',
    date: '2025-10-01',
  },
  {
    id: '29',
    orderNumber: 'Đơn 029',
    time: '09:15',
    status: 'confirmed',
    date: '2025-10-08',
  },
  {
    id: '30',
    orderNumber: 'Đơn 030',
    time: '13:45',
    status: 'collecting',
    date: '2025-10-08',
  },
  {
    id: '31',
    orderNumber: 'Đơn 031',
    time: '16:00',
    status: 'completed',
    date: '2025-10-08',
  },
  {
    id: '32',
    orderNumber: 'Đơn 032',
    time: '08:45',
    status: 'completed',
    date: '2025-10-15',
  },
  {
    id: '33',
    orderNumber: 'Đơn 033',
    time: '11:30',
    status: 'completed',
    date: '2025-10-15',
  },
  {
    id: '34',
    orderNumber: 'Đơn 034',
    time: '14:15',
    status: 'cancelled',
    date: '2025-10-20',
  },
  {
    id: '35',
    orderNumber: 'Đơn 035',
    time: '09:00',
    status: 'confirmed',
    date: '2025-10-25',
  },
  {
    id: '36',
    orderNumber: 'Đơn 036',
    time: '15:20',
    status: 'collecting',
    date: '2025-10-30',
  },

  // Tháng 11/2025
  {
    id: '37',
    orderNumber: 'Đơn 037',
    time: '08:20',
    status: 'confirmed',
    date: '2025-11-02',
    wasteType: 'plastic',
  },
  {
    id: '38',
    orderNumber: 'Đơn 038',
    time: '10:45',
    status: 'confirmed',
    date: '2025-11-02',
    wasteType: 'glass',
  },
  {
    id: '39',
    orderNumber: 'Đơn 039',
    time: '13:00',
    status: 'confirmed',
    date: '2025-11-02',
    wasteType: 'paper',
  },
  {
    id: '40',
    orderNumber: 'Đơn 040',
    time: '09:30',
    status: 'completed',
    date: '2025-11-10',
    wasteType: 'organic',
  },
  {
    id: '41',
    orderNumber: 'Đơn 041',
    time: '12:15',
    status: 'collecting',
    date: '2025-11-10',
    wasteType: 'hazardous',
  },
  {
    id: '42',
    orderNumber: 'Đơn 042',
    time: '16:30',
    status: 'completed',
    date: '2025-11-10',
    wasteType: 'plastic',
  },
  {
    id: '43',
    orderNumber: 'Đơn 043',
    time: '08:00',
    status: 'completed',
    date: '2025-11-18',
    wasteType: 'glass',
  },
  {
    id: '44',
    orderNumber: 'Đơn 044',
    time: '11:45',
    status: 'completed',
    date: '2025-11-18',
    wasteType: 'paper',
  },
  {
    id: '45',
    orderNumber: 'Đơn 045',
    time: '14:30',
    status: 'cancelled',
    date: '2025-11-25',
    wasteType: 'organic',
  },
  {
    id: '46',
    orderNumber: 'Đơn 046',
    time: '09:15',
    status: 'completed',
    date: '2025-11-28',
    wasteType: 'hazardous',
  },
  {
    id: '47',
    orderNumber: 'Đơn 047',
    time: '15:00',
    status: 'collecting',
    date: '2025-11-28',
    wasteType: 'plastic',
  },

  // Tháng 12/2025
  {
    id: '48',
    orderNumber: 'Đơn 048',
    time: '08:30',
    status: 'completed',
    date: '2025-12-01',
    wasteType: 'glass',
  },
  {
    id: '49',
    orderNumber: 'Đơn 049',
    time: '10:15',
    status: 'completed',
    date: '2025-12-01',
    wasteType: 'paper',
  },
  {
    id: '50',
    orderNumber: 'Đơn 050',
    time: '13:45',
    status: 'completed',
    date: '2025-12-01',
    wasteType: 'organic',
  },
  {
    id: '51',
    orderNumber: 'Đơn 051',
    time: '09:00',
    status: 'completed',
    date: '2025-12-05',
    wasteType: 'plastic',
  },
  {
    id: '52',
    orderNumber: 'Đơn 052',
    time: '12:30',
    status: 'collecting',
    date: '2025-12-05',
    wasteType: 'hazardous',
  },
  {
    id: '53',
    orderNumber: 'Đơn 053',
    time: '16:15',
    status: 'completed',
    date: '2025-12-05',
    wasteType: 'organic',
  },
  {
    id: '54',
    orderNumber: 'Đơn 054',
    time: '08:45',
    status: 'completed',
    date: '2025-12-10',
    wasteType: 'plastic',
  },
  {
    id: '55',
    orderNumber: 'Đơn 055',
    time: '11:20',
    status: 'completed',
    date: '2025-12-10',
    wasteType: 'glass',
  },
  {
    id: '56',
    orderNumber: 'Đơn 056',
    time: '14:00',
    status: 'completed',
    date: '2025-12-15',
    wasteType: 'paper',
  },
  {
    id: '57',
    orderNumber: 'Đơn 057',
    time: '09:30',
    status: 'cancelled',
    date: '2025-12-20',
    wasteType: 'hazardous',
  },
  {
    id: '58',
    orderNumber: 'Đơn 058',
    time: '13:15',
    status: 'completed',
    date: '2025-12-20',
    wasteType: 'organic',
  },
  {
    id: '59',
    orderNumber: 'Đơn 059',
    time: '08:00',
    status: 'completed',
    date: '2025-12-25',
    wasteType: 'plastic',
  },
  {
    id: '60',
    orderNumber: 'Đơn 060',
    time: '15:45',
    status: 'collecting',
    date: '2025-12-30',
    wasteType: 'glass',
  },
];

// Mock order detail data - map từ collection history
export const mockOrderDetails: Record<string, OrderDetail> = {
  '26': {
    id: '26',
    orderNumber: 'Đơn 026',
    orderCode: 'ORD000026',
    wasteType: 'organic',
    collectionTime: '08:30',
    collectionDate: '01/10/2025',
    collectionAddress: '174, quận 4, Hồ Chí Minh',
    status: 'confirmed',
    collector: {
      name: 'Nguyễn Văn A',
      phone: '0901234567',
      avatar: null,
    },
    notes: 'Khách hàng yêu cầu thu gom vào buổi sáng sớm.',
  },
  '27': {
    id: '27',
    orderNumber: 'Đơn 027',
    orderCode: 'ORD000027',
    wasteType: 'plastic',
    collectionTime: '10:00',
    collectionDate: '01/10/2025',
    collectionAddress: '123, đường Nguyễn Huệ, quận 1, Hồ Chí Minh',
    status: 'completed',
    collector: {
      name: 'Trần Thị B',
      phone: '0912345678',
      avatar: null,
    },
    notes: 'Đã thu gom thành công.',
  },
  '28': {
    id: '28',
    orderNumber: 'Đơn 028',
    orderCode: 'ORD000028',
    wasteType: 'glass',
    collectionTime: '12:30',
    collectionDate: '01/10/2025',
    collectionAddress: '456, phường Bến Nghé, quận 1, Hồ Chí Minh',
    status: 'completed',
    collector: {
      name: 'Lê Văn C',
      phone: '0923456789',
      avatar: null,
    },
    notes: 'Rác thủy tinh, cần cẩn thận khi xử lý.',
  },
  '29': {
    id: '29',
    orderNumber: 'Đơn 029',
    orderCode: 'ORD000029',
    wasteType: 'paper',
    collectionTime: '09:15',
    collectionDate: '08/10/2025',
    collectionAddress: '789, đường Lê Lợi, quận 1, Hồ Chí Minh',
    status: 'confirmed',
    collector: {
      name: 'Phạm Thị D',
      phone: '0934567890',
      avatar: null,
    },
    notes: 'Giấy carton lớn, cần xe tải.',
  },
  '30': {
    id: '30',
    orderNumber: 'Đơn 030',
    orderCode: 'ORD000030',
    wasteType: 'hazardous',
    collectionTime: '13:45',
    collectionDate: '08/10/2025',
    collectionAddress: '174, quận 4, Hồ Chí Minh',
    status: 'collecting',
    collector: {
      name: 'Nguyễn Văn A',
      phone: '0901234567',
      avatar: null,
    },
    notes: 'Rác nguy hại - pin và bóng đèn. Xử lý cẩn thận.',
  },
  '31': {
    id: '31',
    orderNumber: 'Đơn 031',
    orderCode: 'ORD000031',
    wasteType: 'organic',
    collectionTime: '16:00',
    collectionDate: '08/10/2025',
    collectionAddress: '123, đường Nguyễn Huệ, quận 1, Hồ Chí Minh',
    status: 'completed',
    collector: {
      name: 'Trần Thị B',
      phone: '0912345678',
      avatar: null,
    },
    notes: 'Rác hữu cơ từ nhà bếp.',
  },
  '32': {
    id: '32',
    orderNumber: 'Đơn 032',
    orderCode: 'ORD000032',
    wasteType: 'plastic',
    collectionTime: '08:45',
    collectionDate: '15/10/2025',
    collectionAddress: '456, phường Bến Nghé, quận 1, Hồ Chí Minh',
    status: 'completed',
    collector: {
      name: 'Lê Văn C',
      phone: '0923456789',
      avatar: null,
    },
    notes: 'Chai nhựa đã được rửa sạch.',
  },
  '33': {
    id: '33',
    orderNumber: 'Đơn 033',
    orderCode: 'ORD000033',
    wasteType: 'glass',
    collectionTime: '11:30',
    collectionDate: '15/10/2025',
    collectionAddress: '789, đường Lê Lợi, quận 1, Hồ Chí Minh',
    status: 'completed',
    collector: {
      name: 'Phạm Thị D',
      phone: '0934567890',
      avatar: null,
    },
    notes: '',
  },
  '34': {
    id: '34',
    orderNumber: 'Đơn 034',
    orderCode: 'ORD000034',
    wasteType: 'paper',
    collectionTime: '14:15',
    collectionDate: '20/10/2025',
    collectionAddress: '174, quận 4, Hồ Chí Minh',
    status: 'cancelled',
    collector: {
      name: 'Nguyễn Văn A',
      phone: '0901234567',
      avatar: null,
    },
    notes: 'Khách hàng hủy đơn do thay đổi kế hoạch.',
  },
  '35': {
    id: '35',
    orderNumber: 'Đơn 035',
    orderCode: 'ORD000035',
    wasteType: 'hazardous',
    collectionTime: '09:00',
    collectionDate: '25/10/2025',
    collectionAddress: '123, đường Nguyễn Huệ, quận 1, Hồ Chí Minh',
    status: 'confirmed',
    collector: {
      name: 'Trần Thị B',
      phone: '0912345678',
      avatar: null,
    },
    notes: 'Thiết bị điện tử cũ cần xử lý đặc biệt.',
  },
  '36': {
    id: '36',
    orderNumber: 'Đơn 036',
    orderCode: 'ORD000036',
    wasteType: 'organic',
    collectionTime: '15:20',
    collectionDate: '30/10/2025',
    collectionAddress: '456, phường Bến Nghé, quận 1, Hồ Chí Minh',
    status: 'collecting',
    collector: {
      name: 'Lê Văn C',
      phone: '0923456789',
      avatar: null,
    },
    notes: 'Đang trên đường đến địa chỉ.',
  },
};

// Helper function để lấy order detail từ ID
export const getOrderDetailById = (orderId: string): OrderDetail | null => {
  return mockOrderDetails[orderId] || null;
};

// Helper function để generate order detail nếu chưa có trong mock data
export const generateOrderDetail = (entry: CollectionEntry): OrderDetail => {
  const existing = mockOrderDetails[entry.id];
  if (existing) {
    return existing;
  }

  // Generate từ entry data
  const orderIdNum = parseInt(entry.id || '1');
  
  // Ưu tiên lấy wasteType từ entry, nếu không có thì generate
  const wasteTypes: (keyof typeof wasteCategories)[] = [
    'organic',
    'plastic',
    'glass',
    'paper',
    'hazardous',
  ];
  const wasteType = entry.wasteType || wasteTypes[orderIdNum % wasteTypes.length];

  const collectors = [
    { name: 'Nguyễn Văn A', phone: '0901234567' },
    { name: 'Trần Thị B', phone: '0912345678' },
    { name: 'Lê Văn C', phone: '0923456789' },
    { name: 'Phạm Thị D', phone: '0934567890' },
  ];
  const collector = collectors[orderIdNum % collectors.length];

  const addresses = [
    '174, quận 4, Hồ Chí Minh',
    '123, đường Nguyễn Huệ, quận 1, Hồ Chí Minh',
    '456, phường Bến Nghé, quận 1, Hồ Chí Minh',
    '789, đường Lê Lợi, quận 1, Hồ Chí Minh',
  ];
  const address = addresses[orderIdNum % addresses.length];

  const orderCode = `ORD${String(orderIdNum).padStart(6, '0')}`;

  // Parse date from entry.date (format: YYYY-MM-DD)
  const dateParts = entry.date.split('-');
  const formattedDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;

  return {
    id: entry.id,
    orderNumber: entry.orderNumber,
    orderCode,
    wasteType,
    collectionTime: entry.time,
    collectionDate: formattedDate,
    collectionAddress: address,
    status: entry.status,
    collector: {
      ...collector,
      avatar: null,
    },
    notes: 'Khách hàng yêu cầu thu gom đúng giờ.',
  };
};

