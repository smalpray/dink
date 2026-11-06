import { Head } from '@inertiajs/react';
import { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function MainLayout({
    children,
    fullContent,
    mapContent,
    title = 'Courts near you',
    subtitle = 'Near Fuente Osmeña Circle',
}) {
    const [collapsed, setCollapsed] = useState(false);
    const [darkMode, setDarkMode] = useState(
        () =>
            typeof window !== 'undefined' &&
            window.localStorage.getItem('dinkzone-theme') === 'dark',
    );
    const pageTitle = title ? `${title} - DinkZone` : 'DinkZone';

    const toggleTheme = () => {
        const next = !darkMode;
        window.localStorage.setItem('dinkzone-theme', next ? 'dark' : 'light');
        setDarkMode(next);
    };

    return (
        <>
            <Head title={pageTitle} />

            <div
                className={[
                    'min-h-screen text-slate-900 transition-colors lg:h-screen lg:overflow-hidden',
                    darkMode ? 'bg-[#071b14] text-[#e4eee7]' : 'bg-[#f4f1ec]',
                ].join(' ')}
            >
                <Sidebar
                    collapsed={collapsed}
                    onToggleCollapse={() => setCollapsed((current) => !current)}
                    darkMode={darkMode}
                    onToggleTheme={toggleTheme}
                />

                <div
                    className={[
                        'flex min-h-screen flex-col transition-[padding] duration-300 lg:h-full lg:min-h-0',
                        collapsed ? 'lg:pl-16' : 'lg:pl-48',
                    ].join(' ')}
                >
                    {fullContent ? (
                        typeof fullContent === 'function'
                            ? fullContent({ darkMode })
                            : fullContent
                    ) : mapContent ? (
                        <div className="flex min-h-0 flex-1 flex-col lg:grid lg:grid-cols-[minmax(340px,370px)_minmax(0,1fr)]">
                            <section className={[
                                'flex min-h-0 flex-col border-r transition-colors',
                                darkMode ? 'border-[#19382b] bg-[#071b14]' : 'border-[#e7e1dc] bg-[#f5f6f0]',
                            ].join(' ')}>
                                <Topbar
                                    title={title}
                                    subtitle={subtitle}
                                    darkMode={darkMode}
                                />
                                <main className="min-h-0 flex-1 overflow-y-auto px-4 pb-6 sm:px-5 lg:px-4">
                                    {typeof children === 'function'
                                        ? children({ darkMode })
                                        : children}
                                </main>
                            </section>
                            <div className="min-h-[55vh] min-w-0 flex-1 lg:h-full lg:min-h-0">
                                {typeof mapContent === 'function'
                                    ? mapContent({ darkMode })
                                    : mapContent}
                            </div>
                        </div>
                    ) : (
                        <>
                            <Topbar title={title} subtitle={subtitle} darkMode={darkMode} />
                            <main className={['flex-1 p-4 transition-colors sm:p-6 lg:p-8', darkMode ? 'bg-[#071b14] text-[#e4eee7]' : 'bg-[#f4f1ec]'].join(' ')}>
                                <div>{children}</div>
                            </main>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
