import Header from '../../components/public/Header';
import Hero from '../../components/public/Hero';


function Home(){
    return(
        <div>
            <div className="font-sans text-gray-800 antialiased bg-white">
                <Header/>
                <Hero/>
            </div>
        </div>
        
    );
}

export default Home;