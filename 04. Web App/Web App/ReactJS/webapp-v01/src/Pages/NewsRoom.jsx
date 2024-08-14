import React, { useEffect, useState } from 'react';
import { Box, Grid, Card, CardContent, CardMedia } from '@mui/material';
import Texts from '../Components/InputItems/Texts';
import { GetResponse } from '../APIs/NodeBackend';

const NewsRoom = ({setLoading, language}) => {
  const [newsItems, setNewsItems] = useState({
    loaded: false,
    items:[]
  });

  // Getting all news
  useEffect(()=>{
    const fetch = async() => {
      try {
        setLoading(true);  // Enabling spinner
        const serverResponse = await GetResponse('news/all');
        console.log('News: ', serverResponse.data);
        setNewsItems({loaded:true, items:serverResponse.data});
      } catch (error) {
        console.log('Error in fetching news');
      } finally {
        setLoading(false);  // Disabling spinner
      }
    }

    fetch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  return (
    <Box bgcolor={'ghostwhite'} p={3}>
      <Texts variant="h3" textAlign="center" >
        News Room
      </Texts>
      <Texts variant="body1" textAlign="center" paragraph mb={6} whiteSpace='normal'>
        Stay updated with the latest news, special discounts, and offers from our platform.
      </Texts>

      <Grid container spacing={4} justifyContent={'space-around'}>
        {newsItems.loaded && (newsItems.items.length > 0 ? newsItems.items.map((item, index) => (
          <Grid item key={index} xs={12} md={6} lg={4} display={'flex'} justifyContent={'space-around'}>
            <Card elevation={3} sx={{height:'100%', width:'100%', maxWidth:'370px', borderRadius:'17px', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)', p:0, textAlign:'center'}}>
              <CardMedia
                component="img"
                height="150"
                image={item.image}
                alt={item.title}
              />
              <CardContent sx={{width:'100%', height:'calc(100% - 145px)', pb:0, pt:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:'space-between'}}>
                <Texts variant="h5" component="div" gutterBottom whiteSpace='normal'>
                  {item.title}
                </Texts>
                <Texts variant="body2" paragraph whiteSpace='normal' fontWeight='normal'>
                  {item.description}
                </Texts>
                <Texts variant="body2" color="textSecondary" whiteSpace='normal' >
                  {item.date}
                </Texts>
              </CardContent>
            </Card> 
          </Grid>
        )) : (
          <Box height={'calc(100vh - 640px)'} display={'flex'} justifyContent={'space-around'} alignItems={'center'}> 
            <Texts>No Available News!</Texts>
          </Box>
          
        )
      )}
      </Grid>
    </Box>
  );
};

export default NewsRoom;
