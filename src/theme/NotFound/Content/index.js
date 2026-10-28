import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

export default function NotFoundContent({className}) {
  return (
    <main className={clsx('container', styles.notFound, className)}>
      <p className={styles.code} aria-hidden="true">404</p>
      <Heading as="h1" className={styles.title}>
        <Translate id="theme.NotFound.title" description="The title of the 404 page">
          Page Not Found
        </Translate>
      </Heading>
      <p className={styles.text}>
        <Translate id="theme.NotFound.p1" description="The first paragraph of the 404 page">
          We could not find what you were looking for.
        </Translate>
      </p>
      <p className={styles.text}>
        <Translate id="theme.NotFound.p2" description="The 2nd paragraph of the 404 page">
          Please contact the owner of the site that linked you to the original URL and let them know their link is broken.
        </Translate>
      </p>
      <Link className={styles.link} to="/">
        Back to the homepage
      </Link>
    </main>
  );
}
