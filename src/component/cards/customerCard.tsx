import React from "react";
import { Customer } from "../../types/customer";


interface Props {
  customer: Customer;
  css: string;
  onClick?: (customer: Customer) => void; 
}

const CustomerCard: React.FC<Props> = ({ customer, css, onClick }) => {
  const getFullName = (firstname: string, lastname: string) => {
    return [firstname, lastname].filter(Boolean).join(" ").trim();
  };
  const FullName = getFullName(
    customer.maininvoicingcontact_firstname ?? "",
    customer.maininvoicingcontact_name ?? ""
  );

  const handleCardClick = () => {
    if (onClick) {
      onClick(customer);
    }
  };

  return (
    <div
      className={`${css} p-4 rounded-2xl bg-white flex flex-col justify-evenly shadow-effect`}
      onClick={handleCardClick}
    >
      <div className="text-base flex flex-row justify-between sm: ">
        <h2>{customer.name}</h2>
        <p>{FullName}</p>
      </div>
      <div className="text-xs flex flex-row justify-between ">
        {customer.maininvoicingcontact_phone && (
          <div>{customer.maininvoicingcontact_phone}</div>
        )}
        {customer.maindeliverycontact_cellphone && (
          <div>{customer.maindeliverycontact_cellphone}</div>
        )}
      </div>
    </div>
  );
};

export default CustomerCard;
