import Hero from './Hero'
import Categories from './Categories'
import Gallery from './Gallery'
import NewProducts from './NewProducts'
import ProductItem from './ProductItem'
import Products from './Products'
import Reviews from './Reviews'

function Home() {
    return (
        <>
            <Hero />
            <Categories />
            <Products />
            <Gallery />
            <NewProducts />
            <ProductItem />
            <Reviews />
        </>
    )
}

export default Home