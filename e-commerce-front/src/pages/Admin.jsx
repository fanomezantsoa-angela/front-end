
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InformationComponent from '../components/AdminComponents/InformationComponent';
import { getClientInformation } from '../actions/InformationActions';
import { useState } from 'react';
// Components import 
import ProductSectionComponent from '../components/AdminComponents/ProductSectionComponent';
import { useState } from 'react';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';


import AdminActionHeaderComponent from '../components/headerComponent/AdminActionheaderComponent';

const drawerWidth = 240;


function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


/**
 * MAIN COMPONENT FUNCTION
 */
function Admin(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);


  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    console.log(newValue)
    setValue(newValue);
  }


  const drawer = (
    <div>
      <Toolbar sx={{margin: 0, padding: 0}} className='p-0 m-0'>
          <img src="./src/assets/socolait.svg" alt="" 
          className="w-[200px] py-2 mb-1"/>
      </Toolbar>
      
      <Divider />
      {/* Profile information for admin */}
      <div className="py-4 px-4">
        <InformationComponent />
      </div>

      <Divider />
      {/* Navigation */}
      <Tabs 
      value={value} 
      onChange={handleChange} 
      orientation='vertical'
      aria-label="Handle admin navigation panel"
      >
        <Tab className="hover:scale-110 duration-100" label="Types de produits" {...a11yProps(0)} />
        <Tab className="hover:scale-110 duration-100" label="Les produits" {...a11yProps(1)} />
        <Tab className="hover:scale-110 duration-100" label="Livraison" {...a11yProps(2)} />
        <Tab className="hover:scale-110 duration-100" label="Prise de contact" {...a11yProps(3)} />
      </Tabs>

      <Divider />
    </div>
  );

  // Remove this const when copying and pasting into your project.
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {/* Header */}
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        {/* Header of the admin pannel component */}
        <Toolbar className='bg-white shadow-none py-5'>
            <div className='flex flex-row items-center w-full'>

                {/* Text part */}
                <div className='basis-4/5'>

                    <IconButton
                        color="primary"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Typography 
                    variant="h6" 
                    className='text-sky-700 uppercase items-center flex' 
                    noWrap 
                    component="div">
                        <span>
                            Pannaux d'administratrion
                        </span>
                        {/* <span>
                            <LockPersonIcon className="text-sky-700 mx-4" />
                        </span> */}
                    </Typography>
                </div>

                {/* Icon part */}
                <div className='basis-1/5'>
                    {/* All icons over here */}
                    <AdminActionHeaderComponent />
                </div>
            </div>
        </Toolbar>
      </AppBar>




      {/* Navigation bar */}
      <Box
        component="nav"
        sx={{ 
            width: { sm: drawerWidth }, 
            flexShrink: { sm: 0 },  }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        {/* All navigation tabs action */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>




      {/* Main section Element */}
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />

        <div className="relative w-full h-full">
            <CustomTabPanel value={value} index={0}>
                <ProductSectionComponent />
            </CustomTabPanel>

            <CustomTabPanel value={value} index={1}>
                Ensemble des produits
            </CustomTabPanel>
            
            <CustomTabPanel value={value} index={2}>
                Livraison
            </CustomTabPanel>

            <CustomTabPanel value={value} index={3}>
                <div className="">
                  Prise de contacte 
                </div>

                <div className="">
                <Typography paragraph>
                  Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper
                  eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim
                  neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra
                  tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis
                  sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi
                  tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit
                  gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem
                  et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis
                  tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
                  eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
                  posuere sollicitudin aliquam ultrices sagittis orci a.
                </Typography>
                </div>
            </CustomTabPanel>
        </div>

      </Box>
    </Box>
  );
}

export default Admin;
