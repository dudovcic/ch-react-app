declare module company {
  export interface Director {
    nationality?: string;
    name: string;
    name_elements: {
      title: string;
      middle_name: string;
      surname: string;
      forename: string;
    };
    date_of_birth: {
      year: number;
      month: number;
    };
    address: {
      address_line_1: string;
      postal_code: string;
      country: string;
      premises: string;
      locality: string;
    };
    country_of_residence: string;
  }
}
