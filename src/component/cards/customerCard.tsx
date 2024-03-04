import React from "react";
import { Customer } from "../../@types/customer";

interface Props {
  customer: Customer;
  css: string;
}

const CustomerCard: React.FC<Props> = ({ customer, css }) => {
  const getFullName = (firstname: string, lastname: string) => {
    return [firstname, lastname].filter(Boolean).join(" ").trim();
  };
  const FullName = getFullName(
    customer.maininvoicingcontact_firstname ?? "",
    customer.maininvoicingcontact_name ?? ""
  );

  return (
    <div className={`${css} p-4 rounded-2xl bg-white flex flex-col gap-2`}>
      <div>
        <h2>{customer.name}</h2>
        <p>{FullName}</p>
      </div>
      <div className="text-xs flex flex-row justify-between">
        {customer.maindeliverycontact_cellphone && (
          <div>{customer.maindeliverycontact_cellphone}</div>
        )}
        {customer.maininvoicingcontact_phone && (
          <div>{customer.maininvoicingcontact_phone}</div>
        )}
      </div>
    </div>
  );
};

export default CustomerCard;
