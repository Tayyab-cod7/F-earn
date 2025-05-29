import React from 'react';
import { Box, Typography, Container, Grid, Card, CardContent } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SavingsIcon from '@mui/icons-material/Savings';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Navigation } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate(); // Initialize useNavigate

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

  const handleNavigation = (path) => () => { // Handle navigation
    navigate(path);
  };

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

      {/* Recharge and Withdraw Options */}
      <Container maxWidth="lg" sx={{ p: 3, pt: 0 }}> {/* Added padding to the container, removed top padding to bring content closer to carousel */}
        <Grid container spacing={3} sx={{ mb: 4 }}> {/* Added margin bottom */}
          <Grid item xs={12} sm={6}> {/* Full width on extra small, half width on small and up */}
            <Card sx={{
              background: 'rgba(40, 40, 40, 0.9)',
              borderRadius: 3,
              boxShadow: '0 2px 10px 0 rgba(0, 0, 0, 0.3)',
              border: '1px solid rgba(255,255,255,0.08)',
              textAlign: 'center',
              cursor: 'pointer',
              '&:hover': { background: 'rgba(50, 50, 50, 0.95)' },
            }} onClick={handleNavigation('/recharge')}> {/* Added onClick for navigation */}
              <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}> {/* Flex container for horizontal layout */}
                <Typography variant="h6" sx={{ color: '#00ff88' }}>
                  Recharge
                </Typography>
                <AccountBalanceWalletIcon sx={{ fontSize: 50, color: '#00ff88' }} /> {/* Replaced image with Material UI icon */}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}> {/* Full width on extra small, half width on small and up */}
             <Card sx={{
              background: 'rgba(40, 40, 40, 0.9)',
              borderRadius: 3,
              boxShadow: '0 2px 10px 0 rgba(0, 0, 0, 0.3)',
              border: '1px solid rgba(255,255,255,0.08)',
              textAlign: 'center',
              cursor: 'pointer',
              '&:hover': { background: 'rgba(50, 50, 50, 0.95)' },
            }} onClick={handleNavigation('/withdraw')}> {/* Added onClick for navigation */}
              <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}> {/* Flex container for horizontal layout */}
                <Typography variant="h6" sx={{ color: '#ff4081' }}>
                  Withdraw
                </Typography>
                <SavingsIcon sx={{ fontSize: 50, color: '#ff4081' }} /> {/* Replaced image with Material UI icon */}
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Rest of the content within a padded container */}
        {/* Removed the Overview and About F-EARN sections */}
      </Container>
    </Box>
  );
};

export default Home; 