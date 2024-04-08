import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const lists = [
	{
		title: "Currently Reading",
		list: "currently_reading",
		buttonText: "Add here",
		buttonVariant: "outlined",
	},
	{
		title: "Planning to Read",
		list: "planning_to_read",
		buttonText: "Add here",
		buttonVariant: "contained",
	},
	{
		title: "Already Read",
		list: "already_read",
		buttonText: "Add here",
		buttonVariant: "outlined",
	},
];

export default function AddToList() {
  return (
    <Container
      id="lists"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 3, sm: 6 },
      }}
    >
      <Box
        sx={{
          width: { sm: '100%', md: '60%' },
          textAlign: { sm: 'left', md: 'center' },
        }}
      >
        <Typography component="h2" variant="h4" color="text.primary">
          Add to list
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Quickly add this book to either of your lists below. 
        </Typography>
      </Box>
      <Grid container spacing={3} alignItems="center" justifyContent="center">
        {lists?.map((list) => (
          <Grid
            item
            key={list?.title}
            xs={12}
            sm={list?.title === 'Enterprise' ? 12 : 6}
            md={4}
          >
            <Card
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
                border: list?.title === 'Professional' ? '1px solid' : undefined,
                borderColor:
                  list?.title === 'Professional' ? 'primary.main' : undefined,
                background:
                  list?.title === 'Professional'
                    ? 'linear-gradient(#033363, #021F3B)'
                    : undefined,
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    mb: 1,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    color: list?.title === 'Planning To Read' ? 'grey.100' : '',
                  }}
                >
                  <Typography component="h3" variant="h6" textWeight={'bold'}>
                    {list?.title}
                  </Typography>
                  {list?.list === 'planning_to_read' && (
                    <Chip
                      icon={<AutoAwesomeIcon />}
                      label={list?.subheader}
                      size="small"
                      sx={{
                        background: (theme) =>
                          theme.palette.mode === 'light' ? '' : 'none',
                        backgroundColor: 'primary.contrastText',
                        '& .MuiChip-label': {
                          color: 'primary.dark',
                        },
                        '& .MuiChip-icon': {
                          color: 'primary.dark',
                        },
                      }}
                    />
                  )}
                </Box>             
              </CardContent>
              <CardActions>
                <Button
                  fullWidth
                  variant={list?.buttonVariant}
                  component="a"
                  href="/material-ui/getting-started/templates/checkout/"
                  target="_blank"
                >
                  {list?.buttonText}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
