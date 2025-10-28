// components/Sidebar.tsx
'use client';

import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Sidebar.module.css';

const Sidebar = () => {
    const pathname = usePathname();

    return (
        <nav className={styles.nav}>
            <h1 className={styles.heading}>Navigation</h1>
            <div>
                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>Material UI</h2>
                    <div className={styles.links}>
                        <NextLink
                            href="/buttons"
                            className={`${styles.link} ${pathname === '/buttons' ? styles.active : ''}`}
                        >
                            Buttons/Table
                        </NextLink>
                        <NextLink
                            href="/dashboard"
                            className={`${styles.link} ${pathname === '/dashboard' ? styles.active : ''}`}
                        >
                            Dashboard
                        </NextLink>
                        <NextLink
                            href="/form"
                            className={`${styles.link} ${pathname === '/form' ? styles.active : ''}`}
                        >
                            Form
                        </NextLink>
                    </div>
                </div>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>Chakra UI</h2>
                    <div className={styles.links}>
                        <NextLink
                            href="/modal"
                            className={`${styles.link} ${pathname === '/modal' ? styles.active : ''}`}
                        >
                            Modal
                        </NextLink>
                    </div>
                </div>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>Radix UI</h2>
                    <div className={styles.links}>
                        <NextLink
                            href="/dialog"
                            className={`${styles.link} ${pathname === '/dialog' ? styles.active : ''}`}
                        >
                            Dialog
                        </NextLink>
                        <NextLink
                            href="/tabs"
                            className={`${styles.link} ${pathname === '/tabs' ? styles.active : ''}`}
                        >
                            Tabs
                        </NextLink>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Sidebar;