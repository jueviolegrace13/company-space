import { create } from 'zustand';
import { format } from 'date-fns';

export type TicketStatus = 'open' | 'in_progress' | 'resolved' | 'closed';
export type TicketPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  createdAt: string;
  updatedAt: string;
  viewed: boolean;
  client: {
    id: string;
    name: string;
    avatarUrl?: string;
  };
  assignedTo?: {
    id: string;
    name: string;
    avatarUrl?: string;
  };
}

interface TicketStore {
  tickets: Ticket[];
  addTicket: (ticket: Omit<Ticket, 'id' | 'createdAt' | 'updatedAt' | 'viewed'>) => void;
  updateTicket: (id: string, updates: Partial<Ticket>) => void;
  deleteTicket: (id: string) => void;
  getTicket: (id: string) => Ticket | undefined;
}

export const useTicketStore = create<TicketStore>((set, get) => ({
  tickets: [
    {
      id: 'TCK-1001',
      title: 'Cannot access dashboard features',
      description: 'I\'m trying to access the analytics dashboard but getting an error message. Need urgent assistance as this is affecting our daily operations.',
      status: 'open',
      priority: 'high',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      viewed: false,
      client: {
        id: 'CLT-001',
        name: 'John Smith',
        avatarUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
      },
    },
    {
      id: 'TCK-1002',
      title: 'Integration with API not working',
      description: 'The integration with our CRM system stopped working after the latest update. Need help resolving this issue.',
      status: 'in_progress',
      priority: 'medium',
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString(),
      viewed: true,
      client: {
        id: 'CLT-002',
        name: 'Sarah Johnson',
        avatarUrl: 'https://randomuser.me/api/portraits/women/2.jpg',
      },
      assignedTo: {
        id: 'AGT-001',
        name: 'Michael Brown',
        avatarUrl: 'https://randomuser.me/api/portraits/men/10.jpg',
      },
    },
  ],

  addTicket: (ticketData) => {
    const newTicket: Ticket = {
      ...ticketData,
      id: `TCK-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      viewed: false,
    };

    set((state) => ({
      tickets: [...state.tickets, newTicket],
    }));
  },

  updateTicket: (id, updates) => {
    set((state) => ({
      tickets: state.tickets.map((ticket) =>
        ticket.id === id
          ? { ...ticket, ...updates, updatedAt: new Date().toISOString() }
          : ticket
      ),
    }));
  },

  deleteTicket: (id) => {
    set((state) => ({
      tickets: state.tickets.filter((ticket) => ticket.id !== id),
    }));
  },

  getTicket: (id) => {
    return get().tickets.find((ticket) => ticket.id === id);
  },
}));