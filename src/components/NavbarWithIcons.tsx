import React from "react";

import styles from "./NavbarWithIcons.module.scss";
import Link from "next/link";
import Image from "next/image";

export interface NavbarWithIconsProps {
  links: {
    icon: string;
    label: string;
    url: string;
  }[];
}

export default function NavbarWithIcons({ links }: NavbarWithIconsProps) {
  return (
    <nav className={`section  layout__section ${styles.NavbarWithIcons}`}>
      <nav data-casita-navbar-with-icons-wrapper>
        <ul data-casita-navbar-with-icons-list>
          {links.map((link) => (
            <li key={link.label} data-casita-navbar-with-icons-item>
              <Link href={link.url} data-casita-navbar-with-icons-link>
                <Image
                  src={link.icon}
                  alt={link.label}
                  width={56}
                  height={56}
                  data-casita-navbar-with-icons-icon
                />
              </Link>
              <p data-casita-navbar-with-icons-label>{link.label}</p>
            </li>
          ))}
        </ul>
      </nav>
    </nav>
  );
}
