export interface ExecuteQueryActionsScreen {
    account_id:       string;
    report_date:      Date;
    total_collected:  number;
    total_gross_fee:  number;
    total_net_amount: number;
    data:             Datum[];
}

export interface Datum {
    informed_date:      string;
    request_id:         number | string;
    external_reference: string;
    payer_name:         string;
    description:        string;
    payment_date:       string;
    channel:            string;
    amount_paid:        number | string;
    net_fee:            number | string;
    iva_fee:            number | string;
    net_amount:         number | string;
    available_at:       string;
}