import { useState } from 'react';
import MainLayout from '@/app/components/layout/MainLayout';
import CardListSection from './sections/CardListSection';
import HeaderSection from './sections/HeaderSection';
import RentSection from './sections/RentSection';
import SearchSection from './sections/SearchSection';
import TabsSection from './sections/TabsSection';

function ShopContent({ darkMode }) {
    const [view, setView] = useState('shop');
    const [category, setCategory] = useState('All');
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('popular');
    const [saleOnly, setSaleOnly] = useState(false);
    const [cart, setCart] = useState({});

    const cartCount = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);

    const addToCart = (product) => {
        setCart((current) => ({
            ...current,
            [product.id]: (current[product.id] || 0) + 1,
        }));
    };

    return (
        <div className={`min-h-full ${darkMode ? 'bg-[#071b14]' : 'bg-[#f7f8f4]'}`}>
            <main className="mx-auto w-full max-w-[1120px] px-4 py-6 sm:px-7 sm:py-8 lg:px-10 lg:py-7">
                {view === 'shop' ? (
                    <>
                        <HeaderSection
                            darkMode={darkMode}
                            cartCount={cartCount}
                            onRent={() => setView('rent')}
                        />
                        <SearchSection
                            darkMode={darkMode}
                            search={search}
                            onSearchChange={setSearch}
                            sort={sort}
                            onSortChange={setSort}
                            saleOnly={saleOnly}
                            onSaleOnlyChange={setSaleOnly}
                        />
                        <TabsSection
                            darkMode={darkMode}
                            activeCategory={category}
                            onCategoryChange={setCategory}
                        />
                        <CardListSection
                            darkMode={darkMode}
                            category={category}
                            search={search}
                            sort={sort}
                            saleOnly={saleOnly}
                            onAddToCart={addToCart}
                        />
                    </>
                ) : (
                    <RentSection darkMode={darkMode} onBack={() => setView('shop')} />
                )}
            </main>
        </div>
    );
}

export default function ShopPage() {
    return (
        <MainLayout
            title="Pro shop"
            subtitle="Shop paddles, balls, shoes and more"
            fullContent={({ darkMode }) => <ShopContent darkMode={darkMode} />}
        />
    );
}
