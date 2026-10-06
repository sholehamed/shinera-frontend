export type AttentionItemType =
    | 'pending-appointment'
    | 'unpaid'
    | 'waitlist'
    | 'cancellation';

export type AttentionItemSeverity =
    | 'warning'
    | 'danger'
    | 'info';

export interface AttentionItem {
    type: AttentionItemType;

    title: string;

    description: string;

    count: number;

    severity: AttentionItemSeverity;

    icon: string;

    route: string;
}

export interface AttentionSummaryData {
    title: string;

    subtitle: string;

    totalCount: number;

    items: AttentionItem[];

    action: {
        title: string;
        route: string;
    };
}