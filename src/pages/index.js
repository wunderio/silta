import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import CodeBlock from '@theme/CodeBlock';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './styles.module.css';

const heroSnippet = `version: 2.1

orbs:
  silta: silta/silta@1

workflows:
  version: 2
  commit:
    jobs:
      - silta/drupal-validate:
          name: validate`;

const docLinks = [
  {
    title: 'Silta project build process',
    description: 'CircleCI configuration, Silta configuration and additional files.',
    to: '/docs/anatomy-of-silta',
  },
  {
    title: 'Creating a new project',
    description: 'Drupal and frontend project guidelines.',
    to: '/docs/creating-new-project',
  },
  {
    title: 'Key components',
    description: 'Github, CircleCI, Kubernetes and Helm.',
    to: '/docs/key-components',
  },
  {
    title: 'Troubleshooting and FAQ',
    description: 'Helm releases, SSH access and connection issues.',
    to: '/docs/troubleshooting',
  },
];

const faqs = [
  {
    title: 'What does Silta mean?',
    description: <>It means "bridge" in Finnish.</>,
  },
  {
    title: 'Can I use Silta outside of Mearra?',
    description: (
      <>
        Yes, our code is open. However, we haven't put special attention to this use case at this point.
      </>
    ),
  },
  {
    title: 'Does Silta support multisite?',
    description: (
      <>
        This might be technically possible, but multisite setups provide little benefits in a container-based environment. Instead, it is recommended to trigger the deployment of multiple sites into dedicated environments from the same repository.
      </>
    ),
  },
];

function ArrowIcon({className}) {
  return (
    <svg className={className} viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

function DocCard({title, description, to}) {
  return (
    <Link className={styles.docCard} to={to}>
      <h3 className={styles.docCardTitle}>{title}</h3>
      <p className={styles.docCardText}>{description}</p>
      <ArrowIcon className={styles.docCardArrow} />
    </Link>
  );
}

function Faq({index, title, description}) {
  return (
    <div className={styles.faqCard}>
      <span className={styles.faqNumber}>{String(index + 1).padStart(2, '0')}</span>
      <h3 className={styles.faqTitle}>{title}</h3>
      <p className={styles.faqText}>{description}</p>
    </div>
  );
}

function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <header className={styles.hero}>
        <div className={clsx('container', styles.heroInner)}>
          <div className={styles.heroText}>
            <h1 className={styles.heroTitle}>{siteConfig.title}</h1>
            <p className={styles.heroTagline}>{siteConfig.tagline}</p>
            <div className={styles.buttons}>
              <Link className={clsx(styles.button, styles.buttonPrimary)} to="/docs/anatomy-of-silta">
                Get Started <ArrowIcon />
              </Link>
              <Link className={clsx(styles.button, styles.buttonOutline)} href="https://github.com/wunderio/silta">
                GitHub
              </Link>
            </div>
          </div>
          <div className={styles.heroCode}>
            <CodeBlock language="yaml" title=".circleci/config.yml">
              {heroSnippet}
            </CodeBlock>
          </div>
        </div>
      </header>
      <main>
        <section className={clsx('container', styles.section)}>
          <h2 className={styles.sectionTitle}>Docs</h2>
          <div className={styles.docGrid}>
            {docLinks.map((props) => (
              <DocCard key={props.to} {...props} />
            ))}
          </div>
        </section>
        <section className={styles.faqSection}>
          <div className={clsx('container', styles.section)}>
            <h2 className={styles.sectionTitle}>FAQ</h2>
            <div className={styles.faqGrid}>
              {faqs.map((props, idx) => (
                <Faq key={props.title} index={idx} {...props} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export default Home;
