import React, { useEffect, useState } from "react";
import { Container, Grid, Typography, Card, CardContent, CardMedia, Box, Button, useTheme, TextField } from "@mui/material";
import Slider from "react-slick";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from './dev2.jpg';
import img2 from './slider2.jpg';
import img3 from './slider3.jpg';
import aboutImg from './about.jpg';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Webheader from "./webheader";

const HomePage = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const [developers, setDevelopers] = useState([]);
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    axios.get(`http://localhost:8000/fetchalldev`)
      .then(response => setDevelopers(response.data))
      .catch(error => console.error('Error fetching developers:', error));
  }, []);

  const handleViewMore = (id) => navigate("/clientlogin");

  return (
    <>
      <Webheader />
      <Box>
        {/* Slider Section */}
        <Box sx={{ marginBottom: 4 }}>
          <Slider {...settings}>
            {[img1, img2, img3].map((img, index) => (
              <div key={index}>
                <img src={img} alt={`Slide ${index + 1}`} style={{ width: "100%", height: "500px" }} />
              </div>
            ))}
          </Slider>
        </Box>

        {/* About Section */}
        <Box sx={{ backgroundColor: theme.palette.background.paper, padding: { xs: 4, md: 6 }, marginTop: 6 }}>
          <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: "bold", color: theme.palette.primary.main }}>
            About Us
          </Typography>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="body1" paragraph sx={{ lineHeight: 1.6, fontSize: { xs: "1rem", md: "1.25rem" }, color: theme.palette.text.primary }}>
                Our company is dedicated to delivering the highest quality services, driven by a passion for excellence and innovation.
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "center", marginTop: 3 }}>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Button variant="contained" color="primary" sx={{ padding: "10px 25px", fontSize: "1rem", boxShadow: 3 }}>
                    Learn More
                  </Button>
                </motion.div>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: "flex", justifyContent: "center" }}>
              <motion.img src={aboutImg} alt="About Us" style={{ width: "100%", maxWidth: 400, borderRadius: "12px", boxShadow: theme.shadows[3] }} whileHover={{ scale: 1.1 }} />
            </Grid>
          </Grid>
        </Box>

        {/* Developer Cards Section */}
        <Container>
          <Typography variant="h4" gutterBottom sx={{ color: theme.palette.primary.main, textAlign: "center", fontWeight: "bold" }}>
            Meet Our Freelancers
          </Typography>
          <Grid container spacing={3}>
            {developers.map((developer) => (
              <Grid item xs={10} sm={8} md={3} key={developer.id}>
                <Card sx={{ boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', borderRadius: 2, height: '400px' }}>
                  <CardMedia component="img" height="200" image={`http://localhost:8000/${developer.imageUrl}`} alt={developer.fullname} sx={{ borderRadius: "50%", objectFit: "cover", width: "200px", height: "200px", margin: "10px auto" }} />
                  <CardContent>
                    <Typography variant="h6" gutterBottom>{developer.fullname}</Typography>
                    <Typography variant="body2" color="textSecondary">Expertise: {developer.expertise}</Typography>
                    <Box sx={{ marginTop: 4, textAlign: "center" }}>
                      <Button variant="contained" color="primary" onClick={() => handleViewMore(developer.id)} sx={{ padding: "8px 20px", fontSize: "0.9rem" }}>
                        View More
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* Footer Section */}
        <Box sx={{ marginTop: 5, backgroundColor: "#3f51b5", padding: "40px 0", color: "white" }}>
          <Container>
            <Grid container spacing={4}>
              {/* Services Section */}
              <Grid item xs={12} md={4}>
                <Typography variant="h6">Our Services</Typography>
                <Typography variant="body2">- Editors</Typography>
                <Typography variant="body2">- Wedding Photograhers</Typography>
                <Typography variant="body2">- UI/UX Design</Typography>
                <Typography variant="body2">- Digital Marketing</Typography>
              </Grid>
              {/* Contact Section */}
              <Grid item xs={12} md={4}>
                <Typography variant="h6">Contact Us</Typography>
                <Typography variant="body2">Email: support@developershowcase.com</Typography>
                <Typography variant="body2">Phone: +123 456 7890</Typography>
                <Typography variant="body2">Location: 123 Tech Street, City</Typography>
              </Grid>
              {/* Quick Form */}
              <Grid item xs={12} md={4}>
                <Typography variant="h6">Get in Touch</Typography>
                <TextField fullWidth variant="filled" label="Your Email" sx={{ backgroundColor: "white", borderRadius: 1, marginBottom: 1 }} />
                <TextField fullWidth variant="filled" label="Your Message" multiline rows={3} sx={{ backgroundColor: "white", borderRadius: 1, marginBottom: 2 }} />
                <Button variant="contained" color="secondary">Send Message</Button>
              </Grid>
            </Grid>
            <Typography variant="body2" align="center" sx={{ marginTop: 3 }}>© 2025 Developer Showcase. All Rights Reserved.</Typography>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default HomePage;