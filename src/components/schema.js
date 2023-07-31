import { gql, } from '@apollo/client';


export const GET_COUNTRIES = gql`
  query GetCountries {
    countries {
      name
      capital
      currency
      phone
  
      languages{
        name

      }
      continent{
        name
      }

    }
  }
`;
