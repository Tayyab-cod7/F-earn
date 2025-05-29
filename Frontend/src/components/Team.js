import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Grid, TextField, IconButton, Tooltip, Avatar, Stack } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ShareIcon from '@mui/icons-material/Share';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const Team = () => {
  const [referralCode, setReferralCode] = useState('');
  const [referralLink, setReferralLink] = useState('');
  const [copyMsg, setCopyMsg] = useState('Copy');
  const [copyMsgLink, setCopyMsgLink] = useState('Copy');
  const [team] = useState([]);

  useEffect(() => {
    // Simulate fetching referral data from backend or localStorage
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user && user.referralCode) {
        setReferralCode(user.referralCode);
        setReferralLink(`${window.location.origin}/register?ref=${user.referralCode}`);
      } else {
        setReferralCode('N/A');
        setReferralLink('N/A');
      }
    } catch (e) {
      setReferralCode('Error');
      setReferralLink('Error');
    }
  }, []);

  const handleCopy = (text, isLink) => {
    navigator.clipboard.writeText(text);
    if (isLink) {
      setCopyMsgLink('Copied!');
      setTimeout(() => setCopyMsgLink('Copy'), 1200);
    } else {
      setCopyMsg('Copied!');
      setTimeout(() => setCopyMsg('Copy'), 1200);
    }
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      width: '100vw',
      background: 'linear-gradient(135deg, #0f2027 0%, #2c5364 100%)',
      p: { xs: 1, sm: 3 },
    }}>
      {/* Header */}
      <Box sx={{ maxWidth: 900, mx: 'auto', mt: 3, mb: 2 }}>
        <Typography variant="h3" sx={{ color: '#00ff88', fontWeight: 800, mb: 1, letterSpacing: 1 }}>
          Team & Referrals
        </Typography>
        <Typography variant="subtitle1" sx={{ color: '#bdbdbd', fontWeight: 400 }}>
          Grow your team, share your code, and earn more with F-Earn!
        </Typography>
      </Box>

      {/* Referral Code Card */}
      <Paper elevation={6} sx={{
        maxWidth: 900,
        mx: 'auto',
        mb: 3,
        p: { xs: 2, sm: 3 },
        display: 'flex',
        alignItems: 'center',
        borderRadius: 4,
        background: 'linear-gradient(135deg, rgba(0,255,136,0.15) 0%, rgba(33,150,243,0.15) 100%)',
        gap: 2,
        flexWrap: 'wrap',
        border: '1px solid rgba(0,255,136,0.2)',
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 120 }}>
          <EmojiEventsIcon sx={{ color: '#00ff88' }} />
          <Typography sx={{ fontWeight: 700, color: '#fff', fontSize: 18 }}>
            Your Code:
          </Typography>
        </Box>
        <TextField
          value={referralCode}
          InputProps={{ readOnly: true }}
          sx={{ 
            flex: 1, 
            background: 'rgba(255,255,255,0.04)', 
            borderRadius: 2, 
            input: { 
              color: '#00ff88', 
              fontWeight: 700, 
              fontSize: 20,
              textAlign: 'center',
              letterSpacing: '0.2em'
            } 
          }}
          variant="outlined"
          size="medium"
        />
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip title={copyMsg} arrow>
            <IconButton 
              onClick={() => handleCopy(referralCode, false)} 
              sx={{ 
                color: '#00ff88', 
                background: 'rgba(0,255,136,0.1)',
                '&:hover': {
                  background: 'rgba(0,255,136,0.2)',
                }
              }}
            >
              <ContentCopyIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Share Code" arrow>
            <IconButton 
              onClick={() => handleCopy(referralLink, true)} 
              sx={{ 
                color: '#2196F3', 
                background: 'rgba(33,150,243,0.1)',
                '&:hover': {
                  background: 'rgba(33,150,243,0.2)',
                }
              }}
            >
              <ShareIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Paper>

      {/* Share Section */}
      <Paper elevation={4} sx={{
        maxWidth: 900,
        mx: 'auto',
        mb: 3,
        p: { xs: 2, sm: 3 },
        display: 'flex',
        alignItems: 'center',
        borderRadius: 4,
        background: 'rgba(33,203,243,0.10)',
        gap: 2,
        flexWrap: 'wrap',
      }}>
        <Typography sx={{ fontWeight: 700, color: '#fff', fontSize: 18, minWidth: 120 }}>
          Share Link:
        </Typography>
        <TextField
          value={referralLink}
          InputProps={{ readOnly: true }}
          sx={{ flex: 1, background: 'rgba(255,255,255,0.04)', borderRadius: 2, input: { color: '#2196F3', fontWeight: 700, fontSize: 18 } }}
          variant="outlined"
          size="medium"
        />
        <Tooltip title={copyMsgLink} arrow>
          <IconButton onClick={() => handleCopy(referralLink, true)} sx={{ color: '#2196F3', ml: 1, fontSize: 28 }}>
            <ShareIcon fontSize="inherit" />
          </IconButton>
        </Tooltip>
      </Paper>

      {/* Stats Section */}
      <Grid container spacing={2} sx={{ maxWidth: 900, mx: 'auto', mb: 3 }}>
        <Grid item xs={12} sm={4}>
          <Paper sx={{ p: 2, borderRadius: 3, background: 'rgba(255,255,255,0.04)', textAlign: 'center' }}>
            <Typography variant="h4" sx={{ color: '#00ff88', fontWeight: 700 }}>
              {team.length}
            </Typography>
            <Typography variant="subtitle2" sx={{ color: '#bdbdbd', fontWeight: 600 }}>
              Active Referrals
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Team List Section */}
      <Paper elevation={2} sx={{
        maxWidth: 900,
        mx: 'auto',
        p: { xs: 2, sm: 3 },
        borderRadius: 4,
        background: 'rgba(255,255,255,0.03)',
      }}>
        <Typography variant="h5" sx={{ color: '#00ff88', fontWeight: 700, mb: 2 }}>
          Your Team
        </Typography>
        {team.length === 0 ? (
          <Typography sx={{ color: '#bdbdbd', textAlign: 'center' }}>No team members yet. Share your code to grow your team!</Typography>
        ) : (
          <Stack spacing={2}>
            {team.map((member, idx) => (
              <Box key={idx} sx={{ display: 'flex', alignItems: 'center', background: 'rgba(0,255,136,0.07)', borderRadius: 2, p: 2, gap: 2 }}>
                <Avatar sx={{ bgcolor: '#00ff88', color: '#222', fontWeight: 700 }}>{member.username[0].toUpperCase()}</Avatar>
                <Box sx={{ flex: 1 }}>
                  <Typography sx={{ color: '#fff', fontWeight: 600 }}>{member.username}</Typography>
                  <Typography sx={{ color: '#bdbdbd', fontSize: 13 }}>Joined: {member.joined}</Typography>
                </Box>
                <Typography sx={{ color: '#00ff88', fontWeight: 700, minWidth: 80, textAlign: 'right' }}>
                  RS {member.earnings}
                </Typography>
              </Box>
            ))}
          </Stack>
        )}
      </Paper>
    </Box>
  );
};

export default Team; 