import React from 'react';
import { Box, Typography, Container, Grid, Card, CardContent, IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import SettingsIcon from '@mui/icons-material/Settings';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const Home = () => {
  const carouselRef = React.useRef(null);

  const scrollCarousel = (direction) => () => {
    const scrollAmount = 300;
    if (carouselRef.current) {
      if (direction === 'left') {
        carouselRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  return (
    <Box sx={{
      minHeight: 'calc(100vh - 64px)',
      background: 'linear-gradient(135deg, #0f2027 0%, #2c5364 100%)',
      color: 'white',
      p: 3,
    }}>
      <Container maxWidth="lg">
        <Box sx={{
          position: 'relative',
          width: '100%',
          mb: 4,
          borderRadius: 3,
          overflow: 'hidden',
        }}>
          <Box
            ref={carouselRef}
            sx={{
              display: 'flex',
              overflowX: 'scroll',
              scrollbarWidth: 'none',
              '&::-webkit-scrollbar': { display: 'none' },
              scrollSnapType: 'x mandatory',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {/* Temporary Images */}
            {[ 'https://picsum.photos/seed/picsum1/600/400', 'https://picsum.photos/seed/picsum2/600/400', 'https://picsum.photos/seed/picsum3/600/400' ].map((imgUrl, index) => (
              <Box
                key={index}
                sx={{
                  flexShrink: 0,
                  width: '90%',
                  height: '250px',
                  backgroundImage: `url(${imgUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  borderRadius: 2,
                  mr: 2,
                  scrollSnapAlign: 'start',
                }}
              />
            ))}
          </Box>

          <IconButton
            sx={{
              position: 'absolute',
              top: '50%',
              left: 8,
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              color: 'white',
              '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.7)' },
              zIndex: 1,
            }}
            onClick={scrollCarousel('left')}
          >
            <ChevronLeftIcon />
          </IconButton>
          <IconButton
            sx={{
              position: 'absolute',
              top: '50%',
              right: 8,
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              color: 'white',
              '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.7)' },
              zIndex: 1,
            }}
            onClick={scrollCarousel('right')}
          >
            <ChevronRightIcon />
          </IconButton>
        </Box>
        
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