export interface ContractItem {
     id: string;
     serviceId: number;
     name: string;
     quantity: number;
     subtotal: number;
}

export interface EventEntity {
     id: string;
     address: string;
     date: Date;
     hours: number;
     notes?: string;
     schedule?: string;
     items: ContractItem[];
}

export interface Contract {
     id: string;
     customerId: string;
     event: EventEntity;
     subtotal: number;
     tax: number;
     total: number;
     createdAt: Date;
     status: "DRAFT" | "SIGNED" | "CANCELLED";
     signedAt?: Date;
}