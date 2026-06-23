import Header from '../../components/public/Header';
import Hero from '../../components/public/Hero';
import Feature from '../../components/public/Features';
import Workflow from '../../components/public/Workflow';
import Teacher from '../../components/public/TeacherSection';
import StudentSection from '../../components/public/StudentSection';
import Statistics from '../../components/public/Statistics';
import FAQ from '../../components/public/FAQ';
import CTA from '../../components/public/CTA';
import Footer from '../../components/public/Footer';


function Home(){
    return(
        <div>
            <div className="font-sans text-gray-800 antialiased bg-white">
                <Header/>
                <Hero/>
                <Feature/>
                <Workflow/>
                <Teacher/>
                <StudentSection/>
                <Statistics/>
                <FAQ/>
                <CTA/>
                <Footer/>
            </div>
        </div>
        
    );
}

export default Home;