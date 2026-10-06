export type CustomerSegment =
    | 'vip'
    | 'loyal'
    | 'regular'
    | 'new'
    | 'at-risk';

export type TopCustomersPeriod =
    | '7d'
    | '30d'
    | '90d'
    | 'year';

export interface TopCustomer {
    id: number;

    name: string;
    imageUrl: string;

    preferredService: string;

    visitCount: number;

    totalSpent: number;

    lastVisitDate: string;

    segment: CustomerSegment;
}

export interface TopCustomersData {
    period: TopCustomersPeriod;

    customers: TopCustomer[];
}