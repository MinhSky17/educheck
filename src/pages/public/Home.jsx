import Header from '../../components/public/Header';
import Hero from '../../components/public/Hero';
import Feature from '../../components/public/Features';


function Home(){
    return(
        <div>
            <div className="font-sans text-gray-800 antialiased bg-white">
                <Header/>
                <Hero/>
                <Feature/>

            </div>
        </div>
        
    );
}

export default Home;