export const REGISTRATIONS = [
  { id: 1, name: 'Ayşe Kaya',    email: 'ayse.kaya@ogr.iau.edu.tr',    event: 'IAU Tech Summit 2026',     date: 'May 10, 2026', status: 'Confirmed' },
  { id: 2, name: 'Mehmet Demir', email: 'mehmet.demir@ogr.iau.edu.tr', event: 'Entrepreneurship Workshop', date: 'May 12, 2026', status: 'Confirmed' },
  { id: 3, name: 'Zeynep Çelik', email: 'zeynep.celik@ogr.iau.edu.tr', event: 'Fine Arts Exhibition 2026', date: 'May 14, 2026', status: 'Pending' },
  { id: 4, name: 'Ali Yıldız',   email: 'ali.yildiz@ogr.iau.edu.tr',   event: 'Inter-Faculty Sports Day',  date: 'May 15, 2026', status: 'Confirmed' },
  { id: 5, name: 'Fatma Şahin',  email: 'fatma.sahin@ogr.iau.edu.tr',  event: 'AI & Data Science Seminar', date: 'May 16, 2026', status: 'Cancelled' },
]

export const getRegistrations = () => Promise.resolve(REGISTRATIONS)
