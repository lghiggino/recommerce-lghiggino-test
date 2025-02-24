import React, { useMemo, useState } from "react";

import {
  ProductPrice,
  Modal,
  ModalHeader,
  ModalBody,
  type ProductPriceProps,
} from "@faststore/ui";
import { usePDP } from "@faststore/core";

import styles from "./CustomProductPrice.module.scss";

function CreditCardIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      viewBox="0 0 256 256"
    >
      <path d="M224,48H32A16,16,0,0,0,16,64V192a16,16,0,0,0,16,16H224a16,16,0,0,0,16-16V64A16,16,0,0,0,224,48Zm0,16V88H32V64Zm0,128H32V104H224v88Zm-16-24a8,8,0,0,1-8,8H168a8,8,0,0,1,0-16h32A8,8,0,0,1,208,168Zm-64,0a8,8,0,0,1-8,8H120a8,8,0,0,1,0-16h16A8,8,0,0,1,144,168Z" />
    </svg>
  );
}

function BarCodeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="32"
      fill="currentColor"
      viewBox="0 0 256 256"
    >
      <path d="M232,48V88a8,8,0,0,1-16,0V56H184a8,8,0,0,1,0-16h40A8,8,0,0,1,232,48ZM72,200H40V168a8,8,0,0,0-16,0v40a8,8,0,0,0,8,8H72a8,8,0,0,0,0-16Zm152-40a8,8,0,0,0-8,8v32H184a8,8,0,0,0,0,16h40a8,8,0,0,0,8-8V168A8,8,0,0,0,224,160ZM32,96a8,8,0,0,0,8-8V56H72a8,8,0,0,0,0-16H32a8,8,0,0,0-8,8V88A8,8,0,0,0,32,96ZM80,80a8,8,0,0,0-8,8v80a8,8,0,0,0,16,0V88A8,8,0,0,0,80,80Zm104,88V88a8,8,0,0,0-16,0v80a8,8,0,0,0,16,0ZM144,80a8,8,0,0,0-8,8v80a8,8,0,0,0,16,0V88A8,8,0,0,0,144,80Zm-32,0a8,8,0,0,0-8,8v80a8,8,0,0,0,16,0V88A8,8,0,0,0,112,80Z" />
    </svg>
  );
}

function PixIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      viewBox="0 0 256 256"
    >
      <path d="M235.34,116.72,139.28,20.66a16,16,0,0,0-22.56,0L20.66,116.72a16,16,0,0,0,0,22.56l96.06,96.06a16,16,0,0,0,22.56,0l96.06-96.06A16,16,0,0,0,235.34,116.72ZM128,32,184,88H160a8,8,0,0,0-5.66,2.34L128,116.68,101.66,90.34A8,8,0,0,0,96,88H72ZM56,104H92.68l24,24-24,24H56L32,128Zm72,120L72,168H96a8,8,0,0,0,5.66-2.34L128,139.31l26.34,26.35A8,8,0,0,0,160,168h24Zm72-72H163.32l-24-24,24-24H200l24,24Z" />
    </svg>
  );
}

function usePaymentMethods() {
  const context = usePDP();

  return (context.data?.product?.paymentMethods || []) as {
    name: string;
    installments: {
      number: number;
      value: number;
      interest: number;
      total: number;
    }[];
  }[];
}

const iconsMap = {
  "Cartão de crédito": CreditCardIcon,
  Boleto: BarCodeIcon,
  Pix: PixIcon,
};

function PaymentMethodsTable() {
  const [selected, setSelected] = useState(0);
  const paymentMethods = usePaymentMethods();

  return (
    <div data-casita-payment-methods-table>
      <div data-casita-payment-methods-selector>
        <label htmlFor="payment-methods" data-fs-sr-only>
          Selecione a forma de pagamento
        </label>
        <select
          id="payment-methods"
          name="payment-methods"
          defaultValue={paymentMethods[selected].name}
          onChange={(event) => setSelected(Number(event.target.value))}
        >
          {paymentMethods.map((method, index) => (
            <option key={method.name} value={index}>
              {method.name}
            </option>
          ))}
        </select>
      </div>
      <div data-casita-payment-methods-tabs>
        <nav>
          {paymentMethods.map((method, index) => {
            const Icon = iconsMap[method.name as keyof typeof iconsMap];

            return (
              <button
                key={method.name}
                data-casita-payment-method-tab
                onClick={() => setSelected(index)}
                {...(index === selected
                  ? { "data-current": "true" }
                  : undefined)}
              >
                <Icon />
                <span>{method.name}</span>
              </button>
            );
          })}
        </nav>
      </div>
      <ul data-casita-payment-methods-list>
        {paymentMethods[selected].installments.map((installment) => (
          <li key={installment.number}>
            <span>
              {installment.number}x de{" "}
              {installment.value.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
              {installment.interest > 0 && " c/ juros"}
            </span>
            <span>
              {installment.total.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function CustomProductPrice(props: ProductPriceProps) {
  const paymentMethods = usePaymentMethods();
  const [showPaymentMethods, setShowPaymentMethods] = useState(false);

  const maxInstallment = useMemo(() => {
    const installments = paymentMethods.flatMap(
      (method) => method.installments
    );

    return installments.reduce(
      (max, installment) => {
        return installment.number >= max.number ? installment : max;
      },
      {
        number: 1,
        value: 0,
      }
    );
  }, [paymentMethods]);

  return (
    <div className={styles.CustomProductPrice}>
      <ProductPrice {...props} />
      <p data-casita-in-cash-label>à vista no boleto e pix</p>
      {maxInstallment?.number > 1 && (
        <p data-casita-in-installments-label>
          ou em até {maxInstallment.number}x de{" "}
          {maxInstallment.value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </p>
      )}
      <button
        data-casita-in-cash-button
        onClick={() => setShowPaymentMethods(true)}
      >
        <CreditCardIcon />
        <span>Ver mais formas de pagamento</span>
      </button>
      <Modal isOpen={showPaymentMethods}>
        <div className={styles.PaymentMethodsDialog}>
          <ModalHeader
            onClose={() => setShowPaymentMethods(false)}
            title="Formas de pagamento"
          />
          <ModalBody>
            <PaymentMethodsTable />
          </ModalBody>
        </div>
      </Modal>
    </div>
  );
}
