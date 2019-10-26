declare module company {
  type CompanyStatus =
    | active
    | dissolved
    | liquidation
    | receivership
    | administration
    | 'voluntary-arrangement'
    | 'converted-closed '
    | 'insolvency-proceedings';

  export interface Company {
    company_status: CompanyStatus;
    date_of_creation: string;
    title: string;
    address_snippet: string;
    company_number: string;
  }
}
