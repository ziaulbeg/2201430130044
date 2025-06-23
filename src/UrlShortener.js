import React, { useState } from "react";
import { TextField, Button, Box, Typography, Grid, Card, CardContent } from "@mui/material";

export default function UrlShortener() {
  const [urls, setUrls] = useState([
    { longUrl: "", customCode: "", validity: "" }
  ]);
  const [shortened, setShortened] = useState([]);

  const handleChange = (index, field, value) => {
    const newUrls = [...urls];
    newUrls[index][field] = value;
    setUrls(newUrls);
  };

  const addUrlInput = () => {
    if (urls.length < 5) {
      setUrls([...urls, { longUrl: "", customCode: "", validity: "" }]);
    }
  };

  const shortenUrls = async () => {
    const now = new Date();
    const promises = urls.map(async (urlData) => {
      const shortCode = Math.random().toString(36).substring(7);
      const createdAt = now.toLocaleString();
      const expiresAt = new Date(now.getTime() + (parseInt(urlData.validity) || 10) * 60000).toLocaleString();
      return {
        originalUrl: urlData.longUrl,
        shortUrl: `http://short.ly/${shortCode}`,
        createdAt,
        expiresAt,
        totalClicks: Math.floor(Math.random() * 100),
        clicks: Array.from({ length: 3 }, () => ({
          timestamp: new Date(now.getTime() - Math.random() * 600000).toLocaleString(),
          source: ["Google", "Direct", "Facebook", "Twitter"][Math.floor(Math.random() * 4)]
        })),
        owner: {
          name: "mohd ziaul beg",
          email: "ziaulbeg123@gmail.com",
          rollNo: "2201430130044",
          accessCode: "nsXDeD",
          clientID: "679eae8f-820c-4278-a82f-6c168d6074b7",
          clientSecret: "mJWzHvgkTQGquWMt"
        }
      };
    });

    const results = await Promise.all(promises);
    setShortened(results);
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        URL Shortener
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Created by mohd ziaul beg (Roll No: 2201430130044, Email: ziaulbeg123@gmail.com)
      </Typography>
      {urls.map((url, index) => (
        <Grid container spacing={2} key={index} mb={2}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Original URL"
              value={url.longUrl}
              onChange={(e) => handleChange(index, "longUrl", e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="Custom Code (optional)"
              value={url.customCode}
              onChange={(e) => handleChange(index, "customCode", e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <TextField
              fullWidth
              label="Validity (minutes)"
              type="number"
              value={url.validity}
              onChange={(e) => handleChange(index, "validity", e.target.value)}
            />
          </Grid>
        </Grid>
      ))}
      <Button variant="outlined" onClick={addUrlInput} disabled={urls.length >= 5}>
        Add More URL
      </Button>
      <Button
        variant="contained"
        color="primary"
        sx={{ ml: 2 }}
        onClick={shortenUrls}
      >
        Shorten URLs
      </Button>

      <Box mt={4}>
        <Typography variant="h5" gutterBottom>
          Shortened URLs
        </Typography>
        {shortened.map((item, idx) => (
          <Card key={idx} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="body1">Original: {item.originalUrl}</Typography>
              <Typography variant="body2" color="primary">
                Shortened: <a href={item.shortUrl}>{item.shortUrl}</a>
              </Typography>
              <Typography variant="body2">Created At: {item.createdAt}</Typography>
              <Typography variant="body2">Expires At: {item.expiresAt}</Typography>
              <Typography variant="body2">Total Clicks: {item.totalClicks}</Typography>
              <Typography variant="subtitle2" mt={2}>Click Details:</Typography>
              {item.clicks.map((click, cIdx) => (
                <Typography key={cIdx} variant="caption" display="block">
                  {click.timestamp} - Source: {click.source}
                </Typography>
              ))}
              <Typography variant="caption" display="block" mt={2}>
                Created by: {item.owner.name} ({item.owner.rollNo}) - {item.owner.email}
              </Typography>
              <Typography variant="caption" display="block">
                Client ID: {item.owner.clientID}
              </Typography>
              <Typography variant="caption" display="block">
                Client Secret: {item.owner.clientSecret}
              </Typography>
              <Typography variant="caption" display="block">
                Access Code: {item.owner.accessCode}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
