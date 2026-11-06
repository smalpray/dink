import { Link } from '@inertiajs/react';
import { LogOut, Menu, Moon, PanelLeftClose, Sun, X } from 'lucide-react';
import { MAIN_NAV_ITEMS, WORKSPACE_NAV_ITEMS } from './navConfig';

const lightTheme = {
    shell: 'border-r border-[#e7e1dc] bg-[#f5f3f1] text-slate-700',
    headerBorder: 'border-[#e7e1dc]',
    footerBorder: 'border-[#e7e1dc]',
    toggleButton: 'text-slate-500 hover:bg-[#efe8e1] hover:text-[#112f2a]',
    sectionLabel: 'text-[#7b827f] uppercase tracking-[0.2em]',
    itemActive: 'bg-[#1d4038] text-white shadow-[0_12px_22px_rgba(17,43,37,0.18)]',
    itemIdle: 'text-slate-600 hover:bg-[#f0e9e3] hover:text-slate-900',
    iconActive: 'text-white',
    iconIdle: 'text-slate-500',
    footerAction: 'text-slate-500 hover:bg-[#f0e9e3] hover:text-[#b0483d]',
    focusRing: 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3c8a7d] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f5f3f1]',
};

const darkTheme = {
    shell: 'border-r border-[#19382b] bg-[#071b14] text-[#c2d2c8]',
    headerBorder: 'border-[#19382b]',
    footerBorder: 'border-[#19382b]',
    toggleButton: 'text-[#9db3a5] hover:bg-[#102a1e] hover:text-white',
    sectionLabel: 'text-[#739482] uppercase tracking-[0.2em]',
    itemActive: 'bg-[#d6f52f] text-[#0b2117] shadow-[0_8px_20px_rgba(214,245,47,0.12)]',
    itemIdle: 'text-[#9db3a5] hover:bg-[#102a1e] hover:text-white',
    iconActive: 'text-[#0b2117]',
    iconIdle: 'text-[#819b8a]',
    footerAction: 'text-[#9db3a5] hover:bg-[#102a1e] hover:text-[#d6f52f]',
    focusRing: 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d6f52f] focus-visible:ring-offset-2 focus-visible:ring-offset-[#071b14]',
};

function SidebarBrand({ collapsed, onToggleCollapse, onCloseMobile, darkMode }) {
    const theme = darkMode ? darkTheme : lightTheme;

    if (collapsed) {
        return (
            <button
                type="button"
                onClick={onToggleCollapse}
                aria-label="Expand sidebar"
                className={`flex h-9 w-9 items-center justify-center rounded-lg ${theme.toggleButton} ${theme.focusRing}`}
            >
                <span className="inline-block h-4 w-4 rounded-full bg-[#b7f66c] shadow-[0_0_12px_rgba(183,246,108,0.8)]" />
            </button>
        );
    }

    return (
        <>
            <Link href="/courts" className={`flex min-w-0 items-center gap-2.5 rounded-lg ${theme.focusRing}`}>
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#d9f781] shadow-[0_0_18px_rgba(161,199,86,0.45)]">
                    <span className="h-3.5 w-3.5 rounded-full bg-[#1b3b37]" />
                </span>
                <span className="min-w-0">
                    <span className={`block truncate text-[1.05rem] font-bold tracking-[-0.04em] ${darkMode ? 'text-[#eff5f0]' : 'text-slate-900'}`}>
                        DinkZone
                    </span>
                </span>
            </Link>

            <button
                type="button"
                onClick={onToggleCollapse}
                aria-label="Collapse sidebar"
                className={`hidden rounded-lg p-1.5 lg:inline-flex ${theme.toggleButton} ${theme.focusRing}`}
            >
                <PanelLeftClose className="h-4 w-4" />
            </button>

            <button
                type="button"
                onClick={onCloseMobile}
                aria-label="Close sidebar"
                className={`rounded-lg p-1.5 lg:hidden ${theme.toggleButton} ${theme.focusRing}`}
            >
                <X className="h-4 w-4" />
            </button>
        </>
    );
}

function SidebarPanel({
    collapsed,
    onCloseMobile,
    onToggleCollapse,
    darkMode,
    onToggleTheme,
}) {
    const theme = darkMode ? darkTheme : lightTheme;
    const currentPath = typeof window === 'undefined' ? '/courts' : window.location.pathname;

    const isActive = (href) =>
        currentPath === href ||
        currentPath.startsWith(`${href}/`) ||
        (currentPath === '/' && href === '/courts');

    return (
        <div className={`flex h-full flex-col ${theme.shell}`}>
            <div className={`flex h-16 shrink-0 items-center justify-between border-b px-3 ${theme.headerBorder} ${collapsed ? 'justify-center' : ''}`}>
                <SidebarBrand
                    collapsed={collapsed}
                    onToggleCollapse={onToggleCollapse}
                    onCloseMobile={onCloseMobile}
                    darkMode={darkMode}
                />
            </div>

            <nav aria-label="Main navigation" className="flex-1 space-y-6 overflow-y-auto px-2.5 py-4">
                <div className="space-y-1">
                    {MAIN_NAV_ITEMS.map((item) => {
                        const Icon = item.icon;
                        const active = isActive(item.href);

                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={onCloseMobile}
                                aria-current={active ? 'page' : undefined}
                                title={collapsed ? item.name : undefined}
                                aria-label={collapsed ? item.name : undefined}
                                className={[
                                    'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                                    collapsed ? 'justify-center px-2' : 'px-3',
                                    active ? theme.itemActive : theme.itemIdle,
                                    theme.focusRing,
                                ].join(' ')}
                            >
                                <Icon aria-hidden="true" className={['h-4 w-4 shrink-0', active ? theme.iconActive : theme.iconIdle].join(' ')} />
                                {!collapsed && <span className="truncate">{item.name}</span>}
                            </Link>
                        );
                    })}
                </div>

                <div>
                    {!collapsed && (
                        <p className={`mb-2 px-3 text-[10px] font-semibold ${theme.sectionLabel}`}>
                            Workspaces
                        </p>
                    )}

                    <div className="space-y-1">
                        {WORKSPACE_NAV_ITEMS.map((item) => {
                            const Icon = item.icon;
                            const active = isActive(item.href);

                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={onCloseMobile}
                                    aria-current={active ? 'page' : undefined}
                                    title={collapsed ? item.name : undefined}
                                    aria-label={collapsed ? item.name : undefined}
                                    className={[
                                        'flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-colors',
                                        collapsed ? 'justify-center px-2' : 'px-3',
                                        active
                                            ? darkMode
                                                ? 'bg-[#d6f52f] text-[#0b2117]'
                                                : 'bg-[#eaf5ef] text-[#1c5d52]'
                                            : theme.itemIdle,
                                        theme.focusRing,
                                    ].join(' ')}
                                >
                                    <Icon aria-hidden="true" className={['h-4 w-4 shrink-0', active ? (darkMode ? 'text-[#0b2117]' : 'text-[#1c5d52]') : theme.iconIdle].join(' ')} />
                                    {!collapsed && <span className="truncate">{item.name}</span>}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </nav>

            <div className={`border-t p-2.5 ${theme.footerBorder}`}>
                <button
                    type="button"
                    onClick={onToggleTheme}
                    title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                    aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                    aria-pressed={darkMode}
                    className={['mb-1 flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-colors', collapsed ? 'justify-center px-2' : '', theme.footerAction, theme.focusRing].join(' ')}
                >
                    {darkMode ? <Sun className="h-4 w-4 shrink-0" /> : <Moon className="h-4 w-4 shrink-0" />}
                    {!collapsed && <span>{darkMode ? 'Light mode' : 'Dark mode'}</span>}
                </button>
                <Link
                    href="/logout"
                    method="post"
                    as="button"
                    type="button"
                    className={['flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-colors', collapsed ? 'justify-center px-2' : '', theme.footerAction, theme.focusRing].join(' ')}
                >
                    <LogOut className="h-4 w-4 shrink-0" />
                    {!collapsed && <span>Log out</span>}
                </Link>
            </div>
        </div>
    );
}

export default function Sidebar({
    collapsed = false,
    onToggleCollapse = () => {},
    darkMode = false,
    onToggleTheme = () => {},
}) {
    return (
        <>
            <div className={['hidden lg:block fixed inset-y-0 left-0 z-30 transition-[width] duration-300 ease-in-out', collapsed ? 'w-16' : 'w-48'].join(' ')}>
                <SidebarPanel
                    collapsed={collapsed}
                    onToggleCollapse={onToggleCollapse}
                    onCloseMobile={() => {}}
                    darkMode={darkMode}
                    onToggleTheme={onToggleTheme}
                />
            </div>

            <div className="fixed left-4 top-4 z-40 lg:hidden">
                <button
                    type="button"
                    onClick={onToggleCollapse}
                    aria-label="Toggle sidebar"
                    className={['flex h-10 w-10 items-center justify-center rounded-xl border shadow-sm', darkMode ? 'border-[#19382b] bg-[#071b14] text-[#d6f52f]' : 'border-[#e7e1dc] bg-[#f5f3f1] text-slate-700'].join(' ')}
                >
                    <Menu className="h-5 w-5" />
                </button>
            </div>
        </>
    );
}
