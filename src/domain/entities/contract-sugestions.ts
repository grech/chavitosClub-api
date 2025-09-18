export type SuggestionStatus = "PENDING" | "APPLIED" | "EXPIRED" | "CANCELLED";

export interface PackageQuote {
     packageId: number;
     quaintity: number;
     subtotal: number;
}

export interface SuggestionPayload {
     hours: number;
     packages: PackageQuote[];
     coveredServices: number[];
     remainingServices: number[];
     vatRate: number;
     calcAt: string;
}

export interface ContractSuggestion {
     id: string;
     contractId: string;
     eventId: string;
     hours: number;
     payload: SuggestionPayload;
     savings: number;
     status: SuggestionStatus;
     createdAt: Date;
     expiresAt: Date;
     appliedAt?: Date;
}