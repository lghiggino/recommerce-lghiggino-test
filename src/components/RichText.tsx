import React from "react";
import styles from "./RichText.module.scss";
import draftToHtml from "draftjs-to-html";

function parseLinkElement(entity: {
  type: string;
  data: {
    url: string;
  };
  text: string;
}) {
  if (entity.type !== "LINK") {
    return;
  }

  const {
    data: { url },
    text,
  } = entity;

  return `
      <a
        data-fs-link="true"
        data-fs-link-variant="inline"
        data-fs-link-inverse="true"
        data-fs-link-size="regular"
        data-testid="fs-link"
        href="${url}"
      >${text}</a>`;
}

function cmsToHTML(content?: string) {
  if (!content) {
    return "";
  }

  try {
    const parsedContent = JSON.parse(content);

    return draftToHtml(
      parsedContent ?? "",
      undefined,
      undefined,
      parseLinkElement
    );
  } catch (error) {
    throw new Error("Invalid 'content' provided", {
      cause: error,
    });
  }
}

export default function RichText({ content }: { content: string }) {
  const html = cmsToHTML(content);

  return (
    <section
      className={`section ${styles.RichText}`}
      dangerouslySetInnerHTML={{
        __html: html,
      }}
    />
  );
}
