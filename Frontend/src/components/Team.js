import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Grid, TextField, IconButton, Tooltip, Avatar, Stack, Button } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ShareIcon from '@mui/icons-material/Share';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';

const Team = () => {
  const [referralCode, setReferralCode] = useState('');
  const [referralLink, setReferralLink] = useState('');
  const [referralCount, setReferralCount] = useState(3);
  const [referralEarnings, setReferralEarnings] = useState(200);
  const [copyMsg, setCopyMsg] = useState('Copy');
  const [copyMsgLink, setCopyMsgLink] = useState('Copy');
  const [team, setTeam] = useState([]);

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

      {/* Referral Levels Section */}
      <Box sx={{ maxWidth: 900, mx: 'auto', mb: 4 }}>
        <Typography variant="h5" sx={{ color: '#00ff88', fontWeight: 700, mb: 2 }}>
          Referral Levels
        </Typography>
        <Grid container spacing={2}>
          {/* Level 1 */}
          <Grid item xs={12} sm={4}>
            <Paper sx={{
              p: 2,
              borderRadius: 4,
              background: 'linear-gradient(135deg, #232526 0%, #00ff88 100%)',
              boxShadow: '0 2px 12px 0 rgba(0,255,136,0.10)',
              color: '#fff',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              minHeight: 220,
            }}>
              <EmojiEventsIcon sx={{ fontSize: 40, color: '#00ff88', mb: 1 }} />
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Level 1</Typography>
              <Typography sx={{ fontSize: 15, mb: 0.5 }}>Register/Valid: <b>0/0</b></Typography>
              <Typography sx={{ fontSize: 15, mb: 0.5 }}>Commission: <b>13%</b></Typography>
              <Typography sx={{ fontSize: 15, mb: 1 }}>Total Income: <b>0</b></Typography>
              <Button variant="contained" size="small" sx={{
                background: 'rgba(0,255,136,0.15)',
                color: '#00ff88',
                fontWeight: 700,
                borderRadius: 2,
                boxShadow: 'none',
                '&:hover': {
                  background: '#00ff88',
                  color: '#222',
                },
                mt: 'auto',
              }}>Details</Button>
            </Paper>
          </Grid>
          {/* Level 2 */}
          <Grid item xs={12} sm={4}>
            <Paper sx={{
              p: 2,
              borderRadius: 4,
              background: 'linear-gradient(135deg, #232526 0%, #2196F3 100%)',
              boxShadow: '0 2px 12px 0 rgba(33,150,243,0.10)',
              color: '#fff',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              minHeight: 220,
            }}>
              <MilitaryTechIcon sx={{ fontSize: 40, color: '#2196F3', mb: 1 }} />
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Level 2</Typography>
              <Typography sx={{ fontSize: 15, mb: 0.5 }}>Register/Valid: <b>0/0</b></Typography>
              <Typography sx={{ fontSize: 15, mb: 0.5 }}>Commission: <b>4%</b></Typography>
              <Typography sx={{ fontSize: 15, mb: 1 }}>Total Income: <b>0</b></Typography>
              <Button variant="contained" size="small" sx={{
                background: 'rgba(33,150,243,0.15)',
                color: '#2196F3',
                fontWeight: 700,
                borderRadius: 2,
                boxShadow: 'none',
                '&:hover': {
                  background: '#2196F3',
                  color: '#fff',
                },
                mt: 'auto',
              }}>Details</Button>
            </Paper>
          </Grid>
          {/* Level 3 */}
          <Grid item xs={12} sm={4}>
            <Paper sx={{
              p: 2,
              borderRadius: 4,
              background: 'linear-gradient(135deg, #232526 0%, #ff4081 100%)',
              boxShadow: '0 2px 12px 0 rgba(255,64,129,0.10)',
              color: '#fff',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              minHeight: 220,
            }}>
              <WorkspacePremiumIcon sx={{ fontSize: 40, color: '#ff4081', mb: 1 }} />
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Level 3</Typography>
              <Typography sx={{ fontSize: 15, mb: 0.5 }}>Register/Valid: <b>0/0</b></Typography>
              <Typography sx={{ fontSize: 15, mb: 0.5 }}>Commission: <b>1%</b></Typography>
              <Typography sx={{ fontSize: 15, mb: 1 }}>Total Income: <b>0</b></Typography>
              <Button variant="contained" size="small" sx={{
                background: 'rgba(255,64,129,0.15)',
                color: '#ff4081',
                fontWeight: 700,
                borderRadius: 2,
                boxShadow: 'none',
                '&:hover': {
                  background: '#ff4081',
                  color: '#fff',
                },
                mt: 'auto',
              }}>Details</Button>
            </Paper>
          </Grid>
        </Grid>
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
        background: 'rgba(0,255,136,0.10)',
        gap: 2,
        flexWrap: 'wrap',
      }}>
        <Typography sx={{ fontWeight: 700, color: '#fff', fontSize: 18, minWidth: 120 }}>
          Your Code:
        </Typography>
        <TextField
          value={referralCode}
          InputProps={{ readOnly: true }}
          sx={{ flex: 1, background: 'rgba(255,255,255,0.04)', borderRadius: 2, input: { color: '#00ff88', fontWeight: 700, fontSize: 20 } }}
          variant="outlined"
          size="medium"
        />
        <Tooltip title={copyMsg} arrow>
          <IconButton onClick={() => handleCopy(referralCode, false)} sx={{ color: '#00ff88', ml: 1, fontSize: 28 }}>
            <ContentCopyIcon fontSize="inherit" />
          </IconButton>
        </Tooltip>
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
              {referralCount}
            </Typography>
            <Typography variant="subtitle2" sx={{ color: '#bdbdbd', fontWeight: 600 }}>
              Total Referrals
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper sx={{ p: 2, borderRadius: 3, background: 'rgba(255,255,255,0.04)', textAlign: 'center' }}>
            <Typography variant="h4" sx={{ color: '#00ff88', fontWeight: 700 }}>
              RS {referralEarnings}
            </Typography>
            <Typography variant="subtitle2" sx={{ color: '#bdbdbd', fontWeight: 600 }}>
              Referral Earnings
            </Typography>
          </Paper>
        </Grid>
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