import Carousel from 'react-bootstrap/Carousel';
import './slider.css'
// import ExampleCarouselImage from 'components/ExampleCarouselImage';
import img1 from './p2.jpg'
import img2 from './im.jpg'
import img3 from './sig.jpg'
import img4 from './dev.jpg'
import img5 from './cl.jpg'
import { Container } from 'react-bootstrap';
import Banner from './banner';
function Slider() {
  return (
    
    <Carousel>
     
      <Carousel.Item interval={500}>
       
        {/* <img src={img1} style={{width:'100%',height:'500px'}}/> */}
        <Banner title="Freelancer" content="A freelancer is a self-employed individual who offers their services to clients on a project basis, rather than being committed to a single employer. They are often skilled professionals with expertise in various fields, including but not limited to graphic design, web development, writing, consulting, and digital marketing."/>
        <Carousel.Caption>
        <div class="login-container">
    {/* <h3 className='txt'>Login</h3> */}
   
</div>

          {/* <h3 className='txt'>Login</h3>
          <p className='im'>
            
            <a href="">
            <img src={img4} style={{width:'200px',height:'100px'}} />
            </a>
            <p className='t'>Developer</p>
            <a href="">
            <img src={img5} style={{width:'200px',height:'100px'}} />
            </a>
            <p className='t'>Client</p>
          </p> */}
          
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={500}>
        {/* <ExampleCarouselImage text="Second slide" /> */}
        {/* <img src={img2} style={{width:'100%',height:'500px'}}/> */}
        <Banner title="Flexibility" content="Freelancers enjoy the freedom to work on their own terms, choosing when, where, and how they work. This flexibility allows them to balance their professional commitments with personal priorities, leading to a more fulfilling lifestyle."/>
        <Carousel.Caption>
        <div class="login-container">
    {/* <h3 className='txt'>Login</h3> */}
  
</div>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        {/* <ExampleCarouselImage text="Third slide" /> */}
        {/* <img src={img3} style={{width:'100%',height:'500px'}}/> */}
        <Banner title="Diverse Skillsets" content=" Freelancers often possess a wide range of skills and expertise acquired through years of experience and continuous learning. This diversity enables them to offer specialized services tailored to the unique needs of their clients, making them valuable assets in today's competitive marketplace."/>
        
        <Carousel.Caption>
        <div class="login-container">
    {/* <h3 className='txt'>Login</h3> */}
   
</div>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Slider;