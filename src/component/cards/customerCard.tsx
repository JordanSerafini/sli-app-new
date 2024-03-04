import React from 'react';
import { Customer } from '../../@types/customer';

interface Props {
  customer: Customer;
  css: string;
}

const CustomerCard: React.FC<Props> = ({ customer, css }) => {
    console.log(customer);
  return (
    <div>
      <h2 className={`${css}`} >{customer.name}</h2>
    </div>
  );
}

export default CustomerCard;
