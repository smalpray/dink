import { Plus, Star } from 'lucide-react';
import Button from '@/app/components/Button';
import Badge from '@/app/components/Badge';

const PRODUCTS = [
    { id: 1, brand: 'Franklin', name: 'X-40 Outdoor Balls · 3-pack', category: 'Balls', price: 690, rating: 4.8, image: '/images/pickle-ball.webp', fit: 'contain' },
    { id: 2, brand: 'DinkZone', name: 'Court Starter Paddle', category: 'Paddles', price: 1990, rating: 4.3, image: '/images/sports-5.webp', fit: 'cover' },
    { id: 3, brand: 'Onix', name: 'Dura Fast 40 · 6-pack', category: 'Balls', price: 1290, rating: 4.6, image: '/images/pickle-ball.webp', fit: 'contain' },
    { id: 4, brand: 'Onix', name: 'Graphite Z5', category: 'Paddles', price: 5290, rating: 4.5, image: '/images/sports-1.webp', fit: 'cover' },
    { id: 5, brand: 'DinkZone', name: 'Carbon Pro Paddle', category: 'Paddles', price: 3490, rating: 4.9, image: '/images/sports-2.webp', fit: 'cover', sale: true },
    { id: 6, brand: 'DinkZone', name: 'Court Tee + Cap Set', category: 'Apparel', price: 990, rating: 4.7, image: '/images/sports-3.webp', fit: 'cover' },
    { id: 7, brand: 'Selkirk', name: 'Amped Control Paddle', category: 'Paddles', price: 4290, rating: 4.8, image: '/images/sports-5.webp', fit: 'cover', sale: true },
    { id: 8, brand: 'K-Swiss', name: 'Express Light Court Shoe', category: 'Shoes', price: 3890, rating: 4.6, image: '/images/sports-4.webp', fit: 'cover' },
    { id: 9, brand: 'DinkZone', name: 'Everyday Paddle Bag', category: 'Bags', price: 1490, rating: 4.4, image: '/images/sports-1.webp', fit: 'cover' },
    { id: 10, brand: 'Franklin', name: 'Sling Pickleball Bag', category: 'Bags', price: 2190, rating: 4.5, image: '/images/sports-2.webp', fit: 'cover' },
    { id: 11, brand: 'DinkZone', name: 'Performance Wristbands', category: 'Accessories', price: 290, rating: 4.2, image: '/images/sports-3.webp', fit: 'cover' },
    { id: 12, brand: 'Onix', name: 'Indoor Ball · 3-pack', category: 'Balls', price: 590, rating: 4.5, image: '/images/pickle-ball.webp', fit: 'contain' },
    { id: 13, brand: 'Selkirk', name: 'SLK Evo Control Paddle', category: 'Paddles', price: 2490, rating: 4.6, image: '/images/sports-1.webp', fit: 'cover' },
    { id: 14, brand: 'Franklin', name: 'X-40 Indoor Balls · 3-pack', category: 'Balls', price: 690, rating: 4.7, image: '/images/pickle-ball.webp', fit: 'contain' },
    { id: 15, brand: 'DinkZone', name: 'Club Court Polo', category: 'Apparel', price: 1190, rating: 4.5, image: '/images/sports-3.webp', fit: 'cover' },
    { id: 16, brand: 'K-Swiss', name: 'Hypercourt Express 2', category: 'Shoes', price: 4590, rating: 4.8, image: '/images/sports-4.webp', fit: 'cover', sale: true },
    { id: 17, brand: 'DinkZone', name: 'Paddle Edge Guard', category: 'Accessories', price: 350, rating: 4.1, image: '/images/sports-5.webp', fit: 'cover' },
    { id: 18, brand: 'Onix', name: 'Z5 Graphite Paddle', category: 'Paddles', price: 3290, rating: 4.6, image: '/images/sports-2.webp', fit: 'cover' },
    { id: 19, brand: 'DinkZone', name: 'Court Crew Socks · 2-pack', category: 'Apparel', price: 390, rating: 4.3, image: '/images/sports-3.webp', fit: 'cover' },
    { id: 20, brand: 'Franklin', name: 'Tournament Backpack', category: 'Bags', price: 1890, rating: 4.4, image: '/images/sports-1.webp', fit: 'cover' },
    { id: 21, brand: 'Selkirk', name: 'Pro Overgrip · 3-pack', category: 'Accessories', price: 450, rating: 4.7, image: '/images/sports-5.webp', fit: 'cover' },
    { id: 22, brand: 'DinkZone', name: 'Lightweight Court Shorts', category: 'Apparel', price: 890, rating: 4.4, image: '/images/sports-4.webp', fit: 'cover' },
    { id: 23, brand: 'Onix', name: 'Paddle Cover', category: 'Accessories', price: 790, rating: 4.2, image: '/images/sports-2.webp', fit: 'cover' },
];

export default function CardListSection({
    darkMode,
    category,
    search,
    sort,
    saleOnly,
    onAddToCart,
}) {
    const filteredProducts = PRODUCTS
        .filter((product) => category === 'All' || product.category === category)
        .filter((product) => !saleOnly || product.sale)
        .filter((product) =>
            `${product.brand} ${product.name} ${product.category}`
                .toLowerCase()
                .includes(search.trim().toLowerCase()),
        )
        .sort((first, second) => {
            if (sort === 'price-low') return first.price - second.price;
            if (sort === 'price-high') return second.price - first.price;
            if (sort === 'rating') return second.rating - first.rating;
            return first.id - second.id;
        });

    return (
        <section aria-label="Shop products" className="mt-4">
            <p className={`mb-2.5 text-xs ${darkMode ? 'text-[#91aa9a]' : 'text-slate-600'}`}>
                {filteredProducts.length} products
            </p>

            {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-2 gap-x-3 gap-y-5 sm:grid-cols-3 xl:grid-cols-4">
                    {filteredProducts.map((product) => (
                        <article key={product.id} className="group min-w-0">
                            <div className={`relative aspect-square overflow-hidden rounded-2xl ${darkMode ? 'bg-[#eeeadd]' : 'bg-[#f0ede5]'}`}>
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className={`h-full w-full transition-transform duration-300 group-hover:scale-[1.03] ${product.fit === 'contain' ? 'object-contain p-6' : 'object-cover'}`}
                                />
                                {product.sale && (
                                    <Badge variant="brand" className="absolute right-2 top-2">
                                        Sale
                                    </Badge>
                                )}
                            </div>

                            <div className="mt-2">
                                <p className={`text-[10px] ${darkMode ? 'text-[#91aa9a]' : 'text-slate-500'}`}>
                                    {product.brand}
                                </p>
                                <h2 className={`mt-0.5 min-h-8 text-xs font-semibold leading-4 ${darkMode ? 'text-[#e7efe9]' : 'text-slate-900'}`}>
                                    {product.name}
                                </h2>
                                <div className="mt-1 flex items-center justify-between gap-1">
                                    <p className={`text-sm font-extrabold ${darkMode ? 'text-[#f0f5f1]' : 'text-slate-900'}`}>
                                        ₱{product.price.toLocaleString()}
                                    </p>
                                    <span className={`inline-flex items-center gap-1 text-[10px] ${darkMode ? 'text-[#c2d2c8]' : 'text-slate-600'}`}>
                                        <Star className="h-3 w-3 fill-[#f4b740] text-[#f4b740]" aria-hidden="true" />
                                        {product.rating}
                                    </span>
                                </div>
                                <Button
                                    type="button"
                                    variant="dinkzone"
                                    outlined
                                    size="sm"
                                    onClick={() => onAddToCart(product)}
                                    className={`mt-2 w-full gap-1 rounded-lg px-2 py-1.5 text-xs font-semibold ${darkMode ? '!border-[#254533] !text-[#c2d2c8] hover:!border-[#d6f52f] hover:!text-[#d6f52f]' : '!border-[#dfe5da] !text-slate-700 hover:!border-[#9da991] hover:!bg-slate-50'}`}
                                >
                                    <Plus className="h-3 w-3" aria-hidden="true" />
                                    Add to cart
                                </Button>
                            </div>
                        </article>
                    ))}
                </div>
            ) : (
                <div className={`rounded-2xl border px-5 py-10 text-center ${darkMode ? 'border-[#19382b] bg-[#0b2117] text-[#91aa9a]' : 'border-[#dfe5da] bg-white text-slate-600'}`}>
                    <p className="text-sm font-semibold">No products found</p>
                    <p className="mt-1 text-xs">Try another search or category.</p>
                </div>
            )}
        </section>
    );
}
