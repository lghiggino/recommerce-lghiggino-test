import React from "react";
import {
  InputField,
  Link,
  Icon,
  Price,
  type ShippingSimulationProps,
} from "@faststore/ui";

import styles from "./CustomShippingSimulation.module.scss";

const termMap = {
  d: "day",
  bd: "day",
  w: "week",
  m: "month",
};

const rtf = new Intl.RelativeTimeFormat("pt-br");

function transformEstimateSymbol(estimate: string) {
  const num = Number.parseInt(estimate);
  const unit = estimate.replace(num.toString(), "").trim();

  const term = termMap[unit as keyof typeof termMap];

  if (!term) {
    return `em ${num} ${unit}`;
  }

  const response = rtf.format(num, term as Intl.RelativeTimeFormatUnit);

  if (unit !== "bd") {
    return response;
  }

  if (num === 1) {
    return response.replace("dia", "dia útil");
  }

  return response.replace("dias", "dias úteis");
}

export default function CustomShippingSimulation({
  title = "Frete",
  errorMessage = "CEP inválido",
  testId = "custom-shipping-simulation",
  inputLabel = "Digite seu CEP",
  postalCode,
  onInput,
  onSubmit,
  onClear,
  displayClearButton = false,
  idkPostalCodeLinkProps,
  options,
  optionsLabel = "Opções de entrega",
  location,
  formatter,
}: ShippingSimulationProps) {
  const hasShippingOptions = Boolean(options?.length);

  const enhancedOptions = options as unknown as
    | {
        carrier: string;
        price: number;
        shippingEstimate: string;
      }[]
    | undefined;

  return (
    <section className={styles.CustomShippingSimulation}>
      <h2 data-casita-shipping-simulation-title>{title}</h2>
      <InputField
        actionable
        error={errorMessage}
        id={`${testId}-input-field`}
        label={inputLabel}
        value={postalCode}
        onInput={(event) => onInput?.(event)}
        onSubmit={() => onSubmit?.()}
        onClear={() => onClear?.()}
        displayClearButton={displayClearButton}
        buttonActionText="Calcular"
      />
      <Link
        href="/"
        data-fs-shipping-simulation-link
        size="small"
        {...idkPostalCodeLinkProps}
      >
        {idkPostalCodeLinkProps?.children ?? (
          <>
            {"I don't know my Postal Code"}
            <Icon name="ArrowSquareOut" width={20} height={20} />
          </>
        )}
      </Link>

      <div data-casita-shipping-simulation-results-wrapper>
        {hasShippingOptions && (
          <>
            <header>
              <h3 data-casita-shipping-simulation-results-title>
                {optionsLabel}
              </h3>
              <p data-casita-shipping-simulation-results-location>
                ({location})
              </p>
            </header>
            <ul data-casita-shipping-simulation-results-list>
              {enhancedOptions?.map((option) => (
                <li
                  key={option.carrier}
                  data-casita-shipping-simulation-results-option
                >
                  <div data-casita-shipping-simulation-results-option-value>
                    <span>{option.carrier}</span>
                    {option.price ? (
                      <Price value={option.price} formatter={formatter} />
                    ) : (
                      <span data-fs-price>"Grátis"</span>
                    )}
                  </div>
                  <div data-casita-shipping-simulation-results-option-estimate>
                    {transformEstimateSymbol(option.shippingEstimate)}
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
        {enhancedOptions?.length === 0 && (
          <p data-casita-shipping-simulation-no-results>
            Não encontramos opções de frete para o CEP informado
          </p>
        )}
      </div>
    </section>
  );
}
