import React from 'react';
import { Box, Typography, Container, Grid, Card, CardContent, IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import SettingsIcon from '@mui/icons-material/Settings';
import AssignmentIcon from '@mui/icons-material/Assignment';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation'; // Import navigation styles
// import 'swiper/css/pagination'; // Uncomment if you want pagination dots
// import 'swiper/css/effect-fade'; // Uncomment if you want fade effect

// import required modules
import { Navigation } from 'swiper/modules';

const Home = () => {
  // Remove ref and custom scrolling logic
  // const carouselRef = React.useRef(null);
  // const [currentIndex, setCurrentIndex] = React.useState(0);

  const images = [ 'https://picsum.photos/seed/picsum1/800/400', 'https://picsum.photos/seed/picsum2/800/400', 'https://picsum.photos/seed/picsum3/800/400' ]; // Define images array and potentially use wider images

  // Remove custom scrolling logic
  // const scrollCarousel = (direction) => () => {
  //   const container = carouselRef.current;
  //   if (container) {
  //     const imageWidth = container.clientWidth;
  //     let nextIndex = currentIndex;
  //
  //     if (direction === 'left') {
  //       nextIndex = (currentIndex - 1 + images.length) % images.length;
  //     } else { // direction === 'right'
  //       nextIndex = (currentIndex + 1) % images.length;
  //     }
  //
  //     const targetScrollLeft = nextIndex * imageWidth;
  //
  //     container.scrollTo({ left: targetScrollLeft, behavior: 'smooth' });
  //     setCurrentIndex(nextIndex);
  //   }
  // };

  return (
    <Box sx={{
      minHeight: 'calc(100vh - 64px)', // Adjust for bottom navbar height
      background: 'linear-gradient(135deg, #0f2027 0%, #2c5364 100%)',
      color: 'white',
      // Removed overall padding from this box
    }}>
      {/* Full-width Image Carousel Section using Swiper */}
      <Box sx={{
        position: 'relative',
        width: '100%',
        mb: 4,
        overflow: 'hidden', // Ensure content doesn't spill out
      }}>
        <Swiper
          modules={[Navigation]} // Enable Navigation module
          loop={true} // Enable infinite looping
          spaceBetween={0} // No space between slides for full width
          slidesPerView={1} // Display one slide at a time
          navigation={true} // Enable navigation arrows
          // Add other Swiper configurations here if needed, e.g., pagination
          // Add styles for navigation arrows
          sx={{
            '.swiper-button-next, .swiper-button-prev': {
              color: 'white', // Set arrow color to white
            },
          }}
        >
          {images.map((imgUrl, index) => (
            <SwiperSlide key={index}>
              <Box
                sx={{
                  width: '100vw', // Make image take full viewport width
                  height: '250px', // Adjust image height as needed
                  backgroundImage: `url(${imgUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  // Removed borderRadius for full edge-to-edge display
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>

      {/* Rest of the content within a padded container */}
      <Container maxWidth="lg" sx={{
        p: 3, // Apply padding to the main content area
      }}>
        <Typography variant="h4" gutterBottom sx={{ color: '#00ff88', fontWeight: 700, mb: 4, textAlign: 'center' }}>
          Welcome Home!
        </Typography>
        
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card sx={{
              background: 'rgba(40, 40, 40, 0.9)',
              borderRadius: 3,
              boxShadow: '0 2px 10px 0 rgba(0, 0, 0, 0.3)',
              border: '1px solid rgba(255,255,255,0.08)',
              height: '100%',
            }}>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <HomeIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6" gutterBottom sx={{ color: '#00ff88' }}>
                  Overview
                </Typography>
                <Typography variant="body1" sx={{ color: '#bdbdbd' }}>
                  Get a quick summary of your account and recent activities here.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card sx={{
              background: 'rgba(40, 40, 40, 0.9)',
              borderRadius: 3,
              boxShadow: '0 2px 10px 0 rgba(0, 0, 0, 0.3)',
              border: '1px solid rgba(255,255,255,0.08)',
              height: '100%',
            }}>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <InfoIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6" gutterBottom sx={{ color: '#00ff88' }}>
                  About F-EARN
                </Typography>
                <Typography variant="body1" sx={{ color: '#bdbdbd' }}>
                  Learn more about our platform and how it works.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
             <Card sx={{
              background: 'rgba(40, 40, 40, 0.9)',
              borderRadius: 3,
              boxShadow: '0 2px 10px 0 rgba(0, 0, 0, 0.3)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}>
              <CardContent>
                 <Typography variant="h6" gutterBottom sx={{ color: '#00ff88' }}>
                  Quick Links
                </Typography>
                 <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', gap: 3 }}>
                     <Box sx={{ textAlign: 'center' }}>
                         <SettingsIcon sx={{ fontSize: 40, color: '#bdbdbd' }} />
                         <Typography variant="body2" sx={{ color: '#bdbdbd', mt: 1 }}>Settings</Typography>
                     </Box>
                      <Box sx={{ textAlign: 'center' }}>
                         <AssignmentIcon sx={{ fontSize: 40, color: '#bdbdbd' }} />
                         <Typography variant="body2" sx={{ color: '#bdbdbd', mt: 1 }}>Your Tasks</Typography>
                     </Box>
                 </Box>
              </CardContent>
            </Card>
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
};

export default Home; 